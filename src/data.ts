import menu from "./menu.json";
export type Tab = "home" | "menu" | "orders" | "prime" | "club";
export const CATS = ["Cafés Especiais", "Métodos de Extração", "Salgados & Croissants", "Confeitaria & Doces", "Bebidas Geladas"] as const;
export interface Item { cat: string; name: string; desc: string; price: number; img: string; tags: string[]; pair: string[]; from: boolean; est: boolean }
export const menuItems: Item[] = menu as Item[];
export const ADDRESS = "R. Euzébio Alves Sarmento, 191 — Bairro São Luís, Montes Claros – MG";
// MOCK editável: [abre, fecha]
export const HOURS: { d: string; h: [number, number] }[] = [
  { d: "Domingo", h: [9, 18] }, { d: "Segunda", h: [8, 20] }, { d: "Terça", h: [8, 20] }, { d: "Quarta", h: [8, 20] },
  { d: "Quinta", h: [8, 20] }, { d: "Sexta", h: [8, 20] }, { d: "Sábado", h: [9, 20] }];
export const slides = [["beans", "Grãos de café na xícara"], ["ambiente", "Mesa com planta, xícara e cardápio"], ["cups", "Copos Café Origem"], ["espresso", "Espressos com borda de chocolate e caramelo"], ["prensa", "Prensa francesa"]];
export const workshop = { date: "22/11/2026, às 15h", spots: 6, msg: "Olá! Gostaria de saber mais sobre as datas e inscrições do Workshop Sensorial de Cafés Especiais." };
export const encomendas = [
  { id: "rv", name: "Bolo Red Velvet com Frutas Vermelhas", img: "taca", base: 129, desc: "Camadas de massa aveludada, creme de cream cheese e frutas vermelhas." },
  { id: "cr", name: "Torta Crumble de Maçã (vegana)", img: "crumble", base: 98, desc: "Farofa crocante, maçã caramelizada e canela. 100% vegetal." },
  { id: "ce", name: "Bolo de Cenoura com Brigadeiro", img: "waffle", base: 89, desc: "Massa fofinha de cenoura e cobertura cremosa de chocolate." },
  { id: "co", name: "Bolo de Coco Gelado", img: "croissant", base: 85, desc: "Leve, úmido e com coco fresco por cima." },
  { id: "mq", name: "Bolo de Mandioca com Queijo", img: "queijo", base: 79, desc: "Receita mineira com queijo derretido e casquinha dourada." },
  { id: "dc", name: "Caixa de Doces Finos (brownies e mini tortas)", img: "chapa", base: 110, desc: "Seleção da confeitaria, ideal para presentear ou receber." }];
export const sizes = {
  P: { label: "Pequeno", info: "Aro 15 cm • 10 a 12 fatias", mult: 1 },
  M: { label: "Médio", info: "Aro 20 cm • 20 a 25 fatias", mult: 1.8 },
  G: { label: "Grande", info: "Aro 25 cm • 30 a 35 fatias", mult: 2.6 }} as const;
export const spaces = [
  { id: "Espaço Prime", img: "ambiente", cap: "até 8 pessoas", desc: "Lounge intimista com acústica tratada e sofás confortáveis. Ideal para encontros executivos e pequenas comemorações privadas.", am: ["Wi-Fi de alta velocidade", "Climatizado", "Café servido na mesa", "Tomadas acessíveis"] },
  { id: "Sala de Reuniões", img: "beans", cap: "até 10 pessoas", desc: "Mesa de conferência, TV de apoio e Wi-Fi dedicado para fechar negócios com discrição.", am: ["Wi-Fi dedicado", "TV de apoio", "Tomadas individuais", "Café na sala"] }];
export const clube = {
  plans: { Mensal: { price: "R$ 49,90", per: "/ mês" }, Anual: { price: "R$ 499,00", per: "/ ano", note: "Economize 2 meses" } },
  perks: [["Coffee", "10% de desconto", "Em todo o cardápio e bebidas especiais, todo dia."], ["Gift", "Cortesia semanal", "1 café filtrado especial por semana."], ["Briefcase", "Espaço Prime", "Condições exclusivas na locação das salas."], ["GraduationCap", "Workshop sensorial", "Acesso prioritário e gratuidade."], ["Cake", "Lançamentos", "Convite antecipado para a confeitaria sazonal."]] as [string, string, string][]};
