import { styled } from 'styled-components';
import Select from 'react-select';
import { stores } from '../../data/stores';
import { employees } from '../../data/employees';

export const SelectStoreAndName = () => {
  const storesOptions = stores.map((store) => ({
    value: store.name,
    label: store.name,
  }));
  storesOptions.sort((a, b) => a.label.localeCompare(b.label));

  const namesOptions = employees.map((employee) => ({
    value: employee.name,
    label: employee.name,
  }));
  namesOptions.sort((a, b) => a.label.localeCompare(b.label));

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
        options={storesOptions}
        menuPlacement='bottom'
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
        menuPlacement='bottom'
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
