import React, { useState, useMemo, ChangeEvent, useEffect } from 'react';
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

const Home: React.FC = () => {
  const [studyGroups, setStudyGroups] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
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

  useEffect(() => {
    fetchGroups();
  }, []);

  const subjects = useMemo(() => {
    const allSubjects = studyGroups.map((group) => group.materia);
    return ['', ...Array.from(new Set(allSubjects))];
  }, [studyGroups]);

  const filteredGroups = useMemo(() => {
    return studyGroups.filter((group) => {
      const nameMatch = group.nome.toLowerCase().includes(searchTerm.toLowerCase());
      const subjectMatch = selectedSubject ? group.materia === selectedSubject : true;
      return nameMatch && subjectMatch;
    });
  }, [studyGroups, searchTerm, selectedSubject]);

  const handleCreateGroup = async (groupData: GroupFormData) => {
    try {
      await api.post('/grupos', groupData);
      alert('Grupo criado com sucesso!');
      // Re-fetch groups to show the new one
      fetchGroups();
    } catch (error: any) {
      console.error('Erro ao criar grupo:', error);
      const errorMessage = error.response?.data?.message || 'Falha ao criar o grupo. Tente novamente.';
      alert(errorMessage);
    }
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
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </Select>
          <CreateGroupButton onClick={() => setIsModalOpen(true)}>
            Criar Turma
          </CreateGroupButton>
        </FilterContainer>
        <Grid>
          {filteredGroups.map((group, index) => (
            <StudyGroupCard
              key={index}
              photo={'https://i.pinimg.com/originals/60/c1/1a/60c11a93c3b4e522d4794469f457c2d1.jpg'} // Placeholder
              name={group.nome}
              members={group.total_vagas - group.vagas_disponiveis}
              subject={group.materia}
            />
          ))}
        </Grid>
      </HomeContainer>
      <Footer />
      <CreateGroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateGroup}
      />
    </>
  );
};

export default Home;