export async function buscarDados(id) {
    const r = await fetch(`https://guiasites.guiademoteis.com.br/v1/guiasites/moteis/${id}/json`);
    if (!r.ok) throw new Error(`Erro: ${r.message}`);
    return r.json();
}
