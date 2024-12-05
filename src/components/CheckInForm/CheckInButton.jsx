import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

export const CheckInButton = ({
  storeValue,
  nameValue,
  setStoreValue,
  setNameValue,
}) => {
  const handleCheckIn = async () => {
    if (storeValue && nameValue) {
      const storeId = storeValue.id;
      const newInformation = {
        name: nameValue,
        store_id: storeId,
      };
      console.log(newInformation.name, newInformation.store_id);
      const confirmMessage = confirm('Magazinul si numele sunt corecte?');

      if (confirmMessage) {
        try {
          await axios.post('http://funsport95.com/api/checkin', newInformation);
          alert('Check-in reusit!');
          setStoreValue('');
          setNameValue('');
        } catch (error) {
          console.error('Eroare:', error.response?.data || error.message);
          alert('Numele introdus este gresit!');
        }
      } else return;
    } else {
      alert('Selecteaza magazinul si vanzatorul');
    }
  };

  return <Button onClick={handleCheckIn}>Check-in!</Button>;
};

const Button = styled.button`
  background-color: #96c747;
  border-radius: 30px;
  width: 16rem;
  height: 5rem;
  display: block;
  margin: 10rem auto 0;
  font-size: 2rem;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;
