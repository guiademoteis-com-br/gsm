import { FormatarPreco, FormatarLista } from '@/utils/utils.js';

/**
 * A Store encapsula a lógica de formatação e filtragem dos dados.
 * @param {Object} dados - Dados brutos da API.
 * @returns {Object} A Store do Motel.
 */
export function store(dados) {
    const idSuiteAtual = +new URLSearchParams(location.search).get('id');

    const { Motel } = dados;
    const { Suites: SuitesBrutas, ...resto } = Motel;

    // Formatação de Suítes: Mapeia e formata os dados de preço e itens
    const suitesFormatadas = SuitesBrutas.map(suite => {
        const { Menor, Padrao, Maior } = suite.Precos;
        const { Itens } = suite;

        return {
            ...suite,
            // Link pode ser gerado no componente, mas manter aqui como um campo formatado é aceitável
            Link: `suite.php?${suite.Slug.Base}&id=${suite.Id}`,
            Precos: {
                Menor: FormatarPreco(Menor),
                Padrao: FormatarPreco(Padrao),
                Maior: FormatarPreco(Maior),
            },
            ItensFormatados: FormatarLista(Itens),
        };
    });

    /**
     * Retorna a lista de suítes filtrada.
     * @param {boolean} [exibirSuiteAtual=true] - Se a suíte atual na URL deve ser incluída.
     * @param {number[]} [noIds=[]] - Array de IDs de suítes a serem excluídas.
     * @returns {Object[]} Array de suítes formatadas.
     */
    const Suites = (exibirSuiteAtual = true, noIds = []) => {
        // Exclusão condicional: Se exibirSuiteAtual for false, adiciona idSuiteAtual à lista de exclusão.
        const idsExcluir = [...noIds];
        if (!exibirSuiteAtual && idSuiteAtual) {
            idsExcluir.push(idSuiteAtual);
        }

        return suitesFormatadas.filter(suite => !idsExcluir.includes(suite.Id));
    };

    /**
     * Retorna uma única suíte pelo ID ou a suíte atual.
     * @param {number | null} [id=null] - ID da suíte a ser buscada.
     * @returns {Object | undefined} A suíte encontrada.
     */
    const Suite = (id = null) => {
        return suitesFormatadas.find(suite => suite.Id === (id ?? idSuiteAtual));
    };

    // Objeto de Store pública
    return {
        // Propriedades básicas do motel
        IdMotel: resto.Id,
        NomeMotel: resto.Nome,
        Logavel: resto.Logavel,
        Reservas: resto.Reservas,

        // Contato (Destructuring para acessos diretos)
        Telefones: resto.Contato.Telefones,
        Celulares: resto.Contato.Celulares,
        Whatsapps: resto.Contato.Whatsapps,
        Alzira: resto.Contato.Alzira,
        Emails: resto.Contato.Emails,

        // Métodos de Suítes
        Suites,
        Suite,
    };
}
