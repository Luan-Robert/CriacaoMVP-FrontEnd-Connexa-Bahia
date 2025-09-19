
import styled from 'styled-components';

export const GroupPageContainer = styled.div`
  padding: 2rem;
`;

export const GroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const GroupTitle = styled.h1`
  font-size: 2.5rem;
`;

export const MessageContainer = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
`;

export const MessageList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const MessageItem = styled.li`
  background-color: white;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

export const MessageForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

export const MessageInput = styled.input`
  flex-grow: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const MessageButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`;
