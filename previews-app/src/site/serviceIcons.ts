import { AppWindow, Bot, Box, ChartColumn, Clapperboard, Eye, Globe, MessageCircle, Plug, RefreshCw, Search, Send, Share2, ShoppingCart, type LucideIcon } from "lucide-react"

export const serviceIcons: Record<string, LucideIcon> = {
  "/paslaugos/svetaines": Globe,
  "/paslaugos/el-parduotuves": ShoppingCart,
  "/paslaugos/svetainiu-atnaujinimas": RefreshCw,
  "/paslaugos/seo-prieziura": Search,
  "/paslaugos/ai-matomumas": Eye,
  "/paslaugos/programos": AppWindow,
  "/paslaugos/ai-agentai": Bot,
  "/paslaugos/integracijos": Plug,
  "/paslaugos/ai-asistentas": MessageCircle,
  "/paslaugos/duomenu-analitika": ChartColumn,
  "/paslaugos/telegram-discord-botai": Send,
  "/paslaugos/judesio-reklamos": Clapperboard,
  "/paslaugos/3d-reklamos": Box,
  "/paslaugos/socialiniu-tinklu-paketas": Share2,
}
