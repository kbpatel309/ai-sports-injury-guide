'use client'
import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

type Message = {
  role: 'assistant' | 'user'
  content: string
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm the AI Lifting Injury Guide. How can I help you today?"
    }
  ])

  const [message, setMessage] = useState('')

  const sendMessage = async () => {
    const newMessages: Message[] = [...messages, { role: "user", content: message }]
    setMessages(newMessages)
    setMessage('')

    const response = await fetch('/api/chat', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMessages)
    })

    const assistantMessage: Message = await response.json()
    setMessages((messages) => [...messages, assistantMessage])
  }

  return (
    <Box sx={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Stack sx={{ width: "500px", height: "700px", border: "1px solid black", p: 2 }} spacing={3}>
        <Stack sx={{ flexGrow: 1, overflow: "auto", maxHeight: "100%" }} spacing={2}>
          {messages.map((msg, index) => (
            <Box key={index} sx={{ display: "flex", justifyContent: msg.role === "assistant" ? "flex-start" : "flex-end" }}>
              <Box sx={{
                bgcolor: msg.role === "assistant" ? "primary.main" : "secondary.main",
                color: "white",
                borderRadius: "16px",
                p: 3
              }}>
                {msg.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" onClick={sendMessage}>
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}