import { ref as i, createApp as d, onMounted as f, nextTick as g } from "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js";
async function p(t) {
  const e = await fetch(`https://guiasites.guiademoteis.com.br/v1/guiasites/moteis/${t}/json`);
  if (!e.ok) throw new Error(`Erro: ${e.message}`);
  return e.json();
}
async function S(t, e = 60) {
  const n = `GsmCache:IdMotel=${t}-${navigator.userAgent}`, r = localStorage.getItem(n);
  if (r) {
    const { expiracao: s, valor: a } = JSON.parse(r);
    if (Date.now() < s)
      return console.log(`✅ CACHE UTILIZADO → ${n}`), a;
    console.log("⏳ CACHE EXPIRADO → buscando novamente"), localStorage.removeItem(n);
  }
  console.log(`🌐 REQUISIÇÃO REAL PARA O MOTEL DE ID → ${t}`);
  const o = await p(t);
  return localStorage.setItem(
    n,
    JSON.stringify({
      expiracao: Date.now() + e * 6e4,
      valor: o
    })
  ), o;
}
async function C(t) {
  const e = +new URLSearchParams(location.search).get("id"), { Motel: n } = t, { Suites: r, ...o } = n, s = (c = !0, l = []) => r.filter((u) => ![!c && e, ...l].includes(u.Id)), a = (c = null) => r.find((l) => l.Id === (c ?? e));
  return {
    IdMotel: o.Id,
    NomeMotel: o.Nome,
    Telefones: o.Contato.Telefones,
    Celulares: o.Contato.Celulares,
    Whatsapps: o.Contato.Whatsapps,
    Alzira: o.Contato.Alzira,
    Emails: o.Contato.Emails,
    Logavel: o.Logavel,
    Reservas: o.Reservas,
    Suites: s,
    Suite: a
  };
}
function m(t = [], e = "body") {
  t.forEach((n) => {
    const r = document.createElement("script");
    r.src = n, document.querySelector(e).appendChild(r);
  });
}
function y(t = "", e = "", n = null) {
  return `${t}?${e}&id=${n}`;
}
function I(t = null) {
  return t.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}
function h(t = []) {
  return new Intl.ListFormat("pt-BR", {
    style: "long",
    type: "conjunction"
  }).format(t.map((e) => e.Nome));
}
const v = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CarregarScript: m,
  Linkar: y,
  Listar: h,
  Precificar: I
}, Symbol.toStringTag, { value: "Module" }));
window.Gsm = async function({ El: e = "", Id: n = null, Cache: r = 60, Tick: o = null, Script: s = [] } = {}) {
  if (!document.querySelector(e)) return;
  const a = i(!0), c = await S(n, r), l = await C(c);
  d({
    setup() {
      const u = i(l);
      return f(() => {
        m(s), o && g(o), a.value = !1;
      }), {
        Carregando: a,
        Gm: u,
        Utils: v
      };
    }
  }).mount(e);
};
