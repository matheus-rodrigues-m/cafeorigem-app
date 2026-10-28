import { Briefcase, Cake, Coffee, GraduationCap, Gift } from "lucide-react";
import { clube } from "../data";
import { Field, Send, Seg, useForm } from "../ui";
import { maskBday, maskPhone } from "../util";

const icons: Record<string, typeof Coffee> = { Coffee, Gift, Briefcase, GraduationCap, Cake };
type Plan = keyof typeof clube.plans;
export default function Club() {
  const { f, set, bind } = useForm({ plan: "Anual" as string, name: "", email: "", phone: "", bday: "" });
  const p = clube.plans[f.plan as Plan];
  const missing = [!f.name.trim() && "nome", !/^\S+@\S+\.\S+$/.test(f.email.trim()) && "e-mail válido", f.phone.replace(/\D/g, "").length < 10 && "telefone", f.bday.length < 5 && "aniversário (DD/MM)"].filter(Boolean) as string[];
  const msg = `Olá, equipe Café Origem! Quero entrar para o Clube Origem:
⭐ Plano Escolhido: ${f.plan} (${p.price} ${p.per})
👤 Nome: ${f.name.trim()}
✉️ E-mail: ${f.email.trim()}
📱 WhatsApp: ${f.phone}
🎂 Aniversário: ${f.bday}
Gostaria de concluir a minha adesão e receber minha chave de membro!`;
  return (<>
    <div className="pt"><h1>Faça parte da nossa mesa</h1><p>Experiências e benefícios exclusivos todos os meses.</p></div>
    <div className="sec"><div className="wk"><span className="script" style={{ font: "600 22px Caveat,cursive", color: "var(--gold)" }}>Clube Origem</span>
      <div><span className="plan">{p.price}</span> <span style={{ color: "var(--cmt)" }}>{p.per}</span></div>
      {"note" in p && <span className="tag" style={{ width: "fit-content" }}>{p.note}</span>}</div>
      <div className="hub" style={{ marginTop: 14 }}>{clube.perks.map(([i, t, d]) => { const I = icons[i]; return <div className="hc" key={t} style={{ boxShadow: "none" }}><span className="ic"><I size={20} /></span><span><b>{t}</b><small>{d}</small></span></div>; })}</div>
      <div className="form" style={{ marginTop: 16 }}><h2>Adesão rápida</h2>
        <Seg label="Plano" v={f.plan} set={v => set("plan", v)} opts={(Object.keys(clube.plans) as Plan[]).map(k => ({ v: k, t: k === "Anual" ? "Anual com desconto" : "Mensal", s: clube.plans[k].price }))} />
        <Field label="Nome completo"><input autoComplete="name" {...bind("name")} /></Field>
        <Field label="E-mail"><input type="email" autoComplete="email" {...bind("email")} /></Field>
        <Field label="Telefone / WhatsApp"><input type="tel" inputMode="tel" autoComplete="tel" placeholder="(38) 99999-9999" {...bind("phone", maskPhone)} /></Field>
        <Field label="Aniversário (DD/MM)"><input inputMode="numeric" placeholder="15/08" {...bind("bday", maskBday)} /></Field>
        <Send label="Quero me tornar membro pelo WhatsApp" missing={missing} msg={msg} /></div></div>
  </>);
}
