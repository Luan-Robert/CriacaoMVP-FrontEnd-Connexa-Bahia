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

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, groupId }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('anexo', file);

    try {
      // 1. Fazer o upload do anexo
      const uploadResponse = await api.post(`/grupos/${groupId}/anexos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { url, tipo: mimeType } = uploadResponse.data;

      // 2. Criar a mensagem com a URL do anexo
      await api.post(`/grupos/${groupId}/mensagens`, {
        texto: file.name, // Usa o nome do arquivo como conteúdo
        anexo_url: url,
        tipo: mimeType.startsWith('image/') ? 'imagem' : 'arquivo',
      });

      alert('Arquivo enviado com sucesso!');
      onClose(); // O WebSocket cuidará de atualizar a lista de mensagens

    } catch (error) {
      console.error("Erro ao enviar arquivo:", error);
      alert('Erro ao enviar arquivo.');
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Enviar Anexo</h2>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Enviar</button>
        <button onClick={onClose}>Fechar</button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UploadModal;