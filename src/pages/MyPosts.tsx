import React, { useEffect, useState, useContext } from "react";
import { getPosts, likePost } from "../realtimeDB";
import { Container, Typography, Card, CardContent, Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  likes: number;
}

const MyPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.user) {
      navigate("/login"); // ✅ Redirect guests to login
      return;
    }

    getPosts().then((data) => {
      const userPosts = data.filter((post) => post.userId === auth.user?.uid);
      setPosts(userPosts);
    });
  }, [auth?.user, navigate]);

  const handleLike = async (postId: string, likes: number) => {
    await likePost(postId, likes);
    setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: likes + 1 } : post)));
  };

  return (
    <Container>
      <Typography variant="h4">My Posts</Typography>
      {posts.length === 0 && <Typography>You haven't created any posts yet.</Typography>}
      {posts.map((post) => (
        <Card key={post.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h5">{post.title}</Typography>
            <Typography>{post.content.substring(0, 100)}...</Typography>
            <Button onClick={() => handleLike(post.id, post.likes)}>❤️ {post.likes}</Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default MyPosts;
