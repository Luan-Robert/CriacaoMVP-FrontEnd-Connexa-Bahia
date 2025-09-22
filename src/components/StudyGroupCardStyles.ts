
import styled from 'styled-components';

export const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

export const CardTitle = styled.h3`
  margin: 1rem 0 0.5rem;
  font-size: 1.25rem;
`;

export const CardInfo = styled.p`
  margin: 0.25rem 0;
  color: #555;
`;

export const JoinButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
`;

export const MemberBadge = styled.div`
  background-color: #28a745;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  display: inline-block;
`;
