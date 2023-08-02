import { userInfo } from "../../modules/user.js";

export async function getUserInfo(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (data.kakao_uid) return Object.assign(userInfo, data);
  } catch (error) {
    return null;
  }
}
