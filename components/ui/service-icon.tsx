import {
  BadgeCheck,
  Boxes,
  Filter,
  LayoutTemplate,
  Megaphone,
  Monitor,
  Palette,
  Search,
  ShieldCheck,
  ShoppingBag,
  UserRound,
} from 'lucide-react';
import type { ServiceIcon as Name } from '@/lib/services';

const map = {
  badge: BadgeCheck,
  palette: Palette,
  layout: LayoutTemplate,
  monitor: Monitor,
  cart: ShoppingBag,
  boxes: Boxes,
  user: UserRound,
  funnel: Filter,
  search: Search,
  megaphone: Megaphone,
  shield: ShieldCheck,
} satisfies Record<Name, unknown>;

export function ServiceIcon({
  name,
  size = 20,
  className,
}: {
  name: Name;
  size?: number;
  className?: string;
}) {
  const Icon = map[name];
  return <Icon aria-hidden size={size} className={className} />;
}
