export function getParams(name) {
  // 현재 주소에서 쿼리 파라미터 추출
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}
