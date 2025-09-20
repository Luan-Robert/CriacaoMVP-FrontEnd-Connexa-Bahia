
import React, { ChangeEvent, useState, useEffect } from 'react';
import api from '../services/api';
import {
  ModalOverlay,
  ModalContent,
  ModalTitle,
  Form,
  Input,
  Select,
  ButtonContainer,
  Button,
} from './CreateGroupModalStyles';

// Interface for the data returned by the materias endpoint
interface Materia {
  id: number;
  nome: string;
}

// Updated interface for the form data
export interface GroupFormData {
  nome: string;
  materiaId: number;
  objetivo: string;
  local: string;
  limiteParticipantes: number;
  isPublico: boolean;
}

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (group: GroupFormData) => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [name, setName] = useState('');
  const [materiaId, setMateriaId] = useState<number | string>('');
  const [objetivo, setObjetivo] = useState('');
  const [local, setLocal] = useState('');
  const [limiteParticipantes, setLimiteParticipantes] = useState(10);
  const [isPublico, setIsPublico] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const fetchMaterias = async () => {
        try {
          const response = await api.get('/materias');
          setMaterias(response.data);
        } catch (error) {
          console.error("Erro ao buscar matérias:", error);
        }
      };
      fetchMaterias();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!materiaId) {
        alert("Por favor, selecione uma matéria.");
        return;
    }
    onCreate({ nome: name, materiaId: Number(materiaId), objetivo, local, limiteParticipantes, isPublico });
    // Reset and close
    onClose();
    setName('');
    setMateriaId('');
    setObjetivo('');
    setLocal('');
    setLimiteParticipantes(10);
    setIsPublico(true);
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
          <Select
            value={materiaId}
            onChange={(e) => setMateriaId(e.target.value)}
            required
          >
            <option value="" disabled>Selecione a matéria</option>
            {materias.map((materia) => (
              <option key={materia.id} value={materia.id}>
                {materia.nome}
              </option>
            ))}
          </Select>
          <Input
            type="text"
            placeholder="Objetivo do grupo"
            value={objetivo}
            onChange={(e) => setObjetivo(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Local (Online, Presencial, etc.)"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            required
          />
          <Input
            type="number"
            placeholder="Limite de participantes"
            value={limiteParticipantes}
            onChange={(e) => setLimiteParticipantes(Number(e.target.value))}
            required
            min={2}
          />
          <Select value={String(isPublico)} onChange={(e) => setIsPublico(e.target.value === 'true')}>
            <option value="true">Público</option>
            <option value="false">Privado</option>
          </Select>
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
