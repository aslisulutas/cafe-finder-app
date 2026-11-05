import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Cafe, CafeRow } from '@/types/cafe';

export type CafesState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; cafes: Cafe[] };

const CAFE_COLUMNS =
  'id, name, neighborhood, address, description, image_url, rating, price_level, has_wifi, has_outlets, is_pet_friendly, serves_vegan, open_until';

function toCafe(row: CafeRow): Cafe {
  return {
    id: row.id,
    name: row.name,
    neighborhood: row.neighborhood,
    address: row.address,
    description: row.description,
    imageUrl: row.image_url,
    rating: Number(row.rating),
    priceLevel: row.price_level,
    hasWifi: row.has_wifi,
    hasOutlets: row.has_outlets,
    isPetFriendly: row.is_pet_friendly,
    servesVegan: row.serves_vegan,
    openUntil: row.open_until,
  };
}

export function useCafes() {
  const [state, setState] = useState<CafesState>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data, error } = await supabase
        .from('cafes')
        .select(CAFE_COLUMNS)
        .order('rating', { ascending: false });

      if (cancelled) return;

      if (error || !Array.isArray(data)) {
        setState({ status: 'error' });
        return;
      }

      setState({ status: 'ready', cafes: (data as CafeRow[]).map(toCafe) });
    })();

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const retry = useCallback(() => {
    setState({ status: 'loading' });
    setAttempt((n) => n + 1);
  }, []);

  return { state, retry };
}
