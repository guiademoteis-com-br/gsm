import { ref as m, createApp as h, onMounted as A, nextTick as v } from "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js";
async function g(o) {
  const e = await fetch(`https://guiasites.guiademoteis.com.br/v1/guiasites/moteis/${o}/json`);
  if (!e.ok) throw new Error(`Erro: ${e.message}`);
  return e.json();
}
async function w(o, e = 60) {
  const r = window.location.search.includes("nocache"), n = `GsmCache:IdMotel=${o}-${navigator.userAgent}`;
  if (r)
    return console.log(`🚫 NOCACHE ATIVADO → ignorando cache para o motel de ID ${o}`), await g(o);
  const t = localStorage.getItem(n);
  if (t) {
    const { expiracao: l, valor: u } = JSON.parse(t);
    if (Date.now() < l)
      return console.log(`✅ CACHE UTILIZADO → ${n}`), u;
    console.log("⏳ CACHE EXPIRADO → buscando novamente"), localStorage.removeItem(n);
  }
  console.log(`🌐 REQUISIÇÃO REAL PARA O MOTEL DE ID → ${o}`);
  const c = await g(o);
  return localStorage.setItem(
    n,
    JSON.stringify({
      expiracao: Date.now() + e * 6e4,
      valor: c
    })
  ), c;
}
function f(o = [], e = "body") {
  o.forEach((r) => {
    const n = document.createElement("script");
    n.src = r, document.querySelector(e).appendChild(n);
  });
}
function y(o = "", e = "", r = null) {
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
  CarregarScript: f,
  FormatarLista: p,
  FormatarPreco: i,
  Linkar: y
}, Symbol.toStringTag, { value: "Module" }));
function L(o) {
  const e = +new URLSearchParams(location.search).get("id"), { Motel: r } = o, { Suites: n, ...t } = r, c = n.map((a) => {
    const { Menor: s, Padrao: d, Maior: I } = a.Precos, { Itens: C } = a, S = `suite.php?${a.Slug.Base}&id=${a.Id}`;
    return {
      ...a,
      Link: S,
      Precos: {
        Menor: i(s),
        Padrao: i(d),
        Maior: i(I)
      },
      ItensFormatados: p(C)
    };
  }), l = (a = !0, s = []) => c.filter((d) => ![!a && e, ...s].includes(d.Id)), u = (a = null) => c.find((s) => s.Id === (a ?? e));
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
    Suites: l,
    Suite: u
  };
}
window.Gsm = async function({ El: e = "", Id: r = null, Cache: n = 60, Tick: t = null, Script: c = [] } = {}) {
  if (!document.querySelector(e)) return;
  const l = m(!0), u = await w(r, n), a = L(u);
  h({
    setup() {
      const s = m(a);
      return console.log(s.value), A(() => {
        f(c), t && v(t), l.value = !1;
      }), {
        Carregando: l,
        Gm: s,
        Utils: E
      };
    }
  }).mount(e);
};
