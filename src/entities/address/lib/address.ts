export const normalizeAddressLabel = (raw: string) =>
  raw.replaceAll("-", " ").replace(/\s+/g, " ").trim();

export const normalizeSearchKeyword = (q: string) =>
  q.replaceAll("-", " ").replace(/\s+/g, " ").trim().toLowerCase();
