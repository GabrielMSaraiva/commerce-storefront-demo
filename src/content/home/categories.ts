import type { LucideIcon } from "lucide-react";
import { Activity, Coffee, Dumbbell, Heart, Package } from "lucide-react";

export type Category = {
  title: string;
  description: string;
  action: string;
  icon: LucideIcon;
  variant: "feature" | "primary" | "accent" | "plain";
};

export const categories = [
  {
    title: "Rotina diária",
    description: "Kits e acessórios para organizar hábitos simples.",
    action: "Explorar linha",
    icon: Package,
    variant: "feature",
  },
  {
    title: "Nutrição prática",
    description: "Seleção para o dia a dia",
    action: "Ver tudo",
    icon: Coffee,
    variant: "primary",
  },
  {
    title: "Movimento",
    description: "Acessórios para acompanhar seu ritmo",
    action: "Descobrir",
    icon: Dumbbell,
    variant: "accent",
  },
  {
    title: "Recuperação",
    description: "Itens para desacelerar depois do treino",
    action: "Conhecer",
    icon: Activity,
    variant: "plain",
  },
  {
    title: "Autocuidado",
    description: "Pequenos rituais para pausar",
    action: "Explorar",
    icon: Heart,
    variant: "plain",
  },
] satisfies Category[];
