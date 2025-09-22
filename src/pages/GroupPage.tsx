import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import io from 'socket.io-client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { GroupPageContainer, GroupHeader, GroupTitle, MessageContainer, MessageList, MessageItem, MessageForm, MessageInput, MessageButton } from './GroupPageStyles';
import InviteModal from '../components/InviteModal';
import UploadModal from '../components/UploadModal';

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const Tab = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
  &.active {
    background-color: #007bff;
    color: white;
  }
`;

const socket = io('http://localhost:3000'); // Adjust the URL to your backend

type Mensagem = {
  anexo_url?: string;
  conteudo?: string;
  grupo_id?: number;
  id?: number;
  usuario_id?: number;
  tipo?: string;
  editada?: boolean;
  data_envio?: string;
}

const GroupPage: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const [group, setGroup] = useState<any>(null);
  const [messages, setMessages] = useState<Mensagem[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const { user } = useAuth();
  const [membros, setMembros] = useState<any[]>([]);
  const [solicitacoes, setSolicitacoes] = useState<any[]>([]);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const isAdmin = user?.id === group?.criador_id;

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await api.get(`/grupos/${groupId}`);
        setGroup(response.data);
      } catch (error) {
        console.error("Erro ao buscar grupo:", error);
      }
    };
    fetchGroup();

    const fetchMessages = async () => {
      try {
        const response = await api.get(`/grupos/${groupId}/mensagens`);
        setMessages(response.data);
      } catch (error) {
        console.error("Erro ao buscar mensagens:", error);
      }
    };
    fetchMessages();

    socket.emit('join_group', groupId);

    socket.on('nova_mensagem', (mensagem) => {
      setMessages((prevMessages) => [...prevMessages, mensagem]);
    });

    return () => {
      socket.emit('leave_group', groupId);
      socket.off('nova_mensagem');
    };
  }, [groupId]);

  useEffect(() => {
    if (activeTab === 'members') {
      const fetchMembros = async () => {
        try {
          const response = await api.get(`/grupos/${groupId}/membros`);
          setMembros(response.data);
        } catch (error) {
          console.error("Erro ao buscar membros:", error);
        }
      };
      fetchMembros();

      if (isAdmin) {
        const fetchSolicitacoes = async () => {
          try {
            const response = await api.get(`/grupos/${groupId}/solicitacoes`);
            setSolicitacoes(response.data);
          } catch (error) {
            console.error("Erro ao buscar solicitações:", error);
          }
        };
        fetchSolicitacoes();
      }
    }
  }, [activeTab, isAdmin, groupId]);

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      try {
        await api.post(`/grupos/${groupId}/mensagens`, { texto: newMessage });
        setMessages((prevMessages) => [...prevMessages, { conteudo: newMessage, usuario_id: user?.id }]);
        setNewMessage('');
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
      }
    }
  };

  const handleSettingsUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedGroup = {
      nome: formData.get('nome'),
      objetivo: formData.get('objetivo'),
      local: formData.get('local'),
    };

    try {
      await api.put(`/grupos/${groupId}/configuracoes`, updatedGroup);
      alert('Configurações do grupo atualizadas com sucesso!');
    } catch (error) {
      console.error("Erro ao atualizar configurações:", error);
      alert('Não foi possível atualizar as configurações do grupo.');
    }
  };

  const handleApprove = async (usuarioId: number) => {
    try {
      await api.put(`/grupos/${groupId}/solicitacoes/${usuarioId}/aprovar`);
      setSolicitacoes(solicitacoes.filter((s) => s.id !== usuarioId));
      alert('Usuário aprovado com sucesso!');
    } catch (error) {
      console.error("Erro ao aprovar usuário:", error);
      alert('Erro ao aprovar usuário.');
    }
  };

  const handleReject = async (usuarioId: number) => {
    try {
      await api.put(`/grupos/${groupId}/solicitacoes/${usuarioId}/rejeitar`);
      setSolicitacoes(solicitacoes.filter((s) => s.id !== usuarioId));
      alert('Usuário rejeitado com sucesso!');
    } catch (error) {
      console.error("Erro ao rejeitar usuário:", error);
      alert('Erro ao rejeitar usuário.');
    }
  };

  const handleRemoveMember = async (usuarioId: number) => {
    try {
      await api.delete(`/grupos/${groupId}/membros/${usuarioId}`);
      setMembros(membros.filter((m) => m.id !== usuarioId));
      alert('Membro removido com sucesso!');
    } catch (error) {
      console.error("Erro ao remover membro:", error);
      alert('Erro ao remover membro.');
    }
  };

  const handleDeleteGroup = async () => {
    if (window.confirm('Tem certeza que deseja deletar este grupo? Esta ação não pode ser desfeita.')) {
      try {
        await api.delete(`/grupos/${groupId}`);
        alert('Grupo deletado com sucesso!');
        navigate('/home');
      } catch (error) {
        console.error("Erro ao deletar grupo:", error);
        alert('Erro ao deletar grupo.');
      }
    }
  };

  return (
    <>
      <Header />
      <GroupPageContainer>
        <GroupHeader>
          <GroupTitle>Grupo: {group?.nome}</GroupTitle>
        </GroupHeader>

        <TabContainer>
          <Tab className={activeTab === 'chat' ? 'active' : ''} onClick={() => setActiveTab('chat')}>Chat</Tab>
          {isAdmin && <Tab className={activeTab === 'members' ? 'active' : ''} onClick={() => setActiveTab('members')}>Membros</Tab>}
          {isAdmin && <Tab className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>Configurações</Tab>}
        </TabContainer>

        {activeTab === 'chat' && (
          <MessageContainer>
            <h2>Mural de Mensagens</h2>
            <MessageList>
              {messages.map((message, index) => (
                <MessageItem key={index}>
                  {message.tipo === 'imagem' ? (
                    <img src={message.anexo_url} alt={message.conteudo} style={{ maxWidth: '200px', borderRadius: '8px' }} />
                  ) : message.tipo === 'arquivo' ? (
                    <a href={message.anexo_url} target="_blank" rel="noopener noreferrer">{message.conteudo}</a>
                  ) : (
                    message.conteudo
                  )}
                </MessageItem>
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
              <button type="button" onClick={() => setIsUploadModalOpen(true)}>Anexar</button>
            </MessageForm>
          </MessageContainer>
        )}

        {activeTab === 'members' && (
          <div>
            <button onClick={() => setIsInviteModalOpen(true)}>Convidar</button>
            <h3>Membros</h3>
            {membros.length > 0 ? (
              <ul>
                {membros.map((membro) => (
                  <li key={membro.id}>
                    {membro.nome} ({membro.email})
                    {isAdmin && membro.id !== user!.id && (
                      <button onClick={() => handleRemoveMember(membro.id)}>Remover</button>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum membro no grupo.</p>
            )}

            <h3>Solicitações Pendentes</h3>
            {solicitacoes.length > 0 ? (
              <ul>
                {solicitacoes.map((solicitacao) => (
                  <li key={solicitacao.id}>
                    {solicitacao.nome} ({solicitacao.email})
                    <button onClick={() => handleApprove(solicitacao.id)}>Aprovar</button>
                    <button onClick={() => handleReject(solicitacao.id)}>Rejeitar</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma solicitação pendente.</p>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2>Configurações do Grupo</h2>
            <form onSubmit={handleSettingsUpdate}>
              <div>
                <label htmlFor="nome">Nome do Grupo</label>
                <input type="text" id="nome" name="nome" defaultValue={group?.nome} />
              </div>
              <div>
                <label htmlFor="objetivo">Objetivo</label>
                <input type="text" id="objetivo" name="objetivo" defaultValue={group?.objetivo} />
              </div>
              <div>
                <label htmlFor="local">Local</label>
                <input type="text" id="local" name="local" defaultValue={group?.local} />
              </div>
              <button type="submit">Salvar Alterações</button>
            </form>
            <hr />
            <h3>Deletar Grupo</h3>
            <p>Esta ação não pode ser desfeita.</p>
            <button onClick={handleDeleteGroup}>Deletar Grupo</button>
          </div>
        )}

      </GroupPageContainer>
      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        groupId={groupId || ''}
      />
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        groupId={groupId || ''}
      />
    </>
  );
};

export default GroupPage;