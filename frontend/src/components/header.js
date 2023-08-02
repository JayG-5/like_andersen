export async function getHeader(type) {
  const header = document.getElementById("header-section");

  header.innerHTML = "";
  switch (type) {
    case "event-banner":
      const pageView = document.createElement("header");
      pageView.classList.add("page-view-container");
      for (const i in [1, 2, 3]) {
        const img = document.createElement("img");
        img.classList.add("page");
        img.src = "https://picsum.photos/1000/300";
        img.art = "123";
        pageView.appendChild(img);
      }
      header.appendChild(pageView);
      break;
  }
}
