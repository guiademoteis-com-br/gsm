/**
 * Carrega scripts dinamicamente no DOM.
 * @param {string[]} script - Array de URLs de scripts.
 * @param {string} [el='body'] - Seletor do elemento pai onde o script será anexado.
 */
export function CarregarScript(script = [], el = 'body') {
    script.forEach(link => {
        const s = document.createElement('script');
        s.src = link;
        s.defer = true;
        document.querySelector(el)?.appendChild(s);
    });
}

/**
 * Cria um link de suíte formatado.
 * @param {string} arquivo - Nome do arquivo base (ex: suite.php).
 * @param {string} slug - Slug da suíte.
 * @param {number | null} id - ID da suíte.
 * @returns {string} O link completo.
 */
export function Linkar(arquivo = '', slug = '', id = null) {
    return `${arquivo}?${slug}&id=${id}`;
}

/**
 * Formata um preço para o padrão monetário BRL (Real).
 * @param {number | null} [preco=null] - O valor do preço.
 * @returns {string} O preço formatado como moeda.
 */
export function FormatarPreco(preco = null) {
    // Garante que o preco seja um número para toLocaleString
    const valor = Number(preco);
    if (isNaN(valor) || valor === null) return '';

    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
}

/**
 * Formata uma lista de itens em uma string de conjunção.
 * Ex: ['wifi', 'piscina', 'tv'] -> "wifi, piscina e tv"
 * @param {Object[]} [itens=[]] - Array de objetos com a propriedade 'Nome'.
 * @returns {string} A lista formatada.
 */
export function FormatarLista(itens = []) {
    const nomes = itens.map(item => item.Nome).filter(nome => nome);
    if (nomes.length === 0) return '';

    return new Intl.ListFormat('pt-BR', {
        style: 'long',
        type: 'conjunction',
    }).format(nomes);
}
