import { Leaf, PawPrint, Plug, Wifi, type LucideIcon } from 'lucide-react';

export type AmenityKey = 'hasWifi' | 'hasOutlets' | 'isPetFriendly' | 'servesVegan';

export const AMENITIES: { key: AmenityKey; label: string; icon: LucideIcon }[] = [
  { key: 'hasWifi', label: 'Wi-Fi', icon: Wifi },
  { key: 'hasOutlets', label: 'Outlets', icon: Plug },
  { key: 'isPetFriendly', label: 'Pet friendly', icon: PawPrint },
  { key: 'servesVegan', label: 'Vegan options', icon: Leaf },
];
