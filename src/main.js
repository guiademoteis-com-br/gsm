import { buscarDadosCache } from './cache/cache.js';
import { store } from './store/store.js';
import { createApp, ref, onMounted, nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js';
import * as Utils from './utils/utils.js';

window.Gsm = async function Gsm({ El = '', Id = null, Cache = 60, Tick = null, Script = [] } = {}) {
    if (!document.querySelector(El)) return;

    const Carregando = ref(true);

    const dados = await buscarDadosCache(Id, Cache);
    const motel = store(dados);

    createApp({
        setup() {
            const Gm = ref(motel);
            console.log(Gm.value);

            onMounted(() => {
                Utils.CarregarScript(Script);
                Tick && nextTick(Tick);
                Carregando.value = false;
            });

            return {
                Carregando,
                Gm,
                Utils,
            };
        },
    }).mount(El);
};
