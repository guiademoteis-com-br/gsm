import { ref as d, createApp as C, onMounted as h, nextTick as y } from "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js";
async function v(o) {
  const t = await fetch(`https://guiasites.guiademoteis.com.br/v1/guiasites/moteis/${o}/json`);
  if (!t.ok) throw new Error(`Erro: ${t.message}`);
  return t.json();
}
async function A(o, t = 60) {
  const n = `GsmCache:IdMotel=${o}-${navigator.userAgent}`, a = localStorage.getItem(n);
  if (a) {
    const { expiracao: c, valor: l } = JSON.parse(a);
    if (Date.now() < c)
      return console.log(`✅ CACHE UTILIZADO → ${n}`), l;
    console.log("⏳ CACHE EXPIRADO → buscando novamente"), localStorage.removeItem(n);
  }
  console.log(`🌐 REQUISIÇÃO REAL PARA O MOTEL DE ID → ${o}`);
  const e = await v(o);
  return localStorage.setItem(
    n,
    JSON.stringify({
      expiracao: Date.now() + t * 6e4,
      valor: e
    })
  ), e;
}
function f(o = [], t = "body") {
  o.forEach((n) => {
    const a = document.createElement("script");
    a.src = n, document.querySelector(t).appendChild(a);
  });
}
function E(o = "", t = "", n = null) {
  return `${o}?${t}&id=${n}`;
}
function u(o = null) {
  return o.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}
function p(o = []) {
  return new Intl.ListFormat("pt-BR", {
    style: "long",
    type: "conjunction"
  }).format(o.map((t) => t.Nome));
}
const L = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CarregarScript: f,
  FormatarLista: p,
  FormatarPreco: u,
  Linkar: E
}, Symbol.toStringTag, { value: "Module" }));
function w(o) {
  const t = +new URLSearchParams(location.search).get("id"), { Motel: n } = o, { Suites: a, ...e } = n, c = a.map((r) => {
    const { Menor: s, Padrao: m, Maior: g } = r.Precos, { Itens: S } = r, I = `suite.php?${r.Slug.Base}&id=${r.Id}`;
    return {
      ...r,
      Link: I,
      Precos: {
        Menor: u(s),
        Padrao: u(m),
        Maior: u(g)
      },
      ItensFormatados: p(S)
    };
  }), l = (r = !0, s = []) => c.filter((m) => ![!r && t, ...s].includes(m.Id)), i = (r = null) => c.find((s) => s.Id === (r ?? t));
  return {
    IdMotel: e.Id,
    NomeMotel: e.Nome,
    Telefones: e.Contato.Telefones,
    Celulares: e.Contato.Celulares,
    Whatsapps: e.Contato.Whatsapps,
    Alzira: e.Contato.Alzira,
    Emails: e.Contato.Emails,
    Logavel: e.Logavel,
    Reservas: e.Reservas,
    Suites: l,
    Suite: i
  };
}
window.Gsm = async function({ El: t = "", Id: n = null, Cache: a = 60, Tick: e = null, Script: c = [] } = {}) {
  if (!document.querySelector(t)) return;
  const l = d(!0), i = await A(n, a), r = w(i);
  C({
    setup() {
      const s = d(r);
      return h(() => {
        f(c), e && y(e), l.value = !1;
      }), {
        Carregando: l,
        Gm: s,
        Utils: L
      };
    }
  }).mount(t);
};
