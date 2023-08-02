import { getHeader } from "../../../utils/header.js";

export async function like(url, isPost, pk) {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(isPost ? { post: pk } : { comment: pk }),
      credentials: "include",
      headers: getHeader(),
    });

    if (!response.ok) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}
