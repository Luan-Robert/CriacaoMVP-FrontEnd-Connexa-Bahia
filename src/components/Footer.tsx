import React from 'react';
import styled from 'styled-components';

const MainFooter = styled.footer`
  text-align: center;
  padding: 1rem;
  background-color: #f8f9fa;
  border-top: 1px solid #e7e7e7;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Footer: React.FC = () => {
  return (
    <MainFooter>
      <p>&copy; 2025 Conexxa. Todos os direitos reservados.</p>
    </MainFooter>
  );
};

export default Footer;
