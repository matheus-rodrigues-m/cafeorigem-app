import { HOURS } from "./data";
export const NUM = "5538991858001"; // (38) 9 9185-8001
export const wa = (m: string) => `https://wa.me/${NUM}?text=${encodeURIComponent(m)}`;
export const digits = (s: string) => s.replace(/\D/g, "");
export const maskPhone = (s: string) => {
  let d = digits(s); if (d.startsWith("55") && d.length > 11) d = d.slice(2); d = d.slice(0, 11);
  return d.length <= 2 ? d : d.length <= 7 ? `(${d.slice(0, 2)}) ${d.slice(2)}` : `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};
export const maskBday = (s: string) => { const d = digits(s).slice(0, 4); return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d; };
export const BRL = (v: number) => "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const fd = (s: string) => s.split("-").reverse().join("/");
export const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/\s+/g, " ");
const lev = (a: string, b: string) => {
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
};
/** Busca tolerante (Postel): ignora acento/caixa/espaços e aceita 1 erro de digitação. */
export const matches = (text: string, q: string) => {
  const w = norm(text).split(/[^a-z0-9]+/);
  return norm(q).split(" ").filter(Boolean).every(t => w.some(x => x.startsWith(t) || (t.length >= 4 && x.length >= 4 && lev(x.slice(0, t.length), t) <= 1)));
};
const h = (n: number) => String(n).padStart(2, "0") + "h";
export function status(now = new Date()): [boolean, string] {
  const d = now.getDay(), m = now.getHours() + now.getMinutes() / 60, [a, b] = HOURS[d].h;
  if (m >= a && m < b) return [true, `Aberto agora • Fecha às ${h(b)}`];
  if (m < a) return [false, `Fechado no momento • Abre às ${h(a)}`];
  return [false, `Fechado no momento • Abre amanhã às ${h(HOURS[(d + 1) % 7].h[0])}`];
}
