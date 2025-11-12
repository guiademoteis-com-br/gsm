import { buscarDados } from '../api/api.js';

export async function buscarDadosCache(id, minutos = 60) {
    const urlTemNoCache = window.location.search.includes('nocache');
    const chave = `GsmCache:IdMotel=${id}-${navigator.userAgent}`;

    if (urlTemNoCache) {
        console.log(`🚫 NOCACHE ATIVADO → ignorando cache para ${id}`);
        const dados = await buscarDados(id);
        return dados;
    }

    const cacheBruto = localStorage.getItem(chave);

    if (cacheBruto) {
        const { expiracao, valor } = JSON.parse(cacheBruto);

        if (Date.now() < expiracao) {
            console.log(`✅ CACHE UTILIZADO → ${chave}`);
            return valor;
        }

        console.log(`⏳ CACHE EXPIRADO → buscando novamente`);
        localStorage.removeItem(chave);
    }

    console.log(`🌐 REQUISIÇÃO REAL PARA O MOTEL DE ID → ${id}`);
    const dados = await buscarDados(id);

    localStorage.setItem(
        chave,
        JSON.stringify({
            expiracao: Date.now() + minutos * 60000,
            valor: dados,
        })
    );

    return dados;
}
