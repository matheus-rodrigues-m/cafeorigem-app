import { useRef, useState } from "react";
import { encomendas, sizes } from "../data";
import { Field, TimeSelect, Pic, Send, useForm } from "../ui";
import { BRL, fd, maskPhone } from "../util";

type Sz = keyof typeof sizes;
export default function Orders() {
  const [id, setId] = useState("rv");
  const [sz, setSz] = useState<Sz>("M");
  const { f, bind } = useForm({ date: "", time: "", obs: "", name: "", phone: "" });
  const form = useRef<HTMLDivElement>(null);
  const it = encomendas.find(e => e.id === id)!, s = sizes[sz];
  const missing = [!f.date && "data", !f.time && "horário", !f.name.trim() && "nome", f.phone.replace(/\D/g, "").length < 10 && "telefone"].filter(Boolean) as string[];
  const msg = `Olá, Café Origem! Gostaria de fazer uma encomenda de bolo:
🎂 Item: ${it.name}
📏 Tamanho: ${s.label} (${s.info})
📅 Data de Retirada: ${f.date ? fd(f.date) : "—"} às ${f.time}
📝 Observações: ${f.obs.trim() || "Nenhuma"}
👤 Nome: ${f.name.trim()}
📱 Contato: ${f.phone}`;
  return (<>
    <div className="pt"><h1>Encomendas</h1><p>Bolos, tortas e doces finos para suas celebrações.</p></div>
    <div className="sec"><div className="grid2">{encomendas.map(e =>
      <button key={e.id} className="pc" aria-pressed={id === e.id} onClick={() => { setId(e.id); form.current?.scrollIntoView({ behavior: "smooth" }); }}>
        <Pic k={e.img} alt={e.name} /><div className="b"><b>{e.name}</b><span className="price"><small>a partir de</small><span className="nw">{BRL(e.base)}*</span></span></div></button>)}</div>
      <p className="note">* Preço base do tamanho pequeno, a confirmar pela casa.</p>
      <div className="form" ref={form}><h2>Seu pedido</h2>
        <Field label="Produto"><select value={id} onChange={e => setId(e.target.value)}>{encomendas.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}</select></Field>
        <p style={{ color: "var(--e7)", margin: "-6px 0 14px" }}>{it.desc}</p>
        <div className="fld"><span>Tamanho</span></div>
        <div className="seg" style={{ marginTop: -8 }}>{(Object.keys(sizes) as Sz[]).map(k =>
          <button type="button" key={k} aria-pressed={sz === k} onClick={() => setSz(k)}>{sizes[k].label}<small>{sizes[k].info}</small><small>{BRL(it.base * sizes[k].mult)}*</small></button>)}</div>
        <Field label="Data de retirada"><input type="date" {...bind("date")} /></Field>
        <Field label="Horário de retirada"><TimeSelect {...bind("time")} /></Field>
        <Field label="Observações (dedicatória, recheio, restrições)"><textarea {...bind("obs")} /></Field>
        <Field label="Nome completo"><input autoComplete="name" {...bind("name")} /></Field>
        <Field label="Telefone"><input type="tel" inputMode="tel" autoComplete="tel" placeholder="(38) 99999-9999" {...bind("phone", maskPhone)} /></Field>
        <Send label="Encomendar pelo WhatsApp" missing={missing} msg={msg} /></div></div>
  </>);
}
