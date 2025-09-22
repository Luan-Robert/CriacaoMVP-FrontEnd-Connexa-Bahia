
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImage, CardTitle, CardInfo, JoinButton, MemberBadge } from './StudyGroupCardStyles';
import api from '../services/api';

interface StudyGroupCardProps {
  id: number;
  photo: string;
  name: string;
  members: number;
  subject: string;
  isMember: boolean;
  onJoinSuccess: (groupId: number) => void;
}

const StudyGroupCard: React.FC<StudyGroupCardProps> = ({ id, photo, name, members, subject, isMember, onJoinSuccess }) => {
  const handleJoinGroup = async (groupId: number) => {
    try {
      const response = await api.post(`/grupos/${groupId}/solicitar-entrada`);
      alert(response.data.message);
      if (response.data.status === 'membro') {
        onJoinSuccess(groupId);
      }
    } catch (error) {
      console.error("Erro ao solicitar entrada no grupo:", error);
      alert('Erro ao solicitar entrada no grupo.');
    }
  };

  return (
    <Card>
      <Link to={`/group/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardImage src={photo} alt={`${name} photo`} />
        <CardTitle>{name}</CardTitle>
        <CardInfo>Integrantes: {members}</CardInfo>
        <CardInfo>Matéria: {subject}</CardInfo>
      </Link>
      {isMember ? (
        <MemberBadge>Já inscrito</MemberBadge>
      ) : (
        <JoinButton onClick={() => handleJoinGroup(id)}>Entrar no grupo</JoinButton>
      )}
    </Card>
  );
};

export default StudyGroupCard;
