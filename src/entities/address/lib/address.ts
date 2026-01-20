export const normalizeAddressLabel = (raw: string) => {
  // 하이픈으로 split하여 각 부분을 독립적으로 처리
  const parts = raw.split("-");
  
  const processedParts = parts.map(part => {
    const pattern = /([가-힣]+)(특별시|광역시|특별자치시|특별자치도|자치시|도|시|군|구|읍|면|동|리)([가-힣])/g;
    
    let result = part;
    let prev = "";
    while (prev !== result) {
      prev = result;
      result = result.replace(pattern, "$1$2 $3");
    }
    
    return result;
  });
  
  // 공백으로 합치고 정리
  return processedParts.join(" ").replace(/\s+/g, " ").trim();
};


export const normalizeSearchKeyword = (q: string) =>
  q.replaceAll("-", " ").replace(/\s+/g, " ").trim().toLowerCase();
