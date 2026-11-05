export interface Cafe {
  id: string;
  name: string;
  neighborhood: string;
  address: string;
  description: string;
  imageUrl: string;
  rating: number;
  priceLevel: number;
  hasWifi: boolean;
  hasOutlets: boolean;
  isPetFriendly: boolean;
  servesVegan: boolean;
  openUntil: string;
}

export interface CafeRow {
  id: string;
  name: string;
  neighborhood: string;
  address: string;
  description: string;
  image_url: string;
  rating: number | string;
  price_level: number;
  has_wifi: boolean;
  has_outlets: boolean;
  is_pet_friendly: boolean;
  serves_vegan: boolean;
  open_until: string;
}
