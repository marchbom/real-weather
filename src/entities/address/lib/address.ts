export const normalizeAddressLabel = (raw: string) => {
  const parts = raw.split("-");
  
  const processedParts = parts.map(part => {
    let result = part;
    
    result = result.replace(/([가-힣]+시)([가-힣]+구)/g, "$1 $2");
    result = result.replace(/([가-힣]+군)([가-힣]+구)/g, "$1 $2");
    
    return result;
  });
  
  return processedParts.join(" ").replace(/\s+/g, " ").trim();
};

export const normalizeSearchKeyword = (q: string) =>
  q.replaceAll("-", " ").replace(/\s+/g, " ").trim().toLowerCase();
