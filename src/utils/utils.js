export function CarregarScript(script = [], el = 'body') {
    script.forEach(link => {
        const s = document.createElement('script');
        s.src = link;
        document.querySelector(el).appendChild(s);
    });
}

export function Linkar(arquivo = '', slug = '', id = null) {
    return `${arquivo}?${slug}&id=${id}`;
}

export function Precificar(preco = null) {
    return preco.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
}

export function Listar(itens = []) {
    return new Intl.ListFormat('pt-BR', {
        style: 'long',
        type: 'conjunction',
    }).format(itens.map(item => item.Nome));
}
