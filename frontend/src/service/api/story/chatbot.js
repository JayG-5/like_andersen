import { getHeader } from "../../../utils/header.js";

export async function chatbot(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: getHeader(),
    });
    console.log(url);

    if (!response.ok) {
      return {};
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return {};
  }
}
