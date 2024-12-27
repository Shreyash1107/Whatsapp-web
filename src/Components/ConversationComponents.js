import React, { useState } from "react";
import styled from "styled-components";
import { messagesList as initialMessagesList } from "../Data";
import { SearchContainer, SearchInput } from "./ContactListComponents";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 2;
  background: #f6f7f8;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: row;
  background: #ededed;
  padding: 15px;
  align-items: center;
  gap: 10px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const ChatBox = styled.div`
  display: flex;
  background: #f0f0f0;
  padding: 10px;
  align-items: center;
  bottom: 0;
  gap: 10px;
`;

const EmojiImage = styled.img`
  width: 30px;
  height: 28px;
  opacity: 0.4;
  cursor: pointer;
`;

const SendButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #e5ddd6;
  overflow-y: auto;
`;

const MessageDiv = styled.div`
  justify-content: ${(props) => (props.isYours ? "flex-end" : "flex-start")};
  display: flex;
  margin: 5px 16px;
`;

const Message = styled.div`
  background: ${(props) => (props.isYours ? "#daf8cb" : "white")};
  max-width: 50%;
  color: #303030;
  padding: 8px 10px;
  font-size: 19px;
  border-radius: 8px;
`;

const ConversationComponent = () => {
  const [messages, setMessages] = useState(initialMessagesList);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMessageObject = {
      id: messages.length + 1,
      messageType: "TEXT",
      text: newMessage,
      senderID: 0, // Assuming 0 is the current user
      addedOn: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessageObject]);
    setNewMessage(""); // Clear the input field
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <Container>
      <ProfileHeader>
        <ProfileImage src="/profile/IMG_3464.jpg" />
        Anubhav Sharma
      </ProfileHeader>
      <MessageContainer>
        {messages.map((messageData) => (
          <MessageDiv key={messageData.id} isYours={messageData.senderID === 0}>
            <Message isYours={messageData.senderID === 0}>{messageData.text}</Message>
          </MessageDiv>
        ))}
      </MessageContainer>
      <ChatBox>
        <SearchContainer>
          <EmojiImage src={"/data.svg"} />
          <SearchInput
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </SearchContainer>
        <SendButton onClick={sendMessage}>Send</SendButton>
      </ChatBox>
    </Container>
  );
};

export default ConversationComponent;
