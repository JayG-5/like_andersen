export async function boardList(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
}
