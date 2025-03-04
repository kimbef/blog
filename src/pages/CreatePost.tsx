import React, { useState, useContext } from "react";
import { Container, TextField, Button, Typography, Alert } from "@mui/material";
import { AuthContext } from "../context/AuthContext.tsx";
import { addPost } from "../realtimeDB.ts";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const auth = useContext(AuthContext);

  const handleCreate = async () => {
    if (!auth?.user) {
      setError("You must be logged in to create a post.");
      return;
    }

    if (!title || !content) {
      setError("Title and content cannot be empty.");
      return;
    }

    console.log("POST button clicked!"); // Debugging log

    try {
      await addPost(title, content, auth.user.uid);
      setTitle("");
      setContent("");
      setSuccess("Post created successfully!");
      setError(null);
    } catch (err) {
      console.error("Error adding post:", err);
      setError("Failed to create post. Check the console for more details.");
    }
  };

  return (
    <Container>
      <Typography variant="h4">Create a Post</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <TextField label="Title" fullWidth margin="normal" value={title} onChange={(e) => setTitle(e.target.value)} />
      <TextField label="Content" fullWidth multiline rows={4} margin="normal" value={content} onChange={(e) => setContent(e.target.value)} />
      <Button variant="contained" color="primary" onClick={handleCreate}>Post</Button>
    </Container>
  );
};

export default CreatePost;
