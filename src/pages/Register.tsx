import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    // lógica de cadastro aqui com axios
    console.log('Name:', name, 'Email:', email, 'Password:', password);
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
            <Label htmlFor="name">Nome</Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              required
            />
          </InputGroup>
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
          <InputGroup>
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
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