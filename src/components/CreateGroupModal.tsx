
import React, { ChangeEvent, useState } from 'react';
import {
  ModalOverlay,
  ModalContent,
  ModalTitle,
  Form,
  Input,
  ButtonContainer,
  Button,
} from './CreateGroupModalStyles';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (group: { name: string; subject: string }) => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({ name, subject });
    onClose();
    setName('');
    setSubject('');
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalTitle>Criar Nova Turma</ModalTitle>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Nome da turma"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Matéria"
            value={subject}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSubject(e.target.value)}
            required
          />
          <ButtonContainer>
            <Button type="button" className="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="primary">
              Criar
            </Button>
          </ButtonContainer>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CreateGroupModal;
