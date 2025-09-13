import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você faria a chamada para o backend com axios
    // Por enquanto, vamos simular um login bem-sucedido
    const fakeToken = '12345';
    login(fakeToken);
    navigate('/home');
  };

  return (
    <AuthContainer>
      <BrandContainer>
        <h1>Conexxa</h1>
        <p>Conectando estudantes, potencializando o aprendizado.</p>
      </BrandContainer>
      <FormContainer>
        <AuthForm onSubmit={handleLogin}>
          <Title>Bem-vindo de volta!</Title>
          <Subtitle>Faça login para continuar</Subtitle>
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="password">Senha</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          <Button type="submit">Entrar</Button>
          <RedirectLink>
            Não tem uma conta? <Link to="/register">Cadastre-se</Link>
          </RedirectLink>
        </AuthForm>
      </FormContainer>
    </AuthContainer>
  );
};

export default Login;
