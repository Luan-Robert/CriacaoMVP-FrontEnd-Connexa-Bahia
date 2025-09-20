import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
  AuthContainer,
  FormContainer,
  AuthForm,
  Title,
  Subtitle,
  InputGroup,
  Label,
  Input,
  Button,
  RedirectLink,
  BrandContainer
} from './AuthStyles';

const Register: React.FC = () => {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [ra, setRa] = useState('');
  const [curso, setCurso] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [faculdade, setFaculdade] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (senha !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    const formData = {
      nomeCompleto,
      email,
      ra,
      curso,
      periodo,
      faculdade,
      senha
    };

    try {
      await api.post('/usuarios/cadastro', formData);
      alert('Cadastro realizado com sucesso! Você será redirecionado para o login.');
      navigate('/login');
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      const errorMessage = error.response?.data?.message || 'Erro desconhecido no cadastro. Tente novamente.';
      alert(`Falha no cadastro: ${errorMessage}`);
    }
  };

  return (
    <AuthContainer>
      <BrandContainer>
        <h1>Conexxa</h1>
        <p>Conectando estudantes, potencializando o aprendizado.</p>
      </BrandContainer>
      <FormContainer>
        <AuthForm onSubmit={handleRegister}>
          <Title>Crie sua conta</Title>
          <Subtitle>É rápido e fácil!</Subtitle>
          <InputGroup>
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              type="text"
              id="name"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="ra">RA</Label>
            <Input
              type="text"
              id="ra"
              value={ra}
              onChange={(e) => setRa(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="curso">Curso</Label>
            <Input
              type="text"
              id="curso"
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="periodo">Período</Label>
            <Input
              type="text"
              id="periodo"
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="faculdade">Faculdade</Label>
            <Input
              type="text"
              id="faculdade"
              value={faculdade}
              onChange={(e) => setFaculdade(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="password">Senha</Label>
            <Input
              type="password"
              id="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </InputGroup>
          <Button type="submit">Cadastrar</Button>
          <RedirectLink>
            Já tem uma conta? <Link to="/login">Faça login</Link>
          </RedirectLink>
        </AuthForm>
      </FormContainer>
    </AuthContainer>
  );
};

export default Register;