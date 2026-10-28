import { useEffect, useState } from "react";
import type { ChangeEvent, ReactNode } from "react";
import { X } from "lucide-react";
import { wa } from "./util";
type El = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
export const img = (k: string) => `${import.meta.env.BASE_URL}img/${k}.jpg`;
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
const SLOTS = Array.from({ length: 24 }, (_, i) => `${String(8 + Math.floor(i / 2)).padStart(2, "0")}:${i % 2 ? "30" : "00"}`);
export const TimeSelect = (p: { value: string; onChange: (e: ChangeEvent<El>) => void }) => (
  <select {...p}><option value="">Selecione</option>{SLOTS.map(s => <option key={s} value={s}>{s}</option>)}</select>);
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
    <button type="button" className="btn gold cta" onClick={() => { if (missing.length) { setT(true); return; } window.open(wa(msg), "_blank", "noopener"); }}>{label}</button>
    {t && missing.length > 0 && <p className="err" role="alert">Falta preencher: {missing.join(", ")}.</p>}
  </>);
}
