import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const MainHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  a {
    font-size: 1.8rem;
    font-weight: bold;
    color: #007bff;
    text-decoration: none;
  }
`;

const Nav = styled.nav`
  ul {
    list-style: none;
    display: flex;
    gap: 1.5rem;
    margin: 0;
    align-items: center;
  }

  a {
    text-decoration: none;
    color: #333;
    font-size: 1rem;

    &:hover {
      color: #007bff;
    }
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    color: #007bff;
  }
`;

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <MainHeader>
      <Logo>
        <Link to="/home">Conexxa</Link>
      </Logo>
      <Nav>
        <ul>
          {isAuthenticated ? (
            <>
              <li><Link to="/home">Home</Link></li>
              <li><LogoutButton onClick={handleLogout}>Logout</LogoutButton></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Cadastro</Link></li>
            </>
          )}
        </ul>
      </Nav>
    </MainHeader>
  );
};

export default Header;