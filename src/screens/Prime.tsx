import { Check } from "lucide-react";
import { spaces } from "../data";
import { Field, TimeSelect, Pic, Send, Seg, useForm } from "../ui";
import { fd, maskPhone } from "../util";

const dur = ["1 hora", "2 horas", "3 horas", "Meio período"] as const;
const ppl = ["2 a 4 pessoas", "5 a 8 pessoas", "9 a 10 pessoas"] as const;
export default function Prime() {
  const { f, set, bind } = useForm({ space: spaces[0].id as string, date: "", time: "", dur: "2 horas" as string, ppl: "2 a 4 pessoas" as string, name: "", company: "", phone: "" });
  const missing = [( !f.date || f.date < new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10)) && "data válida", (!f.time || (f.date === new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10) && f.time <= new Date().toTimeString().slice(0, 5))) && "horário futuro", !f.name.trim() && "nome", f.phone.replace(/\D/g, "").length < 10 && "telefone"].filter(Boolean) as string[];
  const msg = `Olá, Café Origem! Gostaria de verificar a disponibilidade para agendamento corporativo:
🏢 Espaço: ${f.space}
📅 Data: ${f.date ? fd(f.date) : "—"}
⏰ Horário: ${f.time} (Duração: ${f.dur})
👥 Pessoas: ${f.ppl}
👤 Responsável: ${f.name.trim()}${f.company.trim() ? `\n💼 Empresa: ${f.company.trim()}` : ""}
📱 Contato: ${f.phone}
Aguardo confirmação de disponibilidade e valores.`;
  return (<>
    <div className="pt"><h1>Espaço Prime & Reuniões</h1><p>Ambientes reservados para conversar, decidir e celebrar.</p></div>
    <div className="sec">{spaces.map(s => <div className="sp" key={s.id}><Pic k={s.img} alt={s.id} /><div className="b"><h2>{s.id}</h2>
      <p style={{ color: "var(--e7)", margin: "4px 0 0" }}>{s.desc}</p><div className="chipl"><span>{s.cap}</span>{s.am.map(a => <span key={a}><Check size={11} style={{ verticalAlign: -1 }} /> {a}</span>)}</div></div></div>)}
      <div className="form"><h2>Pré-agendamento</h2>
        <Seg label="Ambiente" v={f.space} set={v => set("space", v)} opts={spaces.map(s => ({ v: s.id, t: s.id, s: s.cap }))} />
        <Field label="Data da reserva"><input type="date" min={new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10)} {...bind("date")} /></Field>
        <div className="fld"><span>Horário de início</span><TimeSelect value={f.time} onChange={v => set("time", v)} /></div>
        <Seg label="Duração" v={f.dur} set={v => set("dur", v)} opts={dur.map(d => ({ v: d, t: d }))} />
        <Seg label="Quantidade de pessoas" v={f.ppl} set={v => set("ppl", v)} opts={ppl.map(d => ({ v: d, t: d }))} />
        <Field label="Responsável"><input autoComplete="name" {...bind("name")} /></Field>
        <Field label="Empresa (opcional)"><input autoComplete="organization" {...bind("company")} /></Field>
        <Field label="Telefone"><input type="tel" inputMode="tel" autoComplete="tel" placeholder="(38) 99999-9999" {...bind("phone", maskPhone)} /></Field>
        <Send label="Solicitar reserva no WhatsApp" missing={missing} msg={msg} /></div></div>
  </>);
}
