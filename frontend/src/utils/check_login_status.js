import { API } from "../service/api.js";

export async function checkLoginStatus() {
  const response = await API.account.info();
  if (response) {
    return true;
  }
  return false;
}
