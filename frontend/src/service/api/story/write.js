import { getHeader } from "../../../utils/header.js";

export async function writeStory(url, body) {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      credentials: "include",
      headers: getHeader(),
    });

    if (!response.ok) {
      return false;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return false;
  }
}
