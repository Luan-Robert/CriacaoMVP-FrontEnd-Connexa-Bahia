import styled from 'styled-components';

export const AuthContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #f0f2f5;
`;

export const FormContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AuthForm = styled.form`
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 420px;
  text-align: center;
`;

export const Title = styled.h2`
  margin-bottom: 1rem;
  color: #1c1c1c;
  font-size: 2rem;
  font-weight: 700;
`;

export const Subtitle = styled.p`
  margin-bottom: 2.5rem;
  color: #666;
`;

export const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  text-align: left;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.9rem;
  background: linear-gradient(90deg, #007bff, #0056b3);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const RedirectLink = styled.p`
  margin-top: 1.5rem;
  color: #555;

  a {
    color: #007bff;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const BrandContainer = styled.div`
  flex: 1.5;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;

  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    max-width: 400px;
  }
`;
