import React, { useState, useMemo, ChangeEvent } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StudyGroupCard from '../components/StudyGroupCard';
import CreateGroupModal from '../components/CreateGroupModal';

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

const initialStudyGroups = [
  {
    photo: 'https://i.pinimg.com/originals/60/c1/1a/60c11a93c3b4e522d4794469f457c2d1.jpg',
    name: 'Turma de React',
    members: 5,
    subject: 'React',
  },
  {
    photo: 'https://i.pinimg.com/originals/60/c1/1a/60c11a93c3b4e522d4794469f457c2d1.jpg',
    name: 'Grupo de Cálculo',
    members: 3,
    subject: 'Cálculo I',
  },
  {
    photo: 'https://i.pinimg.com/originals/60/c1/1a/60c11a93c3b4e522d4794469f457c2d1.jpg',
    name: 'Estudando Física',
    members: 4,
    subject: 'Física II',
  },
  {
    photo: 'https://i.pinimg.com/originals/60/c1/1a/60c11a93c3b4e522d4794469f457c2d1.jpg',
    name: 'Clube do Livro',
    members: 8,
    subject: 'Literatura',
  },
];

const Home: React.FC = () => {
  const [studyGroups, setStudyGroups] = useState(initialStudyGroups);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const subjects = useMemo(() => {
    const allSubjects = studyGroups.map((group) => group.subject);
    return ['', ...Array.from(new Set(allSubjects))];
  }, [studyGroups]);

  const filteredGroups = useMemo(() => {
    return studyGroups.filter((group) => {
      const nameMatch = group.name.toLowerCase().includes(searchTerm.toLowerCase());
      const subjectMatch = selectedSubject ? group.subject === selectedSubject : true;
      return nameMatch && subjectMatch;
    });
  }, [studyGroups, searchTerm, selectedSubject]);

  const handleCreateGroup = (group: { name: string; subject: string }) => {
    const newGroup = {
      ...group,
      photo: 'https://i.pinimg.com/originals/60/c1/1a/60c11a93c3b4e522d4794469f457c2d1.jpg',
      members: 1,
    };
    setStudyGroups([...studyGroups, newGroup]);
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
              photo={group.photo}
              name={group.name}
              members={group.members}
              subject={group.subject}
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