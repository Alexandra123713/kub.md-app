import { useState } from 'react';
import styled from 'styled-components';

export const CheckInButton = ({ storeValue, nameValue }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleCheckIn = () => {
    const currentTime = new Date();
    const currentTimestamp = currentTime.getTime();
    const currentDate = `${currentTime.getDate()}. ${currentTime.getMonth()}. ${currentTime.getFullYear()}`;

    if (storeValue && nameValue) {
      const openingTimestamp = storeValue.value;
      const delay = Math.floor(
        (currentTimestamp - openingTimestamp) / (1000 * 60)
      );
      const newInformation = {
        delay: delay,
        name: nameValue.value,
        date: currentDate,
      };

      const confirmMessage = confirm('Magazinul si numele sunt corecte?');
      if (confirmMessage) {
        const savedInformation =
          JSON.parse(localStorage.getItem('information')) || [];

        const updatedData = Array.isArray(savedInformation)
          ? savedInformation
          : [];

        updatedData.push(newInformation);
        localStorage.setItem('information', JSON.stringify(updatedData));
        alert('Check-in reusit!');
      } else return;
      setIsDisabled(true);
    } else {
      alert('Selecteaza magazinul si vanzatorul');
    }
  };

  return (
    <Button
      onClick={handleCheckIn}
      // disabled={isDisabled}
    >
      Check-in!
    </Button>
  );
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
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;
