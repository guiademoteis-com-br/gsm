import { ref as m, createApp as h, onMounted as A, nextTick as w } from "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js";
async function f(o) {
  const e = await fetch(`https://guiasites.guiademoteis.com.br/v1/guiasites/moteis/${o}/json`);
  if (!e.ok) throw new Error(`Erro: ${e.message}`);
  return e.json();
}
async function y(o, e = 60) {
  const r = window.location.search.includes("nocache"), n = `GsmCache:IdMotel=${o}-${navigator.userAgent}`;
  if (r)
    return console.log(`🚫 NOCACHE ATIVADO → ignorando cache para o motel de ID ${o}`), await f(o);
  const t = localStorage.getItem(n);
  if (t) {
    const { expiracao: c, valor: u } = JSON.parse(t);
    if (Date.now() < c)
      return console.log(`✅ CACHE UTILIZADO → ${n}`), u;
    console.log("⏳ CACHE EXPIRADO → buscando novamente"), localStorage.removeItem(n);
  }
  console.log(`🌐 REQUISIÇÃO REAL PARA O MOTEL DE ID → ${o}`);
  const s = await f(o);
  return localStorage.setItem(
    n,
    JSON.stringify({
      expiracao: Date.now() + e * 6e4,
      valor: s
    })
  ), s;
}
function g(o = [], e = "body") {
  o.forEach((r) => {
    const n = document.createElement("script");
    n.src = r, document.querySelector(e).appendChild(n);
  });
}
function v(o = "", e = "", r = null) {
  return `${o}?${e}&id=${r}`;
}
function i(o = null) {
  return o.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}
function p(o = []) {
  return new Intl.ListFormat("pt-BR", {
    style: "long",
    type: "conjunction"
  }).format(o.map((e) => e.Nome));
}
const E = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CarregarScript: g,
  FormatarLista: p,
  FormatarPreco: i,
  Linkar: v
}, Symbol.toStringTag, { value: "Module" }));
function L(o) {
  const e = +new URLSearchParams(location.search).get("id"), { Motel: r } = o, { Suites: n, ...t } = r, s = n.map((a) => {
    const { Menor: l, Padrao: d, Maior: I } = a.Precos, { Itens: C } = a, S = `suite.php?${a.Slug.Base}&id=${a.Id}`;
    return {
      ...a,
      Link: S,
      Precos: {
        Menor: i(l),
        Padrao: i(d),
        Maior: i(I)
      },
      ItensFormatados: p(C)
    };
  }), c = (a = !0, l = []) => s.filter((d) => ![!a && e, ...l].includes(d.Id)), u = (a = null) => s.find((l) => l.Id === (a ?? e));
  return {
    IdMotel: t.Id,
    NomeMotel: t.Nome,
    Telefones: t.Contato.Telefones,
    Celulares: t.Contato.Celulares,
    Whatsapps: t.Contato.Whatsapps,
    Alzira: t.Contato.Alzira,
    Emails: t.Contato.Emails,
    Logavel: t.Logavel,
    Reservas: t.Reservas,
    Suites: c,
    Suite: u
  };
}
window.Gsm = async function({ El: e = "", Id: r = null, Cache: n = 60, Tick: t = null, Script: s = [] } = {}) {
  if (!document.querySelector(e)) return;
  const c = m(!0), u = await y(r, n), a = L(u);
  h({
    setup() {
      const l = m(a);
      return A(() => {
        g(s), t && w(t), c.value = !1;
      }), {
        Carregando: c,
        Gm: l,
        Utils: E
      };
    }
  }).mount(e);
};
