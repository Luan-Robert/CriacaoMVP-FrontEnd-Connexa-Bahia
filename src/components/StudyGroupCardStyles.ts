
import styled from 'styled-components';

export const Card = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  text-align: center;
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
  font-size: 1.2rem;
  margin: 12px 0;
`;

export const CardInfo = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin: 8px 0;
`;
