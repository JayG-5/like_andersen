import { dashboardMain } from "../components/dashboard/main.js";
import { getHeader } from "../components/header.js";

export async function dashboardPage() {
  await getHeader("event-banner");
  const fabElement = document.querySelector(".fab");
  fabElement.addEventListener(
    "click",
    () => (window.location.href = `/create.html`)
  );
  return await dashboardMain();
}
