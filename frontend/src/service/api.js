import { logout } from "./api/kakao/logout.js";
import { getUserInfo } from "./api/user_info.js";
import { boardList } from "./api/board/list.js";
import { boardDetail } from "./api/board/detail.js";
import { wirteComment } from "./api/board/post_comment.js";
import { writeStory } from "./api/story/write.js";
import { like } from "./api/board/like.js";
import { chatbot } from "./api/story/chatbot.js";
import { writePost } from "./api/board/write.js";

const base = "http://127.0.0.1:8000/api/v1/";
export const baseURL = {
  base: base,
  board: {
    list: base + "board/",
    write: base + "board/",
    comment: base + "board/comment/",
    like: base + "board/like/",
  },
  story: {
    write: base + "story/",
    chatbot: base + "chatbot/",
  },
  account: {
    kakao: {
      login: base + "account/oauth/kakao/login/",
      logout: base + "account/oauth/kakao/logout/",
      callback: base + "account/oauth/kakao/callback/",
    },
    my_info: base + "account/my_info/",
  },
};
export const API = {
  board: {
    list: () => boardList(baseURL.board.list),
    write: (body) => writePost(baseURL.board.write, body),
    detail: (post_id) => boardDetail(baseURL.board.list + `${post_id}/`),
    postComment: (post_id, body) =>
      wirteComment(baseURL.board.list + `${post_id}/`, body),
    commentCommet: (comment_id, body) =>
      wirteComment(baseURL.board.comment + `${comment_id}/`, body),
    postLike: (post_id) => like(baseURL.board.like, true, post_id),
    commentLike: (comment_id) => like(baseURL.board.like, false, comment_id),
  },
  story: {
    write: (data) => writeStory(baseURL.story.write, data),
    chatbot: (story_id) => chatbot(baseURL.story.chatbot + `${story_id}/`),
  },
  account: {
    info: () => getUserInfo(baseURL.account.my_info),
    kakao: {
      logout: () => logout(baseURL.account.kakao.logout),
    },
  },
};
