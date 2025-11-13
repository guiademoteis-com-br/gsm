/**
 * Busca dados do motel pela API.
 * @param {number} id - O ID do motel.
 * @returns {Promise<Object>} Os dados JSON do motel.
 */
export async function buscarDados(id) {
    const url = `https://guiasites.guiademoteis.com.br/v1/guiasites/moteis/${id}/json`;
    const r = await fetch(url);

    if (!r.ok) throw new Error(`Erro ao buscar dados do motel ID ${id}. Status: ${r.status} - ${r.statusText}`);

    return r.json();
}
