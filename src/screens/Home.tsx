import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Clock, Instagram, MapPin, MessageCircle, Navigation, Wifi, Plug, Snowflake, VolumeX } from "lucide-react";
import { ADDRESS, HOURS, slides, workshop } from "../data";
import type { Tab } from "../data";
import { Pic, Sheet } from "../ui";
import { status, wa } from "../util";

export default function Home({ go }: { go: (t: Tab) => void }) {
  const [i, setI] = useState(0);
  const [map, setMap] = useState(false);
  const [[open, label], setSt] = useState(status());
  useEffect(() => {
    const a = setInterval(() => setSt(status()), 60000);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const b = reduce ? undefined : setInterval(() => setI(n => (n + 1) % slides.length), 4500);
    return () => { clearInterval(a); clearInterval(b); };
  }, []);
  const q = encodeURIComponent(ADDRESS);
  const shortcuts: [Tab, string, string][] = [["menu", "Cardápio", "Cafés, salgados e doces"], ["orders", "Encomendas", "Bolos e tortas para festas"], ["club", "Clube Origem", "Descontos e cortesias"]];
  return (<>
    <div className="stat">
      <span className={`badge ${open ? "b-open" : "b-closed"}`} role="status">{label}</span>
      <button className="map" onClick={() => setMap(true)}><MapPin size={20} />Como chegar</button>
    </div>
    <div className="car">
      <motion.div key={i} drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.25} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}
        onDragEnd={(_, info) => { if (info.offset.x < -50) setI(n => (n + 1) % slides.length); else if (info.offset.x > 50) setI(n => (n + slides.length - 1) % slides.length); }}>
        <Pic k={slides[i][0]} alt={slides[i][1]} /></motion.div>
      <div className="dots">{slides.map((s, n) => <button key={n} aria-label={`Foto ${n + 1}`} aria-current={n === i} onClick={() => setI(n)}><i /></button>)}</div>
      <span className="script" style={{ display: "block", marginTop: 16 }}>Feito à mão, servido com calma</span>
      <h1>Somos aroma e aconchego para os seus dias</h1>
      <p>Um bistrô acolhedor para um café a dois, uma reunião tranquila ou um momento só seu.</p>
    </div>
    <div className="sec"><div className="hub">{shortcuts.map(([t, a, b]) =>
      <button key={t} className="hc" onClick={() => go(t)}><span><b>{a}</b><small>{b}</small></span><span className="go"><ChevronRight size={20} /></span></button>)}</div></div>
    <div className="sec"><div className="wk">
      <h2>Workshop sensorial de cafés</h2><p>Aprenda a provar, comparar e preparar cafés especiais.</p>
      <div className="meta"><span>{workshop.date}</span><span>{workshop.spots} vagas restantes</span></div>
      <a className="btn gold" target="_blank" rel="noopener" href={wa(workshop.msg)}>Quero me inscrever</a></div></div>
    <div className="sec"><h2 style={{ fontSize: 22 }}>A atmosfera Origem</h2>
      <div className="am">{[[Wifi, "Wi-Fi rápido", "Para trabalhar sem pressa"], [Plug, "Tomadas nas mesas", "Notebook sempre carregado"], [Snowflake, "Climatizado", "Conforto o dia todo"], [VolumeX, "Silencioso", "Boa conversa, sem barulho"]].map(([I, a, b], n) => {
        const Ic = I as typeof Wifi; return <div key={n} style={{ background: "var(--card)", borderColor: "var(--muted)" }}><Ic size={20} /><b style={{ color: "var(--e9)" }}>{a as string}</b><span style={{ color: "var(--e7)" }}>{b as string}</span></div>; })}</div></div>
    <footer style={{ marginTop: 28, paddingBottom: "calc(96px + env(safe-area-inset-bottom, 0px))" }}>
      <h3 style={{ marginTop: 0 }}>Endereço</h3><p>{ADDRESS}</p>
      <h3><Clock size={14} style={{ verticalAlign: -2 }} /> Horários</h3>
      <ul>{HOURS.map((h, n) => <li key={h.d} className={n === new Date().getDay() ? "today" : ""}><span>{h.d}</span><span>{h.h[0]}h – {h.h[1]}h</span></li>)}</ul>
      <div className="soc"><a className="btn ghost" target="_blank" rel="noopener" href="https://www.instagram.com/cafeorigemmoc/"><Instagram size={18} />Instagram</a>
        <a className="btn ghost" target="_blank" rel="noopener" href={wa("Olá! Vim pelo app do Café Origem e gostaria de uma informação.")}><MessageCircle size={18} />WhatsApp</a></div>
    </footer>
    {map && <Sheet onClose={() => setMap(false)}><div className="pad" style={{ paddingTop: 64 }}>
      <h2>Como chegar</h2><p style={{ color: "var(--e7)", marginBottom: 20 }}>{ADDRESS}</p>
      <a className="btn gold" target="_blank" rel="noopener" href={`https://www.google.com/maps/search/?api=1&query=${q}`}><MapPin size={18} />Abrir no Google Maps</a>
      <a className="btn line" style={{ marginTop: 10 }} target="_blank" rel="noopener" href={`https://waze.com/ul?q=${q}&navigate=yes`}><Navigation size={18} />Abrir no Waze</a></div></Sheet>}
  </>);
}
