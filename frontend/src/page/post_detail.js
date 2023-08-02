import { postDetailMain } from "../components/post_detail/main.js";
import { API } from "../service/api.js";
import { getParams } from "../utils/get_params.js";

export async function postDetailPage() {
  const postId = getParams("p");
  const response = await API.board.detail(postId);
  return postDetailMain(response);
}
