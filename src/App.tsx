import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Cake, Coffee, Crown, Home as HomeIcon } from "lucide-react";
import type { Tab } from "./data";
import { img } from "./ui";
import Home from "./screens/Home";
import Menu from "./screens/Menu";
import Orders from "./screens/Orders";
import Prime from "./screens/Prime";
import Club from "./screens/Club";

const tabs = [
  { id: "home", label: "Início", Icon: HomeIcon }, { id: "menu", label: "Cardápio", Icon: Coffee },
  { id: "orders", label: "Encomendas", Icon: Cake }, { id: "prime", label: "Prime", Icon: Briefcase }, { id: "club", label: "Clube", Icon: Crown }] as const;

export default function App() {
  const [tab, setTab] = useState<Tab>("home");
  useEffect(() => { window.scrollTo(0, 0); }, [tab]);
  const go = (t: Tab) => { navigator.vibrate?.(8); setTab(t); };
  return (
    <div className="app">
      <header className="top"><img src={img("logo")} alt="Café Origem" /></header>
        <motion.main key={tab} className={`pg ${tab === "home" ? "home" : ""}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, ease: "easeOut" }}>
          {tab === "home" && <Home go={go} />}{tab === "menu" && <Menu />}{tab === "orders" && <Orders />}{tab === "prime" && <Prime />}{tab === "club" && <Club />}
        </motion.main>
      <nav className="dock" aria-label="Navegação principal">
        {tabs.map(({ id, label, Icon }) => <button key={id} aria-current={tab === id ? "page" : undefined} onClick={() => go(id)}><Icon size={22} />{label}</button>)}
      </nav>
    </div>);
}
