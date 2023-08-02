import { getHeader } from "../../../utils/header.js";

export async function writePost(url, body) {
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
    return JSON.stringify(data);
  } catch (error) {
    return false;
  }
}
