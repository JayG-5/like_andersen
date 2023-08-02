import { timeAgo } from "../../utils/time_ago.js";

export function dashboardCard(postInfo) {
  const card = document.createElement("div");
  card.classList.add("card-container");
  card.addEventListener(
    "click",
    () => (window.location.href = `/post.html?p=${postInfo.id}`)
  );

  const thumbnail = document.createElement("img");
  thumbnail.classList.add("card-img-top", "card");
  thumbnail.src = postInfo.thumbnail;
  thumbnail.art = "thumbnail";
  card.appendChild(thumbnail);

  const cardInfomation = document.createElement("div");
  cardInfomation.classList.add("card-information", "py-1");
  card.appendChild(cardInfomation);

  const profileImg = document.createElement("img");
  profileImg.classList.add("profile-img");
  profileImg.src = postInfo.user.profile_image_url;
  profileImg.art = "프로필이미지";
  cardInfomation.appendChild(profileImg);

  const cardInfoCol = document.createElement("dl");
  cardInfomation.appendChild(cardInfoCol);

  const cardHeadline = document.createElement("dd");
  cardHeadline.classList.add("fw-bolder", "card-headline");
  cardHeadline.innerText = postInfo.title;
  cardInfoCol.appendChild(cardHeadline);

  const cardWriter = document.createElement("dd");
  cardWriter.innerText = postInfo.user.nickname;
  cardInfoCol.appendChild(cardWriter);

  const cardInfo = document.createElement("dd");
  cardInfo.classList.add("card-info");
  cardInfoCol.appendChild(cardInfo);

  const infopacking = document.createElement("div");
  infopacking.classList.add("card-info");
  cardInfo.appendChild(infopacking);

  const view = document.createElement("span");
  view.classList.add("material-symbols-outlined", "card-view");
  view.innerText = "visibility";
  infopacking.appendChild(view);
  const viewText = document.createElement("span");
  viewText.classList.add("card-view");
  viewText.innerText = postInfo.views;
  infopacking.appendChild(viewText);
  const like = document.createElement("span");
  like.classList.add("material-symbols-outlined", "card-like");
  like.innerText = "favorite";
  infopacking.appendChild(like);
  const likeText = document.createElement("span");
  likeText.classList.add("card-like");
  likeText.innerText = postInfo.like_set_length;
  infopacking.appendChild(likeText);
  const comment = document.createElement("span");
  comment.classList.add("material-symbols-outlined", "card-comment");
  comment.innerText = "comment";
  infopacking.appendChild(comment);
  const commentText = document.createElement("span");
  commentText.classList.add("card-comment");
  commentText.innerText = postInfo.comment_set_length;
  infopacking.appendChild(commentText);

  const timeago = document.createElement("span");
  timeago.innerText = timeAgo(postInfo.created_at);
  cardInfo.appendChild(timeago);

  return card;
}
