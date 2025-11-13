async function Il(e) {
  const t = `https://guiasites.guiademoteis.com.br/v1/guiasites/moteis/${e}/json`, n = await fetch(t);
  if (!n.ok) throw new Error(`Erro ao buscar dados do motel ID ${e}. Status: ${n.status} - ${n.statusText}`);
  return n.json();
}
const hp = 6e4, mp = "GSMCache:IdMotel=";
async function gp(e, t = 2880) {
  const n = window.location.search.includes("nocache"), s = `${mp}${e}`;
  if (n)
    return console.log(`🚫 NOCACHE ATIVADO → ignorando cache para o motel de ID ${e}`), Il(e);
  const i = localStorage.getItem(s);
  if (i) {
    const { expiracao: o, valor: l } = JSON.parse(i);
    if (Date.now() < o)
      return console.log(`✅ CACHE UTILIZADO → ${s}`), l;
    console.log("⏳ CACHE EXPIRADO → removendo e buscando novamente"), localStorage.removeItem(s);
  }
  console.log(`🌐 REQUISIÇÃO REAL PARA O MOTEL DE ID → ${e}`);
  const r = await Il(e);
  return localStorage.setItem(
    s,
    JSON.stringify({
      expiracao: Date.now() + t * hp,
      valor: r
    })
  ), r;
}
function sa(e = [], t = "body") {
  e.forEach((n) => {
    const s = document.createElement("script");
    s.src = n, s.async = !0, document.querySelector(t)?.appendChild(s);
  });
}
function Ep(e = "", t = "", n = null) {
  return `${e}?${t}&id=${n}`;
}
function di(e = null) {
  const t = Number(e);
  return isNaN(t) || t === null ? "" : t.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}
function ia(e = []) {
  const t = e.map((n) => n.Nome).filter((n) => n);
  return t.length === 0 ? "" : new Intl.ListFormat("pt-BR", {
    style: "long",
    type: "conjunction"
  }).format(t);
}
const vp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CarregarScript: sa,
  FormatarLista: ia,
  FormatarPreco: di,
  Linkar: Ep
}, Symbol.toStringTag, { value: "Module" }));
function yp(e) {
  const t = +new URLSearchParams(location.search).get("id"), { Motel: n } = e, { Suites: s, ...i } = n, r = s.map((c) => {
    const { Menor: u, Padrao: f, Maior: a } = c.Precos, { Itens: d } = c;
    return {
      ...c,
      // Link pode ser gerado no componente, mas manter aqui como um campo formatado é aceitável
      Link: `suite.php?${c.Slug.Base}&id=${c.Id}`,
      Precos: {
        Menor: di(u),
        Padrao: di(f),
        Maior: di(a)
      },
      ItensFormatados: ia(d)
    };
  }), o = (c = !0, u = []) => {
    const f = [...u];
    return !c && t && f.push(t), r.filter((a) => !f.includes(a.Id));
  }, l = (c = null) => r.find((u) => u.Id === (c ?? t));
  return {
    // Propriedades básicas do motel
    IdMotel: i.Id,
    NomeMotel: i.Nome,
    Logavel: i.Logavel,
    Reservas: i.Reservas,
    // Contato (Destructuring para acessos diretos)
    Telefones: i.Contato.Telefones,
    Celulares: i.Contato.Celulares,
    Whatsapps: i.Contato.Whatsapps,
    Alzira: i.Contato.Alzira,
    Emails: i.Contato.Emails,
    // Métodos de Suítes
    Suites: o,
    Suite: l
  };
}
// @__NO_SIDE_EFFECTS__
function Ve(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ne = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, Fn = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], me = () => {
}, Ln = () => !1, Kt = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Si = (e) => e.startsWith("onUpdate:"), ee = Object.assign, Vo = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, _p = Object.prototype.hasOwnProperty, re = (e, t) => _p.call(e, t), B = Array.isArray, yn = (e) => rs(e) === "[object Map]", xn = (e) => rs(e) === "[object Set]", kl = (e) => rs(e) === "[object Date]", Np = (e) => rs(e) === "[object RegExp]", G = (e) => typeof e == "function", Y = (e) => typeof e == "string", Qe = (e) => typeof e == "symbol", se = (e) => e !== null && typeof e == "object", er = (e) => (se(e) || G(e)) && G(e.then) && G(e.catch), ra = Object.prototype.toString, rs = (e) => ra.call(e), xo = (e) => rs(e).slice(8, -1), tr = (e) => rs(e) === "[object Object]", Ao = (e) => Y(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, sn = /* @__PURE__ */ Ve(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), oa = /* @__PURE__ */ Ve(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
), nr = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, bp = /-\w/g, pe = nr(
  (e) => e.replace(bp, (t) => t.slice(1).toUpperCase())
), Sp = /\B([A-Z])/g, Pe = nr(
  (e) => e.replace(Sp, "-$1").toLowerCase()
), xt = nr((e) => e.charAt(0).toUpperCase() + e.slice(1)), Dt = nr(
  (e) => e ? `on${xt(e)}` : ""
), je = (e, t) => !Object.is(e, t), tn = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, qn = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, sr = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Oi = (e) => {
  const t = Y(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
let Rl;
const qs = () => Rl || (Rl = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Op(e, t) {
  return e + JSON.stringify(
    t,
    (n, s) => typeof s == "function" ? s.toString() : s
  );
}
const _s = {
  1: "TEXT",
  2: "CLASS",
  4: "STYLE",
  8: "PROPS",
  16: "FULL_PROPS",
  32: "NEED_HYDRATION",
  64: "STABLE_FRAGMENT",
  128: "KEYED_FRAGMENT",
  256: "UNKEYED_FRAGMENT",
  512: "NEED_PATCH",
  1024: "DYNAMIC_SLOTS",
  2048: "DEV_ROOT_FRAGMENT",
  [-1]: "CACHED",
  [-2]: "BAIL"
}, Tp = {
  1: "STABLE",
  2: "DYNAMIC",
  3: "FORWARDED"
}, Cp = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol", Dp = /* @__PURE__ */ Ve(Cp), Ml = 2;
function wp(e, t = 0, n = e.length) {
  if (t = Math.max(0, Math.min(t, e.length)), n = Math.max(0, Math.min(n, e.length)), t > n) return "";
  let s = e.split(/(\r?\n)/);
  const i = s.filter((l, c) => c % 2 === 1);
  s = s.filter((l, c) => c % 2 === 0);
  let r = 0;
  const o = [];
  for (let l = 0; l < s.length; l++)
    if (r += s[l].length + (i[l] && i[l].length || 0), r >= t) {
      for (let c = l - Ml; c <= l + Ml || n > r; c++) {
        if (c < 0 || c >= s.length) continue;
        const u = c + 1;
        o.push(
          `${u}${" ".repeat(Math.max(3 - String(u).length, 0))}|  ${s[c]}`
        );
        const f = s[c].length, a = i[c] && i[c].length || 0;
        if (c === l) {
          const d = t - (r - (f + a)), m = Math.max(
            1,
            n > r ? f - d : n - t
          );
          o.push("   |  " + " ".repeat(d) + "^".repeat(m));
        } else if (c > l) {
          if (n > r) {
            const d = Math.max(Math.min(n - r, f), 1);
            o.push("   |  " + "^".repeat(d));
          }
          r += f + a;
        }
      }
      break;
    }
  return o.join(`
`);
}
function os(e) {
  if (B(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], i = Y(s) ? la(s) : os(s);
      if (i)
        for (const r in i)
          t[r] = i[r];
    }
    return t;
  } else if (Y(e) || se(e))
    return e;
}
const Vp = /;(?![^(]*\))/g, xp = /:([^]+)/, Ap = /\/\*[^]*?\*\//g;
function la(e) {
  const t = {};
  return e.replace(Ap, "").split(Vp).forEach((n) => {
    if (n) {
      const s = n.split(xp);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Ip(e) {
  if (!e) return "";
  if (Y(e)) return e;
  let t = "";
  for (const n in e) {
    const s = e[n];
    if (Y(s) || typeof s == "number") {
      const i = n.startsWith("--") ? n : Pe(n);
      t += `${i}:${s};`;
    }
  }
  return t;
}
function ls(e) {
  let t = "";
  if (Y(e))
    t = e;
  else if (B(e))
    for (let n = 0; n < e.length; n++) {
      const s = ls(e[n]);
      s && (t += s + " ");
    }
  else if (se(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
function kp(e) {
  if (!e) return null;
  let { class: t, style: n } = e;
  return t && !Y(t) && (e.class = ls(t)), n && (e.style = os(n)), e;
}
const Rp = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", Mp = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", Pp = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics", $p = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr", ca = /* @__PURE__ */ Ve(Rp), aa = /* @__PURE__ */ Ve(Mp), fa = /* @__PURE__ */ Ve(Pp), Lp = /* @__PURE__ */ Ve($p), ua = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Fp = /* @__PURE__ */ Ve(ua), Pl = /* @__PURE__ */ Ve(
  ua + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected"
);
function Io(e) {
  return !!e || e === "";
}
const Hp = /* @__PURE__ */ Ve(
  "accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,inert,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap"
), Bp = /* @__PURE__ */ Ve(
  "xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xmlns:xlink,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan"
);
function jp(e) {
  if (e == null)
    return !1;
  const t = typeof e;
  return t === "string" || t === "number" || t === "boolean";
}
const Up = /[ !"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g;
function Kp(e, t) {
  return e.replace(
    Up,
    (n) => `\\${n}`
  );
}
function Wp(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let s = 0; n && s < e.length; s++)
    n = cn(e[s], t[s]);
  return n;
}
function cn(e, t) {
  if (e === t) return !0;
  let n = kl(e), s = kl(t);
  if (n || s)
    return n && s ? e.getTime() === t.getTime() : !1;
  if (n = Qe(e), s = Qe(t), n || s)
    return e === t;
  if (n = B(e), s = B(t), n || s)
    return n && s ? Wp(e, t) : !1;
  if (n = se(e), s = se(t), n || s) {
    if (!n || !s)
      return !1;
    const i = Object.keys(e).length, r = Object.keys(t).length;
    if (i !== r)
      return !1;
    for (const o in e) {
      const l = e.hasOwnProperty(o), c = t.hasOwnProperty(o);
      if (l && !c || !l && c || !cn(e[o], t[o]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function ir(e, t) {
  return e.findIndex((n) => cn(n, t));
}
const pa = (e) => !!(e && e.__v_isRef === !0), da = (e) => Y(e) ? e : e == null ? "" : B(e) || se(e) && (e.toString === ra || !G(e.toString)) ? pa(e) ? da(e.value) : JSON.stringify(e, ha, 2) : String(e), ha = (e, t) => pa(t) ? ha(e, t.value) : yn(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, i], r) => (n[Ar(s, r) + " =>"] = i, n),
    {}
  )
} : xn(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Ar(n))
} : Qe(t) ? Ar(t) : se(t) && !B(t) && !tr(t) ? String(t) : t, Ar = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Qe(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
function ma(e) {
  return e == null ? "initial" : typeof e == "string" ? e === "" ? " " : e : ((typeof e != "number" || !Number.isFinite(e)) && process.env.NODE_ENV !== "production" && console.warn(
    "[Vue warn] Invalid value used for CSS binding. Expected a string or a finite number but received:",
    e
  ), String(e));
}
function st(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let Re;
class ko {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = Re, !t && Re && (this.index = (Re.scopes || (Re.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = Re;
      try {
        return Re = this, t();
      } finally {
        Re = n;
      }
    } else process.env.NODE_ENV !== "production" && st("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = Re, Re = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    this._on > 0 && --this._on === 0 && (Re = this.prevScope, this.prevScope = void 0);
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function qp(e) {
  return new ko(e);
}
function ga() {
  return Re;
}
function Gp(e, t = !1) {
  Re ? Re.cleanups.push(e) : process.env.NODE_ENV !== "production" && !t && st(
    "onScopeDispose() is called when there is no active effect scope to be associated with."
  );
}
let ae;
const Ir = /* @__PURE__ */ new WeakSet();
class xs {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Re && Re.active && Re.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Ir.has(this) && (Ir.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || va(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, $l(this), ya(this);
    const t = ae, n = vt;
    ae = this, vt = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && ae !== this && st(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), _a(this), ae = t, vt = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Po(t);
      this.deps = this.depsTail = void 0, $l(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Ir.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Gr(this) && this.run();
  }
  get dirty() {
    return Gr(this);
  }
}
let Ea = 0, Ns, bs;
function va(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = bs, bs = e;
    return;
  }
  e.next = Ns, Ns = e;
}
function Ro() {
  Ea++;
}
function Mo() {
  if (--Ea > 0)
    return;
  if (bs) {
    let t = bs;
    for (bs = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Ns; ) {
    let t = Ns;
    for (Ns = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function ya(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function _a(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const i = s.prevDep;
    s.version === -1 ? (s === n && (n = i), Po(s), Jp(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = i;
  }
  e.deps = t, e.depsTail = n;
}
function Gr(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Na(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Na(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === As) || (e.globalVersion = As, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !Gr(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = ae, s = vt;
  ae = e, vt = !0;
  try {
    ya(e);
    const i = e.fn(e._value);
    (t.version === 0 || je(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    ae = n, vt = s, _a(e), e.flags &= -3;
  }
}
function Po(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: i } = e;
  if (s && (s.nextSub = i, e.prevSub = void 0), i && (i.prevSub = s, e.nextSub = void 0), process.env.NODE_ENV !== "production" && n.subsHead === e && (n.subsHead = i), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let r = n.computed.deps; r; r = r.nextDep)
      Po(r, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Jp(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
function zp(e, t) {
  e.effect instanceof xs && (e = e.effect.fn);
  const n = new xs(e);
  t && ee(n, t);
  try {
    n.run();
  } catch (i) {
    throw n.stop(), i;
  }
  const s = n.run.bind(n);
  return s.effect = n, s;
}
function Yp(e) {
  e.effect.stop();
}
let vt = !0;
const ba = [];
function _t() {
  ba.push(vt), vt = !1;
}
function Nt() {
  const e = ba.pop();
  vt = e === void 0 ? !0 : e;
}
function $l(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = ae;
    ae = void 0;
    try {
      t();
    } finally {
      ae = n;
    }
  }
}
let As = 0;
class Xp {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class rr {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!ae || !vt || ae === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ae)
      n = this.activeLink = new Xp(ae, this), ae.deps ? (n.prevDep = ae.depsTail, ae.depsTail.nextDep = n, ae.depsTail = n) : ae.deps = ae.depsTail = n, Sa(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = ae.depsTail, n.nextDep = void 0, ae.depsTail.nextDep = n, ae.depsTail = n, ae.deps === n && (ae.deps = s);
    }
    return process.env.NODE_ENV !== "production" && ae.onTrack && ae.onTrack(
      ee(
        {
          effect: ae
        },
        t
      )
    ), n;
  }
  trigger(t) {
    this.version++, As++, this.notify(t);
  }
  notify(t) {
    Ro();
    try {
      if (process.env.NODE_ENV !== "production")
        for (let n = this.subsHead; n; n = n.nextSub)
          n.sub.onTrigger && !(n.sub.flags & 8) && n.sub.onTrigger(
            ee(
              {
                effect: n.sub
              },
              t
            )
          );
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Mo();
    }
  }
}
function Sa(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        Sa(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const Ti = /* @__PURE__ */ new WeakMap(), _n = Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), Jr = Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), Is = Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function Ce(e, t, n) {
  if (vt && ae) {
    let s = Ti.get(e);
    s || Ti.set(e, s = /* @__PURE__ */ new Map());
    let i = s.get(n);
    i || (s.set(n, i = new rr()), i.map = s, i.key = n), process.env.NODE_ENV !== "production" ? i.track({
      target: e,
      type: t,
      key: n
    }) : i.track();
  }
}
function wt(e, t, n, s, i, r) {
  const o = Ti.get(e);
  if (!o) {
    As++;
    return;
  }
  const l = (c) => {
    c && (process.env.NODE_ENV !== "production" ? c.trigger({
      target: e,
      type: t,
      key: n,
      newValue: s,
      oldValue: i,
      oldTarget: r
    }) : c.trigger());
  };
  if (Ro(), t === "clear")
    o.forEach(l);
  else {
    const c = B(e), u = c && Ao(n);
    if (c && n === "length") {
      const f = Number(s);
      o.forEach((a, d) => {
        (d === "length" || d === Is || !Qe(d) && d >= f) && l(a);
      });
    } else
      switch ((n !== void 0 || o.has(void 0)) && l(o.get(n)), u && l(o.get(Is)), t) {
        case "add":
          c ? u && l(o.get("length")) : (l(o.get(_n)), yn(e) && l(o.get(Jr)));
          break;
        case "delete":
          c || (l(o.get(_n)), yn(e) && l(o.get(Jr)));
          break;
        case "set":
          yn(e) && l(o.get(_n));
          break;
      }
  }
  Mo();
}
function Zp(e, t) {
  const n = Ti.get(e);
  return n && n.get(t);
}
function Rn(e) {
  const t = Q(e);
  return t === e ? t : (Ce(t, "iterate", Is), Le(e) ? t : t.map(Ie));
}
function or(e) {
  return Ce(e = Q(e), "iterate", Is), e;
}
const Qp = {
  __proto__: null,
  [Symbol.iterator]() {
    return kr(this, Symbol.iterator, Ie);
  },
  concat(...e) {
    return Rn(this).concat(
      ...e.map((t) => B(t) ? Rn(t) : t)
    );
  },
  entries() {
    return kr(this, "entries", (e) => (e[1] = Ie(e[1]), e));
  },
  every(e, t) {
    return It(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return It(this, "filter", e, t, (n) => n.map(Ie), arguments);
  },
  find(e, t) {
    return It(this, "find", e, t, Ie, arguments);
  },
  findIndex(e, t) {
    return It(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return It(this, "findLast", e, t, Ie, arguments);
  },
  findLastIndex(e, t) {
    return It(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return It(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Rr(this, "includes", e);
  },
  indexOf(...e) {
    return Rr(this, "indexOf", e);
  },
  join(e) {
    return Rn(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return Rr(this, "lastIndexOf", e);
  },
  map(e, t) {
    return It(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return ps(this, "pop");
  },
  push(...e) {
    return ps(this, "push", e);
  },
  reduce(e, ...t) {
    return Ll(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Ll(this, "reduceRight", e, t);
  },
  shift() {
    return ps(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return It(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return ps(this, "splice", e);
  },
  toReversed() {
    return Rn(this).toReversed();
  },
  toSorted(e) {
    return Rn(this).toSorted(e);
  },
  toSpliced(...e) {
    return Rn(this).toSpliced(...e);
  },
  unshift(...e) {
    return ps(this, "unshift", e);
  },
  values() {
    return kr(this, "values", Ie);
  }
};
function kr(e, t, n) {
  const s = or(e), i = s[t]();
  return s !== e && !Le(e) && (i._next = i.next, i.next = () => {
    const r = i._next();
    return r.done || (r.value = n(r.value)), r;
  }), i;
}
const ed = Array.prototype;
function It(e, t, n, s, i, r) {
  const o = or(e), l = o !== e && !Le(e), c = o[t];
  if (c !== ed[t]) {
    const a = c.apply(e, r);
    return l ? Ie(a) : a;
  }
  let u = n;
  o !== e && (l ? u = function(a, d) {
    return n.call(this, Ie(a), d, e);
  } : n.length > 2 && (u = function(a, d) {
    return n.call(this, a, d, e);
  }));
  const f = c.call(o, u, s);
  return l && i ? i(f) : f;
}
function Ll(e, t, n, s) {
  const i = or(e);
  let r = n;
  return i !== e && (Le(e) ? n.length > 3 && (r = function(o, l, c) {
    return n.call(this, o, l, c, e);
  }) : r = function(o, l, c) {
    return n.call(this, o, Ie(l), c, e);
  }), i[t](r, ...s);
}
function Rr(e, t, n) {
  const s = Q(e);
  Ce(s, "iterate", Is);
  const i = s[t](...n);
  return (i === -1 || i === !1) && Gn(n[0]) ? (n[0] = Q(n[0]), s[t](...n)) : i;
}
function ps(e, t, n = []) {
  _t(), Ro();
  const s = Q(e)[t].apply(e, n);
  return Mo(), Nt(), s;
}
const td = /* @__PURE__ */ Ve("__proto__,__v_isRef,__isVue"), Oa = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Qe)
);
function nd(e) {
  Qe(e) || (e = String(e));
  const t = Q(this);
  return Ce(t, "has", e), t.hasOwnProperty(e);
}
class Ta {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    if (n === "__v_skip") return t.__v_skip;
    const i = this._isReadonly, r = this._isShallow;
    if (n === "__v_isReactive")
      return !i;
    if (n === "__v_isReadonly")
      return i;
    if (n === "__v_isShallow")
      return r;
    if (n === "__v_raw")
      return s === (i ? r ? Aa : xa : r ? Va : wa).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const o = B(t);
    if (!i) {
      let c;
      if (o && (c = Qp[n]))
        return c;
      if (n === "hasOwnProperty")
        return nd;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      _e(t) ? t : s
    );
    if ((Qe(n) ? Oa.has(n) : td(n)) || (i || Ce(t, "get", n), r))
      return l;
    if (_e(l)) {
      const c = o && Ao(n) ? l : l.value;
      return i && se(c) ? ks(c) : c;
    }
    return se(l) ? i ? ks(l) : cr(l) : l;
  }
}
class Ca extends Ta {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, i) {
    let r = t[n];
    if (!this._isShallow) {
      const c = bt(r);
      if (!Le(s) && !bt(s) && (r = Q(r), s = Q(s)), !B(t) && _e(r) && !_e(s))
        return c ? (process.env.NODE_ENV !== "production" && st(
          `Set operation on key "${String(n)}" failed: target is readonly.`,
          t[n]
        ), !0) : (r.value = s, !0);
    }
    const o = B(t) && Ao(n) ? Number(n) < t.length : re(t, n), l = Reflect.set(
      t,
      n,
      s,
      _e(t) ? t : i
    );
    return t === Q(i) && (o ? je(s, r) && wt(t, "set", n, s, r) : wt(t, "add", n, s)), l;
  }
  deleteProperty(t, n) {
    const s = re(t, n), i = t[n], r = Reflect.deleteProperty(t, n);
    return r && s && wt(t, "delete", n, void 0, i), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Qe(n) || !Oa.has(n)) && Ce(t, "has", n), s;
  }
  ownKeys(t) {
    return Ce(
      t,
      "iterate",
      B(t) ? "length" : _n
    ), Reflect.ownKeys(t);
  }
}
class Da extends Ta {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && st(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && st(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const sd = /* @__PURE__ */ new Ca(), id = /* @__PURE__ */ new Da(), rd = /* @__PURE__ */ new Ca(!0), od = /* @__PURE__ */ new Da(!0), zr = (e) => e, ti = (e) => Reflect.getPrototypeOf(e);
function ld(e, t, n) {
  return function(...s) {
    const i = this.__v_raw, r = Q(i), o = yn(r), l = e === "entries" || e === Symbol.iterator && o, c = e === "keys" && o, u = i[e](...s), f = n ? zr : t ? Ci : Ie;
    return !t && Ce(
      r,
      "iterate",
      c ? Jr : _n
    ), {
      // iterator protocol
      next() {
        const { value: a, done: d } = u.next();
        return d ? { value: a, done: d } : {
          value: l ? [f(a[0]), f(a[1])] : f(a),
          done: d
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function ni(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      st(
        `${xt(e)} operation ${n}failed: target is readonly.`,
        Q(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function cd(e, t) {
  const n = {
    get(i) {
      const r = this.__v_raw, o = Q(r), l = Q(i);
      e || (je(i, l) && Ce(o, "get", i), Ce(o, "get", l));
      const { has: c } = ti(o), u = t ? zr : e ? Ci : Ie;
      if (c.call(o, i))
        return u(r.get(i));
      if (c.call(o, l))
        return u(r.get(l));
      r !== o && r.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && Ce(Q(i), "iterate", _n), i.size;
    },
    has(i) {
      const r = this.__v_raw, o = Q(r), l = Q(i);
      return e || (je(i, l) && Ce(o, "has", i), Ce(o, "has", l)), i === l ? r.has(i) : r.has(i) || r.has(l);
    },
    forEach(i, r) {
      const o = this, l = o.__v_raw, c = Q(l), u = t ? zr : e ? Ci : Ie;
      return !e && Ce(c, "iterate", _n), l.forEach((f, a) => i.call(r, u(f), u(a), o));
    }
  };
  return ee(
    n,
    e ? {
      add: ni("add"),
      set: ni("set"),
      delete: ni("delete"),
      clear: ni("clear")
    } : {
      add(i) {
        !t && !Le(i) && !bt(i) && (i = Q(i));
        const r = Q(this);
        return ti(r).has.call(r, i) || (r.add(i), wt(r, "add", i, i)), this;
      },
      set(i, r) {
        !t && !Le(r) && !bt(r) && (r = Q(r));
        const o = Q(this), { has: l, get: c } = ti(o);
        let u = l.call(o, i);
        u ? process.env.NODE_ENV !== "production" && Fl(o, l, i) : (i = Q(i), u = l.call(o, i));
        const f = c.call(o, i);
        return o.set(i, r), u ? je(r, f) && wt(o, "set", i, r, f) : wt(o, "add", i, r), this;
      },
      delete(i) {
        const r = Q(this), { has: o, get: l } = ti(r);
        let c = o.call(r, i);
        c ? process.env.NODE_ENV !== "production" && Fl(r, o, i) : (i = Q(i), c = o.call(r, i));
        const u = l ? l.call(r, i) : void 0, f = r.delete(i);
        return c && wt(r, "delete", i, void 0, u), f;
      },
      clear() {
        const i = Q(this), r = i.size !== 0, o = process.env.NODE_ENV !== "production" ? yn(i) ? new Map(i) : new Set(i) : void 0, l = i.clear();
        return r && wt(
          i,
          "clear",
          void 0,
          void 0,
          o
        ), l;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((i) => {
    n[i] = ld(i, e, t);
  }), n;
}
function lr(e, t) {
  const n = cd(e, t);
  return (s, i, r) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? s : Reflect.get(
    re(n, i) && i in s ? n : s,
    i,
    r
  );
}
const ad = {
  get: /* @__PURE__ */ lr(!1, !1)
}, fd = {
  get: /* @__PURE__ */ lr(!1, !0)
}, ud = {
  get: /* @__PURE__ */ lr(!0, !1)
}, pd = {
  get: /* @__PURE__ */ lr(!0, !0)
};
function Fl(e, t, n) {
  const s = Q(n);
  if (s !== n && t.call(e, s)) {
    const i = xo(e);
    st(
      `Reactive ${i} contains both the raw and reactive versions of the same object${i === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const wa = /* @__PURE__ */ new WeakMap(), Va = /* @__PURE__ */ new WeakMap(), xa = /* @__PURE__ */ new WeakMap(), Aa = /* @__PURE__ */ new WeakMap();
function dd(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function hd(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : dd(xo(e));
}
function cr(e) {
  return bt(e) ? e : ar(
    e,
    !1,
    sd,
    ad,
    wa
  );
}
function Ia(e) {
  return ar(
    e,
    !1,
    rd,
    fd,
    Va
  );
}
function ks(e) {
  return ar(
    e,
    !0,
    id,
    ud,
    xa
  );
}
function mt(e) {
  return ar(
    e,
    !0,
    od,
    pd,
    Aa
  );
}
function ar(e, t, n, s, i) {
  if (!se(e))
    return process.env.NODE_ENV !== "production" && st(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = hd(e);
  if (r === 0)
    return e;
  const o = i.get(e);
  if (o)
    return o;
  const l = new Proxy(
    e,
    r === 2 ? s : n
  );
  return i.set(e, l), l;
}
function Bt(e) {
  return bt(e) ? Bt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function bt(e) {
  return !!(e && e.__v_isReadonly);
}
function Le(e) {
  return !!(e && e.__v_isShallow);
}
function Gn(e) {
  return e ? !!e.__v_raw : !1;
}
function Q(e) {
  const t = e && e.__v_raw;
  return t ? Q(t) : e;
}
function ka(e) {
  return !re(e, "__v_skip") && Object.isExtensible(e) && qn(e, "__v_skip", !0), e;
}
const Ie = (e) => se(e) ? cr(e) : e, Ci = (e) => se(e) ? ks(e) : e;
function _e(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function jt(e) {
  return Ma(e, !1);
}
function Ra(e) {
  return Ma(e, !0);
}
function Ma(e, t) {
  return _e(e) ? e : new md(e, t);
}
class md {
  constructor(t, n) {
    this.dep = new rr(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : Q(t), this._value = n ? t : Ie(t), this.__v_isShallow = n;
  }
  get value() {
    return process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || Le(t) || bt(t);
    t = s ? t : Q(t), je(t, n) && (this._rawValue = t, this._value = s ? t : Ie(t), process.env.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: t,
      oldValue: n
    }) : this.dep.trigger());
  }
}
function gd(e) {
  e.dep && (process.env.NODE_ENV !== "production" ? e.dep.trigger({
    target: e,
    type: "set",
    key: "value",
    newValue: e._value
  }) : e.dep.trigger());
}
function fr(e) {
  return _e(e) ? e.value : e;
}
function Ed(e) {
  return G(e) ? e() : fr(e);
}
const vd = {
  get: (e, t, n) => t === "__v_raw" ? e : fr(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const i = e[t];
    return _e(i) && !_e(n) ? (i.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function $o(e) {
  return Bt(e) ? e : new Proxy(e, vd);
}
class yd {
  constructor(t) {
    this.__v_isRef = !0, this._value = void 0;
    const n = this.dep = new rr(), { get: s, set: i } = t(n.track.bind(n), n.trigger.bind(n));
    this._get = s, this._set = i;
  }
  get value() {
    return this._value = this._get();
  }
  set value(t) {
    this._set(t);
  }
}
function Pa(e) {
  return new yd(e);
}
function _d(e) {
  process.env.NODE_ENV !== "production" && !Gn(e) && st("toRefs() expects a reactive object but received a plain one.");
  const t = B(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = $a(e, n);
  return t;
}
class Nd {
  constructor(t, n, s) {
    this._object = t, this._key = n, this._defaultValue = s, this.__v_isRef = !0, this._value = void 0;
  }
  get value() {
    const t = this._object[this._key];
    return this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return Zp(Q(this._object), this._key);
  }
}
class bd {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
function Sd(e, t, n) {
  return _e(e) ? e : G(e) ? new bd(e) : se(e) && arguments.length > 1 ? $a(e, t, n) : jt(e);
}
function $a(e, t, n) {
  const s = e[t];
  return _e(s) ? s : new Nd(e, t, n);
}
class Od {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new rr(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = As - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ae !== this)
      return va(this, !0), !0;
    process.env.NODE_ENV;
  }
  get value() {
    const t = process.env.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track();
    return Na(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter ? this.setter(t) : process.env.NODE_ENV !== "production" && st("Write operation failed: computed value is readonly");
  }
}
function Td(e, t, n = !1) {
  let s, i;
  G(e) ? s = e : (s = e.get, i = e.set);
  const r = new Od(s, i, n);
  return process.env.NODE_ENV !== "production" && t && !n && (r.onTrack = t.onTrack, r.onTrigger = t.onTrigger), r;
}
const Cd = {
  GET: "get",
  HAS: "has",
  ITERATE: "iterate"
}, Dd = {
  SET: "set",
  ADD: "add",
  DELETE: "delete",
  CLEAR: "clear"
}, si = {}, Di = /* @__PURE__ */ new WeakMap();
let Xt;
function wd() {
  return Xt;
}
function La(e, t = !1, n = Xt) {
  if (n) {
    let s = Di.get(n);
    s || Di.set(n, s = []), s.push(e);
  } else process.env.NODE_ENV !== "production" && !t && st(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function Vd(e, t, n = ne) {
  const { immediate: s, deep: i, once: r, scheduler: o, augmentJob: l, call: c } = n, u = (v) => {
    (n.onWarn || st)(
      "Invalid watch source: ",
      v,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, f = (v) => i ? v : Le(v) || i === !1 || i === 0 ? Ft(v, 1) : Ft(v);
  let a, d, m, y, E = !1, k = !1;
  if (_e(e) ? (d = () => e.value, E = Le(e)) : Bt(e) ? (d = () => f(e), E = !0) : B(e) ? (k = !0, E = e.some((v) => Bt(v) || Le(v)), d = () => e.map((v) => {
    if (_e(v))
      return v.value;
    if (Bt(v))
      return f(v);
    if (G(v))
      return c ? c(v, 2) : v();
    process.env.NODE_ENV !== "production" && u(v);
  })) : G(e) ? t ? d = c ? () => c(e, 2) : e : d = () => {
    if (m) {
      _t();
      try {
        m();
      } finally {
        Nt();
      }
    }
    const v = Xt;
    Xt = a;
    try {
      return c ? c(e, 3, [y]) : e(y);
    } finally {
      Xt = v;
    }
  } : (d = me, process.env.NODE_ENV !== "production" && u(e)), t && i) {
    const v = d, D = i === !0 ? 1 / 0 : i;
    d = () => Ft(v(), D);
  }
  const V = ga(), O = () => {
    a.stop(), V && V.active && Vo(V.effects, a);
  };
  if (r && t) {
    const v = t;
    t = (...D) => {
      v(...D), O();
    };
  }
  let h = k ? new Array(e.length).fill(si) : si;
  const N = (v) => {
    if (!(!(a.flags & 1) || !a.dirty && !v))
      if (t) {
        const D = a.run();
        if (i || E || (k ? D.some((F, w) => je(F, h[w])) : je(D, h))) {
          m && m();
          const F = Xt;
          Xt = a;
          try {
            const w = [
              D,
              // pass undefined as the old value when it's changed for the first time
              h === si ? void 0 : k && h[0] === si ? [] : h,
              y
            ];
            h = D, c ? c(t, 3, w) : (
              // @ts-expect-error
              t(...w)
            );
          } finally {
            Xt = F;
          }
        }
      } else
        a.run();
  };
  return l && l(N), a = new xs(d), a.scheduler = o ? () => o(N, !1) : N, y = (v) => La(v, !1, a), m = a.onStop = () => {
    const v = Di.get(a);
    if (v) {
      if (c)
        c(v, 4);
      else
        for (const D of v) D();
      Di.delete(a);
    }
  }, process.env.NODE_ENV !== "production" && (a.onTrack = n.onTrack, a.onTrigger = n.onTrigger), t ? s ? N(!0) : h = a.run() : o ? o(N.bind(null, !0), !0) : a.run(), O.pause = a.pause.bind(a), O.resume = a.resume.bind(a), O.stop = O, O;
}
function Ft(e, t = 1 / 0, n) {
  if (t <= 0 || !se(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, _e(e))
    Ft(e.value, t, n);
  else if (B(e))
    for (let s = 0; s < e.length; s++)
      Ft(e[s], t, n);
  else if (xn(e) || yn(e))
    e.forEach((s) => {
      Ft(s, t, n);
    });
  else if (tr(e)) {
    for (const s in e)
      Ft(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && Ft(e[s], t, n);
  }
  return e;
}
const Nn = [];
function Hn(e) {
  Nn.push(e);
}
function Bn() {
  Nn.pop();
}
let Mr = !1;
function C(e, ...t) {
  if (Mr) return;
  Mr = !0, _t();
  const n = Nn.length ? Nn[Nn.length - 1].component : null, s = n && n.appContext.config.warnHandler, i = xd();
  if (s)
    An(
      s,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((r) => {
          var o, l;
          return (l = (o = r.toString) == null ? void 0 : o.call(r)) != null ? l : JSON.stringify(r);
        }).join(""),
        n && n.proxy,
        i.map(
          ({ vnode: r }) => `at <${br(n, r.type)}>`
        ).join(`
`),
        i
      ]
    );
  else {
    const r = [`[Vue warn]: ${e}`, ...t];
    i.length && r.push(`
`, ...Ad(i)), console.warn(...r);
  }
  Nt(), Mr = !1;
}
function xd() {
  let e = Nn[Nn.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const s = e.component && e.component.parent;
    e = s && s.vnode;
  }
  return t;
}
function Ad(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ...Id(n));
  }), t;
}
function Id({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, i = ` at <${br(
    e.component,
    e.type,
    s
  )}`, r = ">" + n;
  return e.props ? [i, ...kd(e.props), r] : [i + r];
}
function kd(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...Fa(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Fa(e, t, n) {
  return Y(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : _e(t) ? (t = Fa(e, Q(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : G(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = Q(t), n ? t : [`${e}=`, t]);
}
function Lo(e, t) {
  process.env.NODE_ENV !== "production" && e !== void 0 && (typeof e != "number" ? C(`${t} is not a valid number - got ${JSON.stringify(e)}.`) : isNaN(e) && C(`${t} is NaN - the duration expression might be incorrect.`));
}
const Rd = {
  SETUP_FUNCTION: 0,
  0: "SETUP_FUNCTION",
  RENDER_FUNCTION: 1,
  1: "RENDER_FUNCTION",
  NATIVE_EVENT_HANDLER: 5,
  5: "NATIVE_EVENT_HANDLER",
  COMPONENT_EVENT_HANDLER: 6,
  6: "COMPONENT_EVENT_HANDLER",
  VNODE_HOOK: 7,
  7: "VNODE_HOOK",
  DIRECTIVE_HOOK: 8,
  8: "DIRECTIVE_HOOK",
  TRANSITION_HOOK: 9,
  9: "TRANSITION_HOOK",
  APP_ERROR_HANDLER: 10,
  10: "APP_ERROR_HANDLER",
  APP_WARN_HANDLER: 11,
  11: "APP_WARN_HANDLER",
  FUNCTION_REF: 12,
  12: "FUNCTION_REF",
  ASYNC_COMPONENT_LOADER: 13,
  13: "ASYNC_COMPONENT_LOADER",
  SCHEDULER: 14,
  14: "SCHEDULER",
  COMPONENT_UPDATE: 15,
  15: "COMPONENT_UPDATE",
  APP_UNMOUNT_CLEANUP: 16,
  16: "APP_UNMOUNT_CLEANUP"
}, ur = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush",
  15: "component update",
  16: "app unmount cleanup function"
};
function An(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (i) {
    fn(i, t, n);
  }
}
function ft(e, t, n, s) {
  if (G(e)) {
    const i = An(e, t, n, s);
    return i && er(i) && i.catch((r) => {
      fn(r, t, n);
    }), i;
  }
  if (B(e)) {
    const i = [];
    for (let r = 0; r < e.length; r++)
      i.push(ft(e[r], t, n, s));
    return i;
  } else process.env.NODE_ENV !== "production" && C(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function fn(e, t, n, s = !0) {
  const i = t ? t.vnode : null, { errorHandler: r, throwUnhandledErrorInProduction: o } = t && t.appContext.config || ne;
  if (t) {
    let l = t.parent;
    const c = t.proxy, u = process.env.NODE_ENV !== "production" ? ur[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const f = l.ec;
      if (f) {
        for (let a = 0; a < f.length; a++)
          if (f[a](e, c, u) === !1)
            return;
      }
      l = l.parent;
    }
    if (r) {
      _t(), An(r, null, 10, [
        e,
        c,
        u
      ]), Nt();
      return;
    }
  }
  Md(e, n, i, s, o);
}
function Md(e, t, n, s = !0, i = !1) {
  if (process.env.NODE_ENV !== "production") {
    const r = ur[t];
    if (n && Hn(n), C(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && Bn(), s)
      throw e;
    console.error(e);
  } else {
    if (i)
      throw e;
    console.error(e);
  }
}
const Ue = [];
let Tt = -1;
const jn = [];
let Zt = null, $n = 0;
const Ha = /* @__PURE__ */ Promise.resolve();
let wi = null;
const Pd = 100;
function Gs(e) {
  const t = wi || Ha;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function $d(e) {
  let t = Tt + 1, n = Ue.length;
  for (; t < n; ) {
    const s = t + n >>> 1, i = Ue[s], r = Rs(i);
    r < e || r === e && i.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function pr(e) {
  if (!(e.flags & 1)) {
    const t = Rs(e), n = Ue[Ue.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= Rs(n) ? Ue.push(e) : Ue.splice($d(t), 0, e), e.flags |= 1, Ba();
  }
}
function Ba() {
  wi || (wi = Ha.then(ja));
}
function Jn(e) {
  B(e) ? jn.push(...e) : Zt && e.id === -1 ? Zt.splice($n + 1, 0, e) : e.flags & 1 || (jn.push(e), e.flags |= 1), Ba();
}
function Hl(e, t, n = Tt + 1) {
  for (process.env.NODE_ENV !== "production" && (t = t || /* @__PURE__ */ new Map()); n < Ue.length; n++) {
    const s = Ue[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid || process.env.NODE_ENV !== "production" && Fo(t, s))
        continue;
      Ue.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function Vi(e) {
  if (jn.length) {
    const t = [...new Set(jn)].sort(
      (n, s) => Rs(n) - Rs(s)
    );
    if (jn.length = 0, Zt) {
      Zt.push(...t);
      return;
    }
    for (Zt = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), $n = 0; $n < Zt.length; $n++) {
      const n = Zt[$n];
      process.env.NODE_ENV !== "production" && Fo(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    Zt = null, $n = 0;
  }
}
const Rs = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function ja(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => Fo(e, n) : me;
  try {
    for (Tt = 0; Tt < Ue.length; Tt++) {
      const n = Ue[Tt];
      if (n && !(n.flags & 8)) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        n.flags & 4 && (n.flags &= -2), An(
          n,
          n.i,
          n.i ? 15 : 14
        ), n.flags & 4 || (n.flags &= -2);
      }
    }
  } finally {
    for (; Tt < Ue.length; Tt++) {
      const n = Ue[Tt];
      n && (n.flags &= -2);
    }
    Tt = -1, Ue.length = 0, Vi(e), wi = null, (Ue.length || jn.length) && ja(e);
  }
}
function Fo(e, t) {
  const n = e.get(t) || 0;
  if (n > Pd) {
    const s = t.i, i = s && Xn(s.type);
    return fn(
      `Maximum recursive updates exceeded${i ? ` in component <${i}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
let gt = !1;
const hi = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (qs().__VUE_HMR_RUNTIME__ = {
  createRecord: Pr(Ua),
  rerender: Pr(Hd),
  reload: Pr(Bd)
});
const Cn = /* @__PURE__ */ new Map();
function Ld(e) {
  const t = e.type.__hmrId;
  let n = Cn.get(t);
  n || (Ua(t, e.type), n = Cn.get(t)), n.instances.add(e);
}
function Fd(e) {
  Cn.get(e.type.__hmrId).instances.delete(e);
}
function Ua(e, t) {
  return Cn.has(e) ? !1 : (Cn.set(e, {
    initialDef: xi(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function xi(e) {
  return Xf(e) ? e.__vccOpts : e;
}
function Hd(e, t) {
  const n = Cn.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((s) => {
    t && (s.render = t, xi(s.type).render = t), s.renderCache = [], gt = !0, s.job.flags & 8 || s.update(), gt = !1;
  }));
}
function Bd(e, t) {
  const n = Cn.get(e);
  if (!n) return;
  t = xi(t), Bl(n.initialDef, t);
  const s = [...n.instances];
  for (let i = 0; i < s.length; i++) {
    const r = s[i], o = xi(r.type);
    let l = hi.get(o);
    l || (o !== n.initialDef && Bl(o, t), hi.set(o, l = /* @__PURE__ */ new Set())), l.add(r), r.appContext.propsCache.delete(r.type), r.appContext.emitsCache.delete(r.type), r.appContext.optionsCache.delete(r.type), r.ceReload ? (l.add(r), r.ceReload(t.styles), l.delete(r)) : r.parent ? pr(() => {
      r.job.flags & 8 || (gt = !0, r.parent.update(), gt = !1, l.delete(r));
    }) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), r.root.ce && r !== r.root && r.root.ce._removeChildStyle(o);
  }
  Jn(() => {
    hi.clear();
  });
}
function Bl(e, t) {
  ee(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Pr(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (s) {
      console.error(s), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let dt, gs = [], Yr = !1;
function Js(e, ...t) {
  dt ? dt.emit(e, ...t) : Yr || gs.push({ event: e, args: t });
}
function Ho(e, t) {
  var n, s;
  dt = e, dt ? (dt.enabled = !0, gs.forEach(({ event: i, args: r }) => dt.emit(i, ...r)), gs = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((s = (n = window.navigator) == null ? void 0 : n.userAgent) != null && s.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((r) => {
    Ho(r, t);
  }), setTimeout(() => {
    dt || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Yr = !0, gs = []);
  }, 3e3)) : (Yr = !0, gs = []);
}
function jd(e, t) {
  Js("app:init", e, t, {
    Fragment: Se,
    Text: Vt,
    Comment: ge,
    Static: on
  });
}
function Ud(e) {
  Js("app:unmount", e);
}
const Xr = /* @__PURE__ */ Bo(
  "component:added"
  /* COMPONENT_ADDED */
), Ka = /* @__PURE__ */ Bo(
  "component:updated"
  /* COMPONENT_UPDATED */
), Kd = /* @__PURE__ */ Bo(
  "component:removed"
  /* COMPONENT_REMOVED */
), Wd = (e) => {
  dt && typeof dt.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !dt.cleanupBuffer(e) && Kd(e);
};
// @__NO_SIDE_EFFECTS__
function Bo(e) {
  return (t) => {
    Js(
      e,
      t.appContext.app,
      t.uid,
      t.parent ? t.parent.uid : void 0,
      t
    );
  };
}
const qd = /* @__PURE__ */ Wa(
  "perf:start"
  /* PERFORMANCE_START */
), Gd = /* @__PURE__ */ Wa(
  "perf:end"
  /* PERFORMANCE_END */
);
function Wa(e) {
  return (t, n, s) => {
    Js(e, t.appContext.app, t.uid, t, n, s);
  };
}
function Jd(e, t, n) {
  Js(
    "component:emit",
    e.appContext.app,
    e,
    t,
    n
  );
}
let be = null, dr = null;
function Ms(e) {
  const t = be;
  return be = e, dr = e && e.type.__scopeId || null, t;
}
function zd(e) {
  dr = e;
}
function Yd() {
  dr = null;
}
const Xd = (e) => jo;
function jo(e, t = be, n) {
  if (!t || e._n)
    return e;
  const s = (...i) => {
    s._d && Fs(-1);
    const r = Ms(t);
    let o;
    try {
      o = e(...i);
    } finally {
      Ms(r), s._d && Fs(1);
    }
    return process.env.NODE_ENV !== "production" && Ka(t), o;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function qa(e) {
  oa(e) && C("Do not use built-in directive ids as custom directive id: " + e);
}
function Zd(e, t) {
  if (be === null)
    return process.env.NODE_ENV !== "production" && C("withDirectives can only be used inside render functions."), e;
  const n = Ys(be), s = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [r, o, l, c = ne] = t[i];
    r && (G(r) && (r = {
      mounted: r,
      updated: r
    }), r.deep && Ft(o), s.push({
      dir: r,
      instance: n,
      value: o,
      oldValue: void 0,
      arg: l,
      modifiers: c
    }));
  }
  return e;
}
function Ct(e, t, n, s) {
  const i = e.dirs, r = t && t.dirs;
  for (let o = 0; o < i.length; o++) {
    const l = i[o];
    r && (l.oldValue = r[o].value);
    let c = l.dir[s];
    c && (_t(), ft(c, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Nt());
  }
}
const Ga = Symbol("_vte"), Ja = (e) => e.__isTeleport, bn = (e) => e && (e.disabled || e.disabled === ""), jl = (e) => e && (e.defer || e.defer === ""), Ul = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Kl = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Zr = (e, t) => {
  const n = e && e.to;
  if (Y(n))
    if (t) {
      const s = t(n);
      return process.env.NODE_ENV !== "production" && !s && !bn(e) && C(
        `Failed to locate Teleport target with selector "${n}". Note the target element must exist before the component is mounted - i.e. the target cannot be rendered by the component itself, and ideally should be outside of the entire Vue component tree.`
      ), s;
    } else
      return process.env.NODE_ENV !== "production" && C(
        "Current renderer does not support string target for Teleports. (missing querySelector renderer option)"
      ), null;
  else
    return process.env.NODE_ENV !== "production" && !n && !bn(e) && C(`Invalid Teleport target: ${n}`), n;
}, za = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, s, i, r, o, l, c, u) {
    const {
      mc: f,
      pc: a,
      pbc: d,
      o: { insert: m, querySelector: y, createText: E, createComment: k }
    } = u, V = bn(t.props);
    let { shapeFlag: O, children: h, dynamicChildren: N } = t;
    if (process.env.NODE_ENV !== "production" && gt && (c = !1, N = null), e == null) {
      const v = t.el = process.env.NODE_ENV !== "production" ? k("teleport start") : E(""), D = t.anchor = process.env.NODE_ENV !== "production" ? k("teleport end") : E("");
      m(v, n, s), m(D, n, s);
      const F = (_, T) => {
        O & 16 && f(
          h,
          _,
          T,
          i,
          r,
          o,
          l,
          c
        );
      }, w = () => {
        const _ = t.target = Zr(t.props, y), T = Ya(_, t, E, m);
        _ ? (o !== "svg" && Ul(_) ? o = "svg" : o !== "mathml" && Kl(_) && (o = "mathml"), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = /* @__PURE__ */ new Set())).add(_), V || (F(_, T), mi(t, !1))) : process.env.NODE_ENV !== "production" && !V && C(
          "Invalid Teleport target on mount:",
          _,
          `(${typeof _})`
        );
      };
      V && (F(n, D), mi(t, !0)), jl(t.props) ? (t.el.__isMounted = !1, Te(() => {
        w(), delete t.el.__isMounted;
      }, r)) : w();
    } else {
      if (jl(t.props) && e.el.__isMounted === !1) {
        Te(() => {
          za.process(
            e,
            t,
            n,
            s,
            i,
            r,
            o,
            l,
            c,
            u
          );
        }, r);
        return;
      }
      t.el = e.el, t.targetStart = e.targetStart;
      const v = t.anchor = e.anchor, D = t.target = e.target, F = t.targetAnchor = e.targetAnchor, w = bn(e.props), _ = w ? n : D, T = w ? v : F;
      if (o === "svg" || Ul(D) ? o = "svg" : (o === "mathml" || Kl(D)) && (o = "mathml"), N ? (d(
        e.dynamicChildren,
        N,
        _,
        i,
        r,
        o,
        l
      ), Ts(e, t, process.env.NODE_ENV === "production")) : c || a(
        e,
        t,
        _,
        T,
        i,
        r,
        o,
        l,
        !1
      ), V)
        w ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : ii(
          t,
          n,
          v,
          u,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const M = t.target = Zr(
          t.props,
          y
        );
        M ? ii(
          t,
          M,
          null,
          u,
          0
        ) : process.env.NODE_ENV !== "production" && C(
          "Invalid Teleport target on update:",
          D,
          `(${typeof D})`
        );
      } else w && ii(
        t,
        D,
        F,
        u,
        1
      );
      mi(t, V);
    }
  },
  remove(e, t, n, { um: s, o: { remove: i } }, r) {
    const {
      shapeFlag: o,
      children: l,
      anchor: c,
      targetStart: u,
      targetAnchor: f,
      target: a,
      props: d
    } = e;
    if (a && (i(u), i(f)), r && i(c), o & 16) {
      const m = r || !bn(d);
      for (let y = 0; y < l.length; y++) {
        const E = l[y];
        s(
          E,
          t,
          n,
          m,
          !!E.dynamicChildren
        );
      }
    }
  },
  move: ii,
  hydrate: Qd
};
function ii(e, t, n, { o: { insert: s }, m: i }, r = 2) {
  r === 0 && s(e.targetAnchor, t, n);
  const { el: o, anchor: l, shapeFlag: c, children: u, props: f } = e, a = r === 2;
  if (a && s(o, t, n), (!a || bn(f)) && c & 16)
    for (let d = 0; d < u.length; d++)
      i(
        u[d],
        t,
        n,
        2
      );
  a && s(l, t, n);
}
function Qd(e, t, n, s, i, r, {
  o: { nextSibling: o, parentNode: l, querySelector: c, insert: u, createText: f }
}, a) {
  function d(E, k, V, O) {
    k.anchor = a(
      o(E),
      k,
      l(E),
      n,
      s,
      i,
      r
    ), k.targetStart = V, k.targetAnchor = O;
  }
  const m = t.target = Zr(
    t.props,
    c
  ), y = bn(t.props);
  if (m) {
    const E = m._lpa || m.firstChild;
    if (t.shapeFlag & 16)
      if (y)
        d(
          e,
          t,
          E,
          E && o(E)
        );
      else {
        t.anchor = o(e);
        let k = E;
        for (; k; ) {
          if (k && k.nodeType === 8) {
            if (k.data === "teleport start anchor")
              t.targetStart = k;
            else if (k.data === "teleport anchor") {
              t.targetAnchor = k, m._lpa = t.targetAnchor && o(t.targetAnchor);
              break;
            }
          }
          k = o(k);
        }
        t.targetAnchor || Ya(m, t, f, u), a(
          E && o(E),
          t,
          m,
          n,
          s,
          i,
          r
        );
      }
    mi(t, y);
  } else y && t.shapeFlag & 16 && d(e, t, e, o(e));
  return t.anchor && o(t.anchor);
}
const eh = za;
function mi(e, t) {
  const n = e.ctx;
  if (n && n.ut) {
    let s, i;
    for (t ? (s = e.el, i = e.anchor) : (s = e.targetStart, i = e.targetAnchor); s && s !== i; )
      s.nodeType === 1 && s.setAttribute("data-v-owner", n.uid), s = s.nextSibling;
    n.ut();
  }
}
function Ya(e, t, n, s) {
  const i = t.targetStart = n(""), r = t.targetAnchor = n("");
  return i[Ga] = r, e && (s(i, e), s(r, e)), r;
}
const $t = Symbol("_leaveCb"), ri = Symbol("_enterCb");
function Uo() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return as(() => {
    e.isMounted = !0;
  }), Er(() => {
    e.isUnmounting = !0;
  }), e;
}
const lt = [Function, Array], Ko = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: lt,
  onEnter: lt,
  onAfterEnter: lt,
  onEnterCancelled: lt,
  // leave
  onBeforeLeave: lt,
  onLeave: lt,
  onAfterLeave: lt,
  onLeaveCancelled: lt,
  // appear
  onBeforeAppear: lt,
  onAppear: lt,
  onAfterAppear: lt,
  onAppearCancelled: lt
}, Xa = (e) => {
  const t = e.subTree;
  return t.component ? Xa(t.component) : t;
}, th = {
  name: "BaseTransition",
  props: Ko,
  setup(e, { slots: t }) {
    const n = We(), s = Uo();
    return () => {
      const i = t.default && hr(t.default(), !0);
      if (!i || !i.length)
        return;
      const r = Za(i), o = Q(e), { mode: l } = o;
      if (process.env.NODE_ENV !== "production" && l && l !== "in-out" && l !== "out-in" && l !== "default" && C(`invalid <transition> mode: ${l}`), s.isLeaving)
        return $r(r);
      const c = Wl(r);
      if (!c)
        return $r(r);
      let u = zn(
        c,
        o,
        s,
        n,
        // #11061, ensure enterHooks is fresh after clone
        (a) => u = a
      );
      c.type !== ge && Wt(c, u);
      let f = n.subTree && Wl(n.subTree);
      if (f && f.type !== ge && !ht(f, c) && Xa(n).type !== ge) {
        let a = zn(
          f,
          o,
          s,
          n
        );
        if (Wt(f, a), l === "out-in" && c.type !== ge)
          return s.isLeaving = !0, a.afterLeave = () => {
            s.isLeaving = !1, n.job.flags & 8 || n.update(), delete a.afterLeave, f = void 0;
          }, $r(r);
        l === "in-out" && c.type !== ge ? a.delayLeave = (d, m, y) => {
          const E = ef(
            s,
            f
          );
          E[String(f.key)] = f, d[$t] = () => {
            m(), d[$t] = void 0, delete u.delayedLeave, f = void 0;
          }, u.delayedLeave = () => {
            y(), delete u.delayedLeave, f = void 0;
          };
        } : f = void 0;
      } else f && (f = void 0);
      return r;
    };
  }
};
function Za(e) {
  let t = e[0];
  if (e.length > 1) {
    let n = !1;
    for (const s of e)
      if (s.type !== ge) {
        if (process.env.NODE_ENV !== "production" && n) {
          C(
            "<transition> can only be used on a single element or component. Use <transition-group> for lists."
          );
          break;
        }
        if (t = s, n = !0, process.env.NODE_ENV === "production") break;
      }
  }
  return t;
}
const Qa = th;
function ef(e, t) {
  const { leavingVNodes: n } = e;
  let s = n.get(t.type);
  return s || (s = /* @__PURE__ */ Object.create(null), n.set(t.type, s)), s;
}
function zn(e, t, n, s, i) {
  const {
    appear: r,
    mode: o,
    persisted: l = !1,
    onBeforeEnter: c,
    onEnter: u,
    onAfterEnter: f,
    onEnterCancelled: a,
    onBeforeLeave: d,
    onLeave: m,
    onAfterLeave: y,
    onLeaveCancelled: E,
    onBeforeAppear: k,
    onAppear: V,
    onAfterAppear: O,
    onAppearCancelled: h
  } = t, N = String(e.key), v = ef(n, e), D = (_, T) => {
    _ && ft(
      _,
      s,
      9,
      T
    );
  }, F = (_, T) => {
    const M = T[1];
    D(_, T), B(_) ? _.every((b) => b.length <= 1) && M() : _.length <= 1 && M();
  }, w = {
    mode: o,
    persisted: l,
    beforeEnter(_) {
      let T = c;
      if (!n.isMounted)
        if (r)
          T = k || c;
        else
          return;
      _[$t] && _[$t](
        !0
        /* cancelled */
      );
      const M = v[N];
      M && ht(e, M) && M.el[$t] && M.el[$t](), D(T, [_]);
    },
    enter(_) {
      let T = u, M = f, b = a;
      if (!n.isMounted)
        if (r)
          T = V || u, M = O || f, b = h || a;
        else
          return;
      let L = !1;
      const q = _[ri] = (J) => {
        L || (L = !0, J ? D(b, [_]) : D(M, [_]), w.delayedLeave && w.delayedLeave(), _[ri] = void 0);
      };
      T ? F(T, [_, q]) : q();
    },
    leave(_, T) {
      const M = String(e.key);
      if (_[ri] && _[ri](
        !0
        /* cancelled */
      ), n.isUnmounting)
        return T();
      D(d, [_]);
      let b = !1;
      const L = _[$t] = (q) => {
        b || (b = !0, T(), q ? D(E, [_]) : D(y, [_]), _[$t] = void 0, v[M] === e && delete v[M]);
      };
      v[M] = e, m ? F(m, [_, L]) : L();
    },
    clone(_) {
      const T = zn(
        _,
        t,
        n,
        s,
        i
      );
      return i && i(T), T;
    }
  };
  return w;
}
function $r(e) {
  if (cs(e))
    return e = ut(e), e.children = null, e;
}
function Wl(e) {
  if (!cs(e))
    return Ja(e.type) && e.children ? Za(e.children) : e;
  if (e.component)
    return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16)
      return n[0];
    if (t & 32 && G(n.default))
      return n.default();
  }
}
function Wt(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Wt(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function hr(e, t = !1, n) {
  let s = [], i = 0;
  for (let r = 0; r < e.length; r++) {
    let o = e[r];
    const l = n == null ? o.key : String(n) + String(o.key != null ? o.key : r);
    o.type === Se ? (o.patchFlag & 128 && i++, s = s.concat(
      hr(o.children, t, l)
    )) : (t || o.type !== ge) && s.push(l != null ? ut(o, { key: l }) : o);
  }
  if (i > 1)
    for (let r = 0; r < s.length; r++)
      s[r].patchFlag = -2;
  return s;
}
// @__NO_SIDE_EFFECTS__
function Wo(e, t) {
  return G(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    ee({ name: e.name }, t, { setup: e })
  ) : e;
}
function nh() {
  const e = We();
  return e ? (e.appContext.config.idPrefix || "v") + "-" + e.ids[0] + e.ids[1]++ : (process.env.NODE_ENV !== "production" && C(
    "useId() is called when there is no active component instance to be associated with."
  ), "");
}
function qo(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
const Qr = /* @__PURE__ */ new WeakSet();
function sh(e) {
  const t = We(), n = Ra(null);
  if (t) {
    const i = t.refs === ne ? t.refs = {} : t.refs;
    let r;
    process.env.NODE_ENV !== "production" && (r = Object.getOwnPropertyDescriptor(i, e)) && !r.configurable ? C(`useTemplateRef('${e}') already exists.`) : Object.defineProperty(i, e, {
      enumerable: !0,
      get: () => n.value,
      set: (o) => n.value = o
    });
  } else process.env.NODE_ENV !== "production" && C(
    "useTemplateRef() is called when there is no active component instance to be associated with."
  );
  const s = process.env.NODE_ENV !== "production" ? ks(n) : n;
  return process.env.NODE_ENV !== "production" && Qr.add(s), s;
}
const Ai = /* @__PURE__ */ new WeakMap();
function Un(e, t, n, s, i = !1) {
  if (B(e)) {
    e.forEach(
      (E, k) => Un(
        E,
        t && (B(t) ? t[k] : t),
        n,
        s,
        i
      )
    );
    return;
  }
  if (rn(s) && !i) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Un(e, t, n, s.component.subTree);
    return;
  }
  const r = s.shapeFlag & 4 ? Ys(s.component) : s.el, o = i ? null : r, { i: l, r: c } = e;
  if (process.env.NODE_ENV !== "production" && !l) {
    C(
      "Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function."
    );
    return;
  }
  const u = t && t.r, f = l.refs === ne ? l.refs = {} : l.refs, a = l.setupState, d = Q(a), m = a === ne ? Ln : (E) => process.env.NODE_ENV !== "production" && (re(d, E) && !_e(d[E]) && C(
    `Template ref "${E}" used on a non-ref value. It will not work in the production build.`
  ), Qr.has(d[E])) ? !1 : re(d, E), y = (E) => process.env.NODE_ENV === "production" || !Qr.has(E);
  if (u != null && u !== c) {
    if (ql(t), Y(u))
      f[u] = null, m(u) && (a[u] = null);
    else if (_e(u)) {
      y(u) && (u.value = null);
      const E = t;
      E.k && (f[E.k] = null);
    }
  }
  if (G(c))
    An(c, l, 12, [o, f]);
  else {
    const E = Y(c), k = _e(c);
    if (E || k) {
      const V = () => {
        if (e.f) {
          const O = E ? m(c) ? a[c] : f[c] : y(c) || !e.k ? c.value : f[e.k];
          if (i)
            B(O) && Vo(O, r);
          else if (B(O))
            O.includes(r) || O.push(r);
          else if (E)
            f[c] = [r], m(c) && (a[c] = f[c]);
          else {
            const h = [r];
            y(c) && (c.value = h), e.k && (f[e.k] = h);
          }
        } else E ? (f[c] = o, m(c) && (a[c] = o)) : k ? (y(c) && (c.value = o), e.k && (f[e.k] = o)) : process.env.NODE_ENV !== "production" && C("Invalid template ref type:", c, `(${typeof c})`);
      };
      if (o) {
        const O = () => {
          V(), Ai.delete(e);
        };
        O.id = -1, Ai.set(e, O), Te(O, n);
      } else
        ql(e), V();
    } else process.env.NODE_ENV !== "production" && C("Invalid template ref type:", c, `(${typeof c})`);
  }
}
function ql(e) {
  const t = Ai.get(e);
  t && (t.flags |= 8, Ai.delete(e));
}
let Gl = !1;
const un = () => {
  Gl || (console.error("Hydration completed but contains mismatches."), Gl = !0);
}, ih = (e) => e.namespaceURI.includes("svg") && e.tagName !== "foreignObject", rh = (e) => e.namespaceURI.includes("MathML"), oi = (e) => {
  if (e.nodeType === 1) {
    if (ih(e)) return "svg";
    if (rh(e)) return "mathml";
  }
}, gn = (e) => e.nodeType === 8;
function oh(e) {
  const {
    mt: t,
    p: n,
    o: {
      patchProp: s,
      createText: i,
      nextSibling: r,
      parentNode: o,
      remove: l,
      insert: c,
      createComment: u
    }
  } = e, f = (h, N) => {
    if (!N.hasChildNodes()) {
      process.env.NODE_ENV !== "production" && C(
        "Attempting to hydrate existing markup but container is empty. Performing full mount instead."
      ), n(null, h, N), Vi(), N._vnode = h;
      return;
    }
    a(N.firstChild, h, null, null, null), Vi(), N._vnode = h;
  }, a = (h, N, v, D, F, w = !1) => {
    w = w || !!N.dynamicChildren;
    const _ = gn(h) && h.data === "[", T = () => E(
      h,
      N,
      v,
      D,
      F,
      _
    ), { type: M, ref: b, shapeFlag: L, patchFlag: q } = N;
    let J = h.nodeType;
    N.el = h, process.env.NODE_ENV !== "production" && (qn(h, "__vnode", N, !0), qn(h, "__vueParentComponent", v, !0)), q === -2 && (w = !1, N.dynamicChildren = null);
    let K = null;
    switch (M) {
      case Vt:
        J !== 3 ? N.children === "" ? (c(N.el = i(""), o(h), h), K = h) : K = T() : (h.data !== N.children && (process.env.NODE_ENV !== "production" && C(
          "Hydration text mismatch in",
          h.parentNode,
          `
  - rendered on server: ${JSON.stringify(
            h.data
          )}
  - expected on client: ${JSON.stringify(N.children)}`
        ), un(), h.data = N.children), K = r(h));
        break;
      case ge:
        O(h) ? (K = r(h), V(
          N.el = h.content.firstChild,
          h,
          v
        )) : J !== 8 || _ ? K = T() : K = r(h);
        break;
      case on:
        if (_ && (h = r(h), J = h.nodeType), J === 1 || J === 3) {
          K = h;
          const W = !N.children.length;
          for (let U = 0; U < N.staticCount; U++)
            W && (N.children += K.nodeType === 1 ? K.outerHTML : K.data), U === N.staticCount - 1 && (N.anchor = K), K = r(K);
          return _ ? r(K) : K;
        } else
          T();
        break;
      case Se:
        _ ? K = y(
          h,
          N,
          v,
          D,
          F,
          w
        ) : K = T();
        break;
      default:
        if (L & 1)
          (J !== 1 || N.type.toLowerCase() !== h.tagName.toLowerCase()) && !O(h) ? K = T() : K = d(
            h,
            N,
            v,
            D,
            F,
            w
          );
        else if (L & 6) {
          N.slotScopeIds = F;
          const W = o(h);
          if (_ ? K = k(h) : gn(h) && h.data === "teleport start" ? K = k(h, h.data, "teleport end") : K = r(h), t(
            N,
            W,
            null,
            v,
            D,
            oi(W),
            w
          ), rn(N) && !N.type.__asyncResolved) {
            let U;
            _ ? (U = ve(Se), U.anchor = K ? K.previousSibling : W.lastChild) : U = h.nodeType === 3 ? nl("") : ve("div"), U.el = h, N.component.subTree = U;
          }
        } else L & 64 ? J !== 8 ? K = T() : K = N.type.hydrate(
          h,
          N,
          v,
          D,
          F,
          w,
          e,
          m
        ) : L & 128 ? K = N.type.hydrate(
          h,
          N,
          v,
          D,
          oi(o(h)),
          F,
          w,
          e,
          a
        ) : process.env.NODE_ENV !== "production" && C("Invalid HostVNode type:", M, `(${typeof M})`);
    }
    return b != null && Un(b, null, D, N), K;
  }, d = (h, N, v, D, F, w) => {
    w = w || !!N.dynamicChildren;
    const { type: _, props: T, patchFlag: M, shapeFlag: b, dirs: L, transition: q } = N, J = _ === "input" || _ === "option";
    if (process.env.NODE_ENV !== "production" || J || M !== -1) {
      L && Ct(N, null, v, "created");
      let K = !1;
      if (O(h)) {
        K = Df(
          null,
          // no need check parentSuspense in hydration
          q
        ) && v && v.vnode.props && v.vnode.props.appear;
        const U = h.content.firstChild;
        if (K) {
          const ce = U.getAttribute("class");
          ce && (U.$cls = ce), q.beforeEnter(U);
        }
        V(U, h, v), N.el = h = U;
      }
      if (b & 16 && // skip if element has innerHTML / textContent
      !(T && (T.innerHTML || T.textContent))) {
        let U = m(
          h.firstChild,
          N,
          h,
          v,
          D,
          F,
          w
        ), ce = !1;
        for (; U; ) {
          Es(
            h,
            1
            /* CHILDREN */
          ) || (process.env.NODE_ENV !== "production" && !ce && (C(
            "Hydration children mismatch on",
            h,
            `
Server rendered element contains more child nodes than client vdom.`
          ), ce = !0), un());
          const qe = U;
          U = U.nextSibling, l(qe);
        }
      } else if (b & 8) {
        let U = N.children;
        U[0] === `
` && (h.tagName === "PRE" || h.tagName === "TEXTAREA") && (U = U.slice(1));
        const { textContent: ce } = h;
        ce !== U && // innerHTML normalize \r\n or \r into a single \n in the DOM
        ce !== U.replace(/\r\n|\r/g, `
`) && (Es(
          h,
          0
          /* TEXT */
        ) || (process.env.NODE_ENV !== "production" && C(
          "Hydration text content mismatch on",
          h,
          `
  - rendered on server: ${ce}
  - expected on client: ${U}`
        ), un()), h.textContent = N.children);
      }
      if (T) {
        if (process.env.NODE_ENV !== "production" || J || !w || M & 48) {
          const U = h.tagName.includes("-");
          for (const ce in T)
            process.env.NODE_ENV !== "production" && // #11189 skip if this node has directives that have created hooks
            // as it could have mutated the DOM in any possible way
            !(L && L.some((qe) => qe.dir.created)) && lh(h, ce, T[ce], N, v) && un(), (J && (ce.endsWith("value") || ce === "indeterminate") || Kt(ce) && !sn(ce) || // force hydrate v-bind with .prop modifiers
            ce[0] === "." || U) && s(h, ce, null, T[ce], void 0, v);
        } else if (T.onClick)
          s(
            h,
            "onClick",
            null,
            T.onClick,
            void 0,
            v
          );
        else if (M & 4 && Bt(T.style))
          for (const U in T.style) T.style[U];
      }
      let W;
      (W = T && T.onVnodeBeforeMount) && Ye(W, v, N), L && Ct(N, null, v, "beforeMount"), ((W = T && T.onVnodeMounted) || L || K) && $f(() => {
        W && Ye(W, v, N), K && q.enter(h), L && Ct(N, null, v, "mounted");
      }, D);
    }
    return h.nextSibling;
  }, m = (h, N, v, D, F, w, _) => {
    _ = _ || !!N.dynamicChildren;
    const T = N.children, M = T.length;
    let b = !1;
    for (let L = 0; L < M; L++) {
      const q = _ ? T[L] : T[L] = Ke(T[L]), J = q.type === Vt;
      h ? (J && !_ && L + 1 < M && Ke(T[L + 1]).type === Vt && (c(
        i(
          h.data.slice(q.children.length)
        ),
        v,
        r(h)
      ), h.data = q.children), h = a(
        h,
        q,
        D,
        F,
        w,
        _
      )) : J && !q.children ? c(q.el = i(""), v) : (Es(
        v,
        1
        /* CHILDREN */
      ) || (process.env.NODE_ENV !== "production" && !b && (C(
        "Hydration children mismatch on",
        v,
        `
Server rendered element contains fewer child nodes than client vdom.`
      ), b = !0), un()), n(
        null,
        q,
        v,
        null,
        D,
        F,
        oi(v),
        w
      ));
    }
    return h;
  }, y = (h, N, v, D, F, w) => {
    const { slotScopeIds: _ } = N;
    _ && (F = F ? F.concat(_) : _);
    const T = o(h), M = m(
      r(h),
      N,
      T,
      v,
      D,
      F,
      w
    );
    return M && gn(M) && M.data === "]" ? r(N.anchor = M) : (un(), c(N.anchor = u("]"), T, M), M);
  }, E = (h, N, v, D, F, w) => {
    if (Es(
      h.parentElement,
      1
      /* CHILDREN */
    ) || (process.env.NODE_ENV !== "production" && C(
      `Hydration node mismatch:
- rendered on server:`,
      h,
      h.nodeType === 3 ? "(text)" : gn(h) && h.data === "[" ? "(start of fragment)" : "",
      `
- expected on client:`,
      N.type
    ), un()), N.el = null, w) {
      const M = k(h);
      for (; ; ) {
        const b = r(h);
        if (b && b !== M)
          l(b);
        else
          break;
      }
    }
    const _ = r(h), T = o(h);
    return l(h), n(
      null,
      N,
      T,
      _,
      v,
      D,
      oi(T),
      F
    ), v && (v.vnode.el = N.el, Nr(v, N.el)), _;
  }, k = (h, N = "[", v = "]") => {
    let D = 0;
    for (; h; )
      if (h = r(h), h && gn(h) && (h.data === N && D++, h.data === v)) {
        if (D === 0)
          return r(h);
        D--;
      }
    return h;
  }, V = (h, N, v) => {
    const D = N.parentNode;
    D && D.replaceChild(h, N);
    let F = v;
    for (; F; )
      F.vnode.el === N && (F.vnode.el = F.subTree.el = h), F = F.parent;
  }, O = (h) => h.nodeType === 1 && h.tagName === "TEMPLATE";
  return [f, a];
}
function lh(e, t, n, s, i) {
  let r, o, l, c;
  if (t === "class")
    e.$cls ? (l = e.$cls, delete e.$cls) : l = e.getAttribute("class"), c = ls(n), ch(Jl(l || ""), Jl(c)) || (r = 2, o = "class");
  else if (t === "style") {
    l = e.getAttribute("style") || "", c = Y(n) ? n : Ip(os(n));
    const u = zl(l), f = zl(c);
    if (s.dirs)
      for (const { dir: a, value: d } of s.dirs)
        a.name === "show" && !d && f.set("display", "none");
    i && tf(i, s, f), ah(u, f) || (r = 3, o = "style");
  } else (e instanceof SVGElement && Bp(t) || e instanceof HTMLElement && (Pl(t) || Hp(t))) && (Pl(t) ? (l = e.hasAttribute(t), c = Io(n)) : n == null ? (l = e.hasAttribute(t), c = !1) : (e.hasAttribute(t) ? l = e.getAttribute(t) : t === "value" && e.tagName === "TEXTAREA" ? l = e.value : l = !1, c = jp(n) ? String(n) : !1), l !== c && (r = 4, o = t));
  if (r != null && !Es(e, r)) {
    const u = (d) => d === !1 ? "(not rendered)" : `${o}="${d}"`, f = `Hydration ${nf[r]} mismatch on`, a = `
  - rendered on server: ${u(l)}
  - expected on client: ${u(c)}
  Note: this mismatch is check-only. The DOM will not be rectified in production due to performance overhead.
  You should fix the source of the mismatch.`;
    return C(f, e, a), !0;
  }
  return !1;
}
function Jl(e) {
  return new Set(e.trim().split(/\s+/));
}
function ch(e, t) {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
}
function zl(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e.split(";")) {
    let [s, i] = n.split(":");
    s = s.trim(), i = i && i.trim(), s && i && t.set(s, i);
  }
  return t;
}
function ah(e, t) {
  if (e.size !== t.size)
    return !1;
  for (const [n, s] of e)
    if (s !== t.get(n))
      return !1;
  return !0;
}
function tf(e, t, n) {
  const s = e.subTree;
  if (e.getCssVars && (t === s || s && s.type === Se && s.children.includes(t))) {
    const i = e.getCssVars();
    for (const r in i) {
      const o = ma(i[r]);
      n.set(`--${Kp(r)}`, o);
    }
  }
  t === s && e.parent && tf(e.parent, e.vnode, n);
}
const Yl = "data-allow-mismatch", nf = {
  0: "text",
  1: "children",
  2: "class",
  3: "style",
  4: "attribute"
};
function Es(e, t) {
  if (t === 0 || t === 1)
    for (; e && !e.hasAttribute(Yl); )
      e = e.parentElement;
  const n = e && e.getAttribute(Yl);
  if (n == null)
    return !1;
  if (n === "")
    return !0;
  {
    const s = n.split(",");
    return t === 0 && s.includes("children") ? !0 : s.includes(nf[t]);
  }
}
const fh = qs().requestIdleCallback || ((e) => setTimeout(e, 1)), uh = qs().cancelIdleCallback || ((e) => clearTimeout(e)), ph = (e = 1e4) => (t) => {
  const n = fh(t, { timeout: e });
  return () => uh(n);
};
function dh(e) {
  const { top: t, left: n, bottom: s, right: i } = e.getBoundingClientRect(), { innerHeight: r, innerWidth: o } = window;
  return (t > 0 && t < r || s > 0 && s < r) && (n > 0 && n < o || i > 0 && i < o);
}
const hh = (e) => (t, n) => {
  const s = new IntersectionObserver((i) => {
    for (const r of i)
      if (r.isIntersecting) {
        s.disconnect(), t();
        break;
      }
  }, e);
  return n((i) => {
    if (i instanceof Element) {
      if (dh(i))
        return t(), s.disconnect(), !1;
      s.observe(i);
    }
  }), () => s.disconnect();
}, mh = (e) => (t) => {
  if (e) {
    const n = matchMedia(e);
    if (n.matches)
      t();
    else
      return n.addEventListener("change", t, { once: !0 }), () => n.removeEventListener("change", t);
  }
}, gh = (e = []) => (t, n) => {
  Y(e) && (e = [e]);
  let s = !1;
  const i = (o) => {
    s || (s = !0, r(), t(), o.target.dispatchEvent(new o.constructor(o.type, o)));
  }, r = () => {
    n((o) => {
      for (const l of e)
        o.removeEventListener(l, i);
    });
  };
  return n((o) => {
    for (const l of e)
      o.addEventListener(l, i, { once: !0 });
  }), r;
};
function Eh(e, t) {
  if (gn(e) && e.data === "[") {
    let n = 1, s = e.nextSibling;
    for (; s; ) {
      if (s.nodeType === 1) {
        if (t(s) === !1)
          break;
      } else if (gn(s))
        if (s.data === "]") {
          if (--n === 0) break;
        } else s.data === "[" && n++;
      s = s.nextSibling;
    }
  } else
    t(e);
}
const rn = (e) => !!e.type.__asyncLoader;
// @__NO_SIDE_EFFECTS__
function vh(e) {
  G(e) && (e = { loader: e });
  const {
    loader: t,
    loadingComponent: n,
    errorComponent: s,
    delay: i = 200,
    hydrate: r,
    timeout: o,
    // undefined = never times out
    suspensible: l = !0,
    onError: c
  } = e;
  let u = null, f, a = 0;
  const d = () => (a++, u = null, m()), m = () => {
    let y;
    return u || (y = u = t().catch((E) => {
      if (E = E instanceof Error ? E : new Error(String(E)), c)
        return new Promise((k, V) => {
          c(E, () => k(d()), () => V(E), a + 1);
        });
      throw E;
    }).then((E) => {
      if (y !== u && u)
        return u;
      if (process.env.NODE_ENV !== "production" && !E && C(
        "Async component loader resolved to undefined. If you are using retry(), make sure to return its return value."
      ), E && (E.__esModule || E[Symbol.toStringTag] === "Module") && (E = E.default), process.env.NODE_ENV !== "production" && E && !se(E) && !G(E))
        throw new Error(`Invalid async component load result: ${E}`);
      return f = E, E;
    }));
  };
  return /* @__PURE__ */ Wo({
    name: "AsyncComponentWrapper",
    __asyncLoader: m,
    __asyncHydrate(y, E, k) {
      let V = !1;
      (E.bu || (E.bu = [])).push(() => V = !0);
      const O = () => {
        if (V) {
          process.env.NODE_ENV !== "production" && C(
            `Skipping lazy hydration for component '${Xn(f) || f.__file}': it was updated before lazy hydration performed.`
          );
          return;
        }
        k();
      }, h = r ? () => {
        const N = r(
          O,
          (v) => Eh(y, v)
        );
        N && (E.bum || (E.bum = [])).push(N);
      } : O;
      f ? h() : m().then(() => !E.isUnmounted && h());
    },
    get __asyncResolved() {
      return f;
    },
    setup() {
      const y = we;
      if (qo(y), f)
        return () => li(f, y);
      const E = (h) => {
        u = null, fn(
          h,
          y,
          13,
          !s
        );
      };
      if (l && y.suspense || Yn)
        return m().then((h) => () => li(h, y)).catch((h) => (E(h), () => s ? ve(s, {
          error: h
        }) : null));
      const k = jt(!1), V = jt(), O = jt(!!i);
      return i && setTimeout(() => {
        O.value = !1;
      }, i), o != null && setTimeout(() => {
        if (!k.value && !V.value) {
          const h = new Error(
            `Async component timed out after ${o}ms.`
          );
          E(h), V.value = h;
        }
      }, o), m().then(() => {
        k.value = !0, y.parent && cs(y.parent.vnode) && y.parent.update();
      }).catch((h) => {
        E(h), V.value = h;
      }), () => {
        if (k.value && f)
          return li(f, y);
        if (V.value && s)
          return ve(s, {
            error: V.value
          });
        if (n && !O.value)
          return li(
            n,
            y
          );
      };
    }
  });
}
function li(e, t) {
  const { ref: n, props: s, children: i, ce: r } = t.vnode, o = ve(e, s, i);
  return o.ref = n, o.ce = r, delete t.vnode.ce, o;
}
const cs = (e) => e.type.__isKeepAlive, yh = {
  name: "KeepAlive",
  // Marker for special handling inside the renderer. We are not using a ===
  // check directly on KeepAlive in the renderer, because importing it directly
  // would prevent it from being tree-shaken.
  __isKeepAlive: !0,
  props: {
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    max: [String, Number]
  },
  setup(e, { slots: t }) {
    const n = We(), s = n.ctx;
    if (!s.renderer)
      return () => {
        const O = t.default && t.default();
        return O && O.length === 1 ? O[0] : O;
      };
    const i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set();
    let o = null;
    process.env.NODE_ENV !== "production" && (n.__v_cache = i);
    const l = n.suspense, {
      renderer: {
        p: c,
        m: u,
        um: f,
        o: { createElement: a }
      }
    } = s, d = a("div");
    s.activate = (O, h, N, v, D) => {
      const F = O.component;
      u(O, h, N, 0, l), c(
        F.vnode,
        O,
        h,
        N,
        F,
        l,
        v,
        O.slotScopeIds,
        D
      ), Te(() => {
        F.isDeactivated = !1, F.a && tn(F.a);
        const w = O.props && O.props.onVnodeMounted;
        w && Ye(w, F.parent, O);
      }, l), process.env.NODE_ENV !== "production" && Xr(F);
    }, s.deactivate = (O) => {
      const h = O.component;
      Mi(h.m), Mi(h.a), u(O, d, null, 1, l), Te(() => {
        h.da && tn(h.da);
        const N = O.props && O.props.onVnodeUnmounted;
        N && Ye(N, h.parent, O), h.isDeactivated = !0;
      }, l), process.env.NODE_ENV !== "production" && Xr(h), process.env.NODE_ENV !== "production" && (h.__keepAliveStorageContainer = d);
    };
    function m(O) {
      Lr(O), f(O, n, l, !0);
    }
    function y(O) {
      i.forEach((h, N) => {
        const v = Xn(h.type);
        v && !O(v) && E(N);
      });
    }
    function E(O) {
      const h = i.get(O);
      h && (!o || !ht(h, o)) ? m(h) : o && Lr(o), i.delete(O), r.delete(O);
    }
    Kn(
      () => [e.include, e.exclude],
      ([O, h]) => {
        O && y((N) => vs(O, N)), h && y((N) => !vs(h, N));
      },
      // prune post-render after `current` has been updated
      { flush: "post", deep: !0 }
    );
    let k = null;
    const V = () => {
      k != null && ($i(n.subTree.type) ? Te(() => {
        i.set(k, ci(n.subTree));
      }, n.subTree.suspense) : i.set(k, ci(n.subTree)));
    };
    return as(V), gr(V), Er(() => {
      i.forEach((O) => {
        const { subTree: h, suspense: N } = n, v = ci(h);
        if (O.type === v.type && O.key === v.key) {
          Lr(v);
          const D = v.component.da;
          D && Te(D, N);
          return;
        }
        m(O);
      });
    }), () => {
      if (k = null, !t.default)
        return o = null;
      const O = t.default(), h = O[0];
      if (O.length > 1)
        return process.env.NODE_ENV !== "production" && C("KeepAlive should contain exactly one component child."), o = null, O;
      if (!At(h) || !(h.shapeFlag & 4) && !(h.shapeFlag & 128))
        return o = null, h;
      let N = ci(h);
      if (N.type === ge)
        return o = null, N;
      const v = N.type, D = Xn(
        rn(N) ? N.type.__asyncResolved || {} : v
      ), { include: F, exclude: w, max: _ } = e;
      if (F && (!D || !vs(F, D)) || w && D && vs(w, D))
        return N.shapeFlag &= -257, o = N, h;
      const T = N.key == null ? v : N.key, M = i.get(T);
      return N.el && (N = ut(N), h.shapeFlag & 128 && (h.ssContent = N)), k = T, M ? (N.el = M.el, N.component = M.component, N.transition && Wt(N, N.transition), N.shapeFlag |= 512, r.delete(T), r.add(T)) : (r.add(T), _ && r.size > parseInt(_, 10) && E(r.values().next().value)), N.shapeFlag |= 256, o = N, $i(h.type) ? h : N;
    };
  }
}, _h = yh;
function vs(e, t) {
  return B(e) ? e.some((n) => vs(n, t)) : Y(e) ? e.split(",").includes(t) : Np(e) ? (e.lastIndex = 0, e.test(t)) : !1;
}
function sf(e, t) {
  of(e, "a", t);
}
function rf(e, t) {
  of(e, "da", t);
}
function of(e, t, n = we) {
  const s = e.__wdc || (e.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (mr(t, s, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      cs(i.parent.vnode) && Nh(s, t, n, i), i = i.parent;
  }
}
function Nh(e, t, n, s) {
  const i = mr(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  vr(() => {
    Vo(s[t], i);
  }, n);
}
function Lr(e) {
  e.shapeFlag &= -257, e.shapeFlag &= -513;
}
function ci(e) {
  return e.shapeFlag & 128 ? e.ssContent : e;
}
function mr(e, t, n = we, s = !1) {
  if (n) {
    const i = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...o) => {
      _t();
      const l = wn(n), c = ft(t, n, e, o);
      return l(), Nt(), c;
    });
    return s ? i.unshift(r) : i.push(r), r;
  } else if (process.env.NODE_ENV !== "production") {
    const i = Dt(ur[e].replace(/ hook$/, ""));
    C(
      `${i} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
const qt = (e) => (t, n = we) => {
  (!Yn || e === "sp") && mr(e, (...s) => t(...s), n);
}, lf = qt("bm"), as = qt("m"), Go = qt(
  "bu"
), gr = qt("u"), Er = qt(
  "bum"
), vr = qt("um"), cf = qt(
  "sp"
), af = qt("rtg"), ff = qt("rtc");
function uf(e, t = we) {
  mr("ec", e, t);
}
const Ii = "components", bh = "directives";
function Sh(e, t) {
  return zo(Ii, e, !0, t) || e;
}
const Jo = Symbol.for("v-ndc");
function Oh(e) {
  return Y(e) ? zo(Ii, e, !1) || e : e || Jo;
}
function Th(e) {
  return zo(bh, e);
}
function zo(e, t, n = !0, s = !1) {
  const i = be || we;
  if (i) {
    const r = i.type;
    if (e === Ii) {
      const l = Xn(
        r,
        !1
      );
      if (l && (l === t || l === pe(t) || l === xt(pe(t))))
        return r;
    }
    const o = (
      // local registration
      // check instance[type] first which is resolved for options API
      Xl(i[e] || r[e], t) || // global registration
      Xl(i.appContext[e], t)
    );
    if (!o && s)
      return r;
    if (process.env.NODE_ENV !== "production" && n && !o) {
      const l = e === Ii ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : "";
      C(`Failed to resolve ${e.slice(0, -1)}: ${t}${l}`);
    }
    return o;
  } else process.env.NODE_ENV !== "production" && C(
    `resolve${xt(e.slice(0, -1))} can only be used in render() or setup().`
  );
}
function Xl(e, t) {
  return e && (e[t] || e[pe(t)] || e[xt(pe(t))]);
}
function Ch(e, t, n, s) {
  let i;
  const r = n && n[s], o = B(e);
  if (o || Y(e)) {
    const l = o && Bt(e);
    let c = !1, u = !1;
    l && (c = !Le(e), u = bt(e), e = or(e)), i = new Array(e.length);
    for (let f = 0, a = e.length; f < a; f++)
      i[f] = t(
        c ? u ? Ci(Ie(e[f])) : Ie(e[f]) : e[f],
        f,
        void 0,
        r && r[f]
      );
  } else if (typeof e == "number") {
    process.env.NODE_ENV !== "production" && !Number.isInteger(e) && C(`The v-for range expect an integer value but got ${e}.`), i = new Array(e);
    for (let l = 0; l < e; l++)
      i[l] = t(l + 1, l, void 0, r && r[l]);
  } else if (se(e))
    if (e[Symbol.iterator])
      i = Array.from(
        e,
        (l, c) => t(l, c, void 0, r && r[c])
      );
    else {
      const l = Object.keys(e);
      i = new Array(l.length);
      for (let c = 0, u = l.length; c < u; c++) {
        const f = l[c];
        i[c] = t(e[f], f, c, r && r[c]);
      }
    }
  else
    i = [];
  return n && (n[s] = i), i;
}
function Dh(e, t) {
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    if (B(s))
      for (let i = 0; i < s.length; i++)
        e[s[i].name] = s[i].fn;
    else s && (e[s.name] = s.key ? (...i) => {
      const r = s.fn(...i);
      return r && (r.key = s.key), r;
    } : s.fn);
  }
  return e;
}
function wh(e, t, n = {}, s, i) {
  if (be.ce || be.parent && rn(be.parent) && be.parent.ce) {
    const u = Object.keys(n).length > 0;
    return t !== "default" && (n.name = t), Ls(), Li(
      Se,
      null,
      [ve("slot", n, s && s())],
      u ? -2 : 64
    );
  }
  let r = e[t];
  process.env.NODE_ENV !== "production" && r && r.length > 1 && (C(
    "SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."
  ), r = () => []), r && r._c && (r._d = !1), Ls();
  const o = r && Yo(r(n)), l = n.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  o && o.key, c = Li(
    Se,
    {
      key: (l && !Qe(l) ? l : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!o && s ? "_fb" : "")
    },
    o || (s ? s() : []),
    o && e._ === 1 ? 64 : -2
  );
  return !i && c.scopeId && (c.slotScopeIds = [c.scopeId + "-s"]), r && r._c && (r._d = !0), c;
}
function Yo(e) {
  return e.some((t) => At(t) ? !(t.type === ge || t.type === Se && !Yo(t.children)) : !0) ? e : null;
}
function Vh(e, t) {
  const n = {};
  if (process.env.NODE_ENV !== "production" && !se(e))
    return C("v-on with no argument expects an object value."), n;
  for (const s in e)
    n[t && /[A-Z]/.test(s) ? `on:${s}` : Dt(s)] = e[s];
  return n;
}
const eo = (e) => e ? qf(e) ? Ys(e) : eo(e.parent) : null, Sn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ ee(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? mt(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? mt(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? mt(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? mt(e.refs) : e.refs,
    $parent: (e) => eo(e.parent),
    $root: (e) => eo(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Zo(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      pr(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Gs.bind(e.proxy)),
    $watch: (e) => ym.bind(e)
  })
), Xo = (e) => e === "_" || e === "$", Fr = (e, t) => e !== ne && !e.__isScriptSetup && re(e, t), Ss = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: i, props: r, accessCache: o, type: l, appContext: c } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let u;
    if (t[0] !== "$") {
      const m = o[t];
      if (m !== void 0)
        switch (m) {
          case 1:
            return s[t];
          case 2:
            return i[t];
          case 4:
            return n[t];
          case 3:
            return r[t];
        }
      else {
        if (Fr(s, t))
          return o[t] = 1, s[t];
        if (i !== ne && re(i, t))
          return o[t] = 2, i[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && re(u, t)
        )
          return o[t] = 3, r[t];
        if (n !== ne && re(n, t))
          return o[t] = 4, n[t];
        to && (o[t] = 0);
      }
    }
    const f = Sn[t];
    let a, d;
    if (f)
      return t === "$attrs" ? (Ce(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && Pi()) : process.env.NODE_ENV !== "production" && t === "$slots" && Ce(e, "get", t), f(e);
    if (
      // css module (injected by vue-loader)
      (a = l.__cssModules) && (a = a[t])
    )
      return a;
    if (n !== ne && re(n, t))
      return o[t] = 4, n[t];
    if (
      // global properties
      d = c.config.globalProperties, re(d, t)
    )
      return d[t];
    process.env.NODE_ENV !== "production" && be && (!Y(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (i !== ne && Xo(t[0]) && re(i, t) ? C(
      `Property ${JSON.stringify(
        t
      )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
    ) : e === be && C(
      `Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`
    ));
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: i, ctx: r } = e;
    return Fr(i, t) ? (i[t] = n, !0) : process.env.NODE_ENV !== "production" && i.__isScriptSetup && re(i, t) ? (C(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : s !== ne && re(s, t) ? (s[t] = n, !0) : re(e.props, t) ? (process.env.NODE_ENV !== "production" && C(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && C(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(r, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : r[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: i, propsOptions: r, type: o }
  }, l) {
    let c, u;
    return !!(n[l] || e !== ne && l[0] !== "$" && re(e, l) || Fr(t, l) || (c = r[0]) && re(c, l) || re(s, l) || re(Sn, l) || re(i.config.globalProperties, l) || (u = o.__cssModules) && u[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : re(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (Ss.ownKeys = (e) => (C(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
const xh = /* @__PURE__ */ ee({}, Ss, {
  get(e, t) {
    if (t !== Symbol.unscopables)
      return Ss.get(e, t, e);
  },
  has(e, t) {
    const n = t[0] !== "_" && !Dp(t);
    return process.env.NODE_ENV !== "production" && !n && Ss.has(e, t) && C(
      `Property ${JSON.stringify(
        t
      )} should not start with _ which is a reserved prefix for Vue internals.`
    ), n;
  }
});
function Ah(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys(Sn).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => Sn[n](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: me
    });
  }), t;
}
function Ih(e) {
  const {
    ctx: t,
    propsOptions: [n]
  } = e;
  n && Object.keys(n).forEach((s) => {
    Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[s],
      set: me
    });
  });
}
function kh(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(Q(n)).forEach((s) => {
    if (!n.__isScriptSetup) {
      if (Xo(s[0])) {
        C(
          `setup() return property ${JSON.stringify(
            s
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(t, s, {
        enumerable: !0,
        configurable: !0,
        get: () => n[s],
        set: me
      });
    }
  });
}
const In = (e) => C(
  `${e}() is a compiler-hint helper that is only usable inside <script setup> of a single file component. Its arguments should be compiled away and passing it at runtime has no effect.`
);
function Rh() {
  return process.env.NODE_ENV !== "production" && In("defineProps"), null;
}
function Mh() {
  return process.env.NODE_ENV !== "production" && In("defineEmits"), null;
}
function Ph(e) {
  process.env.NODE_ENV !== "production" && In("defineExpose");
}
function $h(e) {
  process.env.NODE_ENV !== "production" && In("defineOptions");
}
function Lh() {
  return process.env.NODE_ENV !== "production" && In("defineSlots"), null;
}
function Fh() {
  process.env.NODE_ENV !== "production" && In("defineModel");
}
function Hh(e, t) {
  return process.env.NODE_ENV !== "production" && In("withDefaults"), null;
}
function Bh() {
  return pf("useSlots").slots;
}
function jh() {
  return pf("useAttrs").attrs;
}
function pf(e) {
  const t = We();
  return process.env.NODE_ENV !== "production" && !t && C(`${e}() called without active instance.`), t.setupContext || (t.setupContext = Yf(t));
}
function Ps(e) {
  return B(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function Uh(e, t) {
  const n = Ps(e);
  for (const s in t) {
    if (s.startsWith("__skip")) continue;
    let i = n[s];
    i ? B(i) || G(i) ? i = n[s] = { type: i, default: t[s] } : i.default = t[s] : i === null ? i = n[s] = { default: t[s] } : process.env.NODE_ENV !== "production" && C(`props default key "${s}" has no corresponding declaration.`), i && t[`__skip_${s}`] && (i.skipFactory = !0);
  }
  return n;
}
function Kh(e, t) {
  return !e || !t ? e || t : B(e) && B(t) ? e.concat(t) : ee({}, Ps(e), Ps(t));
}
function Wh(e, t) {
  const n = {};
  for (const s in e)
    t.includes(s) || Object.defineProperty(n, s, {
      enumerable: !0,
      get: () => e[s]
    });
  return n;
}
function qh(e) {
  const t = We();
  process.env.NODE_ENV !== "production" && !t && C(
    "withAsyncContext called without active current instance. This is likely a bug."
  );
  let n = e();
  return ao(), er(n) && (n = n.catch((s) => {
    throw wn(t), s;
  })), [n, () => wn(t)];
}
function Gh() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? C(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let to = !0;
function Jh(e) {
  const t = Zo(e), n = e.proxy, s = e.ctx;
  to = !1, t.beforeCreate && Zl(t.beforeCreate, e, "bc");
  const {
    // state
    data: i,
    computed: r,
    methods: o,
    watch: l,
    provide: c,
    inject: u,
    // lifecycle
    created: f,
    beforeMount: a,
    mounted: d,
    beforeUpdate: m,
    updated: y,
    activated: E,
    deactivated: k,
    beforeDestroy: V,
    beforeUnmount: O,
    destroyed: h,
    unmounted: N,
    render: v,
    renderTracked: D,
    renderTriggered: F,
    errorCaptured: w,
    serverPrefetch: _,
    // public API
    expose: T,
    inheritAttrs: M,
    // assets
    components: b,
    directives: L,
    filters: q
  } = t, J = process.env.NODE_ENV !== "production" ? Gh() : null;
  if (process.env.NODE_ENV !== "production") {
    const [W] = e.propsOptions;
    if (W)
      for (const U in W)
        J("Props", U);
  }
  if (u && zh(u, s, J), o)
    for (const W in o) {
      const U = o[W];
      G(U) ? (process.env.NODE_ENV !== "production" ? Object.defineProperty(s, W, {
        value: U.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : s[W] = U.bind(n), process.env.NODE_ENV !== "production" && J("Methods", W)) : process.env.NODE_ENV !== "production" && C(
        `Method "${W}" has type "${typeof U}" in the component definition. Did you reference the function correctly?`
      );
    }
  if (i) {
    process.env.NODE_ENV !== "production" && !G(i) && C(
      "The data option must be a function. Plain object usage is no longer supported."
    );
    const W = i.call(n, n);
    if (process.env.NODE_ENV !== "production" && er(W) && C(
      "data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."
    ), !se(W))
      process.env.NODE_ENV !== "production" && C("data() should return an object.");
    else if (e.data = cr(W), process.env.NODE_ENV !== "production")
      for (const U in W)
        J("Data", U), Xo(U[0]) || Object.defineProperty(s, U, {
          configurable: !0,
          enumerable: !0,
          get: () => W[U],
          set: me
        });
  }
  if (to = !0, r)
    for (const W in r) {
      const U = r[W], ce = G(U) ? U.bind(n, n) : G(U.get) ? U.get.bind(n, n) : me;
      process.env.NODE_ENV !== "production" && ce === me && C(`Computed property "${W}" has no getter.`);
      const qe = !G(U) && G(U.set) ? U.set.bind(n) : process.env.NODE_ENV !== "production" ? () => {
        C(
          `Write operation failed: computed property "${W}" is readonly.`
        );
      } : me, rt = Zf({
        get: ce,
        set: qe
      });
      Object.defineProperty(s, W, {
        enumerable: !0,
        configurable: !0,
        get: () => rt.value,
        set: (ot) => rt.value = ot
      }), process.env.NODE_ENV !== "production" && J("Computed", W);
    }
  if (l)
    for (const W in l)
      df(l[W], s, n, W);
  if (c) {
    const W = G(c) ? c.call(n) : c;
    Reflect.ownKeys(W).forEach((U) => {
      mf(U, W[U]);
    });
  }
  f && Zl(f, e, "c");
  function K(W, U) {
    B(U) ? U.forEach((ce) => W(ce.bind(n))) : U && W(U.bind(n));
  }
  if (K(lf, a), K(as, d), K(Go, m), K(gr, y), K(sf, E), K(rf, k), K(uf, w), K(ff, D), K(af, F), K(Er, O), K(vr, N), K(cf, _), B(T))
    if (T.length) {
      const W = e.exposed || (e.exposed = {});
      T.forEach((U) => {
        Object.defineProperty(W, U, {
          get: () => n[U],
          set: (ce) => n[U] = ce,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  v && e.render === me && (e.render = v), M != null && (e.inheritAttrs = M), b && (e.components = b), L && (e.directives = L), _ && qo(e);
}
function zh(e, t, n = me) {
  B(e) && (e = no(e));
  for (const s in e) {
    const i = e[s];
    let r;
    se(i) ? "default" in i ? r = Os(
      i.from || s,
      i.default,
      !0
    ) : r = Os(i.from || s) : r = Os(i), _e(r) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => r.value,
      set: (o) => r.value = o
    }) : t[s] = r, process.env.NODE_ENV !== "production" && n("Inject", s);
  }
}
function Zl(e, t, n) {
  ft(
    B(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function df(e, t, n, s) {
  let i = s.includes(".") ? If(n, s) : () => n[s];
  if (Y(e)) {
    const r = t[e];
    G(r) ? Kn(i, r) : process.env.NODE_ENV !== "production" && C(`Invalid watch handler specified by key "${e}"`, r);
  } else if (G(e))
    Kn(i, e.bind(n));
  else if (se(e))
    if (B(e))
      e.forEach((r) => df(r, t, n, s));
    else {
      const r = G(e.handler) ? e.handler.bind(n) : t[e.handler];
      G(r) ? Kn(i, r, e) : process.env.NODE_ENV !== "production" && C(`Invalid watch handler specified by key "${e.handler}"`, r);
    }
  else process.env.NODE_ENV !== "production" && C(`Invalid watch option: "${s}"`, e);
}
function Zo(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: i,
    optionsCache: r,
    config: { optionMergeStrategies: o }
  } = e.appContext, l = r.get(t);
  let c;
  return l ? c = l : !i.length && !n && !s ? c = t : (c = {}, i.length && i.forEach(
    (u) => ki(c, u, o, !0)
  ), ki(c, t, o)), se(t) && r.set(t, c), c;
}
function ki(e, t, n, s = !1) {
  const { mixins: i, extends: r } = t;
  r && ki(e, r, n, !0), i && i.forEach(
    (o) => ki(e, o, n, !0)
  );
  for (const o in t)
    if (s && o === "expose")
      process.env.NODE_ENV !== "production" && C(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const l = Yh[o] || n && n[o];
      e[o] = l ? l(e[o], t[o]) : t[o];
    }
  return e;
}
const Yh = {
  data: Ql,
  props: ec,
  emits: ec,
  // objects
  methods: ys,
  computed: ys,
  // lifecycle
  beforeCreate: Be,
  created: Be,
  beforeMount: Be,
  mounted: Be,
  beforeUpdate: Be,
  updated: Be,
  beforeDestroy: Be,
  beforeUnmount: Be,
  destroyed: Be,
  unmounted: Be,
  activated: Be,
  deactivated: Be,
  errorCaptured: Be,
  serverPrefetch: Be,
  // assets
  components: ys,
  directives: ys,
  // watch
  watch: Zh,
  // provide / inject
  provide: Ql,
  inject: Xh
};
function Ql(e, t) {
  return t ? e ? function() {
    return ee(
      G(e) ? e.call(this, this) : e,
      G(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Xh(e, t) {
  return ys(no(e), no(t));
}
function no(e) {
  if (B(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Be(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ys(e, t) {
  return e ? ee(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ec(e, t) {
  return e ? B(e) && B(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : ee(
    /* @__PURE__ */ Object.create(null),
    Ps(e),
    Ps(t ?? {})
  ) : t;
}
function Zh(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = ee(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = Be(e[s], t[s]);
  return n;
}
function hf() {
  return {
    app: null,
    config: {
      isNativeTag: Ln,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Qh = 0;
function em(e, t) {
  return function(s, i = null) {
    G(s) || (s = ee({}, s)), i != null && !se(i) && (process.env.NODE_ENV !== "production" && C("root props passed to app.mount() must be an object."), i = null);
    const r = hf(), o = /* @__PURE__ */ new WeakSet(), l = [];
    let c = !1;
    const u = r.app = {
      _uid: Qh++,
      _component: s,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: ho,
      get config() {
        return r.config;
      },
      set config(f) {
        process.env.NODE_ENV !== "production" && C(
          "app.config cannot be replaced. Modify individual options instead."
        );
      },
      use(f, ...a) {
        return o.has(f) ? process.env.NODE_ENV !== "production" && C("Plugin has already been applied to target app.") : f && G(f.install) ? (o.add(f), f.install(u, ...a)) : G(f) ? (o.add(f), f(u, ...a)) : process.env.NODE_ENV !== "production" && C(
          'A plugin must either be a function or an object with an "install" function.'
        ), u;
      },
      mixin(f) {
        return r.mixins.includes(f) ? process.env.NODE_ENV !== "production" && C(
          "Mixin has already been applied to target app" + (f.name ? `: ${f.name}` : "")
        ) : r.mixins.push(f), u;
      },
      component(f, a) {
        return process.env.NODE_ENV !== "production" && fo(f, r.config), a ? (process.env.NODE_ENV !== "production" && r.components[f] && C(`Component "${f}" has already been registered in target app.`), r.components[f] = a, u) : r.components[f];
      },
      directive(f, a) {
        return process.env.NODE_ENV !== "production" && qa(f), a ? (process.env.NODE_ENV !== "production" && r.directives[f] && C(`Directive "${f}" has already been registered in target app.`), r.directives[f] = a, u) : r.directives[f];
      },
      mount(f, a, d) {
        if (c)
          process.env.NODE_ENV !== "production" && C(
            "App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`"
          );
        else {
          process.env.NODE_ENV !== "production" && f.__vue_app__ && C(
            "There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first."
          );
          const m = u._ceVNode || ve(s, i);
          return m.appContext = r, d === !0 ? d = "svg" : d === !1 && (d = void 0), process.env.NODE_ENV !== "production" && (r.reload = () => {
            const y = ut(m);
            y.el = null, e(y, f, d);
          }), a && t ? t(m, f) : e(m, f, d), c = !0, u._container = f, f.__vue_app__ = u, process.env.NODE_ENV !== "production" && (u._instance = m.component, jd(u, ho)), Ys(m.component);
        }
      },
      onUnmount(f) {
        process.env.NODE_ENV !== "production" && typeof f != "function" && C(
          `Expected function as first argument to app.onUnmount(), but got ${typeof f}`
        ), l.push(f);
      },
      unmount() {
        c ? (ft(
          l,
          u._instance,
          16
        ), e(null, u._container), process.env.NODE_ENV !== "production" && (u._instance = null, Ud(u)), delete u._container.__vue_app__) : process.env.NODE_ENV !== "production" && C("Cannot unmount an app that is not mounted.");
      },
      provide(f, a) {
        return process.env.NODE_ENV !== "production" && f in r.provides && (re(r.provides, f) ? C(
          `App already provides property with key "${String(f)}". It will be overwritten with the new value.`
        ) : C(
          `App already provides property with key "${String(f)}" inherited from its parent element. It will be overwritten with the new value.`
        )), r.provides[f] = a, u;
      },
      runWithContext(f) {
        const a = On;
        On = u;
        try {
          return f();
        } finally {
          On = a;
        }
      }
    };
    return u;
  };
}
let On = null;
function mf(e, t) {
  if (!we)
    process.env.NODE_ENV !== "production" && C("provide() can only be used inside setup().");
  else {
    let n = we.provides;
    const s = we.parent && we.parent.provides;
    s === n && (n = we.provides = Object.create(s)), n[e] = t;
  }
}
function Os(e, t, n = !1) {
  const s = We();
  if (s || On) {
    let i = On ? On._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return n && G(t) ? t.call(s && s.proxy) : t;
    process.env.NODE_ENV !== "production" && C(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && C("inject() can only be used inside setup() or functional components.");
}
function tm() {
  return !!(We() || On);
}
const gf = {}, Ef = () => Object.create(gf), vf = (e) => Object.getPrototypeOf(e) === gf;
function nm(e, t, n, s = !1) {
  const i = {}, r = Ef();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), yf(e, t, i, r);
  for (const o in e.propsOptions[0])
    o in i || (i[o] = void 0);
  process.env.NODE_ENV !== "production" && Nf(t || {}, i, e), n ? e.props = s ? i : Ia(i) : e.type.props ? e.props = i : e.props = r, e.attrs = r;
}
function sm(e) {
  for (; e; ) {
    if (e.type.__hmrId) return !0;
    e = e.parent;
  }
}
function im(e, t, n, s) {
  const {
    props: i,
    attrs: r,
    vnode: { patchFlag: o }
  } = e, l = Q(i), [c] = e.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(process.env.NODE_ENV !== "production" && sm(e)) && (s || o > 0) && !(o & 16)
  ) {
    if (o & 8) {
      const f = e.vnode.dynamicProps;
      for (let a = 0; a < f.length; a++) {
        let d = f[a];
        if (yr(e.emitsOptions, d))
          continue;
        const m = t[d];
        if (c)
          if (re(r, d))
            m !== r[d] && (r[d] = m, u = !0);
          else {
            const y = pe(d);
            i[y] = so(
              c,
              l,
              y,
              m,
              e,
              !1
            );
          }
        else
          m !== r[d] && (r[d] = m, u = !0);
      }
    }
  } else {
    yf(e, t, i, r) && (u = !0);
    let f;
    for (const a in l)
      (!t || // for camelCase
      !re(t, a) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((f = Pe(a)) === a || !re(t, f))) && (c ? n && // for camelCase
      (n[a] !== void 0 || // for kebab-case
      n[f] !== void 0) && (i[a] = so(
        c,
        l,
        a,
        void 0,
        e,
        !0
      )) : delete i[a]);
    if (r !== l)
      for (const a in r)
        (!t || !re(t, a)) && (delete r[a], u = !0);
  }
  u && wt(e.attrs, "set", ""), process.env.NODE_ENV !== "production" && Nf(t || {}, i, e);
}
function yf(e, t, n, s) {
  const [i, r] = e.propsOptions;
  let o = !1, l;
  if (t)
    for (let c in t) {
      if (sn(c))
        continue;
      const u = t[c];
      let f;
      i && re(i, f = pe(c)) ? !r || !r.includes(f) ? n[f] = u : (l || (l = {}))[f] = u : yr(e.emitsOptions, c) || (!(c in s) || u !== s[c]) && (s[c] = u, o = !0);
    }
  if (r) {
    const c = Q(n), u = l || ne;
    for (let f = 0; f < r.length; f++) {
      const a = r[f];
      n[a] = so(
        i,
        c,
        a,
        u[a],
        e,
        !re(u, a)
      );
    }
  }
  return o;
}
function so(e, t, n, s, i, r) {
  const o = e[n];
  if (o != null) {
    const l = re(o, "default");
    if (l && s === void 0) {
      const c = o.default;
      if (o.type !== Function && !o.skipFactory && G(c)) {
        const { propsDefaults: u } = i;
        if (n in u)
          s = u[n];
        else {
          const f = wn(i);
          s = u[n] = c.call(
            null,
            t
          ), f();
        }
      } else
        s = c;
      i.ce && i.ce._setProp(n, s);
    }
    o[
      0
      /* shouldCast */
    ] && (r && !l ? s = !1 : o[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === Pe(n)) && (s = !0));
  }
  return s;
}
const rm = /* @__PURE__ */ new WeakMap();
function _f(e, t, n = !1) {
  const s = n ? rm : t.propsCache, i = s.get(e);
  if (i)
    return i;
  const r = e.props, o = {}, l = [];
  let c = !1;
  if (!G(e)) {
    const f = (a) => {
      c = !0;
      const [d, m] = _f(a, t, !0);
      ee(o, d), m && l.push(...m);
    };
    !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
  }
  if (!r && !c)
    return se(e) && s.set(e, Fn), Fn;
  if (B(r))
    for (let f = 0; f < r.length; f++) {
      process.env.NODE_ENV !== "production" && !Y(r[f]) && C("props must be strings when using array syntax.", r[f]);
      const a = pe(r[f]);
      tc(a) && (o[a] = ne);
    }
  else if (r) {
    process.env.NODE_ENV !== "production" && !se(r) && C("invalid props options", r);
    for (const f in r) {
      const a = pe(f);
      if (tc(a)) {
        const d = r[f], m = o[a] = B(d) || G(d) ? { type: d } : ee({}, d), y = m.type;
        let E = !1, k = !0;
        if (B(y))
          for (let V = 0; V < y.length; ++V) {
            const O = y[V], h = G(O) && O.name;
            if (h === "Boolean") {
              E = !0;
              break;
            } else h === "String" && (k = !1);
          }
        else
          E = G(y) && y.name === "Boolean";
        m[
          0
          /* shouldCast */
        ] = E, m[
          1
          /* shouldCastTrue */
        ] = k, (E || re(m, "default")) && l.push(a);
      }
    }
  }
  const u = [o, l];
  return se(e) && s.set(e, u), u;
}
function tc(e) {
  return e[0] !== "$" && !sn(e) ? !0 : (process.env.NODE_ENV !== "production" && C(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function om(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function Nf(e, t, n) {
  const s = Q(t), i = n.propsOptions[0], r = Object.keys(e).map((o) => pe(o));
  for (const o in i) {
    let l = i[o];
    l != null && lm(
      o,
      s[o],
      l,
      process.env.NODE_ENV !== "production" ? mt(s) : s,
      !r.includes(o)
    );
  }
}
function lm(e, t, n, s, i) {
  const { type: r, required: o, validator: l, skipCheck: c } = n;
  if (o && i) {
    C('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !o)) {
    if (r != null && r !== !0 && !c) {
      let u = !1;
      const f = B(r) ? r : [r], a = [];
      for (let d = 0; d < f.length && !u; d++) {
        const { valid: m, expectedType: y } = am(t, f[d]);
        a.push(y || ""), u = m;
      }
      if (!u) {
        C(fm(e, t, a));
        return;
      }
    }
    l && !l(t, s) && C('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const cm = /* @__PURE__ */ Ve(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function am(e, t) {
  let n;
  const s = om(t);
  if (s === "null")
    n = e === null;
  else if (cm(s)) {
    const i = typeof e;
    n = i === s.toLowerCase(), !n && i === "object" && (n = e instanceof t);
  } else s === "Object" ? n = se(e) : s === "Array" ? n = B(e) : n = e instanceof t;
  return {
    valid: n,
    expectedType: s
  };
}
function fm(e, t, n) {
  if (n.length === 0)
    return `Prop type [] for prop "${e}" won't match anything. Did you mean to use type Array instead?`;
  let s = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(xt).join(" | ")}`;
  const i = n[0], r = xo(t), o = nc(t, i), l = nc(t, r);
  return n.length === 1 && sc(i) && !um(i, r) && (s += ` with value ${o}`), s += `, got ${r} `, sc(r) && (s += `with value ${l}.`), s;
}
function nc(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function sc(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function um(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const Qo = (e) => e === "_" || e === "_ctx" || e === "$stable", el = (e) => B(e) ? e.map(Ke) : [Ke(e)], pm = (e, t, n) => {
  if (t._n)
    return t;
  const s = jo((...i) => (process.env.NODE_ENV !== "production" && we && !(n === null && be) && !(n && n.root !== we.root) && C(
    `Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
  ), el(t(...i))), n);
  return s._c = !1, s;
}, bf = (e, t, n) => {
  const s = e._ctx;
  for (const i in e) {
    if (Qo(i)) continue;
    const r = e[i];
    if (G(r))
      t[i] = pm(i, r, s);
    else if (r != null) {
      process.env.NODE_ENV !== "production" && C(
        `Non-function value encountered for slot "${i}". Prefer function slots for better performance.`
      );
      const o = el(r);
      t[i] = () => o;
    }
  }
}, Sf = (e, t) => {
  process.env.NODE_ENV !== "production" && !cs(e.vnode) && C(
    "Non-function value encountered for default slot. Prefer function slots for better performance."
  );
  const n = el(t);
  e.slots.default = () => n;
}, io = (e, t, n) => {
  for (const s in t)
    (n || !Qo(s)) && (e[s] = t[s]);
}, dm = (e, t, n) => {
  const s = e.slots = Ef();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (io(s, t, n), n && qn(s, "_", i, !0)) : bf(t, s);
  } else t && Sf(e, t);
}, hm = (e, t, n) => {
  const { vnode: s, slots: i } = e;
  let r = !0, o = ne;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? process.env.NODE_ENV !== "production" && gt ? (io(i, t, n), wt(e, "set", "$slots")) : n && l === 1 ? r = !1 : io(i, t, n) : (r = !t.$stable, bf(t, i)), o = t;
  } else t && (Sf(e, t), o = { default: 1 });
  if (r)
    for (const l in i)
      !Qo(l) && o[l] == null && delete i[l];
};
let ds, Lt;
function kt(e, t) {
  e.appContext.config.performance && Ri() && Lt.mark(`vue-${t}-${e.uid}`), process.env.NODE_ENV !== "production" && qd(e, t, Ri() ? Lt.now() : Date.now());
}
function Rt(e, t) {
  if (e.appContext.config.performance && Ri()) {
    const n = `vue-${t}-${e.uid}`, s = n + ":end", i = `<${br(e, e.type)}> ${t}`;
    Lt.mark(s), Lt.measure(i, n, s), Lt.clearMeasures(i), Lt.clearMarks(n), Lt.clearMarks(s);
  }
  process.env.NODE_ENV !== "production" && Gd(e, t, Ri() ? Lt.now() : Date.now());
}
function Ri() {
  return ds !== void 0 || (typeof window < "u" && window.performance ? (ds = !0, Lt = window.performance) : ds = !1), ds;
}
function mm() {
  const e = [];
  if (process.env.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(
      `Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
const Te = $f;
function Of(e) {
  return Cf(e);
}
function Tf(e) {
  return Cf(e, oh);
}
function Cf(e, t) {
  mm();
  const n = qs();
  n.__VUE__ = !0, process.env.NODE_ENV !== "production" && Ho(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const {
    insert: s,
    remove: i,
    patchProp: r,
    createElement: o,
    createText: l,
    createComment: c,
    setText: u,
    setElementText: f,
    parentNode: a,
    nextSibling: d,
    setScopeId: m = me,
    insertStaticContent: y
  } = e, E = (p, g, S, R = null, x = null, A = null, H = void 0, $ = null, P = process.env.NODE_ENV !== "production" && gt ? !1 : !!g.dynamicChildren) => {
    if (p === g)
      return;
    p && !ht(p, g) && (R = ei(p), Gt(p, x, A, !0), p = null), g.patchFlag === -2 && (P = !1, g.dynamicChildren = null);
    const { type: I, ref: X, shapeFlag: j } = g;
    switch (I) {
      case Vt:
        k(p, g, S, R);
        break;
      case ge:
        V(p, g, S, R);
        break;
      case on:
        p == null ? O(g, S, R, H) : process.env.NODE_ENV !== "production" && h(p, g, S, H);
        break;
      case Se:
        L(
          p,
          g,
          S,
          R,
          x,
          A,
          H,
          $,
          P
        );
        break;
      default:
        j & 1 ? D(
          p,
          g,
          S,
          R,
          x,
          A,
          H,
          $,
          P
        ) : j & 6 ? q(
          p,
          g,
          S,
          R,
          x,
          A,
          H,
          $,
          P
        ) : j & 64 || j & 128 ? I.process(
          p,
          g,
          S,
          R,
          x,
          A,
          H,
          $,
          P,
          kn
        ) : process.env.NODE_ENV !== "production" && C("Invalid VNode type:", I, `(${typeof I})`);
    }
    X != null && x ? Un(X, p && p.ref, A, g || p, !g) : X == null && p && p.ref != null && Un(p.ref, null, A, p, !0);
  }, k = (p, g, S, R) => {
    if (p == null)
      s(
        g.el = l(g.children),
        S,
        R
      );
    else {
      const x = g.el = p.el;
      g.children !== p.children && u(x, g.children);
    }
  }, V = (p, g, S, R) => {
    p == null ? s(
      g.el = c(g.children || ""),
      S,
      R
    ) : g.el = p.el;
  }, O = (p, g, S, R) => {
    [p.el, p.anchor] = y(
      p.children,
      g,
      S,
      R,
      p.el,
      p.anchor
    );
  }, h = (p, g, S, R) => {
    if (g.children !== p.children) {
      const x = d(p.anchor);
      v(p), [g.el, g.anchor] = y(
        g.children,
        S,
        x,
        R
      );
    } else
      g.el = p.el, g.anchor = p.anchor;
  }, N = ({ el: p, anchor: g }, S, R) => {
    let x;
    for (; p && p !== g; )
      x = d(p), s(p, S, R), p = x;
    s(g, S, R);
  }, v = ({ el: p, anchor: g }) => {
    let S;
    for (; p && p !== g; )
      S = d(p), i(p), p = S;
    i(g);
  }, D = (p, g, S, R, x, A, H, $, P) => {
    if (g.type === "svg" ? H = "svg" : g.type === "math" && (H = "mathml"), p == null)
      F(
        g,
        S,
        R,
        x,
        A,
        H,
        $,
        P
      );
    else {
      const I = p.el && p.el._isVueCE ? p.el : null;
      try {
        I && I._beginPatch(), T(
          p,
          g,
          x,
          A,
          H,
          $,
          P
        );
      } finally {
        I && I._endPatch();
      }
    }
  }, F = (p, g, S, R, x, A, H, $) => {
    let P, I;
    const { props: X, shapeFlag: j, transition: z, dirs: Z } = p;
    if (P = p.el = o(
      p.type,
      A,
      X && X.is,
      X
    ), j & 8 ? f(P, p.children) : j & 16 && _(
      p.children,
      P,
      null,
      R,
      x,
      Hr(p, A),
      H,
      $
    ), Z && Ct(p, null, R, "created"), w(P, p, p.scopeId, H, R), X) {
      for (const de in X)
        de !== "value" && !sn(de) && r(P, de, null, X[de], A, R);
      "value" in X && r(P, "value", null, X.value, A), (I = X.onVnodeBeforeMount) && Ye(I, R, p);
    }
    process.env.NODE_ENV !== "production" && (qn(P, "__vnode", p, !0), qn(P, "__vueParentComponent", R, !0)), Z && Ct(p, null, R, "beforeMount");
    const le = Df(x, z);
    le && z.beforeEnter(P), s(P, g, S), ((I = X && X.onVnodeMounted) || le || Z) && Te(() => {
      I && Ye(I, R, p), le && z.enter(P), Z && Ct(p, null, R, "mounted");
    }, x);
  }, w = (p, g, S, R, x) => {
    if (S && m(p, S), R)
      for (let A = 0; A < R.length; A++)
        m(p, R[A]);
    if (x) {
      let A = x.subTree;
      if (process.env.NODE_ENV !== "production" && A.patchFlag > 0 && A.patchFlag & 2048 && (A = _r(A.children) || A), g === A || $i(A.type) && (A.ssContent === g || A.ssFallback === g)) {
        const H = x.vnode;
        w(
          p,
          H,
          H.scopeId,
          H.slotScopeIds,
          x.parent
        );
      }
    }
  }, _ = (p, g, S, R, x, A, H, $, P = 0) => {
    for (let I = P; I < p.length; I++) {
      const X = p[I] = $ ? Qt(p[I]) : Ke(p[I]);
      E(
        null,
        X,
        g,
        S,
        R,
        x,
        A,
        H,
        $
      );
    }
  }, T = (p, g, S, R, x, A, H) => {
    const $ = g.el = p.el;
    process.env.NODE_ENV !== "production" && ($.__vnode = g);
    let { patchFlag: P, dynamicChildren: I, dirs: X } = g;
    P |= p.patchFlag & 16;
    const j = p.props || ne, z = g.props || ne;
    let Z;
    if (S && pn(S, !1), (Z = z.onVnodeBeforeUpdate) && Ye(Z, S, g, p), X && Ct(g, p, S, "beforeUpdate"), S && pn(S, !0), process.env.NODE_ENV !== "production" && gt && (P = 0, H = !1, I = null), (j.innerHTML && z.innerHTML == null || j.textContent && z.textContent == null) && f($, ""), I ? (M(
      p.dynamicChildren,
      I,
      $,
      S,
      R,
      Hr(g, x),
      A
    ), process.env.NODE_ENV !== "production" && Ts(p, g)) : H || ce(
      p,
      g,
      $,
      null,
      S,
      R,
      Hr(g, x),
      A,
      !1
    ), P > 0) {
      if (P & 16)
        b($, j, z, S, x);
      else if (P & 2 && j.class !== z.class && r($, "class", null, z.class, x), P & 4 && r($, "style", j.style, z.style, x), P & 8) {
        const le = g.dynamicProps;
        for (let de = 0; de < le.length; de++) {
          const fe = le[de], Ge = j[fe], ke = z[fe];
          (ke !== Ge || fe === "value") && r($, fe, Ge, ke, x, S);
        }
      }
      P & 1 && p.children !== g.children && f($, g.children);
    } else !H && I == null && b($, j, z, S, x);
    ((Z = z.onVnodeUpdated) || X) && Te(() => {
      Z && Ye(Z, S, g, p), X && Ct(g, p, S, "updated");
    }, R);
  }, M = (p, g, S, R, x, A, H) => {
    for (let $ = 0; $ < g.length; $++) {
      const P = p[$], I = g[$], X = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        P.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (P.type === Se || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !ht(P, I) || // - In the case of a component, it could contain anything.
        P.shapeFlag & 198) ? a(P.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          S
        )
      );
      E(
        P,
        I,
        X,
        null,
        R,
        x,
        A,
        H,
        !0
      );
    }
  }, b = (p, g, S, R, x) => {
    if (g !== S) {
      if (g !== ne)
        for (const A in g)
          !sn(A) && !(A in S) && r(
            p,
            A,
            g[A],
            null,
            x,
            R
          );
      for (const A in S) {
        if (sn(A)) continue;
        const H = S[A], $ = g[A];
        H !== $ && A !== "value" && r(p, A, $, H, x, R);
      }
      "value" in S && r(p, "value", g.value, S.value, x);
    }
  }, L = (p, g, S, R, x, A, H, $, P) => {
    const I = g.el = p ? p.el : l(""), X = g.anchor = p ? p.anchor : l("");
    let { patchFlag: j, dynamicChildren: z, slotScopeIds: Z } = g;
    process.env.NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (gt || j & 2048) && (j = 0, P = !1, z = null), Z && ($ = $ ? $.concat(Z) : Z), p == null ? (s(I, S, R), s(X, S, R), _(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      g.children || [],
      S,
      X,
      x,
      A,
      H,
      $,
      P
    )) : j > 0 && j & 64 && z && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    p.dynamicChildren ? (M(
      p.dynamicChildren,
      z,
      S,
      x,
      A,
      H,
      $
    ), process.env.NODE_ENV !== "production" ? Ts(p, g) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (g.key != null || x && g === x.subTree) && Ts(
        p,
        g,
        !0
        /* shallow */
      )
    )) : ce(
      p,
      g,
      S,
      X,
      x,
      A,
      H,
      $,
      P
    );
  }, q = (p, g, S, R, x, A, H, $, P) => {
    g.slotScopeIds = $, p == null ? g.shapeFlag & 512 ? x.ctx.activate(
      g,
      S,
      R,
      H,
      P
    ) : J(
      g,
      S,
      R,
      x,
      A,
      H,
      P
    ) : K(p, g, P);
  }, J = (p, g, S, R, x, A, H) => {
    const $ = p.component = Wf(
      p,
      R,
      x
    );
    if (process.env.NODE_ENV !== "production" && $.type.__hmrId && Ld($), process.env.NODE_ENV !== "production" && (Hn(p), kt($, "mount")), cs(p) && ($.ctx.renderer = kn), process.env.NODE_ENV !== "production" && kt($, "init"), Gf($, !1, H), process.env.NODE_ENV !== "production" && Rt($, "init"), process.env.NODE_ENV !== "production" && gt && (p.el = null), $.asyncDep) {
      if (x && x.registerDep($, W, H), !p.el) {
        const P = $.subTree = ve(ge);
        V(null, P, g, S), p.placeholder = P.el;
      }
    } else
      W(
        $,
        p,
        g,
        S,
        x,
        A,
        H
      );
    process.env.NODE_ENV !== "production" && (Bn(), Rt($, "mount"));
  }, K = (p, g, S) => {
    const R = g.component = p.component;
    if (Tm(p, g, S))
      if (R.asyncDep && !R.asyncResolved) {
        process.env.NODE_ENV !== "production" && Hn(g), U(R, g, S), process.env.NODE_ENV !== "production" && Bn();
        return;
      } else
        R.next = g, R.update();
    else
      g.el = p.el, R.vnode = g;
  }, W = (p, g, S, R, x, A, H) => {
    const $ = () => {
      if (p.isMounted) {
        let { next: j, bu: z, u: Z, parent: le, vnode: de } = p;
        {
          const et = wf(p);
          if (et) {
            j && (j.el = de.el, U(p, j, H)), et.asyncDep.then(() => {
              p.isUnmounted || $();
            });
            return;
          }
        }
        let fe = j, Ge;
        process.env.NODE_ENV !== "production" && Hn(j || p.vnode), pn(p, !1), j ? (j.el = de.el, U(p, j, H)) : j = de, z && tn(z), (Ge = j.props && j.props.onVnodeBeforeUpdate) && Ye(Ge, le, j, de), pn(p, !0), process.env.NODE_ENV !== "production" && kt(p, "render");
        const ke = gi(p);
        process.env.NODE_ENV !== "production" && Rt(p, "render");
        const pt = p.subTree;
        p.subTree = ke, process.env.NODE_ENV !== "production" && kt(p, "patch"), E(
          pt,
          ke,
          // parent may have changed if it's in a teleport
          a(pt.el),
          // anchor may have changed if it's in a fragment
          ei(pt),
          p,
          x,
          A
        ), process.env.NODE_ENV !== "production" && Rt(p, "patch"), j.el = ke.el, fe === null && Nr(p, ke.el), Z && Te(Z, x), (Ge = j.props && j.props.onVnodeUpdated) && Te(
          () => Ye(Ge, le, j, de),
          x
        ), process.env.NODE_ENV !== "production" && Ka(p), process.env.NODE_ENV !== "production" && Bn();
      } else {
        let j;
        const { el: z, props: Z } = g, { bm: le, m: de, parent: fe, root: Ge, type: ke } = p, pt = rn(g);
        if (pn(p, !1), le && tn(le), !pt && (j = Z && Z.onVnodeBeforeMount) && Ye(j, fe, g), pn(p, !0), z && xr) {
          const et = () => {
            process.env.NODE_ENV !== "production" && kt(p, "render"), p.subTree = gi(p), process.env.NODE_ENV !== "production" && Rt(p, "render"), process.env.NODE_ENV !== "production" && kt(p, "hydrate"), xr(
              z,
              p.subTree,
              p,
              x,
              null
            ), process.env.NODE_ENV !== "production" && Rt(p, "hydrate");
          };
          pt && ke.__asyncHydrate ? ke.__asyncHydrate(
            z,
            p,
            et
          ) : et();
        } else {
          Ge.ce && // @ts-expect-error _def is private
          Ge.ce._def.shadowRoot !== !1 && Ge.ce._injectChildStyle(ke), process.env.NODE_ENV !== "production" && kt(p, "render");
          const et = p.subTree = gi(p);
          process.env.NODE_ENV !== "production" && Rt(p, "render"), process.env.NODE_ENV !== "production" && kt(p, "patch"), E(
            null,
            et,
            S,
            R,
            p,
            x,
            A
          ), process.env.NODE_ENV !== "production" && Rt(p, "patch"), g.el = et.el;
        }
        if (de && Te(de, x), !pt && (j = Z && Z.onVnodeMounted)) {
          const et = g;
          Te(
            () => Ye(j, fe, et),
            x
          );
        }
        (g.shapeFlag & 256 || fe && rn(fe.vnode) && fe.vnode.shapeFlag & 256) && p.a && Te(p.a, x), p.isMounted = !0, process.env.NODE_ENV !== "production" && Xr(p), g = S = R = null;
      }
    };
    p.scope.on();
    const P = p.effect = new xs($);
    p.scope.off();
    const I = p.update = P.run.bind(P), X = p.job = P.runIfDirty.bind(P);
    X.i = p, X.id = p.uid, P.scheduler = () => pr(X), pn(p, !0), process.env.NODE_ENV !== "production" && (P.onTrack = p.rtc ? (j) => tn(p.rtc, j) : void 0, P.onTrigger = p.rtg ? (j) => tn(p.rtg, j) : void 0), I();
  }, U = (p, g, S) => {
    g.component = p;
    const R = p.vnode.props;
    p.vnode = g, p.next = null, im(p, g.props, R, S), hm(p, g.children, S), _t(), Hl(p), Nt();
  }, ce = (p, g, S, R, x, A, H, $, P = !1) => {
    const I = p && p.children, X = p ? p.shapeFlag : 0, j = g.children, { patchFlag: z, shapeFlag: Z } = g;
    if (z > 0) {
      if (z & 128) {
        rt(
          I,
          j,
          S,
          R,
          x,
          A,
          H,
          $,
          P
        );
        return;
      } else if (z & 256) {
        qe(
          I,
          j,
          S,
          R,
          x,
          A,
          H,
          $,
          P
        );
        return;
      }
    }
    Z & 8 ? (X & 16 && fs(I, x, A), j !== I && f(S, j)) : X & 16 ? Z & 16 ? rt(
      I,
      j,
      S,
      R,
      x,
      A,
      H,
      $,
      P
    ) : fs(I, x, A, !0) : (X & 8 && f(S, ""), Z & 16 && _(
      j,
      S,
      R,
      x,
      A,
      H,
      $,
      P
    ));
  }, qe = (p, g, S, R, x, A, H, $, P) => {
    p = p || Fn, g = g || Fn;
    const I = p.length, X = g.length, j = Math.min(I, X);
    let z;
    for (z = 0; z < j; z++) {
      const Z = g[z] = P ? Qt(g[z]) : Ke(g[z]);
      E(
        p[z],
        Z,
        S,
        null,
        x,
        A,
        H,
        $,
        P
      );
    }
    I > X ? fs(
      p,
      x,
      A,
      !0,
      !1,
      j
    ) : _(
      g,
      S,
      R,
      x,
      A,
      H,
      $,
      P,
      j
    );
  }, rt = (p, g, S, R, x, A, H, $, P) => {
    let I = 0;
    const X = g.length;
    let j = p.length - 1, z = X - 1;
    for (; I <= j && I <= z; ) {
      const Z = p[I], le = g[I] = P ? Qt(g[I]) : Ke(g[I]);
      if (ht(Z, le))
        E(
          Z,
          le,
          S,
          null,
          x,
          A,
          H,
          $,
          P
        );
      else
        break;
      I++;
    }
    for (; I <= j && I <= z; ) {
      const Z = p[j], le = g[z] = P ? Qt(g[z]) : Ke(g[z]);
      if (ht(Z, le))
        E(
          Z,
          le,
          S,
          null,
          x,
          A,
          H,
          $,
          P
        );
      else
        break;
      j--, z--;
    }
    if (I > j) {
      if (I <= z) {
        const Z = z + 1, le = Z < X ? g[Z].el : R;
        for (; I <= z; )
          E(
            null,
            g[I] = P ? Qt(g[I]) : Ke(g[I]),
            S,
            le,
            x,
            A,
            H,
            $,
            P
          ), I++;
      }
    } else if (I > z)
      for (; I <= j; )
        Gt(p[I], x, A, !0), I++;
    else {
      const Z = I, le = I, de = /* @__PURE__ */ new Map();
      for (I = le; I <= z; I++) {
        const He = g[I] = P ? Qt(g[I]) : Ke(g[I]);
        He.key != null && (process.env.NODE_ENV !== "production" && de.has(He.key) && C(
          "Duplicate keys found during update:",
          JSON.stringify(He.key),
          "Make sure keys are unique."
        ), de.set(He.key, I));
      }
      let fe, Ge = 0;
      const ke = z - le + 1;
      let pt = !1, et = 0;
      const us = new Array(ke);
      for (I = 0; I < ke; I++) us[I] = 0;
      for (I = Z; I <= j; I++) {
        const He = p[I];
        if (Ge >= ke) {
          Gt(He, x, A, !0);
          continue;
        }
        let St;
        if (He.key != null)
          St = de.get(He.key);
        else
          for (fe = le; fe <= z; fe++)
            if (us[fe - le] === 0 && ht(He, g[fe])) {
              St = fe;
              break;
            }
        St === void 0 ? Gt(He, x, A, !0) : (us[St - le] = I + 1, St >= et ? et = St : pt = !0, E(
          He,
          g[St],
          S,
          null,
          x,
          A,
          H,
          $,
          P
        ), Ge++);
      }
      const Vl = pt ? gm(us) : Fn;
      for (fe = Vl.length - 1, I = ke - 1; I >= 0; I--) {
        const He = le + I, St = g[He], xl = g[He + 1], Al = He + 1 < X ? (
          // #13559, fallback to el placeholder for unresolved async component
          xl.el || xl.placeholder
        ) : R;
        us[I] === 0 ? E(
          null,
          St,
          S,
          Al,
          x,
          A,
          H,
          $,
          P
        ) : pt && (fe < 0 || I !== Vl[fe] ? ot(St, S, Al, 2) : fe--);
      }
    }
  }, ot = (p, g, S, R, x = null) => {
    const { el: A, type: H, transition: $, children: P, shapeFlag: I } = p;
    if (I & 6) {
      ot(p.component.subTree, g, S, R);
      return;
    }
    if (I & 128) {
      p.suspense.move(g, S, R);
      return;
    }
    if (I & 64) {
      H.move(p, g, S, kn);
      return;
    }
    if (H === Se) {
      s(A, g, S);
      for (let j = 0; j < P.length; j++)
        ot(P[j], g, S, R);
      s(p.anchor, g, S);
      return;
    }
    if (H === on) {
      N(p, g, S);
      return;
    }
    if (R !== 2 && I & 1 && $)
      if (R === 0)
        $.beforeEnter(A), s(A, g, S), Te(() => $.enter(A), x);
      else {
        const { leave: j, delayLeave: z, afterLeave: Z } = $, le = () => {
          p.ctx.isUnmounted ? i(A) : s(A, g, S);
        }, de = () => {
          A._isLeaving && A[$t](
            !0
            /* cancelled */
          ), j(A, () => {
            le(), Z && Z();
          });
        };
        z ? z(A, le, de) : de();
      }
    else
      s(A, g, S);
  }, Gt = (p, g, S, R = !1, x = !1) => {
    const {
      type: A,
      props: H,
      ref: $,
      children: P,
      dynamicChildren: I,
      shapeFlag: X,
      patchFlag: j,
      dirs: z,
      cacheIndex: Z
    } = p;
    if (j === -2 && (x = !1), $ != null && (_t(), Un($, null, S, p, !0), Nt()), Z != null && (g.renderCache[Z] = void 0), X & 256) {
      g.ctx.deactivate(p);
      return;
    }
    const le = X & 1 && z, de = !rn(p);
    let fe;
    if (de && (fe = H && H.onVnodeBeforeUnmount) && Ye(fe, g, p), X & 6)
      dp(p.component, S, R);
    else {
      if (X & 128) {
        p.suspense.unmount(S, R);
        return;
      }
      le && Ct(p, null, g, "beforeUnmount"), X & 64 ? p.type.remove(
        p,
        g,
        S,
        kn,
        R
      ) : I && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !I.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (A !== Se || j > 0 && j & 64) ? fs(
        I,
        g,
        S,
        !1,
        !0
      ) : (A === Se && j & 384 || !x && X & 16) && fs(P, g, S), R && Dr(p);
    }
    (de && (fe = H && H.onVnodeUnmounted) || le) && Te(() => {
      fe && Ye(fe, g, p), le && Ct(p, null, g, "unmounted");
    }, S);
  }, Dr = (p) => {
    const { type: g, el: S, anchor: R, transition: x } = p;
    if (g === Se) {
      process.env.NODE_ENV !== "production" && p.patchFlag > 0 && p.patchFlag & 2048 && x && !x.persisted ? p.children.forEach((H) => {
        H.type === ge ? i(H.el) : Dr(H);
      }) : pp(S, R);
      return;
    }
    if (g === on) {
      v(p);
      return;
    }
    const A = () => {
      i(S), x && !x.persisted && x.afterLeave && x.afterLeave();
    };
    if (p.shapeFlag & 1 && x && !x.persisted) {
      const { leave: H, delayLeave: $ } = x, P = () => H(S, A);
      $ ? $(p.el, A, P) : P();
    } else
      A();
  }, pp = (p, g) => {
    let S;
    for (; p !== g; )
      S = d(p), i(p), p = S;
    i(g);
  }, dp = (p, g, S) => {
    process.env.NODE_ENV !== "production" && p.type.__hmrId && Fd(p);
    const { bum: R, scope: x, job: A, subTree: H, um: $, m: P, a: I } = p;
    Mi(P), Mi(I), R && tn(R), x.stop(), A && (A.flags |= 8, Gt(H, p, g, S)), $ && Te($, g), Te(() => {
      p.isUnmounted = !0;
    }, g), process.env.NODE_ENV !== "production" && Wd(p);
  }, fs = (p, g, S, R = !1, x = !1, A = 0) => {
    for (let H = A; H < p.length; H++)
      Gt(p[H], g, S, R, x);
  }, ei = (p) => {
    if (p.shapeFlag & 6)
      return ei(p.component.subTree);
    if (p.shapeFlag & 128)
      return p.suspense.next();
    const g = d(p.anchor || p.el), S = g && g[Ga];
    return S ? d(S) : g;
  };
  let wr = !1;
  const wl = (p, g, S) => {
    p == null ? g._vnode && Gt(g._vnode, null, null, !0) : E(
      g._vnode || null,
      p,
      g,
      null,
      null,
      null,
      S
    ), g._vnode = p, wr || (wr = !0, Hl(), Vi(), wr = !1);
  }, kn = {
    p: E,
    um: Gt,
    m: ot,
    r: Dr,
    mt: J,
    mc: _,
    pc: ce,
    pbc: M,
    n: ei,
    o: e
  };
  let Vr, xr;
  return t && ([Vr, xr] = t(
    kn
  )), {
    render: wl,
    hydrate: Vr,
    createApp: em(wl, Vr)
  };
}
function Hr({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function pn({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Df(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ts(e, t, n = !1) {
  const s = e.children, i = t.children;
  if (B(s) && B(i))
    for (let r = 0; r < s.length; r++) {
      const o = s[r];
      let l = i[r];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[r] = Qt(i[r]), l.el = o.el), !n && l.patchFlag !== -2 && Ts(o, l)), l.type === Vt && // avoid cached text nodes retaining detached dom nodes
      l.patchFlag !== -1 && (l.el = o.el), l.type === ge && !l.el && (l.el = o.el), process.env.NODE_ENV !== "production" && l.el && (l.el.__vnode = l);
    }
}
function gm(e) {
  const t = e.slice(), n = [0];
  let s, i, r, o, l;
  const c = e.length;
  for (s = 0; s < c; s++) {
    const u = e[s];
    if (u !== 0) {
      if (i = n[n.length - 1], e[i] < u) {
        t[s] = i, n.push(s);
        continue;
      }
      for (r = 0, o = n.length - 1; r < o; )
        l = r + o >> 1, e[n[l]] < u ? r = l + 1 : o = l;
      u < e[n[r]] && (r > 0 && (t[s] = n[r - 1]), n[r] = s);
    }
  }
  for (r = n.length, o = n[r - 1]; r-- > 0; )
    n[r] = o, o = t[o];
  return n;
}
function wf(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : wf(t);
}
function Mi(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const Vf = Symbol.for("v-scx"), xf = () => {
  {
    const e = Os(Vf);
    return e || process.env.NODE_ENV !== "production" && C(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function Em(e, t) {
  return zs(e, null, t);
}
function vm(e, t) {
  return zs(
    e,
    null,
    process.env.NODE_ENV !== "production" ? ee({}, t, { flush: "post" }) : { flush: "post" }
  );
}
function Af(e, t) {
  return zs(
    e,
    null,
    process.env.NODE_ENV !== "production" ? ee({}, t, { flush: "sync" }) : { flush: "sync" }
  );
}
function Kn(e, t, n) {
  return process.env.NODE_ENV !== "production" && !G(t) && C(
    "`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."
  ), zs(e, t, n);
}
function zs(e, t, n = ne) {
  const { immediate: s, deep: i, flush: r, once: o } = n;
  process.env.NODE_ENV !== "production" && !t && (s !== void 0 && C(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), i !== void 0 && C(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), o !== void 0 && C(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const l = ee({}, n);
  process.env.NODE_ENV !== "production" && (l.onWarn = C);
  const c = t && s || !t && r !== "post";
  let u;
  if (Yn) {
    if (r === "sync") {
      const m = xf();
      u = m.__watcherHandles || (m.__watcherHandles = []);
    } else if (!c) {
      const m = () => {
      };
      return m.stop = me, m.resume = me, m.pause = me, m;
    }
  }
  const f = we;
  l.call = (m, y, E) => ft(m, f, y, E);
  let a = !1;
  r === "post" ? l.scheduler = (m) => {
    Te(m, f && f.suspense);
  } : r !== "sync" && (a = !0, l.scheduler = (m, y) => {
    y ? m() : pr(m);
  }), l.augmentJob = (m) => {
    t && (m.flags |= 4), a && (m.flags |= 2, f && (m.id = f.uid, m.i = f));
  };
  const d = Vd(e, t, l);
  return Yn && (u ? u.push(d) : c && d()), d;
}
function ym(e, t, n) {
  const s = this.proxy, i = Y(e) ? e.includes(".") ? If(s, e) : () => s[e] : e.bind(s, s);
  let r;
  G(t) ? r = t : (r = t.handler, n = t);
  const o = wn(this), l = zs(i, r.bind(s), n);
  return o(), l;
}
function If(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let i = 0; i < n.length && s; i++)
      s = s[n[i]];
    return s;
  };
}
function _m(e, t, n = ne) {
  const s = We();
  if (process.env.NODE_ENV !== "production" && !s)
    return C("useModel() called without active instance."), jt();
  const i = pe(t);
  if (process.env.NODE_ENV !== "production" && !s.propsOptions[0][i])
    return C(`useModel() called with prop "${t}" which is not declared.`), jt();
  const r = Pe(t), o = kf(e, i), l = Pa((c, u) => {
    let f, a = ne, d;
    return Af(() => {
      const m = e[i];
      je(f, m) && (f = m, u());
    }), {
      get() {
        return c(), n.get ? n.get(f) : f;
      },
      set(m) {
        const y = n.set ? n.set(m) : m;
        if (!je(y, f) && !(a !== ne && je(m, a)))
          return;
        const E = s.vnode.props;
        E && // check if parent has passed v-model
        (t in E || i in E || r in E) && (`onUpdate:${t}` in E || `onUpdate:${i}` in E || `onUpdate:${r}` in E) || (f = m, u()), s.emit(`update:${t}`, y), je(m, y) && je(m, a) && !je(y, d) && u(), a = m, d = y;
      }
    };
  });
  return l[Symbol.iterator] = () => {
    let c = 0;
    return {
      next() {
        return c < 2 ? { value: c++ ? o || ne : l, done: !1 } : { done: !0 };
      }
    };
  }, l;
}
const kf = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${pe(t)}Modifiers`] || e[`${Pe(t)}Modifiers`];
function Nm(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || ne;
  if (process.env.NODE_ENV !== "production") {
    const {
      emitsOptions: f,
      propsOptions: [a]
    } = e;
    if (f)
      if (!(t in f))
        (!a || !(Dt(pe(t)) in a)) && C(
          `Component emitted event "${t}" but it is neither declared in the emits option nor as an "${Dt(pe(t))}" prop.`
        );
      else {
        const d = f[t];
        G(d) && (d(...n) || C(
          `Invalid event arguments: event validation failed for event "${t}".`
        ));
      }
  }
  let i = n;
  const r = t.startsWith("update:"), o = r && kf(s, t.slice(7));
  if (o && (o.trim && (i = n.map((f) => Y(f) ? f.trim() : f)), o.number && (i = n.map(sr))), process.env.NODE_ENV !== "production" && Jd(e, t, i), process.env.NODE_ENV !== "production") {
    const f = t.toLowerCase();
    f !== t && s[Dt(f)] && C(
      `Event "${f}" is emitted in component ${br(
        e,
        e.type
      )} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${Pe(
        t
      )}" instead of "${t}".`
    );
  }
  let l, c = s[l = Dt(t)] || // also try camelCase event handler (#2249)
  s[l = Dt(pe(t))];
  !c && r && (c = s[l = Dt(Pe(t))]), c && ft(
    c,
    e,
    6,
    i
  );
  const u = s[l + "Once"];
  if (u) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, ft(
      u,
      e,
      6,
      i
    );
  }
}
const bm = /* @__PURE__ */ new WeakMap();
function Rf(e, t, n = !1) {
  const s = n ? bm : t.emitsCache, i = s.get(e);
  if (i !== void 0)
    return i;
  const r = e.emits;
  let o = {}, l = !1;
  if (!G(e)) {
    const c = (u) => {
      const f = Rf(u, t, !0);
      f && (l = !0, ee(o, f));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !r && !l ? (se(e) && s.set(e, null), null) : (B(r) ? r.forEach((c) => o[c] = null) : ee(o, r), se(e) && s.set(e, o), o);
}
function yr(e, t) {
  return !e || !Kt(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), re(e, t[0].toLowerCase() + t.slice(1)) || re(e, Pe(t)) || re(e, t));
}
let ro = !1;
function Pi() {
  ro = !0;
}
function gi(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: i,
    propsOptions: [r],
    slots: o,
    attrs: l,
    emit: c,
    render: u,
    renderCache: f,
    props: a,
    data: d,
    setupState: m,
    ctx: y,
    inheritAttrs: E
  } = e, k = Ms(e);
  let V, O;
  process.env.NODE_ENV !== "production" && (ro = !1);
  try {
    if (n.shapeFlag & 4) {
      const v = i || s, D = process.env.NODE_ENV !== "production" && m.__isScriptSetup ? new Proxy(v, {
        get(F, w, _) {
          return C(
            `Property '${String(
              w
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          ), Reflect.get(F, w, _);
        }
      }) : v;
      V = Ke(
        u.call(
          D,
          v,
          f,
          process.env.NODE_ENV !== "production" ? mt(a) : a,
          m,
          d,
          y
        )
      ), O = l;
    } else {
      const v = t;
      process.env.NODE_ENV !== "production" && l === a && Pi(), V = Ke(
        v.length > 1 ? v(
          process.env.NODE_ENV !== "production" ? mt(a) : a,
          process.env.NODE_ENV !== "production" ? {
            get attrs() {
              return Pi(), mt(l);
            },
            slots: o,
            emit: c
          } : { attrs: l, slots: o, emit: c }
        ) : v(
          process.env.NODE_ENV !== "production" ? mt(a) : a,
          null
        )
      ), O = t.props ? l : Sm(l);
    }
  } catch (v) {
    Cs.length = 0, fn(v, e, 1), V = ve(ge);
  }
  let h = V, N;
  if (process.env.NODE_ENV !== "production" && V.patchFlag > 0 && V.patchFlag & 2048 && ([h, N] = Mf(V)), O && E !== !1) {
    const v = Object.keys(O), { shapeFlag: D } = h;
    if (v.length) {
      if (D & 7)
        r && v.some(Si) && (O = Om(
          O,
          r
        )), h = ut(h, O, !1, !0);
      else if (process.env.NODE_ENV !== "production" && !ro && h.type !== ge) {
        const F = Object.keys(l), w = [], _ = [];
        for (let T = 0, M = F.length; T < M; T++) {
          const b = F[T];
          Kt(b) ? Si(b) || w.push(b[2].toLowerCase() + b.slice(3)) : _.push(b);
        }
        _.length && C(
          `Extraneous non-props attributes (${_.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`
        ), w.length && C(
          `Extraneous non-emits event listeners (${w.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
        );
      }
    }
  }
  return n.dirs && (process.env.NODE_ENV !== "production" && !ic(h) && C(
    "Runtime directive used on component with non-element root node. The directives will not function as intended."
  ), h = ut(h, null, !1, !0), h.dirs = h.dirs ? h.dirs.concat(n.dirs) : n.dirs), n.transition && (process.env.NODE_ENV !== "production" && !ic(h) && C(
    "Component inside <Transition> renders non-element root node that cannot be animated."
  ), Wt(h, n.transition)), process.env.NODE_ENV !== "production" && N ? N(h) : V = h, Ms(k), V;
}
const Mf = (e) => {
  const t = e.children, n = e.dynamicChildren, s = _r(t, !1);
  if (s) {
    if (process.env.NODE_ENV !== "production" && s.patchFlag > 0 && s.patchFlag & 2048)
      return Mf(s);
  } else return [e, void 0];
  const i = t.indexOf(s), r = n ? n.indexOf(s) : -1, o = (l) => {
    t[i] = l, n && (r > -1 ? n[r] = l : l.patchFlag > 0 && (e.dynamicChildren = [...n, l]));
  };
  return [Ke(s), o];
};
function _r(e, t = !0) {
  let n;
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    if (At(i)) {
      if (i.type !== ge || i.children === "v-if") {
        if (n)
          return;
        if (n = i, process.env.NODE_ENV !== "production" && t && n.patchFlag > 0 && n.patchFlag & 2048)
          return _r(n.children);
      }
    } else
      return;
  }
  return n;
}
const Sm = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Kt(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Om = (e, t) => {
  const n = {};
  for (const s in e)
    (!Si(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
}, ic = (e) => e.shapeFlag & 7 || e.type === ge;
function Tm(e, t, n) {
  const { props: s, children: i, component: r } = e, { props: o, children: l, patchFlag: c } = t, u = r.emitsOptions;
  if (process.env.NODE_ENV !== "production" && (i || l) && gt || t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return s ? rc(s, o, u) : !!o;
    if (c & 8) {
      const f = t.dynamicProps;
      for (let a = 0; a < f.length; a++) {
        const d = f[a];
        if (o[d] !== s[d] && !yr(u, d))
          return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : s === o ? !1 : s ? o ? rc(s, o, u) : !0 : !!o;
  return !1;
}
function rc(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < s.length; i++) {
    const r = s[i];
    if (t[r] !== e[r] && !yr(n, r))
      return !0;
  }
  return !1;
}
function Nr({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const $i = (e) => e.__isSuspense;
let oo = 0;
const Cm = {
  name: "Suspense",
  // In order to make Suspense tree-shakable, we need to avoid importing it
  // directly in the renderer. The renderer checks for the __isSuspense flag
  // on a vnode's type and calls the `process` method, passing in renderer
  // internals.
  __isSuspense: !0,
  process(e, t, n, s, i, r, o, l, c, u) {
    if (e == null)
      wm(
        t,
        n,
        s,
        i,
        r,
        o,
        l,
        c,
        u
      );
    else {
      if (r && r.deps > 0 && !e.suspense.isInFallback) {
        t.suspense = e.suspense, t.suspense.vnode = t, t.el = e.el;
        return;
      }
      Vm(
        e,
        t,
        n,
        s,
        i,
        o,
        l,
        c,
        u
      );
    }
  },
  hydrate: xm,
  normalize: Am
}, Dm = Cm;
function $s(e, t) {
  const n = e.props && e.props[t];
  G(n) && n();
}
function wm(e, t, n, s, i, r, o, l, c) {
  const {
    p: u,
    o: { createElement: f }
  } = c, a = f("div"), d = e.suspense = Pf(
    e,
    i,
    s,
    t,
    a,
    n,
    r,
    o,
    l,
    c
  );
  u(
    null,
    d.pendingBranch = e.ssContent,
    a,
    null,
    s,
    d,
    r,
    o
  ), d.deps > 0 ? ($s(e, "onPending"), $s(e, "onFallback"), u(
    null,
    e.ssFallback,
    t,
    n,
    s,
    null,
    // fallback tree will not have suspense context
    r,
    o
  ), Wn(d, e.ssFallback)) : d.resolve(!1, !0);
}
function Vm(e, t, n, s, i, r, o, l, { p: c, um: u, o: { createElement: f } }) {
  const a = t.suspense = e.suspense;
  a.vnode = t, t.el = e.el;
  const d = t.ssContent, m = t.ssFallback, { activeBranch: y, pendingBranch: E, isInFallback: k, isHydrating: V } = a;
  if (E)
    a.pendingBranch = d, ht(E, d) ? (c(
      E,
      d,
      a.hiddenContainer,
      null,
      i,
      a,
      r,
      o,
      l
    ), a.deps <= 0 ? a.resolve() : k && (V || (c(
      y,
      m,
      n,
      s,
      i,
      null,
      // fallback tree will not have suspense context
      r,
      o,
      l
    ), Wn(a, m)))) : (a.pendingId = oo++, V ? (a.isHydrating = !1, a.activeBranch = E) : u(E, i, a), a.deps = 0, a.effects.length = 0, a.hiddenContainer = f("div"), k ? (c(
      null,
      d,
      a.hiddenContainer,
      null,
      i,
      a,
      r,
      o,
      l
    ), a.deps <= 0 ? a.resolve() : (c(
      y,
      m,
      n,
      s,
      i,
      null,
      // fallback tree will not have suspense context
      r,
      o,
      l
    ), Wn(a, m))) : y && ht(y, d) ? (c(
      y,
      d,
      n,
      s,
      i,
      a,
      r,
      o,
      l
    ), a.resolve(!0)) : (c(
      null,
      d,
      a.hiddenContainer,
      null,
      i,
      a,
      r,
      o,
      l
    ), a.deps <= 0 && a.resolve()));
  else if (y && ht(y, d))
    c(
      y,
      d,
      n,
      s,
      i,
      a,
      r,
      o,
      l
    ), Wn(a, d);
  else if ($s(t, "onPending"), a.pendingBranch = d, d.shapeFlag & 512 ? a.pendingId = d.component.suspenseId : a.pendingId = oo++, c(
    null,
    d,
    a.hiddenContainer,
    null,
    i,
    a,
    r,
    o,
    l
  ), a.deps <= 0)
    a.resolve();
  else {
    const { timeout: O, pendingId: h } = a;
    O > 0 ? setTimeout(() => {
      a.pendingId === h && a.fallback(m);
    }, O) : O === 0 && a.fallback(m);
  }
}
let oc = !1;
function Pf(e, t, n, s, i, r, o, l, c, u, f = !1) {
  process.env.NODE_ENV !== "production" && !oc && (oc = !0, console[console.info ? "info" : "log"](
    "<Suspense> is an experimental feature and its API will likely change."
  ));
  const {
    p: a,
    m: d,
    um: m,
    n: y,
    o: { parentNode: E, remove: k }
  } = u;
  let V;
  const O = Im(e);
  O && t && t.pendingBranch && (V = t.pendingId, t.deps++);
  const h = e.props ? Oi(e.props.timeout) : void 0;
  process.env.NODE_ENV !== "production" && Lo(h, "Suspense timeout");
  const N = r, v = {
    vnode: e,
    parent: t,
    parentComponent: n,
    namespace: o,
    container: s,
    hiddenContainer: i,
    deps: 0,
    pendingId: oo++,
    timeout: typeof h == "number" ? h : -1,
    activeBranch: null,
    pendingBranch: null,
    isInFallback: !f,
    isHydrating: f,
    isUnmounted: !1,
    effects: [],
    resolve(D = !1, F = !1) {
      if (process.env.NODE_ENV !== "production") {
        if (!D && !v.pendingBranch)
          throw new Error(
            "suspense.resolve() is called without a pending branch."
          );
        if (v.isUnmounted)
          throw new Error(
            "suspense.resolve() is called on an already unmounted suspense boundary."
          );
      }
      const {
        vnode: w,
        activeBranch: _,
        pendingBranch: T,
        pendingId: M,
        effects: b,
        parentComponent: L,
        container: q,
        isInFallback: J
      } = v;
      let K = !1;
      v.isHydrating ? v.isHydrating = !1 : D || (K = _ && T.transition && T.transition.mode === "out-in", K && (_.transition.afterLeave = () => {
        M === v.pendingId && (d(
          T,
          q,
          r === N ? y(_) : r,
          0
        ), Jn(b), J && w.ssFallback && (w.ssFallback.el = null));
      }), _ && (E(_.el) === q && (r = y(_)), m(_, L, v, !0), !K && J && w.ssFallback && (w.ssFallback.el = null)), K || d(T, q, r, 0)), Wn(v, T), v.pendingBranch = null, v.isInFallback = !1;
      let W = v.parent, U = !1;
      for (; W; ) {
        if (W.pendingBranch) {
          W.effects.push(...b), U = !0;
          break;
        }
        W = W.parent;
      }
      !U && !K && Jn(b), v.effects = [], O && t && t.pendingBranch && V === t.pendingId && (t.deps--, t.deps === 0 && !F && t.resolve()), $s(w, "onResolve");
    },
    fallback(D) {
      if (!v.pendingBranch)
        return;
      const { vnode: F, activeBranch: w, parentComponent: _, container: T, namespace: M } = v;
      $s(F, "onFallback");
      const b = y(w), L = () => {
        v.isInFallback && (a(
          null,
          D,
          T,
          b,
          _,
          null,
          // fallback tree will not have suspense context
          M,
          l,
          c
        ), Wn(v, D));
      }, q = D.transition && D.transition.mode === "out-in";
      q && (w.transition.afterLeave = L), v.isInFallback = !0, m(
        w,
        _,
        null,
        // no suspense so unmount hooks fire now
        !0
        // shouldRemove
      ), q || L();
    },
    move(D, F, w) {
      v.activeBranch && d(v.activeBranch, D, F, w), v.container = D;
    },
    next() {
      return v.activeBranch && y(v.activeBranch);
    },
    registerDep(D, F, w) {
      const _ = !!v.pendingBranch;
      _ && v.deps++;
      const T = D.vnode.el;
      D.asyncDep.catch((M) => {
        fn(M, D, 0);
      }).then((M) => {
        if (D.isUnmounted || v.isUnmounted || v.pendingId !== D.suspenseId)
          return;
        D.asyncResolved = !0;
        const { vnode: b } = D;
        process.env.NODE_ENV !== "production" && Hn(b), uo(D, M, !1), T && (b.el = T);
        const L = !T && D.subTree.el;
        F(
          D,
          b,
          // component may have been moved before resolve.
          // if this is not a hydration, instance.subTree will be the comment
          // placeholder.
          E(T || D.subTree.el),
          // anchor will not be used if this is hydration, so only need to
          // consider the comment placeholder case.
          T ? null : y(D.subTree),
          v,
          o,
          w
        ), L && (b.placeholder = null, k(L)), Nr(D, b.el), process.env.NODE_ENV !== "production" && Bn(), _ && --v.deps === 0 && v.resolve();
      });
    },
    unmount(D, F) {
      v.isUnmounted = !0, v.activeBranch && m(
        v.activeBranch,
        n,
        D,
        F
      ), v.pendingBranch && m(
        v.pendingBranch,
        n,
        D,
        F
      );
    }
  };
  return v;
}
function xm(e, t, n, s, i, r, o, l, c) {
  const u = t.suspense = Pf(
    t,
    s,
    n,
    e.parentNode,
    // eslint-disable-next-line no-restricted-globals
    document.createElement("div"),
    null,
    i,
    r,
    o,
    l,
    !0
  ), f = c(
    e,
    u.pendingBranch = t.ssContent,
    n,
    u,
    r,
    o
  );
  return u.deps === 0 && u.resolve(!1, !0), f;
}
function Am(e) {
  const { shapeFlag: t, children: n } = e, s = t & 32;
  e.ssContent = lc(
    s ? n.default : n
  ), e.ssFallback = s ? lc(n.fallback) : ve(ge);
}
function lc(e) {
  let t;
  if (G(e)) {
    const n = Dn && e._c;
    n && (e._d = !1, Ls()), e = e(), n && (e._d = !0, t = $e, Lf());
  }
  if (B(e)) {
    const n = _r(e);
    process.env.NODE_ENV !== "production" && !n && e.filter((s) => s !== Jo).length > 0 && C("<Suspense> slots expect a single root node."), e = n;
  }
  return e = Ke(e), t && !e.dynamicChildren && (e.dynamicChildren = t.filter((n) => n !== e)), e;
}
function $f(e, t) {
  t && t.pendingBranch ? B(e) ? t.effects.push(...e) : t.effects.push(e) : Jn(e);
}
function Wn(e, t) {
  e.activeBranch = t;
  const { vnode: n, parentComponent: s } = e;
  let i = t.el;
  for (; !i && t.component; )
    t = t.component.subTree, i = t.el;
  n.el = i, s && s.subTree === n && (s.vnode.el = i, Nr(s, i));
}
function Im(e) {
  const t = e.props && e.props.suspensible;
  return t != null && t !== !1;
}
const Se = Symbol.for("v-fgt"), Vt = Symbol.for("v-txt"), ge = Symbol.for("v-cmt"), on = Symbol.for("v-stc"), Cs = [];
let $e = null;
function Ls(e = !1) {
  Cs.push($e = e ? null : []);
}
function Lf() {
  Cs.pop(), $e = Cs[Cs.length - 1] || null;
}
let Dn = 1;
function Fs(e, t = !1) {
  Dn += e, e < 0 && $e && t && ($e.hasOnce = !0);
}
function Ff(e) {
  return e.dynamicChildren = Dn > 0 ? $e || Fn : null, Lf(), Dn > 0 && $e && $e.push(e), e;
}
function km(e, t, n, s, i, r) {
  return Ff(
    tl(
      e,
      t,
      n,
      s,
      i,
      r,
      !0
    )
  );
}
function Li(e, t, n, s, i) {
  return Ff(
    ve(
      e,
      t,
      n,
      s,
      i,
      !0
    )
  );
}
function At(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function ht(e, t) {
  if (process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && e.component) {
    const n = hi.get(t.type);
    if (n && n.has(e.component))
      return e.shapeFlag &= -257, t.shapeFlag &= -513, !1;
  }
  return e.type === t.type && e.key === t.key;
}
let lo;
function Rm(e) {
  lo = e;
}
const Mm = (...e) => Bf(
  ...lo ? lo(e, be) : e
), Hf = ({ key: e }) => e ?? null, Ei = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Y(e) || _e(e) || G(e) ? { i: be, r: e, k: t, f: !!n } : e : null);
function tl(e, t = null, n = null, s = 0, i = null, r = e === Se ? 0 : 1, o = !1, l = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Hf(t),
    ref: t && Ei(t),
    scopeId: dr,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: s,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: be
  };
  return l ? (sl(c, n), r & 128 && e.normalize(c)) : n && (c.shapeFlag |= Y(n) ? 8 : 16), process.env.NODE_ENV !== "production" && c.key !== c.key && C("VNode created with invalid key (NaN). VNode type:", c.type), Dn > 0 && // avoid a block node from tracking itself
  !o && // has current parent block
  $e && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && $e.push(c), c;
}
const ve = process.env.NODE_ENV !== "production" ? Mm : Bf;
function Bf(e, t = null, n = null, s = 0, i = null, r = !1) {
  if ((!e || e === Jo) && (process.env.NODE_ENV !== "production" && !e && C(`Invalid vnode type when creating vnode: ${e}.`), e = ge), At(e)) {
    const l = ut(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && sl(l, n), Dn > 0 && !r && $e && (l.shapeFlag & 6 ? $e[$e.indexOf(e)] = l : $e.push(l)), l.patchFlag = -2, l;
  }
  if (Xf(e) && (e = e.__vccOpts), t) {
    t = jf(t);
    let { class: l, style: c } = t;
    l && !Y(l) && (t.class = ls(l)), se(c) && (Gn(c) && !B(c) && (c = ee({}, c)), t.style = os(c));
  }
  const o = Y(e) ? 1 : $i(e) ? 128 : Ja(e) ? 64 : se(e) ? 4 : G(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && o & 4 && Gn(e) && (e = Q(e), C(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), tl(
    e,
    t,
    n,
    s,
    i,
    o,
    r,
    !0
  );
}
function jf(e) {
  return e ? Gn(e) || vf(e) ? ee({}, e) : e : null;
}
function ut(e, t, n = !1, s = !1) {
  const { props: i, ref: r, patchFlag: o, children: l, transition: c } = e, u = t ? Kf(i || {}, t) : i, f = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && Hf(u),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? B(r) ? r.concat(Ei(t)) : [r, Ei(t)] : Ei(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && o === -1 && B(l) ? l.map(Uf) : l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Se ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: c,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && ut(e.ssContent),
    ssFallback: e.ssFallback && ut(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return c && s && Wt(
    f,
    c.clone(f)
  ), f;
}
function Uf(e) {
  const t = ut(e);
  return B(e.children) && (t.children = e.children.map(Uf)), t;
}
function nl(e = " ", t = 0) {
  return ve(Vt, null, e, t);
}
function Pm(e, t) {
  const n = ve(on, null, e);
  return n.staticCount = t, n;
}
function $m(e = "", t = !1) {
  return t ? (Ls(), Li(ge, null, e)) : ve(ge, null, e);
}
function Ke(e) {
  return e == null || typeof e == "boolean" ? ve(ge) : B(e) ? ve(
    Se,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : At(e) ? Qt(e) : ve(Vt, null, String(e));
}
function Qt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : ut(e);
}
function sl(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (B(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), sl(e, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = t._;
      !i && !vf(t) ? t._ctx = be : i === 3 && be && (be.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else G(t) ? (t = { default: t, _ctx: be }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [nl(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Kf(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const i in s)
      if (i === "class")
        t.class !== s.class && (t.class = ls([t.class, s.class]));
      else if (i === "style")
        t.style = os([t.style, s.style]);
      else if (Kt(i)) {
        const r = t[i], o = s[i];
        o && r !== o && !(B(r) && r.includes(o)) && (t[i] = r ? [].concat(r, o) : o);
      } else i !== "" && (t[i] = s[i]);
  }
  return t;
}
function Ye(e, t, n, s = null) {
  ft(e, t, 7, [
    n,
    s
  ]);
}
const Lm = hf();
let Fm = 0;
function Wf(e, t, n) {
  const s = e.type, i = (t ? t.appContext : e.appContext) || Lm, r = {
    uid: Fm++,
    vnode: e,
    type: s,
    parent: t,
    appContext: i,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new ko(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(i.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: _f(s, i),
    emitsOptions: Rf(s, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ne,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: ne,
    data: ne,
    props: ne,
    attrs: ne,
    slots: ne,
    refs: ne,
    setupState: ne,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return process.env.NODE_ENV !== "production" ? r.ctx = Ah(r) : r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = Nm.bind(null, r), e.ce && e.ce(r), r;
}
let we = null;
const We = () => we || be;
let Fi, co;
{
  const e = qs(), t = (n, s) => {
    let i;
    return (i = e[n]) || (i = e[n] = []), i.push(s), (r) => {
      i.length > 1 ? i.forEach((o) => o(r)) : i[0](r);
    };
  };
  Fi = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => we = n
  ), co = t(
    "__VUE_SSR_SETTERS__",
    (n) => Yn = n
  );
}
const wn = (e) => {
  const t = we;
  return Fi(e), e.scope.on(), () => {
    e.scope.off(), Fi(t);
  };
}, ao = () => {
  we && we.scope.off(), Fi(null);
}, Hm = /* @__PURE__ */ Ve("slot,component");
function fo(e, { isNativeTag: t }) {
  (Hm(e) || t(e)) && C(
    "Do not use built-in or reserved HTML elements as component id: " + e
  );
}
function qf(e) {
  return e.vnode.shapeFlag & 4;
}
let Yn = !1;
function Gf(e, t = !1, n = !1) {
  t && co(t);
  const { props: s, children: i } = e.vnode, r = qf(e);
  nm(e, s, r, t), dm(e, i, n || t);
  const o = r ? Bm(e, t) : void 0;
  return t && co(!1), o;
}
function Bm(e, t) {
  var n;
  const s = e.type;
  if (process.env.NODE_ENV !== "production") {
    if (s.name && fo(s.name, e.appContext.config), s.components) {
      const r = Object.keys(s.components);
      for (let o = 0; o < r.length; o++)
        fo(r[o], e.appContext.config);
    }
    if (s.directives) {
      const r = Object.keys(s.directives);
      for (let o = 0; o < r.length; o++)
        qa(r[o]);
    }
    s.compilerOptions && il() && C(
      '"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.'
    );
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Ss), process.env.NODE_ENV !== "production" && Ih(e);
  const { setup: i } = s;
  if (i) {
    _t();
    const r = e.setupContext = i.length > 1 ? Yf(e) : null, o = wn(e), l = An(
      i,
      e,
      0,
      [
        process.env.NODE_ENV !== "production" ? mt(e.props) : e.props,
        r
      ]
    ), c = er(l);
    if (Nt(), o(), (c || e.sp) && !rn(e) && qo(e), c) {
      if (l.then(ao, ao), t)
        return l.then((u) => {
          uo(e, u, t);
        }).catch((u) => {
          fn(u, e, 0);
        });
      if (e.asyncDep = l, process.env.NODE_ENV !== "production" && !e.suspense) {
        const u = (n = s.name) != null ? n : "Anonymous";
        C(
          `Component <${u}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
        );
      }
    } else
      uo(e, l, t);
  } else
    zf(e, t);
}
function uo(e, t, n) {
  G(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : se(t) ? (process.env.NODE_ENV !== "production" && At(t) && C(
    "setup() should not return VNodes directly - return a render function instead."
  ), process.env.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = $o(t), process.env.NODE_ENV !== "production" && kh(e)) : process.env.NODE_ENV !== "production" && t !== void 0 && C(
    `setup() should return an object. Received: ${t === null ? "null" : typeof t}`
  ), zf(e, n);
}
let Ds, po;
function Jf(e) {
  Ds = e, po = (t) => {
    t.render._rc && (t.withProxy = new Proxy(t.ctx, xh));
  };
}
const il = () => !Ds;
function zf(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && Ds && !s.render) {
      const i = s.template || Zo(e).template;
      if (i) {
        process.env.NODE_ENV !== "production" && kt(e, "compile");
        const { isCustomElement: r, compilerOptions: o } = e.appContext.config, { delimiters: l, compilerOptions: c } = s, u = ee(
          ee(
            {
              isCustomElement: r,
              delimiters: l
            },
            o
          ),
          c
        );
        s.render = Ds(i, u), process.env.NODE_ENV !== "production" && Rt(e, "compile");
      }
    }
    e.render = s.render || me, po && po(e);
  }
  {
    const i = wn(e);
    _t();
    try {
      Jh(e);
    } finally {
      Nt(), i();
    }
  }
  process.env.NODE_ENV !== "production" && !s.render && e.render === me && !t && (!Ds && s.template ? C(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
  ) : C("Component is missing template or render function: ", s));
}
const cc = process.env.NODE_ENV !== "production" ? {
  get(e, t) {
    return Pi(), Ce(e, "get", ""), e[t];
  },
  set() {
    return C("setupContext.attrs is readonly."), !1;
  },
  deleteProperty() {
    return C("setupContext.attrs is readonly."), !1;
  }
} : {
  get(e, t) {
    return Ce(e, "get", ""), e[t];
  }
};
function jm(e) {
  return new Proxy(e.slots, {
    get(t, n) {
      return Ce(e, "get", "$slots"), t[n];
    }
  });
}
function Yf(e) {
  const t = (n) => {
    if (process.env.NODE_ENV !== "production" && (e.exposed && C("expose() should be called only once per setup()."), n != null)) {
      let s = typeof n;
      s === "object" && (B(n) ? s = "array" : _e(n) && (s = "ref")), s !== "object" && C(
        `expose() should be passed a plain object, received ${s}.`
      );
    }
    e.exposed = n || {};
  };
  if (process.env.NODE_ENV !== "production") {
    let n, s;
    return Object.freeze({
      get attrs() {
        return n || (n = new Proxy(e.attrs, cc));
      },
      get slots() {
        return s || (s = jm(e));
      },
      get emit() {
        return (i, ...r) => e.emit(i, ...r);
      },
      expose: t
    });
  } else
    return {
      attrs: new Proxy(e.attrs, cc),
      slots: e.slots,
      emit: e.emit,
      expose: t
    };
}
function Ys(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy($o(ka(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Sn)
        return Sn[n](e);
    },
    has(t, n) {
      return n in t || n in Sn;
    }
  })) : e.proxy;
}
const Um = /(?:^|[-_])\w/g, Km = (e) => e.replace(Um, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Xn(e, t = !0) {
  return G(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function br(e, t, n = !1) {
  let s = Xn(t);
  if (!s && t.__file) {
    const i = t.__file.match(/([^/\\]+)\.\w+$/);
    i && (s = i[1]);
  }
  if (!s && e && e.parent) {
    const i = (r) => {
      for (const o in r)
        if (r[o] === t)
          return o;
    };
    s = i(
      e.components || e.parent.type.components
    ) || i(e.appContext.components);
  }
  return s ? Km(s) : n ? "App" : "Anonymous";
}
function Xf(e) {
  return G(e) && "__vccOpts" in e;
}
const Zf = (e, t) => {
  const n = Td(e, t, Yn);
  if (process.env.NODE_ENV !== "production") {
    const s = We();
    s && s.appContext.config.warnRecursiveComputed && (n._warnRecursive = !0);
  }
  return n;
};
function Qf(e, t, n) {
  try {
    Fs(-1);
    const s = arguments.length;
    return s === 2 ? se(t) && !B(t) ? At(t) ? ve(e, null, [t]) : ve(e, t) : ve(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && At(n) && (n = [n]), ve(e, t, n));
  } finally {
    Fs(1);
  }
}
function eu() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, s = { style: "color:#eb2f96" }, i = {
    __vue_custom_formatter: !0,
    header(a) {
      if (!se(a))
        return null;
      if (a.__isVue)
        return ["div", e, "VueInstance"];
      if (_e(a)) {
        _t();
        const d = a.value;
        return Nt(), [
          "div",
          {},
          ["span", e, f(a)],
          "<",
          l(d),
          ">"
        ];
      } else {
        if (Bt(a))
          return [
            "div",
            {},
            ["span", e, Le(a) ? "ShallowReactive" : "Reactive"],
            "<",
            l(a),
            `>${bt(a) ? " (readonly)" : ""}`
          ];
        if (bt(a))
          return [
            "div",
            {},
            ["span", e, Le(a) ? "ShallowReadonly" : "Readonly"],
            "<",
            l(a),
            ">"
          ];
      }
      return null;
    },
    hasBody(a) {
      return a && a.__isVue;
    },
    body(a) {
      if (a && a.__isVue)
        return [
          "div",
          {},
          ...r(a.$)
        ];
    }
  };
  function r(a) {
    const d = [];
    a.type.props && a.props && d.push(o("props", Q(a.props))), a.setupState !== ne && d.push(o("setup", a.setupState)), a.data !== ne && d.push(o("data", Q(a.data)));
    const m = c(a, "computed");
    m && d.push(o("computed", m));
    const y = c(a, "inject");
    return y && d.push(o("injected", y)), d.push([
      "div",
      {},
      [
        "span",
        {
          style: s.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: a }]
    ]), d;
  }
  function o(a, d) {
    return d = ee({}, d), Object.keys(d).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        a
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(d).map((m) => [
          "div",
          {},
          ["span", s, m + ": "],
          l(d[m], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function l(a, d = !0) {
    return typeof a == "number" ? ["span", t, a] : typeof a == "string" ? ["span", n, JSON.stringify(a)] : typeof a == "boolean" ? ["span", s, a] : se(a) ? ["object", { object: d ? Q(a) : a }] : ["span", n, String(a)];
  }
  function c(a, d) {
    const m = a.type;
    if (G(m))
      return;
    const y = {};
    for (const E in a.ctx)
      u(m, E, d) && (y[E] = a.ctx[E]);
    return y;
  }
  function u(a, d, m) {
    const y = a[m];
    if (B(y) && y.includes(d) || se(y) && d in y || a.extends && u(a.extends, d, m) || a.mixins && a.mixins.some((E) => u(E, d, m)))
      return !0;
  }
  function f(a) {
    return Le(a) ? "ShallowRef" : a.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(i) : window.devtoolsFormatters = [i];
}
function Wm(e, t, n, s) {
  const i = n[s];
  if (i && tu(i, e))
    return i;
  const r = t();
  return r.memo = e.slice(), r.cacheIndex = s, n[s] = r;
}
function tu(e, t) {
  const n = e.memo;
  if (n.length != t.length)
    return !1;
  for (let s = 0; s < n.length; s++)
    if (je(n[s], t[s]))
      return !1;
  return Dn > 0 && $e && $e.push(e), !0;
}
const ho = "3.5.24", ye = process.env.NODE_ENV !== "production" ? C : me, qm = ur, Gm = (process.env.NODE_ENV, dt), Jm = (process.env.NODE_ENV, Ho), zm = {
  createComponentInstance: Wf,
  setupComponent: Gf,
  renderComponentRoot: gi,
  setCurrentRenderingInstance: Ms,
  isVNode: At,
  normalizeVNode: Ke,
  getComponentPublicInstance: Ys,
  ensureValidVNode: Yo,
  pushWarningContext: Hn,
  popWarningContext: Bn
}, Ym = zm, Xm = null, Zm = null, Qm = null;
let mo;
const ac = typeof window < "u" && window.trustedTypes;
if (ac)
  try {
    mo = /* @__PURE__ */ ac.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch (e) {
    process.env.NODE_ENV !== "production" && ye(`Error creating trusted types policy: ${e}`);
  }
const nu = mo ? (e) => mo.createHTML(e) : (e) => e, eg = "http://www.w3.org/2000/svg", tg = "http://www.w3.org/1998/Math/MathML", Pt = typeof document < "u" ? document : null, fc = Pt && /* @__PURE__ */ Pt.createElement("template"), ng = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const i = t === "svg" ? Pt.createElementNS(eg, e) : t === "mathml" ? Pt.createElementNS(tg, e) : n ? Pt.createElement(e, { is: n }) : Pt.createElement(e);
    return e === "select" && s && s.multiple != null && i.setAttribute("multiple", s.multiple), i;
  },
  createText: (e) => Pt.createTextNode(e),
  createComment: (e) => Pt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Pt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, i, r) {
    const o = n ? n.previousSibling : t.lastChild;
    if (i && (i === r || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), n), !(i === r || !(i = i.nextSibling)); )
        ;
    else {
      fc.innerHTML = nu(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const l = fc.content;
      if (s === "svg" || s === "mathml") {
        const c = l.firstChild;
        for (; c.firstChild; )
          l.appendChild(c.firstChild);
        l.removeChild(c);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      o ? o.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, Jt = "transition", hs = "animation", Zn = Symbol("_vtc"), su = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
}, iu = /* @__PURE__ */ ee(
  {},
  Ko,
  su
), sg = (e) => (e.displayName = "Transition", e.props = iu, e), ig = /* @__PURE__ */ sg(
  (e, { slots: t }) => Qf(Qa, ru(e), t)
), dn = (e, t = []) => {
  B(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, uc = (e) => e ? B(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function ru(e) {
  const t = {};
  for (const b in e)
    b in su || (t[b] = e[b]);
  if (e.css === !1)
    return t;
  const {
    name: n = "v",
    type: s,
    duration: i,
    enterFromClass: r = `${n}-enter-from`,
    enterActiveClass: o = `${n}-enter-active`,
    enterToClass: l = `${n}-enter-to`,
    appearFromClass: c = r,
    appearActiveClass: u = o,
    appearToClass: f = l,
    leaveFromClass: a = `${n}-leave-from`,
    leaveActiveClass: d = `${n}-leave-active`,
    leaveToClass: m = `${n}-leave-to`
  } = e, y = rg(i), E = y && y[0], k = y && y[1], {
    onBeforeEnter: V,
    onEnter: O,
    onEnterCancelled: h,
    onLeave: N,
    onLeaveCancelled: v,
    onBeforeAppear: D = V,
    onAppear: F = O,
    onAppearCancelled: w = h
  } = t, _ = (b, L, q, J) => {
    b._enterCancelled = J, Yt(b, L ? f : l), Yt(b, L ? u : o), q && q();
  }, T = (b, L) => {
    b._isLeaving = !1, Yt(b, a), Yt(b, m), Yt(b, d), L && L();
  }, M = (b) => (L, q) => {
    const J = b ? F : O, K = () => _(L, b, q);
    dn(J, [L, K]), pc(() => {
      Yt(L, b ? c : r), Ot(L, b ? f : l), uc(J) || dc(L, s, E, K);
    });
  };
  return ee(t, {
    onBeforeEnter(b) {
      dn(V, [b]), Ot(b, r), Ot(b, o);
    },
    onBeforeAppear(b) {
      dn(D, [b]), Ot(b, c), Ot(b, u);
    },
    onEnter: M(!1),
    onAppear: M(!0),
    onLeave(b, L) {
      b._isLeaving = !0;
      const q = () => T(b, L);
      Ot(b, a), b._enterCancelled ? (Ot(b, d), go(b)) : (go(b), Ot(b, d)), pc(() => {
        b._isLeaving && (Yt(b, a), Ot(b, m), uc(N) || dc(b, s, k, q));
      }), dn(N, [b, q]);
    },
    onEnterCancelled(b) {
      _(b, !1, void 0, !0), dn(h, [b]);
    },
    onAppearCancelled(b) {
      _(b, !0, void 0, !0), dn(w, [b]);
    },
    onLeaveCancelled(b) {
      T(b), dn(v, [b]);
    }
  });
}
function rg(e) {
  if (e == null)
    return null;
  if (se(e))
    return [Br(e.enter), Br(e.leave)];
  {
    const t = Br(e);
    return [t, t];
  }
}
function Br(e) {
  const t = Oi(e);
  return process.env.NODE_ENV !== "production" && Lo(t, "<transition> explicit duration"), t;
}
function Ot(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[Zn] || (e[Zn] = /* @__PURE__ */ new Set())).add(t);
}
function Yt(e, t) {
  t.split(/\s+/).forEach((s) => s && e.classList.remove(s));
  const n = e[Zn];
  n && (n.delete(t), n.size || (e[Zn] = void 0));
}
function pc(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let og = 0;
function dc(e, t, n, s) {
  const i = e._endId = ++og, r = () => {
    i === e._endId && s();
  };
  if (n != null)
    return setTimeout(r, n);
  const { type: o, timeout: l, propCount: c } = ou(e, t);
  if (!o)
    return s();
  const u = o + "end";
  let f = 0;
  const a = () => {
    e.removeEventListener(u, d), r();
  }, d = (m) => {
    m.target === e && ++f >= c && a();
  };
  setTimeout(() => {
    f < c && a();
  }, l + 1), e.addEventListener(u, d);
}
function ou(e, t) {
  const n = window.getComputedStyle(e), s = (y) => (n[y] || "").split(", "), i = s(`${Jt}Delay`), r = s(`${Jt}Duration`), o = hc(i, r), l = s(`${hs}Delay`), c = s(`${hs}Duration`), u = hc(l, c);
  let f = null, a = 0, d = 0;
  t === Jt ? o > 0 && (f = Jt, a = o, d = r.length) : t === hs ? u > 0 && (f = hs, a = u, d = c.length) : (a = Math.max(o, u), f = a > 0 ? o > u ? Jt : hs : null, d = f ? f === Jt ? r.length : c.length : 0);
  const m = f === Jt && /\b(?:transform|all)(?:,|$)/.test(
    s(`${Jt}Property`).toString()
  );
  return {
    type: f,
    timeout: a,
    propCount: d,
    hasTransform: m
  };
}
function hc(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, s) => mc(n) + mc(e[s])));
}
function mc(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function go(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function lg(e, t, n) {
  const s = e[Zn];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Hi = Symbol("_vod"), lu = Symbol("_vsh"), cu = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(e, { value: t }, { transition: n }) {
    e[Hi] = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : ms(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: s }) {
    !t != !n && (s ? t ? (s.beforeEnter(e), ms(e, !0), s.enter(e)) : s.leave(e, () => {
      ms(e, !1);
    }) : ms(e, t));
  },
  beforeUnmount(e, { value: t }) {
    ms(e, t);
  }
};
function ms(e, t) {
  e.style.display = t ? e[Hi] : "none", e[lu] = !t;
}
function cg() {
  cu.getSSRProps = ({ value: e }) => {
    if (!e)
      return { style: { display: "none" } };
  };
}
const au = Symbol(process.env.NODE_ENV !== "production" ? "CSS_VAR_TEXT" : "");
function ag(e) {
  const t = We();
  if (!t) {
    process.env.NODE_ENV !== "production" && ye("useCssVars is called without current active component instance.");
    return;
  }
  const n = t.ut = (i = e(t.proxy)) => {
    Array.from(
      document.querySelectorAll(`[data-v-owner="${t.uid}"]`)
    ).forEach((r) => Bi(r, i));
  };
  process.env.NODE_ENV !== "production" && (t.getCssVars = () => e(t.proxy));
  const s = () => {
    const i = e(t.proxy);
    t.ce ? Bi(t.ce, i) : Eo(t.subTree, i), n(i);
  };
  Go(() => {
    Jn(s);
  }), as(() => {
    Kn(s, me, { flush: "post" });
    const i = new MutationObserver(s);
    i.observe(t.subTree.el.parentNode, { childList: !0 }), vr(() => i.disconnect());
  });
}
function Eo(e, t) {
  if (e.shapeFlag & 128) {
    const n = e.suspense;
    e = n.activeBranch, n.pendingBranch && !n.isHydrating && n.effects.push(() => {
      Eo(n.activeBranch, t);
    });
  }
  for (; e.component; )
    e = e.component.subTree;
  if (e.shapeFlag & 1 && e.el)
    Bi(e.el, t);
  else if (e.type === Se)
    e.children.forEach((n) => Eo(n, t));
  else if (e.type === on) {
    let { el: n, anchor: s } = e;
    for (; n && (Bi(n, t), n !== s); )
      n = n.nextSibling;
  }
}
function Bi(e, t) {
  if (e.nodeType === 1) {
    const n = e.style;
    let s = "";
    for (const i in t) {
      const r = ma(t[i]);
      n.setProperty(`--${i}`, r), s += `--${i}: ${r};`;
    }
    n[au] = s;
  }
}
const fg = /(?:^|;)\s*display\s*:/;
function ug(e, t, n) {
  const s = e.style, i = Y(n);
  let r = !1;
  if (n && !i) {
    if (t)
      if (Y(t))
        for (const o of t.split(";")) {
          const l = o.slice(0, o.indexOf(":")).trim();
          n[l] == null && vi(s, l, "");
        }
      else
        for (const o in t)
          n[o] == null && vi(s, o, "");
    for (const o in n)
      o === "display" && (r = !0), vi(s, o, n[o]);
  } else if (i) {
    if (t !== n) {
      const o = s[au];
      o && (n += ";" + o), s.cssText = n, r = fg.test(n);
    }
  } else t && e.removeAttribute("style");
  Hi in e && (e[Hi] = r ? s.display : "", e[lu] && (s.display = "none"));
}
const pg = /[^\\];\s*$/, gc = /\s*!important$/;
function vi(e, t, n) {
  if (B(n))
    n.forEach((s) => vi(e, t, s));
  else if (n == null && (n = ""), process.env.NODE_ENV !== "production" && pg.test(n) && ye(
    `Unexpected semicolon at the end of '${t}' style value: '${n}'`
  ), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = dg(e, t);
    gc.test(n) ? e.setProperty(
      Pe(s),
      n.replace(gc, ""),
      "important"
    ) : e[s] = n;
  }
}
const Ec = ["Webkit", "Moz", "ms"], jr = {};
function dg(e, t) {
  const n = jr[t];
  if (n)
    return n;
  let s = pe(t);
  if (s !== "filter" && s in e)
    return jr[t] = s;
  s = xt(s);
  for (let i = 0; i < Ec.length; i++) {
    const r = Ec[i] + s;
    if (r in e)
      return jr[t] = r;
  }
  return t;
}
const vc = "http://www.w3.org/1999/xlink";
function yc(e, t, n, s, i, r = Fp(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(vc, t.slice(6, t.length)) : e.setAttributeNS(vc, t, n) : n == null || r && !Io(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    r ? "" : Qe(n) ? String(n) : n
  );
}
function _c(e, t, n, s, i) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? nu(n) : n);
    return;
  }
  const r = e.tagName;
  if (t === "value" && r !== "PROGRESS" && // custom elements may use _value internally
  !r.includes("-")) {
    const l = r === "OPTION" ? e.getAttribute("value") || "" : e.value, c = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== c || !("_value" in e)) && (e.value = c), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let o = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = Io(n) : n == null && l === "string" ? (n = "", o = !0) : l === "number" && (n = 0, o = !0);
  }
  try {
    e[t] = n;
  } catch (l) {
    process.env.NODE_ENV !== "production" && !o && ye(
      `Failed setting prop "${t}" on <${r.toLowerCase()}>: value ${n} is invalid.`,
      l
    );
  }
  o && e.removeAttribute(i || t);
}
function Ht(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function hg(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const Nc = Symbol("_vei");
function mg(e, t, n, s, i = null) {
  const r = e[Nc] || (e[Nc] = {}), o = r[t];
  if (s && o)
    o.value = process.env.NODE_ENV !== "production" ? Sc(s, t) : s;
  else {
    const [l, c] = gg(t);
    if (s) {
      const u = r[t] = yg(
        process.env.NODE_ENV !== "production" ? Sc(s, t) : s,
        i
      );
      Ht(e, l, u, c);
    } else o && (hg(e, l, o, c), r[t] = void 0);
  }
}
const bc = /(?:Once|Passive|Capture)$/;
function gg(e) {
  let t;
  if (bc.test(e)) {
    t = {};
    let s;
    for (; s = e.match(bc); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Pe(e.slice(2)), t];
}
let Ur = 0;
const Eg = /* @__PURE__ */ Promise.resolve(), vg = () => Ur || (Eg.then(() => Ur = 0), Ur = Date.now());
function yg(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    ft(
      _g(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = vg(), n;
}
function Sc(e, t) {
  return G(e) || B(e) ? e : (ye(
    `Wrong type passed as event handler to ${t} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof e}.`
  ), me);
}
function _g(e, t) {
  if (B(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (s) => (i) => !i._stopped && s && s(i)
    );
  } else
    return t;
}
const Oc = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Ng = (e, t, n, s, i, r) => {
  const o = i === "svg";
  t === "class" ? lg(e, s, o) : t === "style" ? ug(e, n, s) : Kt(t) ? Si(t) || mg(e, t, n, s, r) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : bg(e, t, s, o)) ? (_c(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && yc(e, t, s, o, r, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !Y(s)) ? _c(e, pe(t), s, r, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), yc(e, t, s, o));
};
function bg(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Oc(t) && G(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return Oc(t) && Y(n) ? !1 : t in e;
}
const Tc = {};
// @__NO_SIDE_EFFECTS__
function fu(e, t, n) {
  let s = /* @__PURE__ */ Wo(e, t);
  tr(s) && (s = ee({}, s, t));
  class i extends Sr {
    constructor(o) {
      super(s, o, n);
    }
  }
  return i.def = s, i;
}
const Sg = (/* @__NO_SIDE_EFFECTS__ */ (e, t) => /* @__PURE__ */ fu(e, t, Nu)), Og = typeof HTMLElement < "u" ? HTMLElement : class {
};
class Sr extends Og {
  constructor(t, n = {}, s = Ki) {
    super(), this._def = t, this._props = n, this._createApp = s, this._isVueCE = !0, this._instance = null, this._app = null, this._nonce = this._def.nonce, this._connected = !1, this._resolved = !1, this._patching = !1, this._dirty = !1, this._numberProps = null, this._styleChildren = /* @__PURE__ */ new WeakSet(), this._ob = null, this.shadowRoot && s !== Ki ? this._root = this.shadowRoot : (process.env.NODE_ENV !== "production" && this.shadowRoot && ye(
      "Custom element has pre-rendered declarative shadow root but is not defined as hydratable. Use `defineSSRCustomElement`."
    ), t.shadowRoot !== !1 ? (this.attachShadow(
      ee({}, t.shadowRootOptions, {
        mode: "open"
      })
    ), this._root = this.shadowRoot) : this._root = this);
  }
  connectedCallback() {
    if (!this.isConnected) return;
    !this.shadowRoot && !this._resolved && this._parseSlots(), this._connected = !0;
    let t = this;
    for (; t = t && (t.parentNode || t.host); )
      if (t instanceof Sr) {
        this._parent = t;
        break;
      }
    this._instance || (this._resolved ? this._mount(this._def) : t && t._pendingResolve ? this._pendingResolve = t._pendingResolve.then(() => {
      this._pendingResolve = void 0, this._resolveDef();
    }) : this._resolveDef());
  }
  _setParent(t = this._parent) {
    t && (this._instance.parent = t._instance, this._inheritParentContext(t));
  }
  _inheritParentContext(t = this._parent) {
    t && this._app && Object.setPrototypeOf(
      this._app._context.provides,
      t._instance.provides
    );
  }
  disconnectedCallback() {
    this._connected = !1, Gs(() => {
      this._connected || (this._ob && (this._ob.disconnect(), this._ob = null), this._app && this._app.unmount(), this._instance && (this._instance.ce = void 0), this._app = this._instance = null, this._teleportTargets && (this._teleportTargets.clear(), this._teleportTargets = void 0));
    });
  }
  _processMutations(t) {
    for (const n of t)
      this._setAttr(n.attributeName);
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    if (this._pendingResolve)
      return;
    for (let s = 0; s < this.attributes.length; s++)
      this._setAttr(this.attributes[s].name);
    this._ob = new MutationObserver(this._processMutations.bind(this)), this._ob.observe(this, { attributes: !0 });
    const t = (s, i = !1) => {
      this._resolved = !0, this._pendingResolve = void 0;
      const { props: r, styles: o } = s;
      let l;
      if (r && !B(r))
        for (const c in r) {
          const u = r[c];
          (u === Number || u && u.type === Number) && (c in this._props && (this._props[c] = Oi(this._props[c])), (l || (l = /* @__PURE__ */ Object.create(null)))[pe(c)] = !0);
        }
      this._numberProps = l, this._resolveProps(s), this.shadowRoot ? this._applyStyles(o) : process.env.NODE_ENV !== "production" && o && ye(
        "Custom element style injection is not supported when using shadowRoot: false"
      ), this._mount(s);
    }, n = this._def.__asyncLoader;
    n ? this._pendingResolve = n().then((s) => {
      s.configureApp = this._def.configureApp, t(this._def = s, !0);
    }) : t(this._def);
  }
  _mount(t) {
    process.env.NODE_ENV !== "production" && !t.name && (t.name = "VueElement"), this._app = this._createApp(t), this._inheritParentContext(), t.configureApp && t.configureApp(this._app), this._app._ceVNode = this._createVNode(), this._app.mount(this._root);
    const n = this._instance && this._instance.exposed;
    if (n)
      for (const s in n)
        re(this, s) ? process.env.NODE_ENV !== "production" && ye(`Exposed property "${s}" already exists on custom element.`) : Object.defineProperty(this, s, {
          // unwrap ref to be consistent with public instance behavior
          get: () => fr(n[s])
        });
  }
  _resolveProps(t) {
    const { props: n } = t, s = B(n) ? n : Object.keys(n || {});
    for (const i of Object.keys(this))
      i[0] !== "_" && s.includes(i) && this._setProp(i, this[i]);
    for (const i of s.map(pe))
      Object.defineProperty(this, i, {
        get() {
          return this._getProp(i);
        },
        set(r) {
          this._setProp(i, r, !0, !this._patching);
        }
      });
  }
  _setAttr(t) {
    if (t.startsWith("data-v-")) return;
    const n = this.hasAttribute(t);
    let s = n ? this.getAttribute(t) : Tc;
    const i = pe(t);
    n && this._numberProps && this._numberProps[i] && (s = Oi(s)), this._setProp(i, s, !1, !0);
  }
  /**
   * @internal
   */
  _getProp(t) {
    return this._props[t];
  }
  /**
   * @internal
   */
  _setProp(t, n, s = !0, i = !1) {
    if (n !== this._props[t] && (this._dirty = !0, n === Tc ? delete this._props[t] : (this._props[t] = n, t === "key" && this._app && (this._app._ceVNode.key = n)), i && this._instance && this._update(), s)) {
      const r = this._ob;
      r && (this._processMutations(r.takeRecords()), r.disconnect()), n === !0 ? this.setAttribute(Pe(t), "") : typeof n == "string" || typeof n == "number" ? this.setAttribute(Pe(t), n + "") : n || this.removeAttribute(Pe(t)), r && r.observe(this, { attributes: !0 });
    }
  }
  _update() {
    const t = this._createVNode();
    this._app && (t.appContext = this._app._context), _u(t, this._root);
  }
  _createVNode() {
    const t = {};
    this.shadowRoot || (t.onVnodeMounted = t.onVnodeUpdated = this._renderSlots.bind(this));
    const n = ve(this._def, ee(t, this._props));
    return this._instance || (n.ce = (s) => {
      this._instance = s, s.ce = this, s.isCE = !0, process.env.NODE_ENV !== "production" && (s.ceReload = (r) => {
        this._styles && (this._styles.forEach((o) => this._root.removeChild(o)), this._styles.length = 0), this._applyStyles(r), this._instance = null, this._update();
      });
      const i = (r, o) => {
        this.dispatchEvent(
          new CustomEvent(
            r,
            tr(o[0]) ? ee({ detail: o }, o[0]) : { detail: o }
          )
        );
      };
      s.emit = (r, ...o) => {
        i(r, o), Pe(r) !== r && i(Pe(r), o);
      }, this._setParent();
    }), n;
  }
  _applyStyles(t, n) {
    if (!t) return;
    if (n) {
      if (n === this._def || this._styleChildren.has(n))
        return;
      this._styleChildren.add(n);
    }
    const s = this._nonce;
    for (let i = t.length - 1; i >= 0; i--) {
      const r = document.createElement("style");
      if (s && r.setAttribute("nonce", s), r.textContent = t[i], this.shadowRoot.prepend(r), process.env.NODE_ENV !== "production")
        if (n) {
          if (n.__hmrId) {
            this._childStyles || (this._childStyles = /* @__PURE__ */ new Map());
            let o = this._childStyles.get(n.__hmrId);
            o || this._childStyles.set(n.__hmrId, o = []), o.push(r);
          }
        } else
          (this._styles || (this._styles = [])).push(r);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _parseSlots() {
    const t = this._slots = {};
    let n;
    for (; n = this.firstChild; ) {
      const s = n.nodeType === 1 && n.getAttribute("slot") || "default";
      (t[s] || (t[s] = [])).push(n), this.removeChild(n);
    }
  }
  /**
   * Only called when shadowRoot is false
   */
  _renderSlots() {
    const t = this._getSlots(), n = this._instance.type.__scopeId;
    for (let s = 0; s < t.length; s++) {
      const i = t[s], r = i.getAttribute("name") || "default", o = this._slots[r], l = i.parentNode;
      if (o)
        for (const c of o) {
          if (n && c.nodeType === 1) {
            const u = n + "-s", f = document.createTreeWalker(c, 1);
            c.setAttribute(u, "");
            let a;
            for (; a = f.nextNode(); )
              a.setAttribute(u, "");
          }
          l.insertBefore(c, i);
        }
      else
        for (; i.firstChild; ) l.insertBefore(i.firstChild, i);
      l.removeChild(i);
    }
  }
  /**
   * @internal
   */
  _getSlots() {
    const t = [this];
    this._teleportTargets && t.push(...this._teleportTargets);
    const n = /* @__PURE__ */ new Set();
    for (const s of t) {
      const i = s.querySelectorAll("slot");
      for (let r = 0; r < i.length; r++)
        n.add(i[r]);
    }
    return Array.from(n);
  }
  /**
   * @internal
   */
  _injectChildStyle(t) {
    this._applyStyles(t.styles, t);
  }
  /**
   * @internal
   */
  _beginPatch() {
    this._patching = !0, this._dirty = !1;
  }
  /**
   * @internal
   */
  _endPatch() {
    this._patching = !1, this._dirty && this._instance && this._update();
  }
  /**
   * @internal
   */
  _removeChildStyle(t) {
    if (process.env.NODE_ENV !== "production" && (this._styleChildren.delete(t), this._childStyles && t.__hmrId)) {
      const n = this._childStyles.get(t.__hmrId);
      n && (n.forEach((s) => this._root.removeChild(s)), n.length = 0);
    }
  }
}
function vo(e) {
  const t = We(), n = t && t.ce;
  return n || (process.env.NODE_ENV !== "production" && ye(
    t ? `${e || "useHost"} can only be used in components defined via defineCustomElement.` : `${e || "useHost"} called without an active component instance.`
  ), null);
}
function Tg() {
  const e = process.env.NODE_ENV !== "production" ? vo("useShadowRoot") : vo();
  return e && e.shadowRoot;
}
function Cg(e = "$style") {
  {
    const t = We();
    if (!t)
      return process.env.NODE_ENV !== "production" && ye("useCssModule must be called inside setup()"), ne;
    const n = t.type.__cssModules;
    if (!n)
      return process.env.NODE_ENV !== "production" && ye("Current instance does not have CSS modules injected."), ne;
    const s = n[e];
    return s || (process.env.NODE_ENV !== "production" && ye(`Current instance does not have CSS module named "${e}".`), ne);
  }
}
const uu = /* @__PURE__ */ new WeakMap(), pu = /* @__PURE__ */ new WeakMap(), ji = Symbol("_moveCb"), Cc = Symbol("_enterCb"), Dg = (e) => (delete e.props.mode, e), wg = /* @__PURE__ */ Dg({
  name: "TransitionGroup",
  props: /* @__PURE__ */ ee({}, iu, {
    tag: String,
    moveClass: String
  }),
  setup(e, { slots: t }) {
    const n = We(), s = Uo();
    let i, r;
    return gr(() => {
      if (!i.length)
        return;
      const o = e.moveClass || `${e.name || "v"}-move`;
      if (!kg(
        i[0].el,
        n.vnode.el,
        o
      )) {
        i = [];
        return;
      }
      i.forEach(xg), i.forEach(Ag);
      const l = i.filter(Ig);
      go(n.vnode.el), l.forEach((c) => {
        const u = c.el, f = u.style;
        Ot(u, o), f.transform = f.webkitTransform = f.transitionDuration = "";
        const a = u[ji] = (d) => {
          d && d.target !== u || (!d || d.propertyName.endsWith("transform")) && (u.removeEventListener("transitionend", a), u[ji] = null, Yt(u, o));
        };
        u.addEventListener("transitionend", a);
      }), i = [];
    }), () => {
      const o = Q(e), l = ru(o);
      let c = o.tag || Se;
      if (i = [], r)
        for (let u = 0; u < r.length; u++) {
          const f = r[u];
          f.el && f.el instanceof Element && (i.push(f), Wt(
            f,
            zn(
              f,
              l,
              s,
              n
            )
          ), uu.set(f, {
            left: f.el.offsetLeft,
            top: f.el.offsetTop
          }));
        }
      r = t.default ? hr(t.default()) : [];
      for (let u = 0; u < r.length; u++) {
        const f = r[u];
        f.key != null ? Wt(
          f,
          zn(f, l, s, n)
        ) : process.env.NODE_ENV !== "production" && f.type !== Vt && ye("<TransitionGroup> children must be keyed.");
      }
      return ve(c, null, r);
    };
  }
}), Vg = wg;
function xg(e) {
  const t = e.el;
  t[ji] && t[ji](), t[Cc] && t[Cc]();
}
function Ag(e) {
  pu.set(e, {
    left: e.el.offsetLeft,
    top: e.el.offsetTop
  });
}
function Ig(e) {
  const t = uu.get(e), n = pu.get(e), s = t.left - n.left, i = t.top - n.top;
  if (s || i) {
    const r = e.el.style;
    return r.transform = r.webkitTransform = `translate(${s}px,${i}px)`, r.transitionDuration = "0s", e;
  }
}
function kg(e, t, n) {
  const s = e.cloneNode(), i = e[Zn];
  i && i.forEach((l) => {
    l.split(/\s+/).forEach((c) => c && s.classList.remove(c));
  }), n.split(/\s+/).forEach((l) => l && s.classList.add(l)), s.style.display = "none";
  const r = t.nodeType === 1 ? t : t.parentNode;
  r.appendChild(s);
  const { hasTransform: o } = ou(s);
  return r.removeChild(s), o;
}
const an = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return B(t) ? (n) => tn(t, n) : t;
};
function Rg(e) {
  e.target.composing = !0;
}
function Dc(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const at = Symbol("_assign");
function wc(e, t, n) {
  return t && (e = e.trim()), n && (e = sr(e)), e;
}
const Ui = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, i) {
    e[at] = an(i);
    const r = s || i.props && i.props.type === "number";
    Ht(e, t ? "change" : "input", (o) => {
      o.target.composing || e[at](wc(e.value, n, r));
    }), (n || r) && Ht(e, "change", () => {
      e.value = wc(e.value, n, r);
    }), t || (Ht(e, "compositionstart", Rg), Ht(e, "compositionend", Dc), Ht(e, "change", Dc));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: i, number: r } }, o) {
    if (e[at] = an(o), e.composing) return;
    const l = (r || e.type === "number") && !/^0\d/.test(e.value) ? sr(e.value) : e.value, c = t ?? "";
    l !== c && (document.activeElement === e && e.type !== "range" && (s && t === n || i && e.value.trim() === c) || (e.value = c));
  }
}, rl = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e[at] = an(n), Ht(e, "change", () => {
      const s = e._modelValue, i = Qn(e), r = e.checked, o = e[at];
      if (B(s)) {
        const l = ir(s, i), c = l !== -1;
        if (r && !c)
          o(s.concat(i));
        else if (!r && c) {
          const u = [...s];
          u.splice(l, 1), o(u);
        }
      } else if (xn(s)) {
        const l = new Set(s);
        r ? l.add(i) : l.delete(i), o(l);
      } else
        o(hu(e, r));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: Vc,
  beforeUpdate(e, t, n) {
    e[at] = an(n), Vc(e, t, n);
  }
};
function Vc(e, { value: t, oldValue: n }, s) {
  e._modelValue = t;
  let i;
  if (B(t))
    i = ir(t, s.props.value) > -1;
  else if (xn(t))
    i = t.has(s.props.value);
  else {
    if (t === n) return;
    i = cn(t, hu(e, !0));
  }
  e.checked !== i && (e.checked = i);
}
const ol = {
  created(e, { value: t }, n) {
    e.checked = cn(t, n.props.value), e[at] = an(n), Ht(e, "change", () => {
      e[at](Qn(e));
    });
  },
  beforeUpdate(e, { value: t, oldValue: n }, s) {
    e[at] = an(s), t !== n && (e.checked = cn(t, s.props.value));
  }
}, du = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, s) {
    const i = xn(t);
    Ht(e, "change", () => {
      const r = Array.prototype.filter.call(e.options, (o) => o.selected).map(
        (o) => n ? sr(Qn(o)) : Qn(o)
      );
      e[at](
        e.multiple ? i ? new Set(r) : r : r[0]
      ), e._assigning = !0, Gs(() => {
        e._assigning = !1;
      });
    }), e[at] = an(s);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    xc(e, t);
  },
  beforeUpdate(e, t, n) {
    e[at] = an(n);
  },
  updated(e, { value: t }) {
    e._assigning || xc(e, t);
  }
};
function xc(e, t) {
  const n = e.multiple, s = B(t);
  if (n && !s && !xn(t)) {
    process.env.NODE_ENV !== "production" && ye(
      `<select multiple v-model> expects an Array or Set value for its binding, but got ${Object.prototype.toString.call(t).slice(8, -1)}.`
    );
    return;
  }
  for (let i = 0, r = e.options.length; i < r; i++) {
    const o = e.options[i], l = Qn(o);
    if (n)
      if (s) {
        const c = typeof l;
        c === "string" || c === "number" ? o.selected = t.some((u) => String(u) === String(l)) : o.selected = ir(t, l) > -1;
      } else
        o.selected = t.has(l);
    else if (cn(Qn(o), t)) {
      e.selectedIndex !== i && (e.selectedIndex = i);
      return;
    }
  }
  !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
}
function Qn(e) {
  return "_value" in e ? e._value : e.value;
}
function hu(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const mu = {
  created(e, t, n) {
    ai(e, t, n, null, "created");
  },
  mounted(e, t, n) {
    ai(e, t, n, null, "mounted");
  },
  beforeUpdate(e, t, n, s) {
    ai(e, t, n, s, "beforeUpdate");
  },
  updated(e, t, n, s) {
    ai(e, t, n, s, "updated");
  }
};
function gu(e, t) {
  switch (e) {
    case "SELECT":
      return du;
    case "TEXTAREA":
      return Ui;
    default:
      switch (t) {
        case "checkbox":
          return rl;
        case "radio":
          return ol;
        default:
          return Ui;
      }
  }
}
function ai(e, t, n, s, i) {
  const o = gu(
    e.tagName,
    n.props && n.props.type
  )[i];
  o && o(e, t, n, s);
}
function Mg() {
  Ui.getSSRProps = ({ value: e }) => ({ value: e }), ol.getSSRProps = ({ value: e }, t) => {
    if (t.props && cn(t.props.value, e))
      return { checked: !0 };
  }, rl.getSSRProps = ({ value: e }, t) => {
    if (B(e)) {
      if (t.props && ir(e, t.props.value) > -1)
        return { checked: !0 };
    } else if (xn(e)) {
      if (t.props && e.has(t.props.value))
        return { checked: !0 };
    } else if (e)
      return { checked: !0 };
  }, mu.getSSRProps = (e, t) => {
    if (typeof t.type != "string")
      return;
    const n = gu(
      // resolveDynamicModel expects an uppercase tag name, but vnode.type is lowercase
      t.type.toUpperCase(),
      t.props && t.props.type
    );
    if (n.getSSRProps)
      return n.getSSRProps(e, t);
  };
}
const Pg = ["ctrl", "shift", "alt", "meta"], $g = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => Pg.some((n) => e[`${n}Key`] && !t.includes(n))
}, Lg = (e, t) => {
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = ((i, ...r) => {
    for (let o = 0; o < t.length; o++) {
      const l = $g[t[o]];
      if (l && l(i, t)) return;
    }
    return e(i, ...r);
  }));
}, Fg = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Hg = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), s = t.join(".");
  return n[s] || (n[s] = ((i) => {
    if (!("key" in i))
      return;
    const r = Pe(i.key);
    if (t.some(
      (o) => o === r || Fg[o] === r
    ))
      return e(i);
  }));
}, Eu = /* @__PURE__ */ ee({ patchProp: Ng }, ng);
let ws, Ac = !1;
function vu() {
  return ws || (ws = Of(Eu));
}
function yu() {
  return ws = Ac ? ws : Tf(Eu), Ac = !0, ws;
}
const _u = ((...e) => {
  vu().render(...e);
}), Bg = ((...e) => {
  yu().hydrate(...e);
}), Ki = ((...e) => {
  const t = vu().createApp(...e);
  process.env.NODE_ENV !== "production" && (Su(t), Ou(t));
  const { mount: n } = t;
  return t.mount = (s) => {
    const i = Tu(s);
    if (!i) return;
    const r = t._component;
    !G(r) && !r.render && !r.template && (r.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const o = n(i, !1, bu(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), o;
  }, t;
}), Nu = ((...e) => {
  const t = yu().createApp(...e);
  process.env.NODE_ENV !== "production" && (Su(t), Ou(t));
  const { mount: n } = t;
  return t.mount = (s) => {
    const i = Tu(s);
    if (i)
      return n(i, !0, bu(i));
  }, t;
});
function bu(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Su(e) {
  Object.defineProperty(e.config, "isNativeTag", {
    value: (t) => ca(t) || aa(t) || fa(t),
    writable: !1
  });
}
function Ou(e) {
  if (il()) {
    const t = e.config.isCustomElement;
    Object.defineProperty(e.config, "isCustomElement", {
      get() {
        return t;
      },
      set() {
        ye(
          "The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead."
        );
      }
    });
    const n = e.config.compilerOptions, s = 'The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader\'s `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc';
    Object.defineProperty(e.config, "compilerOptions", {
      get() {
        return ye(s), n;
      },
      set() {
        ye(s);
      }
    });
  }
}
function Tu(e) {
  if (Y(e)) {
    const t = document.querySelector(e);
    return process.env.NODE_ENV !== "production" && !t && ye(
      `Failed to mount app: mount target selector "${e}" returned null.`
    ), t;
  }
  return process.env.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && ye(
    'mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs'
  ), e;
}
let Ic = !1;
const jg = () => {
  Ic || (Ic = !0, Mg(), cg());
}, Ug = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BaseTransition: Qa,
  BaseTransitionPropsValidators: Ko,
  Comment: ge,
  DeprecationTypes: Qm,
  EffectScope: ko,
  ErrorCodes: Rd,
  ErrorTypeStrings: qm,
  Fragment: Se,
  KeepAlive: _h,
  ReactiveEffect: xs,
  Static: on,
  Suspense: Dm,
  Teleport: eh,
  Text: Vt,
  TrackOpTypes: Cd,
  Transition: ig,
  TransitionGroup: Vg,
  TriggerOpTypes: Dd,
  VueElement: Sr,
  assertNumber: Lo,
  callWithAsyncErrorHandling: ft,
  callWithErrorHandling: An,
  camelize: pe,
  capitalize: xt,
  cloneVNode: ut,
  compatUtils: Zm,
  computed: Zf,
  createApp: Ki,
  createBlock: Li,
  createCommentVNode: $m,
  createElementBlock: km,
  createElementVNode: tl,
  createHydrationRenderer: Tf,
  createPropsRestProxy: Wh,
  createRenderer: Of,
  createSSRApp: Nu,
  createSlots: Dh,
  createStaticVNode: Pm,
  createTextVNode: nl,
  createVNode: ve,
  customRef: Pa,
  defineAsyncComponent: vh,
  defineComponent: Wo,
  defineCustomElement: fu,
  defineEmits: Mh,
  defineExpose: Ph,
  defineModel: Fh,
  defineOptions: $h,
  defineProps: Rh,
  defineSSRCustomElement: Sg,
  defineSlots: Lh,
  devtools: Gm,
  effect: zp,
  effectScope: qp,
  getCurrentInstance: We,
  getCurrentScope: ga,
  getCurrentWatcher: wd,
  getTransitionRawChildren: hr,
  guardReactiveProps: jf,
  h: Qf,
  handleError: fn,
  hasInjectionContext: tm,
  hydrate: Bg,
  hydrateOnIdle: ph,
  hydrateOnInteraction: gh,
  hydrateOnMediaQuery: mh,
  hydrateOnVisible: hh,
  initCustomFormatter: eu,
  initDirectivesForSSR: jg,
  inject: Os,
  isMemoSame: tu,
  isProxy: Gn,
  isReactive: Bt,
  isReadonly: bt,
  isRef: _e,
  isRuntimeOnly: il,
  isShallow: Le,
  isVNode: At,
  markRaw: ka,
  mergeDefaults: Uh,
  mergeModels: Kh,
  mergeProps: Kf,
  nextTick: Gs,
  normalizeClass: ls,
  normalizeProps: kp,
  normalizeStyle: os,
  onActivated: sf,
  onBeforeMount: lf,
  onBeforeUnmount: Er,
  onBeforeUpdate: Go,
  onDeactivated: rf,
  onErrorCaptured: uf,
  onMounted: as,
  onRenderTracked: ff,
  onRenderTriggered: af,
  onScopeDispose: Gp,
  onServerPrefetch: cf,
  onUnmounted: vr,
  onUpdated: gr,
  onWatcherCleanup: La,
  openBlock: Ls,
  popScopeId: Yd,
  provide: mf,
  proxyRefs: $o,
  pushScopeId: zd,
  queuePostFlushCb: Jn,
  reactive: cr,
  readonly: ks,
  ref: jt,
  registerRuntimeCompiler: Jf,
  render: _u,
  renderList: Ch,
  renderSlot: wh,
  resolveComponent: Sh,
  resolveDirective: Th,
  resolveDynamicComponent: Oh,
  resolveFilter: Xm,
  resolveTransitionHooks: zn,
  setBlockTracking: Fs,
  setDevtoolsHook: Jm,
  setTransitionHooks: Wt,
  shallowReactive: Ia,
  shallowReadonly: mt,
  shallowRef: Ra,
  ssrContextKey: Vf,
  ssrUtils: Ym,
  stop: Yp,
  toDisplayString: da,
  toHandlerKey: Dt,
  toHandlers: Vh,
  toRaw: Q,
  toRef: Sd,
  toRefs: _d,
  toValue: Ed,
  transformVNodeArgs: Rm,
  triggerRef: gd,
  unref: fr,
  useAttrs: jh,
  useCssModule: Cg,
  useCssVars: ag,
  useHost: vo,
  useId: nh,
  useModel: _m,
  useSSRContext: xf,
  useShadowRoot: Tg,
  useSlots: Bh,
  useTemplateRef: sh,
  useTransitionState: Uo,
  vModelCheckbox: rl,
  vModelDynamic: mu,
  vModelRadio: ol,
  vModelSelect: du,
  vModelText: Ui,
  vShow: cu,
  version: ho,
  warn: ye,
  watch: Kn,
  watchEffect: Em,
  watchPostEffect: vm,
  watchSyncEffect: Af,
  withAsyncContext: qh,
  withCtx: jo,
  withDefaults: Hh,
  withDirectives: Zd,
  withKeys: Hg,
  withMemo: Wm,
  withModifiers: Lg,
  withScopeId: Xd
}, Symbol.toStringTag, { value: "Module" }));
const Hs = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : ""), Vs = Symbol(process.env.NODE_ENV !== "production" ? "Teleport" : ""), ll = Symbol(process.env.NODE_ENV !== "production" ? "Suspense" : ""), Wi = Symbol(process.env.NODE_ENV !== "production" ? "KeepAlive" : ""), Cu = Symbol(
  process.env.NODE_ENV !== "production" ? "BaseTransition" : ""
), Vn = Symbol(process.env.NODE_ENV !== "production" ? "openBlock" : ""), Du = Symbol(process.env.NODE_ENV !== "production" ? "createBlock" : ""), wu = Symbol(
  process.env.NODE_ENV !== "production" ? "createElementBlock" : ""
), cl = Symbol(process.env.NODE_ENV !== "production" ? "createVNode" : ""), al = Symbol(
  process.env.NODE_ENV !== "production" ? "createElementVNode" : ""
), Xs = Symbol(
  process.env.NODE_ENV !== "production" ? "createCommentVNode" : ""
), fl = Symbol(
  process.env.NODE_ENV !== "production" ? "createTextVNode" : ""
), Vu = Symbol(
  process.env.NODE_ENV !== "production" ? "createStaticVNode" : ""
), ul = Symbol(
  process.env.NODE_ENV !== "production" ? "resolveComponent" : ""
), pl = Symbol(
  process.env.NODE_ENV !== "production" ? "resolveDynamicComponent" : ""
), dl = Symbol(
  process.env.NODE_ENV !== "production" ? "resolveDirective" : ""
), hl = Symbol(
  process.env.NODE_ENV !== "production" ? "resolveFilter" : ""
), ml = Symbol(
  process.env.NODE_ENV !== "production" ? "withDirectives" : ""
), gl = Symbol(process.env.NODE_ENV !== "production" ? "renderList" : ""), xu = Symbol(process.env.NODE_ENV !== "production" ? "renderSlot" : ""), Au = Symbol(process.env.NODE_ENV !== "production" ? "createSlots" : ""), Or = Symbol(
  process.env.NODE_ENV !== "production" ? "toDisplayString" : ""
), qi = Symbol(process.env.NODE_ENV !== "production" ? "mergeProps" : ""), El = Symbol(
  process.env.NODE_ENV !== "production" ? "normalizeClass" : ""
), vl = Symbol(
  process.env.NODE_ENV !== "production" ? "normalizeStyle" : ""
), Bs = Symbol(
  process.env.NODE_ENV !== "production" ? "normalizeProps" : ""
), Zs = Symbol(
  process.env.NODE_ENV !== "production" ? "guardReactiveProps" : ""
), yl = Symbol(process.env.NODE_ENV !== "production" ? "toHandlers" : ""), yo = Symbol(process.env.NODE_ENV !== "production" ? "camelize" : ""), Kg = Symbol(process.env.NODE_ENV !== "production" ? "capitalize" : ""), _o = Symbol(
  process.env.NODE_ENV !== "production" ? "toHandlerKey" : ""
), Gi = Symbol(
  process.env.NODE_ENV !== "production" ? "setBlockTracking" : ""
), Wg = Symbol(process.env.NODE_ENV !== "production" ? "pushScopeId" : ""), qg = Symbol(process.env.NODE_ENV !== "production" ? "popScopeId" : ""), _l = Symbol(process.env.NODE_ENV !== "production" ? "withCtx" : ""), Gg = Symbol(process.env.NODE_ENV !== "production" ? "unref" : ""), Jg = Symbol(process.env.NODE_ENV !== "production" ? "isRef" : ""), Nl = Symbol(process.env.NODE_ENV !== "production" ? "withMemo" : ""), Iu = Symbol(process.env.NODE_ENV !== "production" ? "isMemoSame" : ""), es = {
  [Hs]: "Fragment",
  [Vs]: "Teleport",
  [ll]: "Suspense",
  [Wi]: "KeepAlive",
  [Cu]: "BaseTransition",
  [Vn]: "openBlock",
  [Du]: "createBlock",
  [wu]: "createElementBlock",
  [cl]: "createVNode",
  [al]: "createElementVNode",
  [Xs]: "createCommentVNode",
  [fl]: "createTextVNode",
  [Vu]: "createStaticVNode",
  [ul]: "resolveComponent",
  [pl]: "resolveDynamicComponent",
  [dl]: "resolveDirective",
  [hl]: "resolveFilter",
  [ml]: "withDirectives",
  [gl]: "renderList",
  [xu]: "renderSlot",
  [Au]: "createSlots",
  [Or]: "toDisplayString",
  [qi]: "mergeProps",
  [El]: "normalizeClass",
  [vl]: "normalizeStyle",
  [Bs]: "normalizeProps",
  [Zs]: "guardReactiveProps",
  [yl]: "toHandlers",
  [yo]: "camelize",
  [Kg]: "capitalize",
  [_o]: "toHandlerKey",
  [Gi]: "setBlockTracking",
  [Wg]: "pushScopeId",
  [qg]: "popScopeId",
  [_l]: "withCtx",
  [Gg]: "unref",
  [Jg]: "isRef",
  [Nl]: "withMemo",
  [Iu]: "isMemoSame"
};
function zg(e) {
  Object.getOwnPropertySymbols(e).forEach((t) => {
    es[t] = e[t];
  });
}
const it = {
  start: { line: 1, column: 1, offset: 0 },
  end: { line: 1, column: 1, offset: 0 },
  source: ""
};
function Yg(e, t = "") {
  return {
    type: 0,
    source: t,
    children: e,
    helpers: /* @__PURE__ */ new Set(),
    components: [],
    directives: [],
    hoists: [],
    imports: [],
    cached: [],
    temps: 0,
    codegenNode: void 0,
    loc: it
  };
}
function js(e, t, n, s, i, r, o, l = !1, c = !1, u = !1, f = it) {
  return e && (l ? (e.helper(Vn), e.helper(ss(e.inSSR, u))) : e.helper(ns(e.inSSR, u)), o && e.helper(ml)), {
    type: 13,
    tag: t,
    props: n,
    children: s,
    patchFlag: i,
    dynamicProps: r,
    directives: o,
    isBlock: l,
    disableTracking: c,
    isComponent: u,
    loc: f
  };
}
function Tn(e, t = it) {
  return {
    type: 17,
    loc: t,
    elements: e
  };
}
function ct(e, t = it) {
  return {
    type: 15,
    loc: t,
    properties: e
  };
}
function Oe(e, t) {
  return {
    type: 16,
    loc: it,
    key: Y(e) ? te(e, !0) : e,
    value: t
  };
}
function te(e, t = !1, n = it, s = 0) {
  return {
    type: 4,
    loc: n,
    content: e,
    isStatic: t,
    constType: t ? 3 : s
  };
}
function yt(e, t = it) {
  return {
    type: 8,
    loc: t,
    children: e
  };
}
function De(e, t = [], n = it) {
  return {
    type: 14,
    loc: n,
    callee: e,
    arguments: t
  };
}
function ts(e, t = void 0, n = !1, s = !1, i = it) {
  return {
    type: 18,
    params: e,
    returns: t,
    newline: n,
    isSlot: s,
    loc: i
  };
}
function No(e, t, n, s = !0) {
  return {
    type: 19,
    test: e,
    consequent: t,
    alternate: n,
    newline: s,
    loc: it
  };
}
function Xg(e, t, n = !1, s = !1) {
  return {
    type: 20,
    index: e,
    value: t,
    needPauseTracking: n,
    inVOnce: s,
    needArraySpread: !1,
    loc: it
  };
}
function Zg(e) {
  return {
    type: 21,
    body: e,
    loc: it
  };
}
function ns(e, t) {
  return e || t ? cl : al;
}
function ss(e, t) {
  return e || t ? Du : wu;
}
function bl(e, { helper: t, removeHelper: n, inSSR: s }) {
  e.isBlock || (e.isBlock = !0, n(ns(s, e.isComponent)), t(Vn), t(ss(s, e.isComponent)));
}
const kc = new Uint8Array([123, 123]), Rc = new Uint8Array([125, 125]);
function Mc(e) {
  return e >= 97 && e <= 122 || e >= 65 && e <= 90;
}
function tt(e) {
  return e === 32 || e === 10 || e === 9 || e === 12 || e === 13;
}
function zt(e) {
  return e === 47 || e === 62 || tt(e);
}
function Ji(e) {
  const t = new Uint8Array(e.length);
  for (let n = 0; n < e.length; n++)
    t[n] = e.charCodeAt(n);
  return t;
}
const xe = {
  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
  // CDATA[
  CdataEnd: new Uint8Array([93, 93, 62]),
  // ]]>
  CommentEnd: new Uint8Array([45, 45, 62]),
  // `-->`
  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
  // `<\/script`
  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
  // `</style`
  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101]),
  // `</title`
  TextareaEnd: new Uint8Array([
    60,
    47,
    116,
    101,
    120,
    116,
    97,
    114,
    101,
    97
  ])
  // `</textarea
};
class Qg {
  constructor(t, n) {
    this.stack = t, this.cbs = n, this.state = 1, this.buffer = "", this.sectionStart = 0, this.index = 0, this.entityStart = 0, this.baseState = 1, this.inRCDATA = !1, this.inXML = !1, this.inVPre = !1, this.newlines = [], this.mode = 0, this.delimiterOpen = kc, this.delimiterClose = Rc, this.delimiterIndex = -1, this.currentSequence = void 0, this.sequenceIndex = 0;
  }
  get inSFCRoot() {
    return this.mode === 2 && this.stack.length === 0;
  }
  reset() {
    this.state = 1, this.mode = 0, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = 1, this.inRCDATA = !1, this.currentSequence = void 0, this.newlines.length = 0, this.delimiterOpen = kc, this.delimiterClose = Rc;
  }
  /**
   * Generate Position object with line / column information using recorded
   * newline positions. We know the index is always going to be an already
   * processed index, so all the newlines up to this index should have been
   * recorded.
   */
  getPos(t) {
    let n = 1, s = t + 1;
    for (let i = this.newlines.length - 1; i >= 0; i--) {
      const r = this.newlines[i];
      if (t > r) {
        n = i + 2, s = t - r;
        break;
      }
    }
    return {
      column: s,
      line: n,
      offset: t
    };
  }
  peek() {
    return this.buffer.charCodeAt(this.index + 1);
  }
  stateText(t) {
    t === 60 ? (this.index > this.sectionStart && this.cbs.ontext(this.sectionStart, this.index), this.state = 5, this.sectionStart = this.index) : !this.inVPre && t === this.delimiterOpen[0] && (this.state = 2, this.delimiterIndex = 0, this.stateInterpolationOpen(t));
  }
  stateInterpolationOpen(t) {
    if (t === this.delimiterOpen[this.delimiterIndex])
      if (this.delimiterIndex === this.delimiterOpen.length - 1) {
        const n = this.index + 1 - this.delimiterOpen.length;
        n > this.sectionStart && this.cbs.ontext(this.sectionStart, n), this.state = 3, this.sectionStart = n;
      } else
        this.delimiterIndex++;
    else this.inRCDATA ? (this.state = 32, this.stateInRCDATA(t)) : (this.state = 1, this.stateText(t));
  }
  stateInterpolation(t) {
    t === this.delimiterClose[0] && (this.state = 4, this.delimiterIndex = 0, this.stateInterpolationClose(t));
  }
  stateInterpolationClose(t) {
    t === this.delimiterClose[this.delimiterIndex] ? this.delimiterIndex === this.delimiterClose.length - 1 ? (this.cbs.oninterpolation(this.sectionStart, this.index + 1), this.inRCDATA ? this.state = 32 : this.state = 1, this.sectionStart = this.index + 1) : this.delimiterIndex++ : (this.state = 3, this.stateInterpolation(t));
  }
  stateSpecialStartSequence(t) {
    const n = this.sequenceIndex === this.currentSequence.length;
    if (!(n ? (
      // If we are at the end of the sequence, make sure the tag name has ended
      zt(t)
    ) : (
      // Otherwise, do a case-insensitive comparison
      (t | 32) === this.currentSequence[this.sequenceIndex]
    )))
      this.inRCDATA = !1;
    else if (!n) {
      this.sequenceIndex++;
      return;
    }
    this.sequenceIndex = 0, this.state = 6, this.stateInTagName(t);
  }
  /** Look for an end tag. For <title> and <textarea>, also decode entities. */
  stateInRCDATA(t) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (t === 62 || tt(t)) {
        const n = this.index - this.currentSequence.length;
        if (this.sectionStart < n) {
          const s = this.index;
          this.index = n, this.cbs.ontext(this.sectionStart, n), this.index = s;
        }
        this.sectionStart = n + 2, this.stateInClosingTagName(t), this.inRCDATA = !1;
        return;
      }
      this.sequenceIndex = 0;
    }
    (t | 32) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : this.sequenceIndex === 0 ? this.currentSequence === xe.TitleEnd || this.currentSequence === xe.TextareaEnd && !this.inSFCRoot ? !this.inVPre && t === this.delimiterOpen[0] && (this.state = 2, this.delimiterIndex = 0, this.stateInterpolationOpen(t)) : this.fastForwardTo(60) && (this.sequenceIndex = 1) : this.sequenceIndex = +(t === 60);
  }
  stateCDATASequence(t) {
    t === xe.Cdata[this.sequenceIndex] ? ++this.sequenceIndex === xe.Cdata.length && (this.state = 28, this.currentSequence = xe.CdataEnd, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : (this.sequenceIndex = 0, this.state = 23, this.stateInDeclaration(t));
  }
  /**
   * When we wait for one specific character, we can speed things up
   * by skipping through the buffer until we find it.
   *
   * @returns Whether the character was found.
   */
  fastForwardTo(t) {
    for (; ++this.index < this.buffer.length; ) {
      const n = this.buffer.charCodeAt(this.index);
      if (n === 10 && this.newlines.push(this.index), n === t)
        return !0;
    }
    return this.index = this.buffer.length - 1, !1;
  }
  /**
   * Comments and CDATA end with `-->` and `]]>`.
   *
   * Their common qualities are:
   * - Their end sequences have a distinct character they start with.
   * - That character is then repeated, so we have to check multiple repeats.
   * - All characters but the start character of the sequence can be skipped.
   */
  stateInCommentLike(t) {
    t === this.currentSequence[this.sequenceIndex] ? ++this.sequenceIndex === this.currentSequence.length && (this.currentSequence === xe.CdataEnd ? this.cbs.oncdata(this.sectionStart, this.index - 2) : this.cbs.oncomment(this.sectionStart, this.index - 2), this.sequenceIndex = 0, this.sectionStart = this.index + 1, this.state = 1) : this.sequenceIndex === 0 ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1) : t !== this.currentSequence[this.sequenceIndex - 1] && (this.sequenceIndex = 0);
  }
  startSpecial(t, n) {
    this.enterRCDATA(t, n), this.state = 31;
  }
  enterRCDATA(t, n) {
    this.inRCDATA = !0, this.currentSequence = t, this.sequenceIndex = n;
  }
  stateBeforeTagName(t) {
    t === 33 ? (this.state = 22, this.sectionStart = this.index + 1) : t === 63 ? (this.state = 24, this.sectionStart = this.index + 1) : Mc(t) ? (this.sectionStart = this.index, this.mode === 0 ? this.state = 6 : this.inSFCRoot ? this.state = 34 : this.inXML ? this.state = 6 : t === 116 ? this.state = 30 : this.state = t === 115 ? 29 : 6) : t === 47 ? this.state = 8 : (this.state = 1, this.stateText(t));
  }
  stateInTagName(t) {
    zt(t) && this.handleTagName(t);
  }
  stateInSFCRootTagName(t) {
    if (zt(t)) {
      const n = this.buffer.slice(this.sectionStart, this.index);
      n !== "template" && this.enterRCDATA(Ji("</" + n), 0), this.handleTagName(t);
    }
  }
  handleTagName(t) {
    this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = 11, this.stateBeforeAttrName(t);
  }
  stateBeforeClosingTagName(t) {
    tt(t) || (t === 62 ? (process.env.NODE_ENV !== "production" && this.cbs.onerr(14, this.index), this.state = 1, this.sectionStart = this.index + 1) : (this.state = Mc(t) ? 9 : 27, this.sectionStart = this.index));
  }
  stateInClosingTagName(t) {
    (t === 62 || tt(t)) && (this.cbs.onclosetag(this.sectionStart, this.index), this.sectionStart = -1, this.state = 10, this.stateAfterClosingTagName(t));
  }
  stateAfterClosingTagName(t) {
    t === 62 && (this.state = 1, this.sectionStart = this.index + 1);
  }
  stateBeforeAttrName(t) {
    t === 62 ? (this.cbs.onopentagend(this.index), this.inRCDATA ? this.state = 32 : this.state = 1, this.sectionStart = this.index + 1) : t === 47 ? (this.state = 7, process.env.NODE_ENV !== "production" && this.peek() !== 62 && this.cbs.onerr(22, this.index)) : t === 60 && this.peek() === 47 ? (this.cbs.onopentagend(this.index), this.state = 5, this.sectionStart = this.index) : tt(t) || (process.env.NODE_ENV !== "production" && t === 61 && this.cbs.onerr(
      19,
      this.index
    ), this.handleAttrStart(t));
  }
  handleAttrStart(t) {
    t === 118 && this.peek() === 45 ? (this.state = 13, this.sectionStart = this.index) : t === 46 || t === 58 || t === 64 || t === 35 ? (this.cbs.ondirname(this.index, this.index + 1), this.state = 14, this.sectionStart = this.index + 1) : (this.state = 12, this.sectionStart = this.index);
  }
  stateInSelfClosingTag(t) {
    t === 62 ? (this.cbs.onselfclosingtag(this.index), this.state = 1, this.sectionStart = this.index + 1, this.inRCDATA = !1) : tt(t) || (this.state = 11, this.stateBeforeAttrName(t));
  }
  stateInAttrName(t) {
    t === 61 || zt(t) ? (this.cbs.onattribname(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : process.env.NODE_ENV !== "production" && (t === 34 || t === 39 || t === 60) && this.cbs.onerr(
      17,
      this.index
    );
  }
  stateInDirName(t) {
    t === 61 || zt(t) ? (this.cbs.ondirname(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : t === 58 ? (this.cbs.ondirname(this.sectionStart, this.index), this.state = 14, this.sectionStart = this.index + 1) : t === 46 && (this.cbs.ondirname(this.sectionStart, this.index), this.state = 16, this.sectionStart = this.index + 1);
  }
  stateInDirArg(t) {
    t === 61 || zt(t) ? (this.cbs.ondirarg(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : t === 91 ? this.state = 15 : t === 46 && (this.cbs.ondirarg(this.sectionStart, this.index), this.state = 16, this.sectionStart = this.index + 1);
  }
  stateInDynamicDirArg(t) {
    t === 93 ? this.state = 14 : (t === 61 || zt(t)) && (this.cbs.ondirarg(this.sectionStart, this.index + 1), this.handleAttrNameEnd(t), process.env.NODE_ENV !== "production" && this.cbs.onerr(
      27,
      this.index
    ));
  }
  stateInDirModifier(t) {
    t === 61 || zt(t) ? (this.cbs.ondirmodifier(this.sectionStart, this.index), this.handleAttrNameEnd(t)) : t === 46 && (this.cbs.ondirmodifier(this.sectionStart, this.index), this.sectionStart = this.index + 1);
  }
  handleAttrNameEnd(t) {
    this.sectionStart = this.index, this.state = 17, this.cbs.onattribnameend(this.index), this.stateAfterAttrName(t);
  }
  stateAfterAttrName(t) {
    t === 61 ? this.state = 18 : t === 47 || t === 62 ? (this.cbs.onattribend(0, this.sectionStart), this.sectionStart = -1, this.state = 11, this.stateBeforeAttrName(t)) : tt(t) || (this.cbs.onattribend(0, this.sectionStart), this.handleAttrStart(t));
  }
  stateBeforeAttrValue(t) {
    t === 34 ? (this.state = 19, this.sectionStart = this.index + 1) : t === 39 ? (this.state = 20, this.sectionStart = this.index + 1) : tt(t) || (this.sectionStart = this.index, this.state = 21, this.stateInAttrValueNoQuotes(t));
  }
  handleInAttrValue(t, n) {
    (t === n || this.fastForwardTo(n)) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(
      n === 34 ? 3 : 2,
      this.index + 1
    ), this.state = 11);
  }
  stateInAttrValueDoubleQuotes(t) {
    this.handleInAttrValue(t, 34);
  }
  stateInAttrValueSingleQuotes(t) {
    this.handleInAttrValue(t, 39);
  }
  stateInAttrValueNoQuotes(t) {
    tt(t) || t === 62 ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(1, this.index), this.state = 11, this.stateBeforeAttrName(t)) : (process.env.NODE_ENV !== "production" && t === 34 || t === 39 || t === 60 || t === 61 || t === 96) && this.cbs.onerr(
      18,
      this.index
    );
  }
  stateBeforeDeclaration(t) {
    t === 91 ? (this.state = 26, this.sequenceIndex = 0) : this.state = t === 45 ? 25 : 23;
  }
  stateInDeclaration(t) {
    (t === 62 || this.fastForwardTo(62)) && (this.state = 1, this.sectionStart = this.index + 1);
  }
  stateInProcessingInstruction(t) {
    (t === 62 || this.fastForwardTo(62)) && (this.cbs.onprocessinginstruction(this.sectionStart, this.index), this.state = 1, this.sectionStart = this.index + 1);
  }
  stateBeforeComment(t) {
    t === 45 ? (this.state = 28, this.currentSequence = xe.CommentEnd, this.sequenceIndex = 2, this.sectionStart = this.index + 1) : this.state = 23;
  }
  stateInSpecialComment(t) {
    (t === 62 || this.fastForwardTo(62)) && (this.cbs.oncomment(this.sectionStart, this.index), this.state = 1, this.sectionStart = this.index + 1);
  }
  stateBeforeSpecialS(t) {
    t === xe.ScriptEnd[3] ? this.startSpecial(xe.ScriptEnd, 4) : t === xe.StyleEnd[3] ? this.startSpecial(xe.StyleEnd, 4) : (this.state = 6, this.stateInTagName(t));
  }
  stateBeforeSpecialT(t) {
    t === xe.TitleEnd[3] ? this.startSpecial(xe.TitleEnd, 4) : t === xe.TextareaEnd[3] ? this.startSpecial(xe.TextareaEnd, 4) : (this.state = 6, this.stateInTagName(t));
  }
  startEntity() {
  }
  stateInEntity() {
  }
  /**
   * Iterates through the buffer, calling the function corresponding to the current state.
   *
   * States that are more likely to be hit are higher up, as a performance improvement.
   */
  parse(t) {
    for (this.buffer = t; this.index < this.buffer.length; ) {
      const n = this.buffer.charCodeAt(this.index);
      switch (n === 10 && this.state !== 33 && this.newlines.push(this.index), this.state) {
        case 1: {
          this.stateText(n);
          break;
        }
        case 2: {
          this.stateInterpolationOpen(n);
          break;
        }
        case 3: {
          this.stateInterpolation(n);
          break;
        }
        case 4: {
          this.stateInterpolationClose(n);
          break;
        }
        case 31: {
          this.stateSpecialStartSequence(n);
          break;
        }
        case 32: {
          this.stateInRCDATA(n);
          break;
        }
        case 26: {
          this.stateCDATASequence(n);
          break;
        }
        case 19: {
          this.stateInAttrValueDoubleQuotes(n);
          break;
        }
        case 12: {
          this.stateInAttrName(n);
          break;
        }
        case 13: {
          this.stateInDirName(n);
          break;
        }
        case 14: {
          this.stateInDirArg(n);
          break;
        }
        case 15: {
          this.stateInDynamicDirArg(n);
          break;
        }
        case 16: {
          this.stateInDirModifier(n);
          break;
        }
        case 28: {
          this.stateInCommentLike(n);
          break;
        }
        case 27: {
          this.stateInSpecialComment(n);
          break;
        }
        case 11: {
          this.stateBeforeAttrName(n);
          break;
        }
        case 6: {
          this.stateInTagName(n);
          break;
        }
        case 34: {
          this.stateInSFCRootTagName(n);
          break;
        }
        case 9: {
          this.stateInClosingTagName(n);
          break;
        }
        case 5: {
          this.stateBeforeTagName(n);
          break;
        }
        case 17: {
          this.stateAfterAttrName(n);
          break;
        }
        case 20: {
          this.stateInAttrValueSingleQuotes(n);
          break;
        }
        case 18: {
          this.stateBeforeAttrValue(n);
          break;
        }
        case 8: {
          this.stateBeforeClosingTagName(n);
          break;
        }
        case 10: {
          this.stateAfterClosingTagName(n);
          break;
        }
        case 29: {
          this.stateBeforeSpecialS(n);
          break;
        }
        case 30: {
          this.stateBeforeSpecialT(n);
          break;
        }
        case 21: {
          this.stateInAttrValueNoQuotes(n);
          break;
        }
        case 7: {
          this.stateInSelfClosingTag(n);
          break;
        }
        case 23: {
          this.stateInDeclaration(n);
          break;
        }
        case 22: {
          this.stateBeforeDeclaration(n);
          break;
        }
        case 25: {
          this.stateBeforeComment(n);
          break;
        }
        case 24: {
          this.stateInProcessingInstruction(n);
          break;
        }
        case 33: {
          this.stateInEntity();
          break;
        }
      }
      this.index++;
    }
    this.cleanup(), this.finish();
  }
  /**
   * Remove data that has already been consumed from the buffer.
   */
  cleanup() {
    this.sectionStart !== this.index && (this.state === 1 || this.state === 32 && this.sequenceIndex === 0 ? (this.cbs.ontext(this.sectionStart, this.index), this.sectionStart = this.index) : (this.state === 19 || this.state === 20 || this.state === 21) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = this.index));
  }
  finish() {
    this.handleTrailingData(), this.cbs.onend();
  }
  /** Handle any trailing data. */
  handleTrailingData() {
    const t = this.buffer.length;
    this.sectionStart >= t || (this.state === 28 ? this.currentSequence === xe.CdataEnd ? this.cbs.oncdata(this.sectionStart, t) : this.cbs.oncomment(this.sectionStart, t) : this.state === 6 || this.state === 11 || this.state === 18 || this.state === 17 || this.state === 12 || this.state === 13 || this.state === 14 || this.state === 15 || this.state === 16 || this.state === 20 || this.state === 19 || this.state === 21 || this.state === 9 || this.cbs.ontext(this.sectionStart, t));
  }
  emitCodePoint(t, n) {
  }
}
const eE = {
  COMPILER_IS_ON_ELEMENT: {
    message: 'Platform-native elements with "is" prop will no longer be treated as components in Vue 3 unless the "is" value is explicitly prefixed with "vue:".',
    link: "https://v3-migration.vuejs.org/breaking-changes/custom-elements-interop.html"
  },
  COMPILER_V_BIND_SYNC: {
    message: (e) => `.sync modifier for v-bind has been removed. Use v-model with argument instead. \`v-bind:${e}.sync\` should be changed to \`v-model:${e}\`.`,
    link: "https://v3-migration.vuejs.org/breaking-changes/v-model.html"
  },
  COMPILER_V_BIND_OBJECT_ORDER: {
    message: 'v-bind="obj" usage is now order sensitive and behaves like JavaScript object spread: it will now overwrite an existing non-mergeable attribute that appears before v-bind in the case of conflict. To retain 2.x behavior, move v-bind to make it the first attribute. You can also suppress this warning if the usage is intended.',
    link: "https://v3-migration.vuejs.org/breaking-changes/v-bind.html"
  },
  COMPILER_V_ON_NATIVE: {
    message: ".native modifier for v-on has been removed as is no longer necessary.",
    link: "https://v3-migration.vuejs.org/breaking-changes/v-on-native-modifier-removed.html"
  },
  COMPILER_V_IF_V_FOR_PRECEDENCE: {
    message: "v-if / v-for precedence when used on the same element has changed in Vue 3: v-if now takes higher precedence and will no longer have access to v-for scope variables. It is best to avoid the ambiguity with <template> tags or use a computed property that filters v-for data source.",
    link: "https://v3-migration.vuejs.org/breaking-changes/v-if-v-for.html"
  },
  COMPILER_NATIVE_TEMPLATE: {
    message: "<template> with no special directives will render as a native template element instead of its inner content in Vue 3."
  },
  COMPILER_INLINE_TEMPLATE: {
    message: '"inline-template" has been removed in Vue 3.',
    link: "https://v3-migration.vuejs.org/breaking-changes/inline-template-attribute.html"
  },
  COMPILER_FILTERS: {
    message: 'filters have been removed in Vue 3. The "|" symbol will be treated as native JavaScript bitwise OR operator. Use method calls or computed properties instead.',
    link: "https://v3-migration.vuejs.org/breaking-changes/filters.html"
  }
};
function bo(e, { compatConfig: t }) {
  const n = t && t[e];
  return e === "MODE" ? n || 3 : n;
}
function ln(e, t) {
  const n = bo("MODE", t), s = bo(e, t);
  return n === 3 ? s === !0 : s !== !1;
}
function is(e, t, n, ...s) {
  const i = ln(e, t);
  return process.env.NODE_ENV !== "production" && i && zi(e, t, n, ...s), i;
}
function zi(e, t, n, ...s) {
  if (bo(e, t) === "suppress-warning")
    return;
  const { message: r, link: o } = eE[e], l = `(deprecation ${e}) ${typeof r == "function" ? r(...s) : r}${o ? `
  Details: ${o}` : ""}`, c = new SyntaxError(l);
  c.code = e, n && (c.loc = n), t.onWarn(c);
}
function Sl(e) {
  throw e;
}
function ku(e) {
  process.env.NODE_ENV !== "production" && console.warn(`[Vue warn] ${e.message}`);
}
function ue(e, t, n, s) {
  const i = process.env.NODE_ENV !== "production" ? (n || tE)[e] + (s || "") : `https://vuejs.org/error-reference/#compiler-${e}`, r = new SyntaxError(String(i));
  return r.code = e, r.loc = t, r;
}
const tE = {
  // parse errors
  0: "Illegal comment.",
  1: "CDATA section is allowed only in XML context.",
  2: "Duplicate attribute.",
  3: "End tag cannot have attributes.",
  4: "Illegal '/' in tags.",
  5: "Unexpected EOF in tag.",
  6: "Unexpected EOF in CDATA section.",
  7: "Unexpected EOF in comment.",
  8: "Unexpected EOF in script.",
  9: "Unexpected EOF in tag.",
  10: "Incorrectly closed comment.",
  11: "Incorrectly opened comment.",
  12: "Illegal tag name. Use '&lt;' to print '<'.",
  13: "Attribute value was expected.",
  14: "End tag name was expected.",
  15: "Whitespace was expected.",
  16: "Unexpected '<!--' in comment.",
  17: `Attribute name cannot contain U+0022 ("), U+0027 ('), and U+003C (<).`,
  18: "Unquoted attribute value cannot contain U+0022 (\"), U+0027 ('), U+003C (<), U+003D (=), and U+0060 (`).",
  19: "Attribute name cannot start with '='.",
  21: "'<?' is allowed only in XML context.",
  20: "Unexpected null character.",
  22: "Illegal '/' in tags.",
  // Vue-specific parse errors
  23: "Invalid end tag.",
  24: "Element is missing end tag.",
  25: "Interpolation end sign was not found.",
  27: "End bracket for dynamic directive argument was not found. Note that dynamic directive argument cannot contain spaces.",
  26: "Legal directive name was expected.",
  // transform errors
  28: "v-if/v-else-if is missing expression.",
  29: "v-if/else branches must use unique keys.",
  30: "v-else/v-else-if has no adjacent v-if or v-else-if.",
  31: "v-for is missing expression.",
  32: "v-for has invalid expression.",
  33: "<template v-for> key should be placed on the <template> tag.",
  34: "v-bind is missing expression.",
  52: "v-bind with same-name shorthand only allows static argument.",
  35: "v-on is missing expression.",
  36: "Unexpected custom directive on <slot> outlet.",
  37: "Mixed v-slot usage on both the component and nested <template>. When there are multiple named slots, all slots should use <template> syntax to avoid scope ambiguity.",
  38: "Duplicate slot names found. ",
  39: "Extraneous children found when component already has explicitly named default slot. These children will be ignored.",
  40: "v-slot can only be used on components or <template> tags.",
  41: "v-model is missing expression.",
  42: "v-model value must be a valid JavaScript member expression.",
  43: "v-model cannot be used on v-for or v-slot scope variables because they are not writable.",
  44: `v-model cannot be used on a prop, because local prop bindings are not writable.
Use a v-bind binding combined with a v-on listener that emits update:x event instead.`,
  45: "Error parsing JavaScript expression: ",
  46: "<KeepAlive> expects exactly one child component.",
  51: "@vnode-* hooks in templates are no longer supported. Use the vue: prefix instead. For example, @vnode-mounted should be changed to @vue:mounted. @vnode-* hooks support has been removed in 3.4.",
  // generic errors
  47: '"prefixIdentifiers" option is not supported in this build of compiler.',
  48: "ES module mode is not supported in this build of compiler.",
  49: '"cacheHandlers" option is only supported when the "prefixIdentifiers" option is enabled.',
  50: '"scopeId" option is only supported in module mode.',
  // just to fulfill types
  53: ""
}, Ze = (e) => e.type === 4 && e.isStatic;
function Ru(e) {
  switch (e) {
    case "Teleport":
    case "teleport":
      return Vs;
    case "Suspense":
    case "suspense":
      return ll;
    case "KeepAlive":
    case "keep-alive":
      return Wi;
    case "BaseTransition":
    case "base-transition":
      return Cu;
  }
}
const nE = /^$|^\d|[^\$\w\xA0-\uFFFF]/, Ol = (e) => !nE.test(e), Mu = /[A-Za-z_$\xA0-\uFFFF]/, sE = /[\.\?\w$\xA0-\uFFFF]/, iE = /\s+[.[]\s*|\s*[.[]\s+/g, Pu = (e) => e.type === 4 ? e.content : e.loc.source, rE = (e) => {
  const t = Pu(e).trim().replace(iE, (l) => l.trim());
  let n = 0, s = [], i = 0, r = 0, o = null;
  for (let l = 0; l < t.length; l++) {
    const c = t.charAt(l);
    switch (n) {
      case 0:
        if (c === "[")
          s.push(n), n = 1, i++;
        else if (c === "(")
          s.push(n), n = 2, r++;
        else if (!(l === 0 ? Mu : sE).test(c))
          return !1;
        break;
      case 1:
        c === "'" || c === '"' || c === "`" ? (s.push(n), n = 3, o = c) : c === "[" ? i++ : c === "]" && (--i || (n = s.pop()));
        break;
      case 2:
        if (c === "'" || c === '"' || c === "`")
          s.push(n), n = 3, o = c;
        else if (c === "(")
          r++;
        else if (c === ")") {
          if (l === t.length - 1)
            return !1;
          --r || (n = s.pop());
        }
        break;
      case 3:
        c === o && (n = s.pop(), o = null);
        break;
    }
  }
  return !i && !r;
}, $u = rE, oE = /^\s*(?:async\s*)?(?:\([^)]*?\)|[\w$_]+)\s*(?::[^=]+)?=>|^\s*(?:async\s+)?function(?:\s+[\w$]+)?\s*\(/, lE = (e) => oE.test(Pu(e)), cE = lE;
function Pc(e, t) {
  if (!e)
    throw new Error(t || "unexpected compiler condition");
}
function Xe(e, t, n = !1) {
  for (let s = 0; s < e.props.length; s++) {
    const i = e.props[s];
    if (i.type === 7 && (n || i.exp) && (Y(t) ? i.name === t : t.test(i.name)))
      return i;
  }
}
function Us(e, t, n = !1, s = !1) {
  for (let i = 0; i < e.props.length; i++) {
    const r = e.props[i];
    if (r.type === 6) {
      if (n) continue;
      if (r.name === t && (r.value || s))
        return r;
    } else if (r.name === "bind" && (r.exp || s) && nn(r.arg, t))
      return r;
  }
}
function nn(e, t) {
  return !!(e && Ze(e) && e.content === t);
}
function aE(e) {
  return e.props.some(
    (t) => t.type === 7 && t.name === "bind" && (!t.arg || // v-bind="obj"
    t.arg.type !== 4 || // v-bind:[_ctx.foo]
    !t.arg.isStatic)
    // v-bind:[foo]
  );
}
function Kr(e) {
  return e.type === 5 || e.type === 2;
}
function $c(e) {
  return e.type === 7 && e.name === "pre";
}
function fE(e) {
  return e.type === 7 && e.name === "slot";
}
function Yi(e) {
  return e.type === 1 && e.tagType === 3;
}
function Xi(e) {
  return e.type === 1 && e.tagType === 2;
}
const uE = /* @__PURE__ */ new Set([Bs, Zs]);
function Lu(e, t = []) {
  if (e && !Y(e) && e.type === 14) {
    const n = e.callee;
    if (!Y(n) && uE.has(n))
      return Lu(
        e.arguments[0],
        t.concat(e)
      );
  }
  return [e, t];
}
function Zi(e, t, n) {
  let s, i = e.type === 13 ? e.props : e.arguments[2], r = [], o;
  if (i && !Y(i) && i.type === 14) {
    const l = Lu(i);
    i = l[0], r = l[1], o = r[r.length - 1];
  }
  if (i == null || Y(i))
    s = ct([t]);
  else if (i.type === 14) {
    const l = i.arguments[0];
    !Y(l) && l.type === 15 ? Lc(t, l) || l.properties.unshift(t) : i.callee === yl ? s = De(n.helper(qi), [
      ct([t]),
      i
    ]) : i.arguments.unshift(ct([t])), !s && (s = i);
  } else i.type === 15 ? (Lc(t, i) || i.properties.unshift(t), s = i) : (s = De(n.helper(qi), [
    ct([t]),
    i
  ]), o && o.callee === Zs && (o = r[r.length - 2]));
  e.type === 13 ? o ? o.arguments[0] = s : e.props = s : o ? o.arguments[0] = s : e.arguments[2] = s;
}
function Lc(e, t) {
  let n = !1;
  if (e.key.type === 4) {
    const s = e.key.content;
    n = t.properties.some(
      (i) => i.key.type === 4 && i.key.content === s
    );
  }
  return n;
}
function Ks(e, t) {
  return `_${t}_${e.replace(/[^\w]/g, (n, s) => n === "-" ? "_" : e.charCodeAt(s).toString())}`;
}
function pE(e) {
  return e.type === 14 && e.callee === Nl ? e.arguments[1].returns : e;
}
const dE = /([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/, Fu = {
  parseMode: "base",
  ns: 0,
  delimiters: ["{{", "}}"],
  getNamespace: () => 0,
  isVoidTag: Ln,
  isPreTag: Ln,
  isIgnoreNewlineTag: Ln,
  isCustomElement: Ln,
  onError: Sl,
  onWarn: ku,
  comments: process.env.NODE_ENV !== "production",
  prefixIdentifiers: !1
};
let oe = Fu, Ws = null, Ut = "", Me = null, ie = null, ze = "", Mt = -1, hn = -1, Tl = 0, en = !1, So = null;
const Ee = [], he = new Qg(Ee, {
  onerr: Je,
  ontext(e, t) {
    fi(Ae(e, t), e, t);
  },
  ontextentity(e, t, n) {
    fi(e, t, n);
  },
  oninterpolation(e, t) {
    if (en)
      return fi(Ae(e, t), e, t);
    let n = e + he.delimiterOpen.length, s = t - he.delimiterClose.length;
    for (; tt(Ut.charCodeAt(n)); )
      n++;
    for (; tt(Ut.charCodeAt(s - 1)); )
      s--;
    let i = Ae(n, s);
    i.includes("&") && (i = oe.decodeEntities(i, !1)), Oo({
      type: 5,
      content: _i(i, !1, Ne(n, s)),
      loc: Ne(e, t)
    });
  },
  onopentagname(e, t) {
    const n = Ae(e, t);
    Me = {
      type: 1,
      tag: n,
      ns: oe.getNamespace(n, Ee[0], oe.ns),
      tagType: 0,
      // will be refined on tag close
      props: [],
      children: [],
      loc: Ne(e - 1, t),
      codegenNode: void 0
    };
  },
  onopentagend(e) {
    Hc(e);
  },
  onclosetag(e, t) {
    const n = Ae(e, t);
    if (!oe.isVoidTag(n)) {
      let s = !1;
      for (let i = 0; i < Ee.length; i++)
        if (Ee[i].tag.toLowerCase() === n.toLowerCase()) {
          s = !0, i > 0 && Je(24, Ee[0].loc.start.offset);
          for (let o = 0; o <= i; o++) {
            const l = Ee.shift();
            yi(l, t, o < i);
          }
          break;
        }
      s || Je(23, Hu(e, 60));
    }
  },
  onselfclosingtag(e) {
    const t = Me.tag;
    Me.isSelfClosing = !0, Hc(e), Ee[0] && Ee[0].tag === t && yi(Ee.shift(), e);
  },
  onattribname(e, t) {
    ie = {
      type: 6,
      name: Ae(e, t),
      nameLoc: Ne(e, t),
      value: void 0,
      loc: Ne(e)
    };
  },
  ondirname(e, t) {
    const n = Ae(e, t), s = n === "." || n === ":" ? "bind" : n === "@" ? "on" : n === "#" ? "slot" : n.slice(2);
    if (!en && s === "" && Je(26, e), en || s === "")
      ie = {
        type: 6,
        name: n,
        nameLoc: Ne(e, t),
        value: void 0,
        loc: Ne(e)
      };
    else if (ie = {
      type: 7,
      name: s,
      rawName: n,
      exp: void 0,
      arg: void 0,
      modifiers: n === "." ? [te("prop")] : [],
      loc: Ne(e)
    }, s === "pre") {
      en = he.inVPre = !0, So = Me;
      const i = Me.props;
      for (let r = 0; r < i.length; r++)
        i[r].type === 7 && (i[r] = OE(i[r]));
    }
  },
  ondirarg(e, t) {
    if (e === t) return;
    const n = Ae(e, t);
    if (en && !$c(ie))
      ie.name += n, En(ie.nameLoc, t);
    else {
      const s = n[0] !== "[";
      ie.arg = _i(
        s ? n : n.slice(1, -1),
        s,
        Ne(e, t),
        s ? 3 : 0
      );
    }
  },
  ondirmodifier(e, t) {
    const n = Ae(e, t);
    if (en && !$c(ie))
      ie.name += "." + n, En(ie.nameLoc, t);
    else if (ie.name === "slot") {
      const s = ie.arg;
      s && (s.content += "." + n, En(s.loc, t));
    } else {
      const s = te(n, !0, Ne(e, t));
      ie.modifiers.push(s);
    }
  },
  onattribdata(e, t) {
    ze += Ae(e, t), Mt < 0 && (Mt = e), hn = t;
  },
  onattribentity(e, t, n) {
    ze += e, Mt < 0 && (Mt = t), hn = n;
  },
  onattribnameend(e) {
    const t = ie.loc.start.offset, n = Ae(t, e);
    ie.type === 7 && (ie.rawName = n), Me.props.some(
      (s) => (s.type === 7 ? s.rawName : s.name) === n
    ) && Je(2, t);
  },
  onattribend(e, t) {
    if (Me && ie) {
      if (En(ie.loc, t), e !== 0)
        if (ze.includes("&") && (ze = oe.decodeEntities(
          ze,
          !0
        )), ie.type === 6)
          ie.name === "class" && (ze = ju(ze).trim()), e === 1 && !ze && Je(13, t), ie.value = {
            type: 2,
            content: ze,
            loc: e === 1 ? Ne(Mt, hn) : Ne(Mt - 1, hn + 1)
          }, he.inSFCRoot && Me.tag === "template" && ie.name === "lang" && ze && ze !== "html" && he.enterRCDATA(Ji("</template"), 0);
        else {
          let n = 0;
          ie.exp = _i(
            ze,
            !1,
            Ne(Mt, hn),
            0,
            n
          ), ie.name === "for" && (ie.forParseResult = mE(ie.exp));
          let s = -1;
          ie.name === "bind" && (s = ie.modifiers.findIndex(
            (i) => i.content === "sync"
          )) > -1 && is(
            "COMPILER_V_BIND_SYNC",
            oe,
            ie.loc,
            ie.arg.loc.source
          ) && (ie.name = "model", ie.modifiers.splice(s, 1));
        }
      (ie.type !== 7 || ie.name !== "pre") && Me.props.push(ie);
    }
    ze = "", Mt = hn = -1;
  },
  oncomment(e, t) {
    oe.comments && Oo({
      type: 3,
      content: Ae(e, t),
      loc: Ne(e - 4, t + 3)
    });
  },
  onend() {
    const e = Ut.length;
    if (process.env.NODE_ENV !== "production" && he.state !== 1)
      switch (he.state) {
        case 5:
        case 8:
          Je(5, e);
          break;
        case 3:
        case 4:
          Je(
            25,
            he.sectionStart
          );
          break;
        case 28:
          he.currentSequence === xe.CdataEnd ? Je(6, e) : Je(7, e);
          break;
        case 6:
        case 7:
        case 9:
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        // "
        case 20:
        // '
        case 21:
          Je(9, e);
          break;
      }
    for (let t = 0; t < Ee.length; t++)
      yi(Ee[t], e - 1), Je(24, Ee[t].loc.start.offset);
  },
  oncdata(e, t) {
    Ee[0].ns !== 0 ? fi(Ae(e, t), e, t) : Je(1, e - 9);
  },
  onprocessinginstruction(e) {
    (Ee[0] ? Ee[0].ns : oe.ns) === 0 && Je(
      21,
      e - 1
    );
  }
}), Fc = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, hE = /^\(|\)$/g;
function mE(e) {
  const t = e.loc, n = e.content, s = n.match(dE);
  if (!s) return;
  const [, i, r] = s, o = (a, d, m = !1) => {
    const y = t.start.offset + d, E = y + a.length;
    return _i(
      a,
      !1,
      Ne(y, E),
      0,
      m ? 1 : 0
      /* Normal */
    );
  }, l = {
    source: o(r.trim(), n.indexOf(r, i.length)),
    value: void 0,
    key: void 0,
    index: void 0,
    finalized: !1
  };
  let c = i.trim().replace(hE, "").trim();
  const u = i.indexOf(c), f = c.match(Fc);
  if (f) {
    c = c.replace(Fc, "").trim();
    const a = f[1].trim();
    let d;
    if (a && (d = n.indexOf(a, u + c.length), l.key = o(a, d, !0)), f[2]) {
      const m = f[2].trim();
      m && (l.index = o(
        m,
        n.indexOf(
          m,
          l.key ? d + a.length : u + c.length
        ),
        !0
      ));
    }
  }
  return c && (l.value = o(c, u, !0)), l;
}
function Ae(e, t) {
  return Ut.slice(e, t);
}
function Hc(e) {
  he.inSFCRoot && (Me.innerLoc = Ne(e + 1, e + 1)), Oo(Me);
  const { tag: t, ns: n } = Me;
  n === 0 && oe.isPreTag(t) && Tl++, oe.isVoidTag(t) ? yi(Me, e) : (Ee.unshift(Me), (n === 1 || n === 2) && (he.inXML = !0)), Me = null;
}
function fi(e, t, n) {
  {
    const r = Ee[0] && Ee[0].tag;
    r !== "script" && r !== "style" && e.includes("&") && (e = oe.decodeEntities(e, !1));
  }
  const s = Ee[0] || Ws, i = s.children[s.children.length - 1];
  i && i.type === 2 ? (i.content += e, En(i.loc, n)) : s.children.push({
    type: 2,
    content: e,
    loc: Ne(t, n)
  });
}
function yi(e, t, n = !1) {
  n ? En(e.loc, Hu(t, 60)) : En(e.loc, gE(t, 62) + 1), he.inSFCRoot && (e.children.length ? e.innerLoc.end = ee({}, e.children[e.children.length - 1].loc.end) : e.innerLoc.end = ee({}, e.innerLoc.start), e.innerLoc.source = Ae(
    e.innerLoc.start.offset,
    e.innerLoc.end.offset
  ));
  const { tag: s, ns: i, children: r } = e;
  if (en || (s === "slot" ? e.tagType = 2 : Bc(e) ? e.tagType = 3 : vE(e) && (e.tagType = 1)), he.inRCDATA || (e.children = Bu(r)), i === 0 && oe.isIgnoreNewlineTag(s)) {
    const o = r[0];
    o && o.type === 2 && (o.content = o.content.replace(/^\r?\n/, ""));
  }
  i === 0 && oe.isPreTag(s) && Tl--, So === e && (en = he.inVPre = !1, So = null), he.inXML && (Ee[0] ? Ee[0].ns : oe.ns) === 0 && (he.inXML = !1);
  {
    const o = e.props;
    if (process.env.NODE_ENV !== "production" && ln(
      "COMPILER_V_IF_V_FOR_PRECEDENCE",
      oe
    )) {
      let c = !1, u = !1;
      for (let f = 0; f < o.length; f++) {
        const a = o[f];
        if (a.type === 7 && (a.name === "if" ? c = !0 : a.name === "for" && (u = !0)), c && u) {
          zi(
            "COMPILER_V_IF_V_FOR_PRECEDENCE",
            oe,
            e.loc
          );
          break;
        }
      }
    }
    if (!he.inSFCRoot && ln(
      "COMPILER_NATIVE_TEMPLATE",
      oe
    ) && e.tag === "template" && !Bc(e)) {
      process.env.NODE_ENV !== "production" && zi(
        "COMPILER_NATIVE_TEMPLATE",
        oe,
        e.loc
      );
      const c = Ee[0] || Ws, u = c.children.indexOf(e);
      c.children.splice(u, 1, ...e.children);
    }
    const l = o.find(
      (c) => c.type === 6 && c.name === "inline-template"
    );
    l && is(
      "COMPILER_INLINE_TEMPLATE",
      oe,
      l.loc
    ) && e.children.length && (l.value = {
      type: 2,
      content: Ae(
        e.children[0].loc.start.offset,
        e.children[e.children.length - 1].loc.end.offset
      ),
      loc: l.loc
    });
  }
}
function gE(e, t) {
  let n = e;
  for (; Ut.charCodeAt(n) !== t && n < Ut.length - 1; ) n++;
  return n;
}
function Hu(e, t) {
  let n = e;
  for (; Ut.charCodeAt(n) !== t && n >= 0; ) n--;
  return n;
}
const EE = /* @__PURE__ */ new Set(["if", "else", "else-if", "for", "slot"]);
function Bc({ tag: e, props: t }) {
  if (e === "template") {
    for (let n = 0; n < t.length; n++)
      if (t[n].type === 7 && EE.has(t[n].name))
        return !0;
  }
  return !1;
}
function vE({ tag: e, props: t }) {
  if (oe.isCustomElement(e))
    return !1;
  if (e === "component" || yE(e.charCodeAt(0)) || Ru(e) || oe.isBuiltInComponent && oe.isBuiltInComponent(e) || oe.isNativeTag && !oe.isNativeTag(e))
    return !0;
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    if (s.type === 6) {
      if (s.name === "is" && s.value) {
        if (s.value.content.startsWith("vue:"))
          return !0;
        if (is(
          "COMPILER_IS_ON_ELEMENT",
          oe,
          s.loc
        ))
          return !0;
      }
    } else if (
      // :is on plain element - only treat as component in compat mode
      s.name === "bind" && nn(s.arg, "is") && is(
        "COMPILER_IS_ON_ELEMENT",
        oe,
        s.loc
      )
    )
      return !0;
  }
  return !1;
}
function yE(e) {
  return e > 64 && e < 91;
}
const _E = /\r\n/g;
function Bu(e) {
  const t = oe.whitespace !== "preserve";
  let n = !1;
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    if (i.type === 2)
      if (Tl)
        i.content = i.content.replace(_E, `
`);
      else if (NE(i.content)) {
        const r = e[s - 1] && e[s - 1].type, o = e[s + 1] && e[s + 1].type;
        !r || !o || t && (r === 3 && (o === 3 || o === 1) || r === 1 && (o === 3 || o === 1 && bE(i.content))) ? (n = !0, e[s] = null) : i.content = " ";
      } else t && (i.content = ju(i.content));
  }
  return n ? e.filter(Boolean) : e;
}
function NE(e) {
  for (let t = 0; t < e.length; t++)
    if (!tt(e.charCodeAt(t)))
      return !1;
  return !0;
}
function bE(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e.charCodeAt(t);
    if (n === 10 || n === 13)
      return !0;
  }
  return !1;
}
function ju(e) {
  let t = "", n = !1;
  for (let s = 0; s < e.length; s++)
    tt(e.charCodeAt(s)) ? n || (t += " ", n = !0) : (t += e[s], n = !1);
  return t;
}
function Oo(e) {
  (Ee[0] || Ws).children.push(e);
}
function Ne(e, t) {
  return {
    start: he.getPos(e),
    // @ts-expect-error allow late attachment
    end: t == null ? t : he.getPos(t),
    // @ts-expect-error allow late attachment
    source: t == null ? t : Ae(e, t)
  };
}
function SE(e) {
  return Ne(e.start.offset, e.end.offset);
}
function En(e, t) {
  e.end = he.getPos(t), e.source = Ae(e.start.offset, t);
}
function OE(e) {
  const t = {
    type: 6,
    name: e.rawName,
    nameLoc: Ne(
      e.loc.start.offset,
      e.loc.start.offset + e.rawName.length
    ),
    value: void 0,
    loc: e.loc
  };
  if (e.exp) {
    const n = e.exp.loc;
    n.end.offset < e.loc.end.offset && (n.start.offset--, n.start.column--, n.end.offset++, n.end.column++), t.value = {
      type: 2,
      content: e.exp.content,
      loc: n
    };
  }
  return t;
}
function _i(e, t = !1, n, s = 0, i = 0) {
  return te(e, t, n, s);
}
function Je(e, t, n) {
  oe.onError(
    ue(e, Ne(t, t), void 0, n)
  );
}
function TE() {
  he.reset(), Me = null, ie = null, ze = "", Mt = -1, hn = -1, Ee.length = 0;
}
function CE(e, t) {
  if (TE(), Ut = e, oe = ee({}, Fu), t) {
    let i;
    for (i in t)
      t[i] != null && (oe[i] = t[i]);
  }
  if (process.env.NODE_ENV !== "production" && !oe.decodeEntities)
    throw new Error(
      "[@vue/compiler-core] decodeEntities option is required in browser builds."
    );
  he.mode = oe.parseMode === "html" ? 1 : oe.parseMode === "sfc" ? 2 : 0, he.inXML = oe.ns === 1 || oe.ns === 2;
  const n = t && t.delimiters;
  n && (he.delimiterOpen = Ji(n[0]), he.delimiterClose = Ji(n[1]));
  const s = Ws = Yg([], e);
  return he.parse(Ut), s.loc = Ne(0, e.length), s.children = Bu(s.children), Ws = null, s;
}
function DE(e, t) {
  Ni(
    e,
    void 0,
    t,
    // Root node is unfortunately non-hoistable due to potential parent
    // fallthrough attributes.
    !!Uu(e)
  );
}
function Uu(e) {
  const t = e.children.filter((n) => n.type !== 3);
  return t.length === 1 && t[0].type === 1 && !Xi(t[0]) ? t[0] : null;
}
function Ni(e, t, n, s = !1, i = !1) {
  const { children: r } = e, o = [];
  for (let f = 0; f < r.length; f++) {
    const a = r[f];
    if (a.type === 1 && a.tagType === 0) {
      const d = s ? 0 : nt(a, n);
      if (d > 0) {
        if (d >= 2) {
          a.codegenNode.patchFlag = -1, o.push(a);
          continue;
        }
      } else {
        const m = a.codegenNode;
        if (m.type === 13) {
          const y = m.patchFlag;
          if ((y === void 0 || y === 512 || y === 1) && Wu(a, n) >= 2) {
            const E = qu(a);
            E && (m.props = n.hoist(E));
          }
          m.dynamicProps && (m.dynamicProps = n.hoist(m.dynamicProps));
        }
      }
    } else if (a.type === 12 && (s ? 0 : nt(a, n)) >= 2) {
      a.codegenNode.type === 14 && a.codegenNode.arguments.length > 0 && a.codegenNode.arguments.push(
        -1 + (process.env.NODE_ENV !== "production" ? ` /* ${_s[-1]} */` : "")
      ), o.push(a);
      continue;
    }
    if (a.type === 1) {
      const d = a.tagType === 1;
      d && n.scopes.vSlot++, Ni(a, e, n, !1, i), d && n.scopes.vSlot--;
    } else if (a.type === 11)
      Ni(a, e, n, a.children.length === 1, !0);
    else if (a.type === 9)
      for (let d = 0; d < a.branches.length; d++)
        Ni(
          a.branches[d],
          e,
          n,
          a.branches[d].children.length === 1,
          i
        );
  }
  let l = !1;
  if (o.length === r.length && e.type === 1) {
    if (e.tagType === 0 && e.codegenNode && e.codegenNode.type === 13 && B(e.codegenNode.children))
      e.codegenNode.children = c(
        Tn(e.codegenNode.children)
      ), l = !0;
    else if (e.tagType === 1 && e.codegenNode && e.codegenNode.type === 13 && e.codegenNode.children && !B(e.codegenNode.children) && e.codegenNode.children.type === 15) {
      const f = u(e.codegenNode, "default");
      f && (f.returns = c(
        Tn(f.returns)
      ), l = !0);
    } else if (e.tagType === 3 && t && t.type === 1 && t.tagType === 1 && t.codegenNode && t.codegenNode.type === 13 && t.codegenNode.children && !B(t.codegenNode.children) && t.codegenNode.children.type === 15) {
      const f = Xe(e, "slot", !0), a = f && f.arg && u(t.codegenNode, f.arg);
      a && (a.returns = c(
        Tn(a.returns)
      ), l = !0);
    }
  }
  if (!l)
    for (const f of o)
      f.codegenNode = n.cache(f.codegenNode);
  function c(f) {
    const a = n.cache(f);
    return a.needArraySpread = !0, a;
  }
  function u(f, a) {
    if (f.children && !B(f.children) && f.children.type === 15) {
      const d = f.children.properties.find(
        (m) => m.key === a || m.key.content === a
      );
      return d && d.value;
    }
  }
  o.length && n.transformHoist && n.transformHoist(r, n, e);
}
function nt(e, t) {
  const { constantCache: n } = t;
  switch (e.type) {
    case 1:
      if (e.tagType !== 0)
        return 0;
      const s = n.get(e);
      if (s !== void 0)
        return s;
      const i = e.codegenNode;
      if (i.type !== 13 || i.isBlock && e.tag !== "svg" && e.tag !== "foreignObject" && e.tag !== "math")
        return 0;
      if (i.patchFlag === void 0) {
        let o = 3;
        const l = Wu(e, t);
        if (l === 0)
          return n.set(e, 0), 0;
        l < o && (o = l);
        for (let c = 0; c < e.children.length; c++) {
          const u = nt(e.children[c], t);
          if (u === 0)
            return n.set(e, 0), 0;
          u < o && (o = u);
        }
        if (o > 1)
          for (let c = 0; c < e.props.length; c++) {
            const u = e.props[c];
            if (u.type === 7 && u.name === "bind" && u.exp) {
              const f = nt(u.exp, t);
              if (f === 0)
                return n.set(e, 0), 0;
              f < o && (o = f);
            }
          }
        if (i.isBlock) {
          for (let c = 0; c < e.props.length; c++)
            if (e.props[c].type === 7)
              return n.set(e, 0), 0;
          t.removeHelper(Vn), t.removeHelper(
            ss(t.inSSR, i.isComponent)
          ), i.isBlock = !1, t.helper(ns(t.inSSR, i.isComponent));
        }
        return n.set(e, o), o;
      } else
        return n.set(e, 0), 0;
    case 2:
    case 3:
      return 3;
    case 9:
    case 11:
    case 10:
      return 0;
    case 5:
    case 12:
      return nt(e.content, t);
    case 4:
      return e.constType;
    case 8:
      let r = 3;
      for (let o = 0; o < e.children.length; o++) {
        const l = e.children[o];
        if (Y(l) || Qe(l))
          continue;
        const c = nt(l, t);
        if (c === 0)
          return 0;
        c < r && (r = c);
      }
      return r;
    case 20:
      return 2;
    default:
      return process.env.NODE_ENV, 0;
  }
}
const wE = /* @__PURE__ */ new Set([
  El,
  vl,
  Bs,
  Zs
]);
function Ku(e, t) {
  if (e.type === 14 && !Y(e.callee) && wE.has(e.callee)) {
    const n = e.arguments[0];
    if (n.type === 4)
      return nt(n, t);
    if (n.type === 14)
      return Ku(n, t);
  }
  return 0;
}
function Wu(e, t) {
  let n = 3;
  const s = qu(e);
  if (s && s.type === 15) {
    const { properties: i } = s;
    for (let r = 0; r < i.length; r++) {
      const { key: o, value: l } = i[r], c = nt(o, t);
      if (c === 0)
        return c;
      c < n && (n = c);
      let u;
      if (l.type === 4 ? u = nt(l, t) : l.type === 14 ? u = Ku(l, t) : u = 0, u === 0)
        return u;
      u < n && (n = u);
    }
  }
  return n;
}
function qu(e) {
  const t = e.codegenNode;
  if (t.type === 13)
    return t.props;
}
function VE(e, {
  filename: t = "",
  prefixIdentifiers: n = !1,
  hoistStatic: s = !1,
  hmr: i = !1,
  cacheHandlers: r = !1,
  nodeTransforms: o = [],
  directiveTransforms: l = {},
  transformHoist: c = null,
  isBuiltInComponent: u = me,
  isCustomElement: f = me,
  expressionPlugins: a = [],
  scopeId: d = null,
  slotted: m = !0,
  ssr: y = !1,
  inSSR: E = !1,
  ssrCssVars: k = "",
  bindingMetadata: V = ne,
  inline: O = !1,
  isTS: h = !1,
  onError: N = Sl,
  onWarn: v = ku,
  compatConfig: D
}) {
  const F = t.replace(/\?.*$/, "").match(/([^/\\]+)\.\w+$/), w = {
    // options
    filename: t,
    selfName: F && xt(pe(F[1])),
    prefixIdentifiers: n,
    hoistStatic: s,
    hmr: i,
    cacheHandlers: r,
    nodeTransforms: o,
    directiveTransforms: l,
    transformHoist: c,
    isBuiltInComponent: u,
    isCustomElement: f,
    expressionPlugins: a,
    scopeId: d,
    slotted: m,
    ssr: y,
    inSSR: E,
    ssrCssVars: k,
    bindingMetadata: V,
    inline: O,
    isTS: h,
    onError: N,
    onWarn: v,
    compatConfig: D,
    // state
    root: e,
    helpers: /* @__PURE__ */ new Map(),
    components: /* @__PURE__ */ new Set(),
    directives: /* @__PURE__ */ new Set(),
    hoists: [],
    imports: [],
    cached: [],
    constantCache: /* @__PURE__ */ new WeakMap(),
    temps: 0,
    identifiers: /* @__PURE__ */ Object.create(null),
    scopes: {
      vFor: 0,
      vSlot: 0,
      vPre: 0,
      vOnce: 0
    },
    parent: null,
    grandParent: null,
    currentNode: e,
    childIndex: 0,
    inVOnce: !1,
    // methods
    helper(_) {
      const T = w.helpers.get(_) || 0;
      return w.helpers.set(_, T + 1), _;
    },
    removeHelper(_) {
      const T = w.helpers.get(_);
      if (T) {
        const M = T - 1;
        M ? w.helpers.set(_, M) : w.helpers.delete(_);
      }
    },
    helperString(_) {
      return `_${es[w.helper(_)]}`;
    },
    replaceNode(_) {
      if (process.env.NODE_ENV !== "production") {
        if (!w.currentNode)
          throw new Error("Node being replaced is already removed.");
        if (!w.parent)
          throw new Error("Cannot replace root node.");
      }
      w.parent.children[w.childIndex] = w.currentNode = _;
    },
    removeNode(_) {
      if (process.env.NODE_ENV !== "production" && !w.parent)
        throw new Error("Cannot remove root node.");
      const T = w.parent.children, M = _ ? T.indexOf(_) : w.currentNode ? w.childIndex : -1;
      if (process.env.NODE_ENV !== "production" && M < 0)
        throw new Error("node being removed is not a child of current parent");
      !_ || _ === w.currentNode ? (w.currentNode = null, w.onNodeRemoved()) : w.childIndex > M && (w.childIndex--, w.onNodeRemoved()), w.parent.children.splice(M, 1);
    },
    onNodeRemoved: me,
    addIdentifiers(_) {
    },
    removeIdentifiers(_) {
    },
    hoist(_) {
      Y(_) && (_ = te(_)), w.hoists.push(_);
      const T = te(
        `_hoisted_${w.hoists.length}`,
        !1,
        _.loc,
        2
      );
      return T.hoisted = _, T;
    },
    cache(_, T = !1, M = !1) {
      const b = Xg(
        w.cached.length,
        _,
        T,
        M
      );
      return w.cached.push(b), b;
    }
  };
  return w.filters = /* @__PURE__ */ new Set(), w;
}
function xE(e, t) {
  const n = VE(e, t);
  Tr(e, n), t.hoistStatic && DE(e, n), t.ssr || AE(e, n), e.helpers = /* @__PURE__ */ new Set([...n.helpers.keys()]), e.components = [...n.components], e.directives = [...n.directives], e.imports = n.imports, e.hoists = n.hoists, e.temps = n.temps, e.cached = n.cached, e.transformed = !0, e.filters = [...n.filters];
}
function AE(e, t) {
  const { helper: n } = t, { children: s } = e;
  if (s.length === 1) {
    const i = Uu(e);
    if (i && i.codegenNode) {
      const r = i.codegenNode;
      r.type === 13 && bl(r, t), e.codegenNode = r;
    } else
      e.codegenNode = s[0];
  } else if (s.length > 1) {
    let i = 64;
    process.env.NODE_ENV !== "production" && s.filter((r) => r.type !== 3).length === 1 && (i |= 2048), e.codegenNode = js(
      t,
      n(Hs),
      void 0,
      e.children,
      i,
      void 0,
      void 0,
      !0,
      void 0,
      !1
    );
  }
}
function IE(e, t) {
  let n = 0;
  const s = () => {
    n--;
  };
  for (; n < e.children.length; n++) {
    const i = e.children[n];
    Y(i) || (t.grandParent = t.parent, t.parent = e, t.childIndex = n, t.onNodeRemoved = s, Tr(i, t));
  }
}
function Tr(e, t) {
  t.currentNode = e;
  const { nodeTransforms: n } = t, s = [];
  for (let r = 0; r < n.length; r++) {
    const o = n[r](e, t);
    if (o && (B(o) ? s.push(...o) : s.push(o)), t.currentNode)
      e = t.currentNode;
    else
      return;
  }
  switch (e.type) {
    case 3:
      t.ssr || t.helper(Xs);
      break;
    case 5:
      t.ssr || t.helper(Or);
      break;
    // for container types, further traverse downwards
    case 9:
      for (let r = 0; r < e.branches.length; r++)
        Tr(e.branches[r], t);
      break;
    case 10:
    case 11:
    case 1:
    case 0:
      IE(e, t);
      break;
  }
  t.currentNode = e;
  let i = s.length;
  for (; i--; )
    s[i]();
}
function Gu(e, t) {
  const n = Y(e) ? (s) => s === e : (s) => e.test(s);
  return (s, i) => {
    if (s.type === 1) {
      const { props: r } = s;
      if (s.tagType === 3 && r.some(fE))
        return;
      const o = [];
      for (let l = 0; l < r.length; l++) {
        const c = r[l];
        if (c.type === 7 && n(c.name)) {
          r.splice(l, 1), l--;
          const u = t(s, c, i);
          u && o.push(u);
        }
      }
      return o;
    }
  };
}
const Cr = "/*@__PURE__*/", Ju = (e) => `${es[e]}: _${es[e]}`;
function kE(e, {
  mode: t = "function",
  prefixIdentifiers: n = t === "module",
  sourceMap: s = !1,
  filename: i = "template.vue.html",
  scopeId: r = null,
  optimizeImports: o = !1,
  runtimeGlobalName: l = "Vue",
  runtimeModuleName: c = "vue",
  ssrRuntimeModuleName: u = "vue/server-renderer",
  ssr: f = !1,
  isTS: a = !1,
  inSSR: d = !1
}) {
  const m = {
    mode: t,
    prefixIdentifiers: n,
    sourceMap: s,
    filename: i,
    scopeId: r,
    optimizeImports: o,
    runtimeGlobalName: l,
    runtimeModuleName: c,
    ssrRuntimeModuleName: u,
    ssr: f,
    isTS: a,
    inSSR: d,
    source: e.source,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    indentLevel: 0,
    pure: !1,
    map: void 0,
    helper(E) {
      return `_${es[E]}`;
    },
    push(E, k = -2, V) {
      m.code += E;
    },
    indent() {
      y(++m.indentLevel);
    },
    deindent(E = !1) {
      E ? --m.indentLevel : y(--m.indentLevel);
    },
    newline() {
      y(m.indentLevel);
    }
  };
  function y(E) {
    m.push(
      `
` + "  ".repeat(E),
      0
      /* Start */
    );
  }
  return m;
}
function RE(e, t = {}) {
  const n = kE(e, t);
  t.onContextCreated && t.onContextCreated(n);
  const {
    mode: s,
    push: i,
    prefixIdentifiers: r,
    indent: o,
    deindent: l,
    newline: c,
    scopeId: u,
    ssr: f
  } = n, a = Array.from(e.helpers), d = a.length > 0, m = !r && s !== "module";
  ME(e, n);
  const E = f ? "ssrRender" : "render", V = (f ? ["_ctx", "_push", "_parent", "_attrs"] : ["_ctx", "_cache"]).join(", ");
  if (i(`function ${E}(${V}) {`), o(), m && (i("with (_ctx) {"), o(), d && (i(
    `const { ${a.map(Ju).join(", ")} } = _Vue
`,
    -1
    /* End */
  ), c())), e.components.length && (Wr(e.components, "component", n), (e.directives.length || e.temps > 0) && c()), e.directives.length && (Wr(e.directives, "directive", n), e.temps > 0 && c()), e.filters && e.filters.length && (c(), Wr(e.filters, "filter", n), c()), e.temps > 0) {
    i("let ");
    for (let O = 0; O < e.temps; O++)
      i(`${O > 0 ? ", " : ""}_temp${O}`);
  }
  return (e.components.length || e.directives.length || e.temps) && (i(
    `
`,
    0
    /* Start */
  ), c()), f || i("return "), e.codegenNode ? Fe(e.codegenNode, n) : i("null"), m && (l(), i("}")), l(), i("}"), {
    ast: e,
    code: n.code,
    preamble: "",
    map: n.map ? n.map.toJSON() : void 0
  };
}
function ME(e, t) {
  const {
    ssr: n,
    prefixIdentifiers: s,
    push: i,
    newline: r,
    runtimeModuleName: o,
    runtimeGlobalName: l,
    ssrRuntimeModuleName: c
  } = t, u = l, f = Array.from(e.helpers);
  if (f.length > 0 && (i(
    `const _Vue = ${u}
`,
    -1
    /* End */
  ), e.hoists.length)) {
    const a = [
      cl,
      al,
      Xs,
      fl,
      Vu
    ].filter((d) => f.includes(d)).map(Ju).join(", ");
    i(
      `const { ${a} } = _Vue
`,
      -1
      /* End */
    );
  }
  PE(e.hoists, t), r(), i("return ");
}
function Wr(e, t, { helper: n, push: s, newline: i, isTS: r }) {
  const o = n(
    t === "filter" ? hl : t === "component" ? ul : dl
  );
  for (let l = 0; l < e.length; l++) {
    let c = e[l];
    const u = c.endsWith("__self");
    u && (c = c.slice(0, -6)), s(
      `const ${Ks(c, t)} = ${o}(${JSON.stringify(c)}${u ? ", true" : ""})${r ? "!" : ""}`
    ), l < e.length - 1 && i();
  }
}
function PE(e, t) {
  if (!e.length)
    return;
  t.pure = !0;
  const { push: n, newline: s } = t;
  s();
  for (let i = 0; i < e.length; i++) {
    const r = e[i];
    r && (n(`const _hoisted_${i + 1} = `), Fe(r, t), s());
  }
  t.pure = !1;
}
function $E(e) {
  return Y(e) || e.type === 4 || e.type === 2 || e.type === 5 || e.type === 8;
}
function Cl(e, t) {
  const n = e.length > 3 || process.env.NODE_ENV !== "production" && e.some((s) => B(s) || !$E(s));
  t.push("["), n && t.indent(), Qs(e, t, n), n && t.deindent(), t.push("]");
}
function Qs(e, t, n = !1, s = !0) {
  const { push: i, newline: r } = t;
  for (let o = 0; o < e.length; o++) {
    const l = e[o];
    Y(l) ? i(
      l,
      -3
      /* Unknown */
    ) : B(l) ? Cl(l, t) : Fe(l, t), o < e.length - 1 && (n ? (s && i(","), r()) : s && i(", "));
  }
}
function Fe(e, t) {
  if (Y(e)) {
    t.push(
      e,
      -3
      /* Unknown */
    );
    return;
  }
  if (Qe(e)) {
    t.push(t.helper(e));
    return;
  }
  switch (e.type) {
    case 1:
    case 9:
    case 11:
      process.env.NODE_ENV !== "production" && Pc(
        e.codegenNode != null,
        "Codegen node is missing for element/if/for node. Apply appropriate transforms first."
      ), Fe(e.codegenNode, t);
      break;
    case 2:
      LE(e, t);
      break;
    case 4:
      zu(e, t);
      break;
    case 5:
      FE(e, t);
      break;
    case 12:
      Fe(e.codegenNode, t);
      break;
    case 8:
      Yu(e, t);
      break;
    case 3:
      BE(e, t);
      break;
    case 13:
      jE(e, t);
      break;
    case 14:
      KE(e, t);
      break;
    case 15:
      WE(e, t);
      break;
    case 17:
      qE(e, t);
      break;
    case 18:
      GE(e, t);
      break;
    case 19:
      JE(e, t);
      break;
    case 20:
      zE(e, t);
      break;
    case 21:
      Qs(e.body, t, !0, !1);
      break;
    // SSR only types
    case 22:
      break;
    case 23:
      break;
    case 24:
      break;
    case 25:
      break;
    case 26:
      break;
    /* v8 ignore start */
    case 10:
      break;
    default:
      if (process.env.NODE_ENV !== "production")
        return Pc(!1, `unhandled codegen node type: ${e.type}`), e;
  }
}
function LE(e, t) {
  t.push(JSON.stringify(e.content), -3, e);
}
function zu(e, t) {
  const { content: n, isStatic: s } = e;
  t.push(
    s ? JSON.stringify(n) : n,
    -3,
    e
  );
}
function FE(e, t) {
  const { push: n, helper: s, pure: i } = t;
  i && n(Cr), n(`${s(Or)}(`), Fe(e.content, t), n(")");
}
function Yu(e, t) {
  for (let n = 0; n < e.children.length; n++) {
    const s = e.children[n];
    Y(s) ? t.push(
      s,
      -3
      /* Unknown */
    ) : Fe(s, t);
  }
}
function HE(e, t) {
  const { push: n } = t;
  if (e.type === 8)
    n("["), Yu(e, t), n("]");
  else if (e.isStatic) {
    const s = Ol(e.content) ? e.content : JSON.stringify(e.content);
    n(s, -2, e);
  } else
    n(`[${e.content}]`, -3, e);
}
function BE(e, t) {
  const { push: n, helper: s, pure: i } = t;
  i && n(Cr), n(
    `${s(Xs)}(${JSON.stringify(e.content)})`,
    -3,
    e
  );
}
function jE(e, t) {
  const { push: n, helper: s, pure: i } = t, {
    tag: r,
    props: o,
    children: l,
    patchFlag: c,
    dynamicProps: u,
    directives: f,
    isBlock: a,
    disableTracking: d,
    isComponent: m
  } = e;
  let y;
  if (c)
    if (process.env.NODE_ENV !== "production")
      if (c < 0)
        y = c + ` /* ${_s[c]} */`;
      else {
        const k = Object.keys(_s).map(Number).filter((V) => V > 0 && c & V).map((V) => _s[V]).join(", ");
        y = c + ` /* ${k} */`;
      }
    else
      y = String(c);
  f && n(s(ml) + "("), a && n(`(${s(Vn)}(${d ? "true" : ""}), `), i && n(Cr);
  const E = a ? ss(t.inSSR, m) : ns(t.inSSR, m);
  n(s(E) + "(", -2, e), Qs(
    UE([r, o, l, y, u]),
    t
  ), n(")"), a && n(")"), f && (n(", "), Fe(f, t), n(")"));
}
function UE(e) {
  let t = e.length;
  for (; t-- && e[t] == null; )
    ;
  return e.slice(0, t + 1).map((n) => n || "null");
}
function KE(e, t) {
  const { push: n, helper: s, pure: i } = t, r = Y(e.callee) ? e.callee : s(e.callee);
  i && n(Cr), n(r + "(", -2, e), Qs(e.arguments, t), n(")");
}
function WE(e, t) {
  const { push: n, indent: s, deindent: i, newline: r } = t, { properties: o } = e;
  if (!o.length) {
    n("{}", -2, e);
    return;
  }
  const l = o.length > 1 || process.env.NODE_ENV !== "production" && o.some((c) => c.value.type !== 4);
  n(l ? "{" : "{ "), l && s();
  for (let c = 0; c < o.length; c++) {
    const { key: u, value: f } = o[c];
    HE(u, t), n(": "), Fe(f, t), c < o.length - 1 && (n(","), r());
  }
  l && i(), n(l ? "}" : " }");
}
function qE(e, t) {
  Cl(e.elements, t);
}
function GE(e, t) {
  const { push: n, indent: s, deindent: i } = t, { params: r, returns: o, body: l, newline: c, isSlot: u } = e;
  u && n(`_${es[_l]}(`), n("(", -2, e), B(r) ? Qs(r, t) : r && Fe(r, t), n(") => "), (c || l) && (n("{"), s()), o ? (c && n("return "), B(o) ? Cl(o, t) : Fe(o, t)) : l && Fe(l, t), (c || l) && (i(), n("}")), u && (e.isNonScopedSlot && n(", undefined, true"), n(")"));
}
function JE(e, t) {
  const { test: n, consequent: s, alternate: i, newline: r } = e, { push: o, indent: l, deindent: c, newline: u } = t;
  if (n.type === 4) {
    const a = !Ol(n.content);
    a && o("("), zu(n, t), a && o(")");
  } else
    o("("), Fe(n, t), o(")");
  r && l(), t.indentLevel++, r || o(" "), o("? "), Fe(s, t), t.indentLevel--, r && u(), r || o(" "), o(": ");
  const f = i.type === 19;
  f || t.indentLevel++, Fe(i, t), f || t.indentLevel--, r && c(
    !0
    /* without newline */
  );
}
function zE(e, t) {
  const { push: n, helper: s, indent: i, deindent: r, newline: o } = t, { needPauseTracking: l, needArraySpread: c } = e;
  c && n("[...("), n(`_cache[${e.index}] || (`), l && (i(), n(`${s(Gi)}(-1`), e.inVOnce && n(", true"), n("),"), o(), n("(")), n(`_cache[${e.index}] = `), Fe(e.value, t), l && (n(`).cacheIndex = ${e.index},`), o(), n(`${s(Gi)}(1),`), o(), n(`_cache[${e.index}]`), r()), n(")"), c && n(")]");
}
const YE = new RegExp(
  "\\b" + "arguments,await,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,let,new,return,super,switch,throw,try,var,void,while,with,yield".split(",").join("\\b|\\b") + "\\b"
), XE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;
function vn(e, t, n = !1, s = !1) {
  const i = e.content;
  if (i.trim())
    try {
      new Function(
        s ? ` ${i} ` : `return ${n ? `(${i}) => {}` : `(${i})`}`
      );
    } catch (r) {
      let o = r.message;
      const l = i.replace(XE, "").match(YE);
      l && (o = `avoid using JavaScript keyword as property name: "${l[0]}"`), t.onError(
        ue(
          45,
          e.loc,
          void 0,
          o
        )
      );
    }
}
const ZE = (e, t) => {
  if (e.type === 5)
    e.content = qr(
      e.content,
      t
    );
  else if (e.type === 1) {
    const n = Xe(e, "memo");
    for (let s = 0; s < e.props.length; s++) {
      const i = e.props[s];
      if (i.type === 7 && i.name !== "for") {
        const r = i.exp, o = i.arg;
        r && r.type === 4 && !(i.name === "on" && o) && // key has been processed in transformFor(vMemo + vFor)
        !(n && o && o.type === 4 && o.content === "key") && (i.exp = qr(
          r,
          t,
          // slot args must be processed as function params
          i.name === "slot"
        )), o && o.type === 4 && !o.isStatic && (i.arg = qr(o, t));
      }
    }
  }
};
function qr(e, t, n = !1, s = !1, i = Object.create(t.identifiers)) {
  return process.env.NODE_ENV !== "production" && vn(e, t, n, s), e;
}
const QE = Gu(
  /^(?:if|else|else-if)$/,
  (e, t, n) => ev(e, t, n, (s, i, r) => {
    const o = n.parent.children;
    let l = o.indexOf(s), c = 0;
    for (; l-- >= 0; ) {
      const u = o[l];
      u && u.type === 9 && (c += u.branches.length);
    }
    return () => {
      if (r)
        s.codegenNode = Uc(
          i,
          c,
          n
        );
      else {
        const u = nv(s.codegenNode);
        u.alternate = Uc(
          i,
          c + s.branches.length - 1,
          n
        );
      }
    };
  })
);
function ev(e, t, n, s) {
  if (t.name !== "else" && (!t.exp || !t.exp.content.trim())) {
    const i = t.exp ? t.exp.loc : e.loc;
    n.onError(
      ue(28, t.loc)
    ), t.exp = te("true", !1, i);
  }
  if (process.env.NODE_ENV !== "production" && t.exp && vn(t.exp, n), t.name === "if") {
    const i = jc(e, t), r = {
      type: 9,
      loc: SE(e.loc),
      branches: [i]
    };
    if (n.replaceNode(r), s)
      return s(r, i, !0);
  } else {
    const i = n.parent.children, r = [];
    let o = i.indexOf(e);
    for (; o-- >= -1; ) {
      const l = i[o];
      if (l && l.type === 3) {
        n.removeNode(l), process.env.NODE_ENV !== "production" && r.unshift(l);
        continue;
      }
      if (l && l.type === 2 && !l.content.trim().length) {
        n.removeNode(l);
        continue;
      }
      if (l && l.type === 9) {
        (t.name === "else-if" || t.name === "else") && l.branches[l.branches.length - 1].condition === void 0 && n.onError(
          ue(30, e.loc)
        ), n.removeNode();
        const c = jc(e, t);
        if (process.env.NODE_ENV !== "production" && r.length && // #3619 ignore comments if the v-if is direct child of <transition>
        !(n.parent && n.parent.type === 1 && (n.parent.tag === "transition" || n.parent.tag === "Transition")) && (c.children = [...r, ...c.children]), process.env.NODE_ENV !== "production") {
          const f = c.userKey;
          f && l.branches.forEach(({ userKey: a }) => {
            tv(a, f) && n.onError(
              ue(
                29,
                c.userKey.loc
              )
            );
          });
        }
        l.branches.push(c);
        const u = s && s(l, c, !1);
        Tr(c, n), u && u(), n.currentNode = null;
      } else
        n.onError(
          ue(30, e.loc)
        );
      break;
    }
  }
}
function jc(e, t) {
  const n = e.tagType === 3;
  return {
    type: 10,
    loc: e.loc,
    condition: t.name === "else" ? void 0 : t.exp,
    children: n && !Xe(e, "for") ? e.children : [e],
    userKey: Us(e, "key"),
    isTemplateIf: n
  };
}
function Uc(e, t, n) {
  return e.condition ? No(
    e.condition,
    Kc(e, t, n),
    // make sure to pass in asBlock: true so that the comment node call
    // closes the current block.
    De(n.helper(Xs), [
      process.env.NODE_ENV !== "production" ? '"v-if"' : '""',
      "true"
    ])
  ) : Kc(e, t, n);
}
function Kc(e, t, n) {
  const { helper: s } = n, i = Oe(
    "key",
    te(
      `${t}`,
      !1,
      it,
      2
    )
  ), { children: r } = e, o = r[0];
  if (r.length !== 1 || o.type !== 1)
    if (r.length === 1 && o.type === 11) {
      const c = o.codegenNode;
      return Zi(c, i, n), c;
    } else {
      let c = 64;
      return process.env.NODE_ENV !== "production" && !e.isTemplateIf && r.filter((u) => u.type !== 3).length === 1 && (c |= 2048), js(
        n,
        s(Hs),
        ct([i]),
        r,
        c,
        void 0,
        void 0,
        !0,
        !1,
        !1,
        e.loc
      );
    }
  else {
    const c = o.codegenNode, u = pE(c);
    return u.type === 13 && bl(u, n), Zi(u, i, n), c;
  }
}
function tv(e, t) {
  if (!e || e.type !== t.type)
    return !1;
  if (e.type === 6) {
    if (e.value.content !== t.value.content)
      return !1;
  } else {
    const n = e.exp, s = t.exp;
    if (n.type !== s.type || n.type !== 4 || n.isStatic !== s.isStatic || n.content !== s.content)
      return !1;
  }
  return !0;
}
function nv(e) {
  for (; ; )
    if (e.type === 19)
      if (e.alternate.type === 19)
        e = e.alternate;
      else
        return e;
    else e.type === 20 && (e = e.value);
}
const sv = Gu(
  "for",
  (e, t, n) => {
    const { helper: s, removeHelper: i } = n;
    return iv(e, t, n, (r) => {
      const o = De(s(gl), [
        r.source
      ]), l = Yi(e), c = Xe(e, "memo"), u = Us(e, "key", !1, !0);
      u && u.type;
      let f = u && (u.type === 6 ? u.value ? te(u.value.content, !0) : void 0 : u.exp);
      const a = u && f ? Oe("key", f) : null, d = r.source.type === 4 && r.source.constType > 0, m = d ? 64 : u ? 128 : 256;
      return r.codegenNode = js(
        n,
        s(Hs),
        void 0,
        o,
        m,
        void 0,
        void 0,
        !0,
        !d,
        !1,
        e.loc
      ), () => {
        let y;
        const { children: E } = r;
        process.env.NODE_ENV !== "production" && l && e.children.some((O) => {
          if (O.type === 1) {
            const h = Us(O, "key");
            if (h)
              return n.onError(
                ue(
                  33,
                  h.loc
                )
              ), !0;
          }
        });
        const k = E.length !== 1 || E[0].type !== 1, V = Xi(e) ? e : l && e.children.length === 1 && Xi(e.children[0]) ? e.children[0] : null;
        if (V ? (y = V.codegenNode, l && a && Zi(y, a, n)) : k ? y = js(
          n,
          s(Hs),
          a ? ct([a]) : void 0,
          e.children,
          64,
          void 0,
          void 0,
          !0,
          void 0,
          !1
        ) : (y = E[0].codegenNode, l && a && Zi(y, a, n), y.isBlock !== !d && (y.isBlock ? (i(Vn), i(
          ss(n.inSSR, y.isComponent)
        )) : i(
          ns(n.inSSR, y.isComponent)
        )), y.isBlock = !d, y.isBlock ? (s(Vn), s(ss(n.inSSR, y.isComponent))) : s(ns(n.inSSR, y.isComponent))), c) {
          const O = ts(
            To(r.parseResult, [
              te("_cached")
            ])
          );
          O.body = Zg([
            yt(["const _memo = (", c.exp, ")"]),
            yt([
              "if (_cached",
              ...f ? [" && _cached.key === ", f] : [],
              ` && ${n.helperString(
                Iu
              )}(_cached, _memo)) return _cached`
            ]),
            yt(["const _item = ", y]),
            te("_item.memo = _memo"),
            te("return _item")
          ]), o.arguments.push(
            O,
            te("_cache"),
            te(String(n.cached.length))
          ), n.cached.push(null);
        } else
          o.arguments.push(
            ts(
              To(r.parseResult),
              y,
              !0
            )
          );
      };
    });
  }
);
function iv(e, t, n, s) {
  if (!t.exp) {
    n.onError(
      ue(31, t.loc)
    );
    return;
  }
  const i = t.forParseResult;
  if (!i) {
    n.onError(
      ue(32, t.loc)
    );
    return;
  }
  Xu(i, n);
  const { addIdentifiers: r, removeIdentifiers: o, scopes: l } = n, { source: c, value: u, key: f, index: a } = i, d = {
    type: 11,
    loc: t.loc,
    source: c,
    valueAlias: u,
    keyAlias: f,
    objectIndexAlias: a,
    parseResult: i,
    children: Yi(e) ? e.children : [e]
  };
  n.replaceNode(d), l.vFor++;
  const m = s && s(d);
  return () => {
    l.vFor--, m && m();
  };
}
function Xu(e, t) {
  e.finalized || (process.env.NODE_ENV !== "production" && (vn(e.source, t), e.key && vn(
    e.key,
    t,
    !0
  ), e.index && vn(
    e.index,
    t,
    !0
  ), e.value && vn(
    e.value,
    t,
    !0
  )), e.finalized = !0);
}
function To({ value: e, key: t, index: n }, s = []) {
  return rv([e, t, n, ...s]);
}
function rv(e) {
  let t = e.length;
  for (; t-- && !e[t]; )
    ;
  return e.slice(0, t + 1).map((n, s) => n || te("_".repeat(s + 1), !1));
}
const Wc = te("undefined", !1), ov = (e, t) => {
  if (e.type === 1 && (e.tagType === 1 || e.tagType === 3)) {
    const n = Xe(e, "slot");
    if (n)
      return n.exp, t.scopes.vSlot++, () => {
        t.scopes.vSlot--;
      };
  }
}, lv = (e, t, n, s) => ts(
  e,
  n,
  !1,
  !0,
  n.length ? n[0].loc : s
);
function cv(e, t, n = lv) {
  t.helper(_l);
  const { children: s, loc: i } = e, r = [], o = [];
  let l = t.scopes.vSlot > 0 || t.scopes.vFor > 0;
  const c = Xe(e, "slot", !0);
  if (c) {
    const { arg: k, exp: V } = c;
    k && !Ze(k) && (l = !0), r.push(
      Oe(
        k || te("default", !0),
        n(V, void 0, s, i)
      )
    );
  }
  let u = !1, f = !1;
  const a = [], d = /* @__PURE__ */ new Set();
  let m = 0;
  for (let k = 0; k < s.length; k++) {
    const V = s[k];
    let O;
    if (!Yi(V) || !(O = Xe(V, "slot", !0))) {
      V.type !== 3 && a.push(V);
      continue;
    }
    if (c) {
      t.onError(
        ue(37, O.loc)
      );
      break;
    }
    u = !0;
    const { children: h, loc: N } = V, {
      arg: v = te("default", !0),
      exp: D,
      loc: F
    } = O;
    let w;
    Ze(v) ? w = v ? v.content : "default" : l = !0;
    const _ = Xe(V, "for"), T = n(D, _, h, N);
    let M, b;
    if (M = Xe(V, "if"))
      l = !0, o.push(
        No(
          M.exp,
          ui(v, T, m++),
          Wc
        )
      );
    else if (b = Xe(
      V,
      /^else(?:-if)?$/,
      !0
      /* allowEmpty */
    )) {
      let L = k, q;
      for (; L-- && (q = s[L], !(q.type !== 3 && Co(q))); )
        ;
      if (q && Yi(q) && Xe(q, /^(?:else-)?if$/)) {
        let J = o[o.length - 1];
        for (; J.alternate.type === 19; )
          J = J.alternate;
        J.alternate = b.exp ? No(
          b.exp,
          ui(
            v,
            T,
            m++
          ),
          Wc
        ) : ui(v, T, m++);
      } else
        t.onError(
          ue(30, b.loc)
        );
    } else if (_) {
      l = !0;
      const L = _.forParseResult;
      L ? (Xu(L, t), o.push(
        De(t.helper(gl), [
          L.source,
          ts(
            To(L),
            ui(v, T),
            !0
          )
        ])
      )) : t.onError(
        ue(
          32,
          _.loc
        )
      );
    } else {
      if (w) {
        if (d.has(w)) {
          t.onError(
            ue(
              38,
              F
            )
          );
          continue;
        }
        d.add(w), w === "default" && (f = !0);
      }
      r.push(Oe(v, T));
    }
  }
  if (!c) {
    const k = (V, O) => {
      const h = n(V, void 0, O, i);
      return t.compatConfig && (h.isNonScopedSlot = !0), Oe("default", h);
    };
    u ? a.length && // #3766
    // with whitespace: 'preserve', whitespaces between slots will end up in
    // implicitDefaultChildren. Ignore if all implicit children are whitespaces.
    a.some((V) => Co(V)) && (f ? t.onError(
      ue(
        39,
        a[0].loc
      )
    ) : r.push(
      k(void 0, a)
    )) : r.push(k(void 0, s));
  }
  const y = l ? 2 : bi(e.children) ? 3 : 1;
  let E = ct(
    r.concat(
      Oe(
        "_",
        // 2 = compiled but dynamic = can skip normalization, but must run diff
        // 1 = compiled and static = can skip normalization AND diff as optimized
        te(
          y + (process.env.NODE_ENV !== "production" ? ` /* ${Tp[y]} */` : ""),
          !1
        )
      )
    ),
    i
  );
  return o.length && (E = De(t.helper(Au), [
    E,
    Tn(o)
  ])), {
    slots: E,
    hasDynamicSlots: l
  };
}
function ui(e, t, n) {
  const s = [
    Oe("name", e),
    Oe("fn", t)
  ];
  return n != null && s.push(
    Oe("key", te(String(n), !0))
  ), ct(s);
}
function bi(e) {
  for (let t = 0; t < e.length; t++) {
    const n = e[t];
    switch (n.type) {
      case 1:
        if (n.tagType === 2 || bi(n.children))
          return !0;
        break;
      case 9:
        if (bi(n.branches)) return !0;
        break;
      case 10:
      case 11:
        if (bi(n.children)) return !0;
        break;
    }
  }
  return !1;
}
function Co(e) {
  return e.type !== 2 && e.type !== 12 ? !0 : e.type === 2 ? !!e.content.trim() : Co(e.content);
}
const Zu = /* @__PURE__ */ new WeakMap(), av = (e, t) => function() {
  if (e = t.currentNode, !(e.type === 1 && (e.tagType === 0 || e.tagType === 1)))
    return;
  const { tag: s, props: i } = e, r = e.tagType === 1;
  let o = r ? fv(e, t) : `"${s}"`;
  const l = se(o) && o.callee === pl;
  let c, u, f = 0, a, d, m, y = (
    // dynamic component may resolve to plain elements
    l || o === Vs || o === ll || !r && // <svg> and <foreignObject> must be forced into blocks so that block
    // updates inside get proper isSVG flag at runtime. (#639, #643)
    // This is technically web-specific, but splitting the logic out of core
    // leads to too much unnecessary complexity.
    (s === "svg" || s === "foreignObject" || s === "math")
  );
  if (i.length > 0) {
    const E = Qu(
      e,
      t,
      void 0,
      r,
      l
    );
    c = E.props, f = E.patchFlag, d = E.dynamicPropNames;
    const k = E.directives;
    m = k && k.length ? Tn(
      k.map((V) => pv(V, t))
    ) : void 0, E.shouldUseBlock && (y = !0);
  }
  if (e.children.length > 0)
    if (o === Wi && (y = !0, f |= 1024, process.env.NODE_ENV !== "production" && e.children.length > 1 && t.onError(
      ue(46, {
        start: e.children[0].loc.start,
        end: e.children[e.children.length - 1].loc.end,
        source: ""
      })
    )), r && // Teleport is not a real component and has dedicated runtime handling
    o !== Vs && // explained above.
    o !== Wi) {
      const { slots: k, hasDynamicSlots: V } = cv(e, t);
      u = k, V && (f |= 1024);
    } else if (e.children.length === 1 && o !== Vs) {
      const k = e.children[0], V = k.type, O = V === 5 || V === 8;
      O && nt(k, t) === 0 && (f |= 1), O || V === 2 ? u = k : u = e.children;
    } else
      u = e.children;
  d && d.length && (a = dv(d)), e.codegenNode = js(
    t,
    o,
    c,
    u,
    f === 0 ? void 0 : f,
    a,
    m,
    !!y,
    !1,
    r,
    e.loc
  );
};
function fv(e, t, n = !1) {
  let { tag: s } = e;
  const i = Do(s), r = Us(
    e,
    "is",
    !1,
    !0
    /* allow empty */
  );
  if (r)
    if (i || ln(
      "COMPILER_IS_ON_ELEMENT",
      t
    )) {
      let l;
      if (r.type === 6 ? l = r.value && te(r.value.content, !0) : (l = r.exp, l || (l = te("is", !1, r.arg.loc))), l)
        return De(t.helper(pl), [
          l
        ]);
    } else r.type === 6 && r.value.content.startsWith("vue:") && (s = r.value.content.slice(4));
  const o = Ru(s) || t.isBuiltInComponent(s);
  return o ? (n || t.helper(o), o) : (t.helper(ul), t.components.add(s), Ks(s, "component"));
}
function Qu(e, t, n = e.props, s, i, r = !1) {
  const { tag: o, loc: l, children: c } = e;
  let u = [];
  const f = [], a = [], d = c.length > 0;
  let m = !1, y = 0, E = !1, k = !1, V = !1, O = !1, h = !1, N = !1;
  const v = [], D = (T) => {
    u.length && (f.push(
      ct(qc(u), l)
    ), u = []), T && f.push(T);
  }, F = () => {
    t.scopes.vFor > 0 && u.push(
      Oe(
        te("ref_for", !0),
        te("true")
      )
    );
  }, w = ({ key: T, value: M }) => {
    if (Ze(T)) {
      const b = T.content, L = Kt(b);
      if (L && (!s || i) && // omit the flag for click handlers because hydration gives click
      // dedicated fast path.
      b.toLowerCase() !== "onclick" && // omit v-model handlers
      b !== "onUpdate:modelValue" && // omit onVnodeXXX hooks
      !sn(b) && (O = !0), L && sn(b) && (N = !0), L && M.type === 14 && (M = M.arguments[0]), M.type === 20 || (M.type === 4 || M.type === 8) && nt(M, t) > 0)
        return;
      b === "ref" ? E = !0 : b === "class" ? k = !0 : b === "style" ? V = !0 : b !== "key" && !v.includes(b) && v.push(b), s && (b === "class" || b === "style") && !v.includes(b) && v.push(b);
    } else
      h = !0;
  };
  for (let T = 0; T < n.length; T++) {
    const M = n[T];
    if (M.type === 6) {
      const { loc: b, name: L, nameLoc: q, value: J } = M;
      let K = !0;
      if (L === "ref" && (E = !0, F()), L === "is" && (Do(o) || J && J.content.startsWith("vue:") || ln(
        "COMPILER_IS_ON_ELEMENT",
        t
      )))
        continue;
      u.push(
        Oe(
          te(L, !0, q),
          te(
            J ? J.content : "",
            K,
            J ? J.loc : b
          )
        )
      );
    } else {
      const { name: b, arg: L, exp: q, loc: J, modifiers: K } = M, W = b === "bind", U = b === "on";
      if (b === "slot") {
        s || t.onError(
          ue(40, J)
        );
        continue;
      }
      if (b === "once" || b === "memo" || b === "is" || W && nn(L, "is") && (Do(o) || ln(
        "COMPILER_IS_ON_ELEMENT",
        t
      )) || U && r)
        continue;
      if (
        // #938: elements with dynamic keys should be forced into blocks
        (W && nn(L, "key") || // inline before-update hooks need to force block so that it is invoked
        // before children
        U && d && nn(L, "vue:before-update")) && (m = !0), W && nn(L, "ref") && F(), !L && (W || U)
      ) {
        if (h = !0, q)
          if (W) {
            if (D(), process.env.NODE_ENV !== "production" && f.some((rt) => rt.type === 15 ? rt.properties.some(({ key: ot }) => ot.type !== 4 || !ot.isStatic ? !0 : ot.content !== "class" && ot.content !== "style" && !Kt(ot.content)) : !0) && is(
              "COMPILER_V_BIND_OBJECT_ORDER",
              t,
              J
            ), ln(
              "COMPILER_V_BIND_OBJECT_ORDER",
              t
            )) {
              f.unshift(q);
              continue;
            }
            F(), D(), f.push(q);
          } else
            D({
              type: 14,
              loc: J,
              callee: t.helper(yl),
              arguments: s ? [q] : [q, "true"]
            });
        else
          t.onError(
            ue(
              W ? 34 : 35,
              J
            )
          );
        continue;
      }
      W && K.some((qe) => qe.content === "prop") && (y |= 32);
      const ce = t.directiveTransforms[b];
      if (ce) {
        const { props: qe, needRuntime: rt } = ce(M, e, t);
        !r && qe.forEach(w), U && L && !Ze(L) ? D(ct(qe, l)) : u.push(...qe), rt && (a.push(M), Qe(rt) && Zu.set(M, rt));
      } else oa(b) || (a.push(M), d && (m = !0));
    }
  }
  let _;
  if (f.length ? (D(), f.length > 1 ? _ = De(
    t.helper(qi),
    f,
    l
  ) : _ = f[0]) : u.length && (_ = ct(
    qc(u),
    l
  )), h ? y |= 16 : (k && !s && (y |= 2), V && !s && (y |= 4), v.length && (y |= 8), O && (y |= 32)), !m && (y === 0 || y === 32) && (E || N || a.length > 0) && (y |= 512), !t.inSSR && _)
    switch (_.type) {
      case 15:
        let T = -1, M = -1, b = !1;
        for (let J = 0; J < _.properties.length; J++) {
          const K = _.properties[J].key;
          Ze(K) ? K.content === "class" ? T = J : K.content === "style" && (M = J) : K.isHandlerKey || (b = !0);
        }
        const L = _.properties[T], q = _.properties[M];
        b ? _ = De(
          t.helper(Bs),
          [_]
        ) : (L && !Ze(L.value) && (L.value = De(
          t.helper(El),
          [L.value]
        )), q && // the static style is compiled into an object,
        // so use `hasStyleBinding` to ensure that it is a dynamic style binding
        (V || q.value.type === 4 && q.value.content.trim()[0] === "[" || // v-bind:style and style both exist,
        // v-bind:style with static literal object
        q.value.type === 17) && (q.value = De(
          t.helper(vl),
          [q.value]
        )));
        break;
      case 14:
        break;
      default:
        _ = De(
          t.helper(Bs),
          [
            De(t.helper(Zs), [
              _
            ])
          ]
        );
        break;
    }
  return {
    props: _,
    directives: a,
    patchFlag: y,
    dynamicPropNames: v,
    shouldUseBlock: m
  };
}
function qc(e) {
  const t = /* @__PURE__ */ new Map(), n = [];
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    if (i.key.type === 8 || !i.key.isStatic) {
      n.push(i);
      continue;
    }
    const r = i.key.content, o = t.get(r);
    o ? (r === "style" || r === "class" || Kt(r)) && uv(o, i) : (t.set(r, i), n.push(i));
  }
  return n;
}
function uv(e, t) {
  e.value.type === 17 ? e.value.elements.push(t.value) : e.value = Tn(
    [e.value, t.value],
    e.loc
  );
}
function pv(e, t) {
  const n = [], s = Zu.get(e);
  s ? n.push(t.helperString(s)) : (t.helper(dl), t.directives.add(e.name), n.push(Ks(e.name, "directive")));
  const { loc: i } = e;
  if (e.exp && n.push(e.exp), e.arg && (e.exp || n.push("void 0"), n.push(e.arg)), Object.keys(e.modifiers).length) {
    e.arg || (e.exp || n.push("void 0"), n.push("void 0"));
    const r = te("true", !1, i);
    n.push(
      ct(
        e.modifiers.map(
          (o) => Oe(o, r)
        ),
        i
      )
    );
  }
  return Tn(n, e.loc);
}
function dv(e) {
  let t = "[";
  for (let n = 0, s = e.length; n < s; n++)
    t += JSON.stringify(e[n]), n < s - 1 && (t += ", ");
  return t + "]";
}
function Do(e) {
  return e === "component" || e === "Component";
}
const hv = (e, t) => {
  if (Xi(e)) {
    const { children: n, loc: s } = e, { slotName: i, slotProps: r } = mv(e, t), o = [
      t.prefixIdentifiers ? "_ctx.$slots" : "$slots",
      i,
      "{}",
      "undefined",
      "true"
    ];
    let l = 2;
    r && (o[2] = r, l = 3), n.length && (o[3] = ts([], n, !1, !1, s), l = 4), t.scopeId && !t.slotted && (l = 5), o.splice(l), e.codegenNode = De(
      t.helper(xu),
      o,
      s
    );
  }
};
function mv(e, t) {
  let n = '"default"', s;
  const i = [];
  for (let r = 0; r < e.props.length; r++) {
    const o = e.props[r];
    if (o.type === 6)
      o.value && (o.name === "name" ? n = JSON.stringify(o.value.content) : (o.name = pe(o.name), i.push(o)));
    else if (o.name === "bind" && nn(o.arg, "name")) {
      if (o.exp)
        n = o.exp;
      else if (o.arg && o.arg.type === 4) {
        const l = pe(o.arg.content);
        n = o.exp = te(l, !1, o.arg.loc);
      }
    } else
      o.name === "bind" && o.arg && Ze(o.arg) && (o.arg.content = pe(o.arg.content)), i.push(o);
  }
  if (i.length > 0) {
    const { props: r, directives: o } = Qu(
      e,
      t,
      i,
      !1,
      !1
    );
    s = r, o.length && t.onError(
      ue(
        36,
        o[0].loc
      )
    );
  }
  return {
    slotName: n,
    slotProps: s
  };
}
const ep = (e, t, n, s) => {
  const { loc: i, modifiers: r, arg: o } = e;
  !e.exp && !r.length && n.onError(ue(35, i));
  let l;
  if (o.type === 4)
    if (o.isStatic) {
      let a = o.content;
      process.env.NODE_ENV !== "production" && a.startsWith("vnode") && n.onError(ue(51, o.loc)), a.startsWith("vue:") && (a = `vnode-${a.slice(4)}`);
      const d = t.tagType !== 0 || a.startsWith("vnode") || !/[A-Z]/.test(a) ? (
        // for non-element and vnode lifecycle event listeners, auto convert
        // it to camelCase. See issue #2249
        Dt(pe(a))
      ) : (
        // preserve case for plain element listeners that have uppercase
        // letters, as these may be custom elements' custom events
        `on:${a}`
      );
      l = te(d, !0, o.loc);
    } else
      l = yt([
        `${n.helperString(_o)}(`,
        o,
        ")"
      ]);
  else
    l = o, l.children.unshift(`${n.helperString(_o)}(`), l.children.push(")");
  let c = e.exp;
  c && !c.content.trim() && (c = void 0);
  let u = n.cacheHandlers && !c && !n.inVOnce;
  if (c) {
    const a = $u(c), d = !(a || cE(c)), m = c.content.includes(";");
    process.env.NODE_ENV !== "production" && vn(
      c,
      n,
      !1,
      m
    ), (d || u && a) && (c = yt([
      `${d ? "$event" : "(...args)"} => ${m ? "{" : "("}`,
      c,
      m ? "}" : ")"
    ]));
  }
  let f = {
    props: [
      Oe(
        l,
        c || te("() => {}", !1, i)
      )
    ]
  };
  return s && (f = s(f)), u && (f.props[0].value = n.cache(f.props[0].value)), f.props.forEach((a) => a.key.isHandlerKey = !0), f;
}, gv = (e, t, n) => {
  const { modifiers: s, loc: i } = e, r = e.arg;
  let { exp: o } = e;
  return o && o.type === 4 && !o.content.trim() && (o = void 0), r.type !== 4 ? (r.children.unshift("("), r.children.push(') || ""')) : r.isStatic || (r.content = r.content ? `${r.content} || ""` : '""'), s.some((l) => l.content === "camel") && (r.type === 4 ? r.isStatic ? r.content = pe(r.content) : r.content = `${n.helperString(yo)}(${r.content})` : (r.children.unshift(`${n.helperString(yo)}(`), r.children.push(")"))), n.inSSR || (s.some((l) => l.content === "prop") && Gc(r, "."), s.some((l) => l.content === "attr") && Gc(r, "^")), {
    props: [Oe(r, o)]
  };
}, Gc = (e, t) => {
  e.type === 4 ? e.isStatic ? e.content = t + e.content : e.content = `\`${t}\${${e.content}}\`` : (e.children.unshift(`'${t}' + (`), e.children.push(")"));
}, Ev = (e, t) => {
  if (e.type === 0 || e.type === 1 || e.type === 11 || e.type === 10)
    return () => {
      const n = e.children;
      let s, i = !1;
      for (let r = 0; r < n.length; r++) {
        const o = n[r];
        if (Kr(o)) {
          i = !0;
          for (let l = r + 1; l < n.length; l++) {
            const c = n[l];
            if (Kr(c))
              s || (s = n[r] = yt(
                [o],
                o.loc
              )), s.children.push(" + ", c), n.splice(l, 1), l--;
            else {
              s = void 0;
              break;
            }
          }
        }
      }
      if (!(!i || // if this is a plain element with a single text child, leave it
      // as-is since the runtime has dedicated fast path for this by directly
      // setting textContent of the element.
      // for component root it's always normalized anyway.
      n.length === 1 && (e.type === 0 || e.type === 1 && e.tagType === 0 && // #3756
      // custom directives can potentially add DOM elements arbitrarily,
      // we need to avoid setting textContent of the element at runtime
      // to avoid accidentally overwriting the DOM elements added
      // by the user through custom directives.
      !e.props.find(
        (r) => r.type === 7 && !t.directiveTransforms[r.name]
      ) && e.tag !== "template")))
        for (let r = 0; r < n.length; r++) {
          const o = n[r];
          if (Kr(o) || o.type === 8) {
            const l = [];
            (o.type !== 2 || o.content !== " ") && l.push(o), !t.ssr && nt(o, t) === 0 && l.push(
              1 + (process.env.NODE_ENV !== "production" ? ` /* ${_s[1]} */` : "")
            ), n[r] = {
              type: 12,
              content: o,
              loc: o.loc,
              codegenNode: De(
                t.helper(fl),
                l
              )
            };
          }
        }
    };
}, Jc = /* @__PURE__ */ new WeakSet(), vv = (e, t) => {
  if (e.type === 1 && Xe(e, "once", !0))
    return Jc.has(e) || t.inVOnce || t.inSSR ? void 0 : (Jc.add(e), t.inVOnce = !0, t.helper(Gi), () => {
      t.inVOnce = !1;
      const n = t.currentNode;
      n.codegenNode && (n.codegenNode = t.cache(
        n.codegenNode,
        !0,
        !0
      ));
    });
}, tp = (e, t, n) => {
  const { exp: s, arg: i } = e;
  if (!s)
    return n.onError(
      ue(41, e.loc)
    ), pi();
  const r = s.loc.source.trim(), o = s.type === 4 ? s.content : r, l = n.bindingMetadata[r];
  if (l === "props" || l === "props-aliased")
    return n.onError(ue(44, s.loc)), pi();
  if (!o.trim() || !$u(s))
    return n.onError(
      ue(42, s.loc)
    ), pi();
  const c = i || te("modelValue", !0), u = i ? Ze(i) ? `onUpdate:${pe(i.content)}` : yt(['"onUpdate:" + ', i]) : "onUpdate:modelValue";
  let f;
  const a = n.isTS ? "($event: any)" : "$event";
  f = yt([
    `${a} => ((`,
    s,
    ") = $event)"
  ]);
  const d = [
    // modelValue: foo
    Oe(c, e.exp),
    // "onUpdate:modelValue": $event => (foo = $event)
    Oe(u, f)
  ];
  if (e.modifiers.length && t.tagType === 1) {
    const m = e.modifiers.map((E) => E.content).map((E) => (Ol(E) ? E : JSON.stringify(E)) + ": true").join(", "), y = i ? Ze(i) ? `${i.content}Modifiers` : yt([i, ' + "Modifiers"']) : "modelModifiers";
    d.push(
      Oe(
        y,
        te(
          `{ ${m} }`,
          !1,
          e.loc,
          2
        )
      )
    );
  }
  return pi(d);
};
function pi(e = []) {
  return { props: e };
}
const yv = /[\w).+\-_$\]]/, _v = (e, t) => {
  ln("COMPILER_FILTERS", t) && (e.type === 5 ? Qi(e.content, t) : e.type === 1 && e.props.forEach((n) => {
    n.type === 7 && n.name !== "for" && n.exp && Qi(n.exp, t);
  }));
};
function Qi(e, t) {
  if (e.type === 4)
    zc(e, t);
  else
    for (let n = 0; n < e.children.length; n++) {
      const s = e.children[n];
      typeof s == "object" && (s.type === 4 ? zc(s, t) : s.type === 8 ? Qi(e, t) : s.type === 5 && Qi(s.content, t));
    }
}
function zc(e, t) {
  const n = e.content;
  let s = !1, i = !1, r = !1, o = !1, l = 0, c = 0, u = 0, f = 0, a, d, m, y, E = [];
  for (m = 0; m < n.length; m++)
    if (d = a, a = n.charCodeAt(m), s)
      a === 39 && d !== 92 && (s = !1);
    else if (i)
      a === 34 && d !== 92 && (i = !1);
    else if (r)
      a === 96 && d !== 92 && (r = !1);
    else if (o)
      a === 47 && d !== 92 && (o = !1);
    else if (a === 124 && // pipe
    n.charCodeAt(m + 1) !== 124 && n.charCodeAt(m - 1) !== 124 && !l && !c && !u)
      y === void 0 ? (f = m + 1, y = n.slice(0, m).trim()) : k();
    else {
      switch (a) {
        case 34:
          i = !0;
          break;
        // "
        case 39:
          s = !0;
          break;
        // '
        case 96:
          r = !0;
          break;
        // `
        case 40:
          u++;
          break;
        // (
        case 41:
          u--;
          break;
        // )
        case 91:
          c++;
          break;
        // [
        case 93:
          c--;
          break;
        // ]
        case 123:
          l++;
          break;
        // {
        case 125:
          l--;
          break;
      }
      if (a === 47) {
        let V = m - 1, O;
        for (; V >= 0 && (O = n.charAt(V), O === " "); V--)
          ;
        (!O || !yv.test(O)) && (o = !0);
      }
    }
  y === void 0 ? y = n.slice(0, m).trim() : f !== 0 && k();
  function k() {
    E.push(n.slice(f, m).trim()), f = m + 1;
  }
  if (E.length) {
    for (process.env.NODE_ENV !== "production" && zi(
      "COMPILER_FILTERS",
      t,
      e.loc
    ), m = 0; m < E.length; m++)
      y = Nv(y, E[m], t);
    e.content = y, e.ast = void 0;
  }
}
function Nv(e, t, n) {
  n.helper(hl);
  const s = t.indexOf("(");
  if (s < 0)
    return n.filters.add(t), `${Ks(t, "filter")}(${e})`;
  {
    const i = t.slice(0, s), r = t.slice(s + 1);
    return n.filters.add(i), `${Ks(i, "filter")}(${e}${r !== ")" ? "," + r : r}`;
  }
}
const Yc = /* @__PURE__ */ new WeakSet(), bv = (e, t) => {
  if (e.type === 1) {
    const n = Xe(e, "memo");
    return !n || Yc.has(e) || t.inSSR ? void 0 : (Yc.add(e), () => {
      const s = e.codegenNode || t.currentNode.codegenNode;
      s && s.type === 13 && (e.tagType !== 1 && bl(s, t), e.codegenNode = De(t.helper(Nl), [
        n.exp,
        ts(void 0, s),
        "_cache",
        String(t.cached.length)
      ]), t.cached.push(null));
    });
  }
}, Sv = (e, t) => {
  if (e.type === 1) {
    for (const n of e.props)
      if (n.type === 7 && n.name === "bind" && (!n.exp || // #13930 :foo in in-DOM templates will be parsed into :foo="" by browser
      n.exp.type === 4 && !n.exp.content.trim()) && n.arg) {
        const s = n.arg;
        if (s.type !== 4 || !s.isStatic)
          t.onError(
            ue(
              52,
              s.loc
            )
          ), n.exp = te("", !0, s.loc);
        else {
          const i = pe(s.content);
          (Mu.test(i[0]) || // allow hyphen first char for https://github.com/vuejs/language-tools/pull/3424
          i[0] === "-") && (n.exp = te(i, !1, s.loc));
        }
      }
  }
};
function Ov(e) {
  return [
    [
      Sv,
      vv,
      QE,
      bv,
      sv,
      _v,
      ...process.env.NODE_ENV !== "production" ? [ZE] : [],
      hv,
      av,
      ov,
      Ev
    ],
    {
      on: ep,
      bind: gv,
      model: tp
    }
  ];
}
function Tv(e, t = {}) {
  const n = t.onError || Sl, s = t.mode === "module";
  t.prefixIdentifiers === !0 ? n(ue(47)) : s && n(ue(48));
  const i = !1;
  t.cacheHandlers && n(ue(49)), t.scopeId && !s && n(ue(50));
  const r = ee({}, t, {
    prefixIdentifiers: i
  }), o = Y(e) ? CE(e, r) : e, [l, c] = Ov();
  return xE(
    o,
    ee({}, r, {
      nodeTransforms: [
        ...l,
        ...t.nodeTransforms || []
        // user transforms
      ],
      directiveTransforms: ee(
        {},
        c,
        t.directiveTransforms || {}
        // user transforms
      )
    })
  ), RE(o, r);
}
const Cv = () => ({ props: [] });
const np = Symbol(process.env.NODE_ENV !== "production" ? "vModelRadio" : ""), sp = Symbol(
  process.env.NODE_ENV !== "production" ? "vModelCheckbox" : ""
), ip = Symbol(process.env.NODE_ENV !== "production" ? "vModelText" : ""), rp = Symbol(
  process.env.NODE_ENV !== "production" ? "vModelSelect" : ""
), wo = Symbol(
  process.env.NODE_ENV !== "production" ? "vModelDynamic" : ""
), op = Symbol(
  process.env.NODE_ENV !== "production" ? "vOnModifiersGuard" : ""
), lp = Symbol(
  process.env.NODE_ENV !== "production" ? "vOnKeysGuard" : ""
), cp = Symbol(process.env.NODE_ENV !== "production" ? "vShow" : ""), Dl = Symbol(process.env.NODE_ENV !== "production" ? "Transition" : ""), ap = Symbol(
  process.env.NODE_ENV !== "production" ? "TransitionGroup" : ""
);
zg({
  [np]: "vModelRadio",
  [sp]: "vModelCheckbox",
  [ip]: "vModelText",
  [rp]: "vModelSelect",
  [wo]: "vModelDynamic",
  [op]: "withModifiers",
  [lp]: "withKeys",
  [cp]: "vShow",
  [Dl]: "Transition",
  [ap]: "TransitionGroup"
});
let Mn;
function Dv(e, t = !1) {
  return Mn || (Mn = document.createElement("div")), t ? (Mn.innerHTML = `<div foo="${e.replace(/"/g, "&quot;")}">`, Mn.children[0].getAttribute("foo")) : (Mn.innerHTML = e, Mn.textContent);
}
const wv = {
  parseMode: "html",
  isVoidTag: Lp,
  isNativeTag: (e) => ca(e) || aa(e) || fa(e),
  isPreTag: (e) => e === "pre",
  isIgnoreNewlineTag: (e) => e === "pre" || e === "textarea",
  decodeEntities: Dv,
  isBuiltInComponent: (e) => {
    if (e === "Transition" || e === "transition")
      return Dl;
    if (e === "TransitionGroup" || e === "transition-group")
      return ap;
  },
  // https://html.spec.whatwg.org/multipage/parsing.html#tree-construction-dispatcher
  getNamespace(e, t, n) {
    let s = t ? t.ns : n;
    if (t && s === 2)
      if (t.tag === "annotation-xml") {
        if (e === "svg")
          return 1;
        t.props.some(
          (i) => i.type === 6 && i.name === "encoding" && i.value != null && (i.value.content === "text/html" || i.value.content === "application/xhtml+xml")
        ) && (s = 0);
      } else /^m(?:[ions]|text)$/.test(t.tag) && e !== "mglyph" && e !== "malignmark" && (s = 0);
    else t && s === 1 && (t.tag === "foreignObject" || t.tag === "desc" || t.tag === "title") && (s = 0);
    if (s === 0) {
      if (e === "svg")
        return 1;
      if (e === "math")
        return 2;
    }
    return s;
  }
}, Vv = (e) => {
  e.type === 1 && e.props.forEach((t, n) => {
    t.type === 6 && t.name === "style" && t.value && (e.props[n] = {
      type: 7,
      name: "bind",
      arg: te("style", !0, t.loc),
      exp: xv(t.value.content, t.loc),
      modifiers: [],
      loc: t.loc
    });
  });
}, xv = (e, t) => {
  const n = la(e);
  return te(
    JSON.stringify(n),
    !1,
    t,
    3
  );
};
function Et(e, t) {
  return ue(
    e,
    t,
    process.env.NODE_ENV !== "production" ? Av : void 0
  );
}
const Av = {
  53: "v-html is missing expression.",
  54: "v-html will override element children.",
  55: "v-text is missing expression.",
  56: "v-text will override element children.",
  57: "v-model can only be used on <input>, <textarea> and <select> elements.",
  58: "v-model argument is not supported on plain elements.",
  59: "v-model cannot be used on file inputs since they are read-only. Use a v-on:change listener instead.",
  60: "Unnecessary value binding used alongside v-model. It will interfere with v-model's behavior.",
  61: "v-show is missing expression.",
  62: "<Transition> expects exactly one child element or component.",
  63: "Tags with side effect (<script> and <style>) are ignored in client component templates."
}, Iv = (e, t, n) => {
  const { exp: s, loc: i } = e;
  return s || n.onError(
    Et(53, i)
  ), t.children.length && (n.onError(
    Et(54, i)
  ), t.children.length = 0), {
    props: [
      Oe(
        te("innerHTML", !0, i),
        s || te("", !0)
      )
    ]
  };
}, kv = (e, t, n) => {
  const { exp: s, loc: i } = e;
  return s || n.onError(
    Et(55, i)
  ), t.children.length && (n.onError(
    Et(56, i)
  ), t.children.length = 0), {
    props: [
      Oe(
        te("textContent", !0),
        s ? nt(s, n) > 0 ? s : De(
          n.helperString(Or),
          [s],
          i
        ) : te("", !0)
      )
    ]
  };
}, Rv = (e, t, n) => {
  const s = tp(e, t, n);
  if (!s.props.length || t.tagType === 1)
    return s;
  e.arg && n.onError(
    Et(
      58,
      e.arg.loc
    )
  );
  function i() {
    const l = Xe(t, "bind");
    l && nn(l.arg, "value") && n.onError(
      Et(
        60,
        l.loc
      )
    );
  }
  const { tag: r } = t, o = n.isCustomElement(r);
  if (r === "input" || r === "textarea" || r === "select" || o) {
    let l = ip, c = !1;
    if (r === "input" || o) {
      const u = Us(t, "type");
      if (u) {
        if (u.type === 7)
          l = wo;
        else if (u.value)
          switch (u.value.content) {
            case "radio":
              l = np;
              break;
            case "checkbox":
              l = sp;
              break;
            case "file":
              c = !0, n.onError(
                Et(
                  59,
                  e.loc
                )
              );
              break;
            default:
              process.env.NODE_ENV !== "production" && i();
              break;
          }
      } else aE(t) ? l = wo : process.env.NODE_ENV !== "production" && i();
    } else r === "select" ? l = rp : process.env.NODE_ENV !== "production" && i();
    c || (s.needRuntime = n.helper(l));
  } else
    n.onError(
      Et(
        57,
        e.loc
      )
    );
  return s.props = s.props.filter(
    (l) => !(l.key.type === 4 && l.key.content === "modelValue")
  ), s;
}, Mv = /* @__PURE__ */ Ve("passive,once,capture"), Pv = /* @__PURE__ */ Ve(
  // event propagation management
  "stop,prevent,self,ctrl,shift,alt,meta,exact,middle"
), $v = /* @__PURE__ */ Ve("left,right"), fp = /* @__PURE__ */ Ve("onkeyup,onkeydown,onkeypress"), Lv = (e, t, n, s) => {
  const i = [], r = [], o = [];
  for (let l = 0; l < t.length; l++) {
    const c = t[l].content;
    c === "native" && is(
      "COMPILER_V_ON_NATIVE",
      n,
      s
    ) || Mv(c) ? o.push(c) : $v(c) ? Ze(e) ? fp(e.content.toLowerCase()) ? i.push(c) : r.push(c) : (i.push(c), r.push(c)) : Pv(c) ? r.push(c) : i.push(c);
  }
  return {
    keyModifiers: i,
    nonKeyModifiers: r,
    eventOptionModifiers: o
  };
}, Xc = (e, t) => Ze(e) && e.content.toLowerCase() === "onclick" ? te(t, !0) : e.type !== 4 ? yt([
  "(",
  e,
  `) === "onClick" ? "${t}" : (`,
  e,
  ")"
]) : e, Fv = (e, t, n) => ep(e, t, n, (s) => {
  const { modifiers: i } = e;
  if (!i.length) return s;
  let { key: r, value: o } = s.props[0];
  const { keyModifiers: l, nonKeyModifiers: c, eventOptionModifiers: u } = Lv(r, i, n, e.loc);
  if (c.includes("right") && (r = Xc(r, "onContextmenu")), c.includes("middle") && (r = Xc(r, "onMouseup")), c.length && (o = De(n.helper(op), [
    o,
    JSON.stringify(c)
  ])), l.length && // if event name is dynamic, always wrap with keys guard
  (!Ze(r) || fp(r.content.toLowerCase())) && (o = De(n.helper(lp), [
    o,
    JSON.stringify(l)
  ])), u.length) {
    const f = u.map(xt).join("");
    r = Ze(r) ? te(`${r.content}${f}`, !0) : yt(["(", r, `) + "${f}"`]);
  }
  return {
    props: [Oe(r, o)]
  };
}), Hv = (e, t, n) => {
  const { exp: s, loc: i } = e;
  return s || n.onError(
    Et(61, i)
  ), {
    props: [],
    needRuntime: n.helper(cp)
  };
}, Bv = (e, t) => {
  if (e.type === 1 && e.tagType === 1 && t.isBuiltInComponent(e.tag) === Dl)
    return () => {
      if (!e.children.length)
        return;
      up(e) && t.onError(
        Et(
          62,
          {
            start: e.children[0].loc.start,
            end: e.children[e.children.length - 1].loc.end,
            source: ""
          }
        )
      );
      const s = e.children[0];
      if (s.type === 1)
        for (const i of s.props)
          i.type === 7 && i.name === "show" && e.props.push({
            type: 6,
            name: "persisted",
            nameLoc: e.loc,
            value: void 0,
            loc: e.loc
          });
    };
};
function up(e) {
  const t = e.children = e.children.filter(
    (s) => s.type !== 3 && !(s.type === 2 && !s.content.trim())
  ), n = t[0];
  return t.length !== 1 || n.type === 11 || n.type === 9 && n.branches.some(up);
}
const jv = (e, t) => {
  e.type === 1 && e.tagType === 0 && (e.tag === "script" || e.tag === "style") && (process.env.NODE_ENV !== "production" && t.onError(
    Et(
      63,
      e.loc
    )
  ), t.removeNode());
};
function Uv(e, t) {
  return e === "template" ? !0 : e in Zc ? Zc[e].has(t) : t in Qc ? Qc[t].has(e) : !(e in ea && ea[e].has(t) || t in ta && ta[t].has(e));
}
const Pn = /* @__PURE__ */ new Set(["h1", "h2", "h3", "h4", "h5", "h6"]), mn = /* @__PURE__ */ new Set([]), Zc = {
  head: /* @__PURE__ */ new Set([
    "base",
    "basefront",
    "bgsound",
    "link",
    "meta",
    "title",
    "noscript",
    "noframes",
    "style",
    "script",
    "template"
  ]),
  optgroup: /* @__PURE__ */ new Set(["option"]),
  select: /* @__PURE__ */ new Set(["optgroup", "option", "hr"]),
  // table
  table: /* @__PURE__ */ new Set(["caption", "colgroup", "tbody", "tfoot", "thead"]),
  tr: /* @__PURE__ */ new Set(["td", "th"]),
  colgroup: /* @__PURE__ */ new Set(["col"]),
  tbody: /* @__PURE__ */ new Set(["tr"]),
  thead: /* @__PURE__ */ new Set(["tr"]),
  tfoot: /* @__PURE__ */ new Set(["tr"]),
  // these elements can not have any children elements
  script: mn,
  iframe: mn,
  option: mn,
  textarea: mn,
  style: mn,
  title: mn
}, Qc = {
  // sections
  html: mn,
  body: /* @__PURE__ */ new Set(["html"]),
  head: /* @__PURE__ */ new Set(["html"]),
  // table
  td: /* @__PURE__ */ new Set(["tr"]),
  colgroup: /* @__PURE__ */ new Set(["table"]),
  caption: /* @__PURE__ */ new Set(["table"]),
  tbody: /* @__PURE__ */ new Set(["table"]),
  tfoot: /* @__PURE__ */ new Set(["table"]),
  col: /* @__PURE__ */ new Set(["colgroup"]),
  th: /* @__PURE__ */ new Set(["tr"]),
  thead: /* @__PURE__ */ new Set(["table"]),
  tr: /* @__PURE__ */ new Set(["tbody", "thead", "tfoot"]),
  // data list
  dd: /* @__PURE__ */ new Set(["dl", "div"]),
  dt: /* @__PURE__ */ new Set(["dl", "div"]),
  // other
  figcaption: /* @__PURE__ */ new Set(["figure"]),
  // li: new Set(["ul", "ol"]),
  summary: /* @__PURE__ */ new Set(["details"]),
  area: /* @__PURE__ */ new Set(["map"])
}, ea = {
  p: /* @__PURE__ */ new Set([
    "address",
    "article",
    "aside",
    "blockquote",
    "center",
    "details",
    "dialog",
    "dir",
    "div",
    "dl",
    "fieldset",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hgroup",
    "hr",
    "li",
    "main",
    "nav",
    "menu",
    "ol",
    "p",
    "pre",
    "section",
    "table",
    "ul"
  ]),
  svg: /* @__PURE__ */ new Set([
    "b",
    "blockquote",
    "br",
    "code",
    "dd",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hr",
    "i",
    "img",
    "li",
    "menu",
    "meta",
    "ol",
    "p",
    "pre",
    "ruby",
    "s",
    "small",
    "span",
    "strong",
    "sub",
    "sup",
    "table",
    "u",
    "ul",
    "var"
  ])
}, ta = {
  a: /* @__PURE__ */ new Set(["a"]),
  button: /* @__PURE__ */ new Set(["button"]),
  dd: /* @__PURE__ */ new Set(["dd", "dt"]),
  dt: /* @__PURE__ */ new Set(["dd", "dt"]),
  form: /* @__PURE__ */ new Set(["form"]),
  li: /* @__PURE__ */ new Set(["li"]),
  h1: Pn,
  h2: Pn,
  h3: Pn,
  h4: Pn,
  h5: Pn,
  h6: Pn
}, Kv = (e, t) => {
  if (e.type === 1 && e.tagType === 0 && t.parent && t.parent.type === 1 && t.parent.tagType === 0 && !Uv(t.parent.tag, e.tag)) {
    const n = new SyntaxError(
      `<${e.tag}> cannot be child of <${t.parent.tag}>, according to HTML specifications. This can cause hydration errors or potentially disrupt future functionality.`
    );
    n.loc = e.loc, t.onWarn(n);
  }
}, Wv = [
  Vv,
  ...process.env.NODE_ENV !== "production" ? [Bv, Kv] : []
], qv = {
  cloak: Cv,
  html: Iv,
  text: kv,
  model: Rv,
  // override compiler-core
  on: Fv,
  // override compiler-core
  show: Hv
};
function Gv(e, t = {}) {
  return Tv(
    e,
    ee({}, wv, t, {
      nodeTransforms: [
        // ignore <script> and <tag>
        // this is not put inside DOMNodeTransforms because that list is used
        // by compiler-ssr to generate vnode fallback branches
        jv,
        ...Wv,
        ...t.nodeTransforms || []
      ],
      directiveTransforms: ee(
        {},
        qv,
        t.directiveTransforms || {}
      ),
      transformHoist: null
    })
  );
}
function Jv() {
  eu();
}
process.env.NODE_ENV !== "production" && Jv();
const na = /* @__PURE__ */ Object.create(null);
function zv(e, t) {
  if (!Y(e))
    if (e.nodeType)
      e = e.innerHTML;
    else
      return process.env.NODE_ENV !== "production" && ye("invalid template option: ", e), me;
  const n = Op(e, t), s = na[n];
  if (s)
    return s;
  if (e[0] === "#") {
    const c = document.querySelector(e);
    process.env.NODE_ENV !== "production" && !c && ye(`Template element not found or is empty: ${e}`), e = c ? c.innerHTML : "";
  }
  const i = ee(
    {
      hoistStatic: !0,
      onError: process.env.NODE_ENV !== "production" ? o : void 0,
      onWarn: process.env.NODE_ENV !== "production" ? (c) => o(c, !0) : me
    },
    t
  );
  !i.isCustomElement && typeof customElements < "u" && (i.isCustomElement = (c) => !!customElements.get(c));
  const { code: r } = Gv(e, i);
  function o(c, u = !1) {
    const f = u ? c.message : `Template compilation error: ${c.message}`, a = c.loc && wp(
      e,
      c.loc.start.offset,
      c.loc.end.offset
    );
    ye(a ? `${f}
${a}` : f);
  }
  const l = new Function("Vue", r)(Ug);
  return l._rc = !0, na[n] = l;
}
Jf(zv);
window.GSM = async function({ El: t = null, Id: n = null, Cache: s = 2880, Tick: i = null, Script: r = [] } = {}) {
  if (!t || !n || !document.querySelector(t)) {
    n || console.error("GSM: O parâmetro 'Id' é obrigatório para inicialização."), t || console.error("GSM: O parâmetro 'El' é obrigatório para inicialização.");
    return;
  }
  const o = jt(!0);
  let l;
  try {
    l = await gp(n, s);
  } catch (u) {
    console.error("GSM: Falha ao carregar dados do motel:", u), o.value = !1;
    return;
  }
  const c = yp(l);
  Ki({
    setup() {
      const u = jt(c);
      return as(() => {
        sa(r), i && Gs(i), o.value = !1;
      }), {
        Carregando: o,
        Gm: u,
        Utils: vp
      };
    }
  }).mount(t);
};
