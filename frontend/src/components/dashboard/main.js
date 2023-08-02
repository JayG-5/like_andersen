import { API } from "../../service/api.js";
import { dashboardCard } from "./card.js";

export async function dashboardMain() {
  const container = document.createElement("div");
  container.classList.add("container", "px-4", "px-lg-5", "mt-5");

  const row = document.createElement("div");
  row.classList.add(
    "row",
    "gx-4",
    "gx-lg-5",
    "row-cols-2",
    "row-cols-md-3",
    "row-cols-xl-4",
    "justify-content-center"
  );
  container.appendChild(row);
  const response = await API.board.list();
  response.forEach((element) => {
    row.appendChild(dashboardCard(element));
  });
  return container;
}
