// Social features module: comments, likes, shares, discussions, activity feed
import { apiRequest } from "../Config/auth-sdk.js";

export async function loadActivityFeed() {
  const data = await apiRequest("social/feed/");
  // ...render activity feed...
}

export async function postComment(targetId, content) {
  try {
    await apiRequest("social/comments/", {
      method: "POST",
      body: JSON.stringify({ target_id: targetId, content }),
    });
    // ...refresh comments...
  } catch (err) {
    // ...handle error...
  }
}

export async function likeItem(itemId) {
  await apiRequest("social/like/", {
    method: "POST",
    body: JSON.stringify({ item_id: itemId }),
  });
}

export async function followUser(userId) {
  await apiRequest("social/follow/", {
    method: "POST",
    body: JSON.stringify({ user_id: userId }),
  });
}

export async function loadFollowers() {
  const data = await apiRequest("social/followers/");
  // ...render followers...
}

export async function loadDiscussions() {
  const data = await apiRequest("social/discussions/");
  // ...render discussion forums...
}
// ...other social utilities...
