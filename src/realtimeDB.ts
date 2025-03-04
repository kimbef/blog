import { db } from "./firebase";
import { ref, push, set, get } from "firebase/database";

interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  likes: number;
}

export const addPost = async (title: string, content: string, userId: string) => {
  const postRef = push(ref(db, "posts")); // Generates a unique post ID
  await set(postRef, {
    title,
    content,
    userId,
    likes: 0,
  });
};

export const getPosts = async (): Promise<Post[]> => {
  const snapshot = await get(ref(db, "posts"));
  if (snapshot.exists()) {
    const data = snapshot.val();
    return Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
  }
  return [];
};

export const likePost = async (postId: string, currentLikes: number) => {
  const postRef = ref(db, `posts/${postId}/likes`);
  await set(postRef, currentLikes + 1);
};

