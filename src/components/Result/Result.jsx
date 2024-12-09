import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import { LoginNavBar } from '../LoginForm/LoginNavBar';
import { employees } from '../../data/employees';

export const Result = () => {
  const [information, setInformation] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [nameValue, setNameValue] = useState(null);
  const [nameOption, setNameOption] = useState(null);
  const [storesOptions, setStoresOptions] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [totalDelay, setTotalDelay] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

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

  const employeeDataAPI = async () => {
    try {
      const result = await axios.get('http://funsport95.com/api/employees');
      const employeesForSelect = result.data;
      console.log(employeesForSelect);
      const employeeNameOptions = employeesForSelect.map((employee) => ({
        id: employee.id,
        value: employee.name,
        label: employee.name,
      }));
      employeeNameOptions.sort((a, b) => a.value.localeCompare(b.value));
      setNameOption(employeeNameOptions);
    } catch (error) {
      console.error('Error', error);
    }
  };

  useEffect(() => {
    employeeDataAPI();
  }, []);

  const handleNameChange = (selectedOption) => {
    console.log('Selected option is ' + selectedOption.value);
    setNameValue(selectedOption);
  };
  console.log('Name value is ' + nameValue);

  // useEffect(() => {
  //   const savedInformation = localStorage.getItem('information');
  //   if (savedInformation) {
  //     setInformation(JSON.parse(savedInformation));
  //   }
  // }, []);

  // const handleGetInformation = () => {
  //   if (information && nameValue) {
  //     const resultData = information
  //       .filter((info) => {
  //         const infoDate = new Date(info.date);
  //         console.log(
  //           `DATA ESTE ${infoDate} Start date este ${startDate}  End date este ${endDate}`
  //         );
  //         const matchesDateRange =
  //           (!startDate || infoDate >= startDate) &&
  //           (!endDate || infoDate <= endDate);
  //         return info.name === nameValue?.value && matchesDateRange;
  //       })

  //       .map((info) => ({
  //         name: info.name,
  //         delay: info.delay,
  //         date: info.date,
  //         store: info.store,
  //       }));
  //     setResults(resultData);
  //     setShowTable(true);
  //   } else alert('Selecteaza vanzatorul');
  // };

  // const tableDataAPI = async () => {
  //   try {
  //     const result = await axios.get(
  //       'http://funsport95.com/api/late-checkins?date_from=2024-01-01&date_to=2024-12-01&employee_id=2'
  //     );
  //     const resultsForTable = result.data.data;
  //     const employeesData = resultsForTable.map((employeeData) => ({
  //       name: employeeData.employee.name,
  //       delay: employeeData.minutes_late,
  //     }));
  //     console.log(resultsForTable);
  //     console.log(employeesData);
  //     setTableData(resultsForTable);
  //   } catch (error) {
  //     console.error('Error', error);
  //   }
  // };
  // useEffect(() => {
  //   tableDataAPI();
  // }, []);

  const handleGetInformation = async () => {
    if (!nameValue) {
      toast.warn('Selecteaza vanzatorul!', {
        position: 'bottom-right',
      });
      return;
    }
    if (!startDate || !endDate) {
      toast.warn('Selectează un interval de date!', {
        position: 'bottom-right',
      });
      return;
    }
    const employeeId = nameValue.id;
    const dateFrom = startDate.toISOString().split('T')[0];
    const dateTo = endDate.toISOString().split('T')[0];

    try {
      const result = await axios.get(
        `http://funsport95.com/api/late-checkins?date_from=${dateFrom}&date_to=${dateTo}&employee_id=${employeeId}`
      );

      console.log(result);

      const resultsForTable = result.data.data;
      const totalDelay = result.data.total_minutes_late;

      const formattedTableData = resultsForTable.map((entry) => ({
        date: new Date(entry.start_time).toLocaleDateString('ro-RO', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
        entry: new Date(entry.start_time).toLocaleTimeString('ro-RO', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        name: entry.employee.name,
        store: entry.store.name,
        delay: entry.minutes_late,
      }));

      setTableData(formattedTableData);
      setTotalDelay(totalDelay);
      setShowTable(true);
    } catch (error) {
      console.error('Eroare:', error);
    }
  };

  return (
    <>
      <LoginNavBar />
      <ResultContainer>
        <FiltersContainer>
          <>
            <Select
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  width: '15rem',
                  fontSize: '1.2rem',
                  cursor: 'text',
                }),
                menu: (baseStyles) => ({
                  ...baseStyles,
                  zIndex: '2',
                }),
              }}
              placeholder='Selecteaza vanzatorul'
              isSearchable={true}
              options={nameOption}
              value={nameValue}
              menuPlacement='bottom'
              onChange={handleNameChange}
              closeMenuOnSelect={true}
            />
          </>
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
          <InformationButton onClick={handleGetInformation}>
            Information
          </InformationButton>
        </FiltersContainer>
        {showTable && (
          <Table>
            <thead>
              <tr>
                <TH>Data</TH>
                <TH>Ora sosirii</TH>
                <TH>Vanzator</TH>
                <TH>Magazin</TH>
                <TH>Intarziere</TH>
              </tr>
            </thead>
            <tbody>
              {tableData.map((result, index) => (
                <tr key={index}>
                  <TD>{result.date}</TD>
                  <TD>{result.entry}</TD>
                  <TD>{result.name}</TD>
                  <TD>{result.store}</TD>
                  <TD>{result.delay} min</TD>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <TDFoot>Total intarzieri</TDFoot>
                <TDFoot></TDFoot>
                <TDFoot></TDFoot>
                <TDFoot></TDFoot>
                <TDFoot>{totalDelay} min</TDFoot>
              </tr>
            </tfoot>
          </Table>
        )}
        <ToastContainer />
      </ResultContainer>
    </>
  );
};

const FiltersContainer = styled.div`
  margin: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
`;

const InformationButton = styled.div`
  background-color: #96c747;
  border-radius: 30px;
  width: 14rem;
  display: block;
  font-size: 1.5rem;
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;
`;

const ResultContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Table = styled.table`
  background-color: white;
  margin: 3rem;
  width: 100%;
`;

const TD = styled.td`
  background-color: #13e2e2;
  text-align: center;
`;

const TH = styled.th`
  background-color: gray;
  border: 1px solid black;
`;

const TDFoot = styled.td`
  background-color: orange;
  text-align: center;
`;
