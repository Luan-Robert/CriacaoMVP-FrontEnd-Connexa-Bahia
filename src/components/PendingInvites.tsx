import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../services/api';

const InvitesContainer = styled.div`
  margin: 2rem 0;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;

  h2 {
    margin-top: 0;
  }
`;

const InviteItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
`;

const Actions = styled.div`
  button {
    margin-left: 0.5rem;
    padding: 0.3rem 0.7rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &.accept {
      background-color: #28a745;
      color: white;
    }

    &.reject {
      background-color: #dc3545;
      color: white;
    }
  }
`;

const PendingInvites: React.FC = () => {
  const [invites, setInvites] = useState<any[]>([]);

  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const response = await api.get('/convites/pendentes');
        setInvites(response.data);
      } catch (error) {
        console.error("Erro ao buscar convites pendentes:", error);
      }
    };

    fetchInvites();
  }, []);

  const handleResponse = async (inviteId: number, acao: 'aceitar' | 'recusar') => {
    try {
      await api.post(`/convites/${inviteId}/responder`, { acao });
      // Remove o convite da lista após a resposta
      setInvites(invites.filter(invite => invite.id !== inviteId));
      alert(`Convite ${acao === 'aceitar' ? 'aceito' : 'recusado'} com sucesso!`);
    } catch (error) {
      console.error(`Erro ao ${acao} convite:`, error);
      alert('Ocorreu um erro ao processar sua resposta.');
    }
  };

  if (invites.length === 0) {
    return null; // Não renderiza nada se não houver convites
  }

  return (
    <InvitesContainer>
      <h2>Convites Pendentes</h2>
      {
        invites.map(invite => (
          <InviteItem key={invite.id}>
            <span>
              Você foi convidado por <strong>{invite.criador_nome}</strong> para o grupo <strong>{invite.grupo_nome}</strong>.
            </span>
            <Actions>
              <button className="accept" onClick={() => handleResponse(invite.id, 'aceitar')}>Aceitar</button>
              <button className="reject" onClick={() => handleResponse(invite.id, 'recusar')}>Recusar</button>
            </Actions>
          </InviteItem>
        ))
      }
    </InvitesContainer>
  );
};

export default PendingInvites;
