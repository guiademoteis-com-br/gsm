export async function store(dados) {
    const idSuiteAtual = +new URLSearchParams(location.search).get('id');

    const { Motel } = dados;
    const { Suites: suites, ...resto } = Motel;

    const Suites = (exibirSuiteAtual = true, noIds = []) => {
        return suites.filter(suite => ![!exibirSuiteAtual && idSuiteAtual, ...noIds].includes(suite.Id));
    };

    const Suite = (id = null) => {
        return suites.find(suite => suite.Id === (id ?? idSuiteAtual));
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
