
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  GroupPageContainer,
  GroupHeader,
  GroupTitle,
  MessageContainer,
  MessageList,
  MessageItem,
  MessageForm,
  MessageInput,
  MessageButton,
} from './GroupPageStyles';

const GroupPage: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, newMessage]);
      setNewMessage('');
    }
  };

  return (
    <>
      <Header />
      <GroupPageContainer>
        <GroupHeader>
          <GroupTitle>Grupo: {groupId}</GroupTitle>
        </GroupHeader>
        <MessageContainer>
          <h2>Mural de Mensagens</h2>
          <MessageList>
            {messages.map((message, index) => (
              <MessageItem key={index}>{message}</MessageItem>
            ))}
            {messages.length === 0 && <p>Nenhuma mensagem ainda.</p>}
          </MessageList>
          <MessageForm onSubmit={handleMessageSubmit}>
            <MessageInput
              type="text"
              placeholder="Escreva uma mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <MessageButton type="submit">Enviar</MessageButton>
          </MessageForm>
        </MessageContainer>
      </GroupPageContainer>
      <Footer />
    </>
  );
};

export default GroupPage;
