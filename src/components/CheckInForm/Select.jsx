import { styled } from 'styled-components';
import Select from 'react-select';
import axios from 'axios';
import { useState, useEffect } from 'react';

export const SelectStoreAndName = ({
  storeValue,
  setStoreValue,
  nameValue,
  setNameValue,
}) => {
  const [storesOptions, setStoresOptions] = useState([]);

  const storesDataAPI = async () => {
    try {
      const result = await axios.get('http://funsport95.com/api/stores');
      const storesData = result.data.data;
      console.log(storesData);
      const options = storesData.map((store) => ({
        id: store.id,
        value: store.opening_time,
        label: store.name,
      }));
      options.sort((a, b) => a.label.localeCompare(b.label));
      setStoresOptions(options);
    } catch (error) {
      console.error('Error', error);
    }
  };
  useEffect(() => {
    storesDataAPI();
  }, []);

  const handleStoreChange = (selectedOption) => {
    console.log(`Selected option is ${selectedOption}`);
    setStoreValue(selectedOption);
    console.log(`Selected option is ${storeValue}`);
  };

  const handleNameChange = (event) => {
    setNameValue(event.target.value);
  };

  return (
    <SelectContainer>
      <Select
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            width: '20rem',
            fontSize: '1.8rem',
            cursor: 'text',
          }),
        }}
        placeholder='Selecteaza magazinul'
        isSearchable={true}
        value={storeValue}
        options={storesOptions}
        menuPlacement='bottom'
        onChange={handleStoreChange}
      />
      <NameInput
        type='text'
        placeholder='Introdu numele...'
        value={nameValue}
        onChange={handleNameChange}
      />
    </SelectContainer>
  );
};

const SelectContainer = styled.form`
  max-width: 80rem;
  display: flex;
  justify-content: space-around;
  margin: 10rem auto 0rem;
`;

const NameInput = styled.input`
  font-family: 'Times New Roman', Times, serif;
  font-size: 1.8rem;
  padding: 0 0.8rem;
  border: none;
  border-radius: 4px;
  max-width: 320px;
`;
