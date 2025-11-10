import { createApp, ref, nextTick, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js';
const idSuiteAtual = +new URLSearchParams(location.search).get('id');

const TEMPO_DE_VIDA_MINUTOS = 60;
async function buscarComCache(url, minutos = TEMPO_DE_VIDA_MINUTOS) {
    const chave = 'cache:' + url;

    const cacheBruto = localStorage.getItem(chave);

    if (cacheBruto) {
        const { expiracao, valor } = JSON.parse(cacheBruto);

        if (Date.now() < expiracao) {
            console.log(`✅ CACHE UTILIZADO → ${url}`);
            return valor;
        }

        console.log(`⏳ CACHE EXPIRADO → buscando novamente`);
        localStorage.removeItem(chave);
    }

    console.log(`🌐 REQUISIÇÃO REAL → ${url}`);
    const resposta = await fetch(url);
    const dados = await resposta.json();

    localStorage.setItem(
        chave,
        JSON.stringify({
            expiracao: Date.now() + minutos * 60000,
            valor: dados,
        })
    );

    return dados;
}

function gsm({ el = '', id = null, tick = null } = {}) {
    if (!document.querySelector(el)) return;
    createApp({
        setup() {
            const Motel = ref(null);
            const carregando = ref(false);

            async function carregar() {
                carregando.value = true;

                const url = `https://guiasites.guiademoteis.com.br/v1/guiasites/moteis/${id}/json`;
                const { Motel: motel } = await buscarComCache(url);
                const { Suites, ...resto } = motel;

                const dados = {};
                dados.Id = resto.Id;
                dados.Nome = resto.Nome;
                dados.Telefones = resto.Contato.Telefones;
                dados.Celulares = resto.Contato.Celulares;
                dados.Whatsapps = resto.Contato.Whatsapps;
                dados.Alzira = resto.Contato.Alzira;
                dados.Emails = resto.Contato.Emails;
                dados.Logavel = resto.Logavel;
                dados.Reservas = resto.Reservas;

                Motel.value = {
                    ...dados,
                    Suites(exibirSuiteAtual = true, noIds = []) {
                        return Suites.filter(s => ![!exibirSuiteAtual && idSuiteAtual, ...noIds].includes(s.Id));
                    },
                    Suite(id = null) {
                        return Suites.find(s => s.Id === (id ?? idSuiteAtual));
                    },
                };

                console.log(Motel.value);

                carregando.value = false;

                await nextTick(() => {
                    tick && tick();
                    const s = document.createElement('script');
                    s.src = 'https://go.guiademoteis.com.br/go-sites/go.min.js';
                    s.defer = true;
                    document.body.appendChild(s);
                });
            }

            onMounted(carregar);

            return { Motel, carregando, idSuiteAtual, linkar, formatarMoeda, formatarItens };
        },
    }).mount(el);
}

window.gsm = gsm;
window.idSuiteAtual = idSuiteAtual;

// Útils

function linkar(arquivo, slug, id) {
    return `${arquivo}?${slug}&id=${id}`;
}

function formatarMoeda(preco) {
    return preco?.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
}

function formatarItens(itens) {
    return new Intl.ListFormat('pt-BR', {
        style: 'long',
        type: 'conjunction',
    }).format(itens?.map(item => item.Nome));
}
