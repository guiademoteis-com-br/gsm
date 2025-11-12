import { Precificar, Listar } from '../utils/utils.js';

export async function store(dados) {
    const idSuiteAtual = +new URLSearchParams(location.search).get('id');

    const { Motel } = dados;
    const { Suites: SuitesBrutas, ...resto } = Motel;

    const suitesFormatadas = SuitesBrutas.map(suite => {
        const { Menor, Padrao, Maior } = suite.Precos;
        const { Itens } = suite;
        return {
            ...suite,
            Precos: {
                Menor: Precificar(Menor),
                Padrao: Precificar(Padrao),
                Maior: Precificar(Maior),
            },
            ItensFormatados: Listar(Itens),
        };
    });

    const Suites = (exibirSuiteAtual = true, noIds = []) => {
        return suitesFormatadas.filter(suite => ![!exibirSuiteAtual && idSuiteAtual, ...noIds].includes(suite.Id));
    };

    const Suite = (id = null) => {
        return suitesFormatadas.find(suite => suite.Id === (id ?? idSuiteAtual));
    };

    return {
        IdMotel: resto.Id,
        NomeMotel: resto.Nome,
        Telefones: resto.Contato.Telefones,
        Celulares: resto.Contato.Celulares,
        Whatsapps: resto.Contato.Whatsapps,
        Alzira: resto.Contato.Alzira,
        Emails: resto.Contato.Emails,
        Logavel: resto.Logavel,
        Reservas: resto.Reservas,
        Suites,
        Suite,
    };
}
