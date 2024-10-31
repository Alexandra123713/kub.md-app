import styled from 'styled-components';

export const CheckInButton = () => {
  return <Button>Check-in!</Button>;
};

const Button = styled.button`
  background-color: #96c747;
  border-radius: 30px;
  width: 16rem;
  height: 5rem;
  display: block;
  margin: 20rem auto 0;
  font-size: 2rem;
  cursor: pointer;
`;
