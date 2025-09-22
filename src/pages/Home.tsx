import React, { useState, ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StudyGroupCard from '../components/StudyGroupCard';
import CreateGroupModal, { GroupFormData } from '../components/CreateGroupModal';
import api from '../services/api';

// [Styled components remain the same]
const HomeContainer = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const CreateGroupButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

interface Materia {
  id: number;
  nome: string;
}

export type StudyGroup = {
  id: number;
  nome: string;
  materia: string;
  local: string;
  objetivo: string;
  vagas_disponiveis: number;
  total_vagas: number;
  data_criacao: string;
}

const Home: React.FC = () => {
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [myGroups, setMyGroups] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedLocal, setSelectedLocal] = useState('');
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchGroups = async () => {
    try {
      const response = await api.get('/grupos');
      setStudyGroups(response.data);
    } catch (error) {
      console.error("Erro ao buscar grupos:", error);
      alert("Não foi possível carregar os grupos. Tente novamente mais tarde.");
    }
  };

  const fetchMyGroups = async () => {
    try {
      const response = await api.get('/usuarios/meus-grupos');
      console.log('Meus grupos (raw):', response.data);
      setMyGroups(response.data.map((group: any) => group.grupo_id));
    } catch (error) {
      console.error("Erro ao buscar meus grupos:", error);
    }
  };

  const fetchMaterias = async () => {
    try {
      const response = await api.get('/materias');
      setMaterias(response.data);
    } catch (error) {
      console.error("Erro ao buscar matérias:", error);
    }
  };

  useEffect(() => {
    fetchGroups();
    fetchMaterias();
    fetchMyGroups();
  }, []);

  const handleSearch = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('nome', searchTerm);
      if (selectedSubject) params.append('materia', selectedSubject);
      if (selectedLocal) params.append('local', selectedLocal);

      const response = await api.get(`/grupos/busca?${params.toString()}`);
      setStudyGroups(response.data.grupos);
    } catch (error) {
      console.error("Erro ao buscar grupos:", error);
      alert("Não foi possível realizar a busca. Tente novamente mais tarde.");
    }
  };

  const handleCreateGroup = async (groupData: GroupFormData) => {
    try {
      await api.post('/grupos', groupData);
      alert('Grupo criado com sucesso!');
      fetchGroups();
    } catch (error: any) {
      console.error('Erro ao criar grupo:', error);
      const errorMessage = error.response?.data?.message || 'Falha ao criar o grupo. Tente novamente.';
      alert(errorMessage);
    }
  };

  const handleJoinSuccess = (groupId: number) => {
    setMyGroups([...myGroups, groupId]);
  };

  return (
    <>
      <Header />
      <HomeContainer>
        <Title>Turmas Disponíveis</Title>
        <FilterContainer>
          <SearchInput
            type="text"
            placeholder="Buscar por nome da turma..."
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
          <Select
            value={selectedSubject}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedSubject(e.target.value)}
          >
            <option value="">Todas as matérias</option>
            {materias.map((materia) => (
              <option key={materia.id} value={materia.nome}>
                {materia.nome}
              </option>
            ))}
          </Select>
          <SearchInput
            type="text"
            placeholder="Local..."
            value={selectedLocal}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedLocal(e.target.value)}
          />
          <button onClick={handleSearch}>Buscar</button>
          <CreateGroupButton onClick={() => setIsModalOpen(true)}>
            Criar Turma
          </CreateGroupButton>
        </FilterContainer>
        <Grid>
          {studyGroups.map((group, index) => {
            return (
              <StudyGroupCard
                id={group.id}
                key={index}
                photo={'https://i.pinimg.com/originals/60/c1/1a/60c11a93c3b4e522d4794469f457c2d1.jpg'} // Placeholder
                name={group.nome}
                members={group.total_vagas - group.vagas_disponiveis}
                subject={group.materia}
                isMember={myGroups.includes(group.id)}
                onJoinSuccess={handleJoinSuccess}
              />
            );
          })}
        </Grid>
      </HomeContainer>
      {/* <Footer /> */}
      <CreateGroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateGroup}
      />
    </>
  );
};

export default Home;