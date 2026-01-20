import {
  normalizeAddressLabel,
  normalizeSearchKeyword,
} from "@/entities/address/lib/address";

// 날씨 검색
export function searchAddress(list: string[], keyword: string) {
  const q = normalizeSearchKeyword(keyword);
  if (!q) return [];

  const results: { raw: string; label: string }[] = [];

  for (const raw of list) {
    const label = normalizeAddressLabel(raw);
    if (label.toLowerCase().includes(q)) {
      results.push({ raw, label });
    }
  }

  return results;
}
