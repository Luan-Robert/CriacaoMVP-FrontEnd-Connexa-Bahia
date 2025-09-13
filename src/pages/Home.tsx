import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomeContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

const HomeHeader = styled.header`
  background-color: #007bff;
  color: white;
  padding: 2rem;
  border-radius: 8px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.5rem;
`;

const HomeMain = styled.main`
  margin-top: 2rem;
`;

const Features = styled.section`
  display: flex;
  justify-content: space-around;
  gap: 1rem;
`;

const Feature = styled.div`
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 30%;
`;

const FeatureTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
`;

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <HomeContainer>
        <HomeHeader>
          <Title>Bem-vindo ao Conexxa</Title>
          <p>Encontre grupos de estudo e conecte-se com outros estudantes.</p>
        </HomeHeader>
        <HomeMain>
          <Features>
            <Feature>
              <FeatureTitle>Encontre Grupos</FeatureTitle>
              <p>Procure por grupos de estudo por matéria, curso ou interesse.</p>
            </Feature>
            <Feature>
              <FeatureTitle>Crie seu Grupo</FeatureTitle>
              <p>Crie seu próprio grupo de estudo e convide seus amigos.</p>
            </Feature>
            <Feature>
              <FeatureTitle>Conecte-se</FeatureTitle>
              <p>Conecte-se com outros estudantes e compartilhem conhecimento.</p>
            </Feature>
          </Features>
        </HomeMain>
      </HomeContainer>
      <Footer />
    </>
  );
};

export default Home;