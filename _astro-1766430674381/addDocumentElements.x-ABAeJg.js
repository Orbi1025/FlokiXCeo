import { at as s, au as p } from "./siteModulesConstants.BJBunYQ-.js";
const j = (e) => {
    const t = `${e}=`,
      a = decodeURIComponent(document.cookie).split(";");
    for (let o = 0; o < a.length; o += 1) {
      let r = a[o];
      for (; r.charAt(0) === " "; ) r = r.substring(1);
      if (r.indexOf(t) === 0) return r.substring(t.length, r.length);
    }
    return "";
  },
  v = (e, t, n, { cdomain: a = null } = {}) => {
    const o = new Date();
    o.setTime(o.getTime() + n * 24 * 60 * 60 * 1e3);
    const r = n ? `expires=${o.toUTCString()};` : "",
      c = a ? `domain=${a};` : "";
    document.cookie = `${e}=${t};${r}path=/;${c}`;
  },
  I = (e) => {
    document.cookie = `${e}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  },
  m = (e) => e.startsWith("www."),
  A = (e) => (m(e) ? e.substring(4) : e),
  N = () => window.self !== window.top,
  i = ({ type: e, tagName: t, properties: n = {}, children: a = [] }) => {
    if (e !== "element")
      return console.error(
        "Failed to injected HTML element - missing node type"
      );
    const o = document.createElement(t);
    if (
      (Object.entries(n).forEach(([r, c]) => {
        o.setAttribute(r, c);
      }),
      a.length)
    ) {
      const r = a.find((c) => c.type === "text").value;
      r && (o.innerHTML = r);
    }
    return o;
  },
  g = (e) => {
    const t = `[${s}="${e}"]`;
    return document.querySelector(t);
  },
  u = (e) => {
    const t = i(e),
      n = g(t.getAttribute(s));
    return t.outerHTML === n?.outerHTML
      ? n
      : (n?.remove(), document.head.append(t), t);
  },
  f = (e) => {
    const t = i(e),
      n = g(t.getAttribute(s));
    return t.outerHTML === n?.outerHTML
      ? n
      : (n?.remove(), document.body.append(t), t);
  },
  h = (e) => `!function(f,b,e,v,n,t,s)
	{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
	n.callMethod.apply(n,arguments):n.queue.push(arguments)};
	if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
	n.queue=[];t=b.createElement(e);t.async=!0;
	t.src=v;s=b.getElementsByTagName(e)[0];
	s.parentNode.insertBefore(t,s)}(window, document,'script',
	'https://connect.facebook.net/en_US/fbevents.js');
	fbq('init', '${e}');
	fbq('track', 'PageView');`,
  y = (e) =>
    `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${e}&ev=PageView&noscript=1"/>`,
  w = ({
    containerId: e,
    gtmQuery: t = "",
  } = {}) => `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl${t};f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','${e}');`,
  E = ({
    containerId: e,
    gtmQuery: t = "",
  } = {}) => `<iframe src="https://www.googletagmanager.com/ns.html?id=${e}${t}"
		height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
  b = ({ containerId: e, googleAdsIds: t }) => {
    const n = t.length
      ? t.map((o) => `gtag('config', '${o}');`).join(`
		`)
      : "";
    return `window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		${e ? `gtag('config', '${e}');` : ""}
		${n}`;
  },
  T = (e) => `https://www.googletagmanager.com/gtag/js?id=${e}`,
  x = (e) => `(function(d) {
	var script = d.createElement('script');
	script.src = 'https://t.contentsquare.net/uxa/${e}.js';
	script.async = true;
	d.head.appendChild(script);
})(document);`,
  l = ({ siteMeta: e, areCookiesAllowed: t }) => {
    const n = {};
    return (
      t &&
        e.facebookPixel &&
        (n["noscript-fb-pixel"] = {
          tagName: "noscript",
          children: [{ type: "text", value: y(e.facebookPixel) }],
        }),
      t &&
        e.googleTagManager &&
        (n["noscript-gtm"] = {
          tagName: "noscript",
          children: [{ type: "text", value: E(e.googleTagManager) }],
        }),
      t &&
        e.facebookPixel &&
        (n["script-fb-pixel"] = {
          tagName: "script",
          children: [{ type: "text", value: h(e.facebookPixel) }],
        }),
      t &&
        (e.googleTagManager || e.googleAdsIds?.length) &&
        (n["script-gtm"] = {
          tagName: "script",
          children: [
            {
              type: "text",
              value: w({
                containerId: e.googleTagManager
                  ? e.googleTagManager
                  : e.googleAdsIds[0],
              }),
            },
          ],
        }),
      t &&
        (e.googleAnalytics || e.googleAdsIds?.length) &&
        ((n["script-google-analytics"] = {
          tagName: "script",
          children: [
            {
              type: "text",
              value: b({
                containerId: e.googleAnalytics,
                googleAdsIds: e.googleAdsIds || [],
              }),
            },
          ],
        }),
        e.googleAnalytics &&
          (n["script-google-analytics-async"] = {
            tagName: "script",
            properties: { src: T(e.googleAnalytics) },
          })),
      t &&
        e.hotjar &&
        (n["script-hotjar"] = {
          tagName: "script",
          children: [{ type: "text", value: x(e.hotjar) }],
        }),
      Object.entries(n).map(
        ([a, { tagName: o, properties: r = {}, children: c = [] }]) => ({
          type: "element",
          tagName: o,
          properties: { ...r, [s]: a },
          children: c,
        })
      )
    );
  },
  d = (e) => {
    e.forEach((t) => (p.includes(t.properties[s]) ? f(t) : u(t)));
  },
  L = ({ siteMeta: e, areCookiesAllowed: t }) => {
    const n = l({ siteMeta: e, areCookiesAllowed: t });
    d(n);
  },
  k = ({ siteMeta: e, areCookiesAllowed: t }) => {
    const n = l({ siteMeta: e, areCookiesAllowed: t });
    d(n);
  };
export { A as a, L as b, N as c, I as d, k as e, u as f, j as g, v as s };
