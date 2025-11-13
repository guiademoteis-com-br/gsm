import { buscarDadosCache } from '@/cache/cache.js';
import { store } from '@/store/store.js';
import { createApp, ref, onMounted, nextTick } from 'vue';
import * as Utils from '@/utils/utils.js';

/**
 * Função principal para inicializar o Guia Site Motel (GSM).
 * @param {Object} config - Configurações de inicialização.
 * @param {string} config.El - Seletor CSS do elemento raiz (Vue mount).
 * @param {number} config.Id - ID do motel.
 * @param {number} [config.Cache=2880] - Duração do cache em minutos.
 * @param {Function} [config.Tick=null] - Callback a ser executada após o primeiro nextTick.
 * @param {string[]} [config.Script=[]] - Array de URLs de scripts a serem carregados.
 */
window.GSM = async function GSM({ El = null, Id = null, Cache = 2880, Tick = null, Script = [] } = {}) {
    if (!El || !Id || !document.querySelector(El)) {
        if (!Id) console.error("GSM: O parâmetro 'Id' é obrigatório para inicialização.");
        if (!El) console.error("GSM: O parâmetro 'El' é obrigatório para inicialização.");
        return;
    }

    const Carregando = ref(true);
    let motelData;

    try {
        motelData = await buscarDadosCache(Id, Cache);
    } catch (error) {
        console.error('GSM: Falha ao carregar dados do motel:', error);
        Carregando.value = false;
        return;
    }

    const motel = store(motelData);

    createApp({
        setup() {
            const Gm = ref(motel);

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
