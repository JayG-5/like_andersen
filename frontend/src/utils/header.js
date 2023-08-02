function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
}

export function getHeader() {
  const csrf_token = getCookie("csrftoken");
  return {
    "Content-Type": "application/json",
    "X-CSRFToken": csrf_token,
  };
}
