import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../services/api';

const ProfileContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const ProfileCard = styled.div`
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const ProfileInfo = styled.div`
  p {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  strong {
    color: #333;
  }
`;

interface UserProfile {
  nome: string;
  email: string;
  ra: string;
  periodo: number;
  faculdade: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/usuarios/perfil');
        setProfile(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
        alert("Não foi possível carregar o perfil. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Header />
      <ProfileContainer>
        <Title>Meu Perfil</Title>
        {profile ? (
          <ProfileCard>
            <ProfileInfo>
              <p><strong>Nome:</strong> {profile.nome}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>RA:</strong> {profile.ra}</p>
              <p><strong>Período:</strong> {profile.periodo}</p>
              <p><strong>Faculdade:</strong> {profile.faculdade}</p>
            </ProfileInfo>
          </ProfileCard>
        ) : (
          <p>Não foi possível carregar as informações do perfil.</p>
        )}
      </ProfileContainer>
      <Footer />
    </>
  );
};

export default Profile;