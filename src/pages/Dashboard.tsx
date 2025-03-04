import React, { useEffect, useState } from "react";
import { getPosts, likePost } from "../realtimeDB";
import { Container, Typography, Card, CardContent, Button } from "@mui/material";

interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  likes: number;
}

const Dashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then((data) => setPosts(data));
  }, []);

  const handleLike = async (postId: string, likes: number) => {
    await likePost(postId, likes);
    setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: likes + 1 } : post)));
  };

  return (
    <Container>
      <Typography variant="h4">Dashboard - All Posts</Typography>
      {posts.length === 0 && <Typography>No posts available.</Typography>}
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

export default Dashboard;

