export async function boardDetail(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      return {};
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return {};
  }
}
