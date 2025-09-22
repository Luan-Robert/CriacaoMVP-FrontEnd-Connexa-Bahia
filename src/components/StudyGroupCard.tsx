
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImage, CardTitle, CardInfo } from './StudyGroupCardStyles';

interface StudyGroupCardProps {
  id: number;
  photo: string;
  name: string;
  members: number;
  subject: string;
}

const StudyGroupCard: React.FC<StudyGroupCardProps> = ({ id, photo, name, members, subject }) => {
  return (
    <Link to={`/group/${id}`} style={{ textDecoration: 'none' }}>
      <Card>
        <CardImage src={photo} alt={`${name} photo`} />
        <CardTitle>{name}</CardTitle>
        <CardInfo>Integrantes: {members}</CardInfo>
        <CardInfo>Matéria: {subject}</CardInfo>
      </Card>
    </Link>
  );
};

export default StudyGroupCard;
