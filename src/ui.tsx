import { useEffect, useState } from "react";
import type { ChangeEvent, ReactNode } from "react";
import { X, Clock } from "lucide-react";
import { createPortal } from "react-dom";
import { wa } from "./util";
type El = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
export const img = (k: string) =>
  `${import.meta.env.BASE_URL}img/${k}.${k === "logo" ? "png" : "jpg"}`;
export function Pic({ k, alt, cls = "" }: { k?: string; alt: string; cls?: string }) {
  const [ok, setOk] = useState(false);
  if (!k) return <div className={`ph fb ${cls}`}><img src={img("logoSm")} alt="" /></div>;
  return <div className={`ph ${ok ? "ok" : ""} ${cls}`}><img src={img(k)} alt={alt} loading="lazy" draggable={false} onLoad={() => setOk(true)} /></div>;
}
export function Sheet({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    addEventListener("keydown", k); return () => removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <div className="ov on" role="dialog" aria-modal="true" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="sheet"><button className="x" aria-label="Fechar" onClick={onClose}><X size={20} /></button>{children}</div>
    </div>);
}
// Mantém a faixa de horas já existente (08h às 19h), com todos os minutos.
const HOURS_SELECT = Array.from({ length: 12 }, (_, i) => String(i + 8).padStart(2, "0"));
const MINUTES_SELECT = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
export function TimeSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [hour, setHour] = useState(value.slice(0, 2) || "08");
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return <>
    <button type="button" className="time-trigger" aria-label="Selecionar horário" aria-haspopup="dialog"
      aria-expanded={open} onClick={() => { setHour(value.slice(0, 2) || "08"); setOpen(true); }}>
      <span>{value || "--:--"}</span><Clock size={20} />
    </button>
    {open && createPortal(<div className="time-overlay" onMouseDown={e => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div role="dialog" aria-modal="true" aria-label="Escolha a hora e os minutos" className="time-popup">
        <div className="time-labels"><span>Hora</span><span>Min</span></div>
        <div className="time-columns">
          <div className="time-list" role="group" aria-label="Horas">{HOURS_SELECT.map(h =>
            <button type="button" key={h} aria-pressed={hour === h} onClick={() => setHour(h)}>{h}</button>
          )}</div>
          <div className="time-list" role="group" aria-label="Minutos">{MINUTES_SELECT.map(m =>
            <button type="button" key={m} aria-pressed={value === `${hour}:${m}`}
              onClick={() => { onChange(`${hour}:${m}`); setOpen(false); }}>{m}</button>
          )}</div>
        </div>
        <button type="button" className="time-close" onClick={() => setOpen(false)}>Cancelar</button>
      </div>
    </div>, document.body)}
  </>;
}
export const Field = ({ label, children }: { label: string; children: ReactNode }) => <label className="fld"><span>{label}</span>{children}</label>;
export function Seg<T extends string>({ v, set, opts, label }: { v: T; set: (v: T) => void; label: string; opts: { v: T; t: string; s?: string }[] }) {
  return (<div role="group" aria-label={label}><div className="fld"><span>{label}</span></div>
    <div className="seg" style={{ marginTop: -8 }}>{opts.map(o => <button type="button" key={o.v} aria-pressed={v === o.v} onClick={() => set(o.v)}>{o.t}{o.s && <small>{o.s}</small>}</button>)}</div></div>);
}
export function useForm<T extends Record<string, string>>(init: T) {
  const [f, setF] = useState(init);
  const set = <K extends keyof T>(k: K, v: string) => setF(p => ({ ...p, [k]: v }));
  const bind = (k: keyof T, fn: (s: string) => string = s => s) => ({ value: f[k], onChange: (e: ChangeEvent<El>) => set(k, fn(e.target.value)) });
  return { f, set, bind };
}
/** Botão de envio: valida com gentileza e abre o WhatsApp com a mensagem pronta. */
export function Send({ label, missing, msg }: { label: string; missing: string[]; msg: string }) {
  const [t, setT] = useState(false);
  return (<>
    <div className="send-sticky"><button type="button" className="btn gold cta" onClick={() => { if (missing.length) { setT(true); return; } window.open(wa(msg), "_blank", "noopener"); }}>{label}</button></div>
    {t && missing.length > 0 && <p className="err" role="alert">Falta preencher: {missing.join(", ")}.</p>}
  </>);
}
