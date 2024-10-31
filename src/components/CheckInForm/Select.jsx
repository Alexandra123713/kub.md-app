import { styled } from 'styled-components';
import Select from 'react-select';
import { stores } from '../../data/stores';
import { employees } from '../../data/employees';

export const SelectStoreAndName = ({
  storeValue,
  setStoreValue,
  nameValue,
  setNameValue,
}) => {
  const storesOptions = stores.map((store) => ({
    value: store.openingTime,
    label: store.name,
  }));
  storesOptions.sort((a, b) => a.label.localeCompare(b.label));

  const namesOptions = employees.map((employee) => ({
    value: employee.name,
    label: employee.name,
  }));
  namesOptions.sort((a, b) => a.label.localeCompare(b.label));

  const handleStoreChange = (selectedOption) => {
    console.log(selectedOption);
    setStoreValue(selectedOption);
  };

  const handleNameChange = (selectedOption) => {
    console.log(selectedOption);
    setNameValue(selectedOption);
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
      <Select
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            width: '20rem',
            fontSize: '1.8rem',
            cursor: 'text',
          }),
        }}
        placeholder='Selecteaza vanzatorul'
        isSearchable={true}
        options={namesOptions}
        value={nameValue}
        menuPlacement='bottom'
        onChange={handleNameChange}
      />
    </SelectContainer>
  );
};

const SelectContainer = styled.form`
  max-width: 80rem;
  display: flex;
  justify-content: space-around;
  margin: 16rem auto 0rem;
`;
