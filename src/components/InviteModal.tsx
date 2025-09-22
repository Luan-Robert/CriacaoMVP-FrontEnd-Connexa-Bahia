import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../services/api';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
`;

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
}

const InviteModal: React.FC<InviteModalProps> = ({ isOpen, onClose, groupId }) => {
  const [email, setEmail] = useState('');
  const [inviteLink, setInviteLink] = useState('');

  const handleInviteByEmail = async () => {
    try {
      // Primeiro, busca o ID do usuário pelo email
      const userResponse = await api.get(`/usuarios/email/${email}`);
      const usuarioIdConvidado = userResponse.data.id;

      // Agora, envia o convite com o ID do usuário
      await api.post(`/grupos/${groupId}/convites`, { usuarioIdConvidado });
      alert('Convite enviado com sucesso!');
      onClose();
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        alert('Usuário não encontrado com este e-mail.');
      } else {
        console.error("Erro ao convidar por email:", error);
        alert('Erro ao convidar por email.');
      }
    }
  };

  const handleGenerateLink = async () => {
    try {
      const response = await api.post(`/grupos/${groupId}/convites`, {});
      setInviteLink(response.data.linkConvite);
    } catch (error) {
      console.error("Erro ao gerar link de convite:", error);
      alert('Erro ao gerar link de convite.');
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Convidar para o Grupo</h2>
        <div>
          <h3>Convidar por Email</h3>
          <input
            type="email"
            placeholder="Email do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleInviteByEmail}>Enviar Convite</button>
        </div>
        <hr />
        <div>
          <h3>Gerar Link de Convite</h3>
          <button onClick={handleGenerateLink}>Gerar Link</button>
          {inviteLink && <p>{inviteLink}</p>}
        </div>
        <hr />
        <button onClick={onClose}>Fechar</button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default InviteModal;