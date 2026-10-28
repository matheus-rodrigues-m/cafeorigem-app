import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { CATS, menuItems } from "../data";
import type { Item } from "../data";
import { Pic, Sheet } from "../ui";
import { BRL, matches, wa } from "../util";

const Tag = ({ t }: { t: string }) => <span className={`tag ${t === "Vegano" ? "v" : t === "Novo" ? "n" : ""}`}>{t}</span>;
const Price = ({ it, big }: { it: Item; big?: boolean }) => <span className="price" style={big ? { fontSize: 22, lineHeight: "28px" } : undefined}>{it.from && <small>a partir de </small>}<span className="nw">{BRL(it.price)}{it.est ? "*" : ""}</span></span>;

export default function Menu() {
  const [cat, setCat] = useState<string>("Todos");
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<Item | null>(null);
  const searching = q.trim().length > 0;
  const groups = useMemo(() => CATS.map(c => ({ c, items: menuItems.filter(i => i.cat === c && (!searching || matches(`${i.name} ${i.desc} ${i.tags.join(" ")} ${c}`, q))) }))
    .filter(g => g.items.length && (searching || cat === "Todos" || cat === g.c)), [cat, q, searching]);
  const lot = !searching && cat === "Todos" ? 4 : 99; // Miller: lotes curtos na visão geral
  return (<>
    <div className="pt"><h1>Cardápio</h1><p>Toque em um item para ver notas de sabor e harmonizações.</p></div>
    <div className="sec" style={{ paddingTop: 12 }}>
      <div className="chips" role="group" aria-label="Categorias">{["Todos", ...CATS].map(c =>
        <button key={c} className="chip" aria-pressed={!searching && cat === c} onClick={() => { setCat(c); setQ(""); }}>{c}</button>)}</div>
      <div className="search"><Search size={20} className="i" style={{ position: "absolute", left: 16, top: 14, color: "var(--e4)" }} />
        <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar por nome ou ingrediente" aria-label="Buscar no cardápio" autoComplete="off" />
        {searching && <button aria-label="Limpar busca" onClick={() => setQ("")}><X size={18} /></button>}</div>
      <div aria-live="polite">
        {!groups.length && <div className="empty">Nada encontrado para “{q.trim()}”.<br />Tente outro ingrediente.<br /><button className="btn line" style={{ marginTop: 12 }} onClick={() => setQ("")}>Limpar busca</button></div>}
        {groups.map(g => (<div key={g.c}><h2 className="cat">{g.c}</h2>
          {g.items.slice(0, lot).map(it => <button key={it.name} className="item" onClick={() => setSel(it)}>
            <span className="t"><h3>{it.name}</h3>{it.tags.map(t => <Tag key={t} t={t} />)}<p>{it.desc}</p><Price it={it} /></span><Pic k={it.img} alt={it.name} /></button>)}
          {g.items.length > lot && <button className="more" onClick={() => setCat(g.c)}>Ver todos de {g.c} ({g.items.length})</button>}</div>))}
      </div>
      <p className="note">Valores do cardápio do iFood. Itens com * têm preço de referência, a confirmar pela casa.</p>
    </div>
    {sel && <Sheet onClose={() => setSel(null)}><Pic k={sel.img} alt={sel.name} cls="big" /><div className="pad">
      <h2>{sel.name}</h2><div style={{ display: "flex", gap: 6, marginBottom: 10 }}>{sel.tags.map(t => <Tag key={t} t={t} />)}</div>
      <p style={{ color: "var(--e7)" }}>{sel.desc}</p><div style={{ margin: "12px 0" }}><Price it={sel} big /></div>
      {sel.pair.length > 0 && <><b style={{ fontSize: 14 }}>Harmoniza com</b><div className="hm">{sel.pair.map(p => <span key={p}>{p}</span>)}</div></>}
      <a className="btn gold" style={{ marginTop: 18 }} target="_blank" rel="noopener" href={wa(`Olá! Gostaria de saber mais sobre: ${sel.name}.`)}>Perguntar no WhatsApp</a></div></Sheet>}
  </>);
}
