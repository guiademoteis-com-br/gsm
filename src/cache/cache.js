import { buscarDados } from '@/api/api.js';

const MS_POR_MINUTO = 60000;
const CHAVE_BASE = 'GSMCache:IdMotel=';

/**
 * Busca dados do motel, priorizando o cache local.
 * @param {number} id - O ID do motel.
 * @param {number} minutos - Duração do cache em minutos.
 * @returns {Promise<Object>} Os dados do motel.
 */
export async function buscarDadosCache(id, minutos = 2880) {
    const urlTemNoCache = window.location.search.includes('nocache');
    const chave = `${CHAVE_BASE}${id}`;

    if (urlTemNoCache) {
        console.log(`🚫 NOCACHE ATIVADO → ignorando cache para o motel de ID ${id}`);
        return buscarDados(id);
    }

    const cacheBruto = localStorage.getItem(chave);

    if (cacheBruto) {
        const { expiracao, valor } = JSON.parse(cacheBruto);

        if (Date.now() < expiracao) {
            console.log(`✅ CACHE UTILIZADO → ${chave}`);
            return valor;
        }

        console.log(`⏳ CACHE EXPIRADO → removendo e buscando novamente`);
        localStorage.removeItem(chave);
    }

    console.log(`🌐 REQUISIÇÃO REAL PARA O MOTEL DE ID → ${id}`);
    const dados = await buscarDados(id);

    localStorage.setItem(
        chave,
        JSON.stringify({
            expiracao: Date.now() + minutos * MS_POR_MINUTO,
            valor: dados,
        })
    );

    return dados;
}
