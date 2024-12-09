import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import axios from 'axios';

export const CheckInButton = ({
  storeValue,
  nameValue,
  setStoreValue,
  setNameValue,
}) => {
  const { t } = useTranslation();
  const handleCheckIn = async () => {
    if (storeValue && nameValue) {
      const storeId = storeValue.id;
      const newInformation = {
        name: nameValue,
        store_id: storeId,
      };
      console.log(newInformation.name, newInformation.store_id);

      try {
        await axios.post('http://funsport95.com/api/checkin', newInformation);
        toast.success(t('successCheckIn'), {
          position: 'bottom-right',
        });
        setStoreValue('');
        setNameValue('');
      } catch (error) {
        console.error('Eroare:', error.response?.data || error.message);
        toast.error(t('errorNameIncorrect'), {
          position: 'bottom-right',
        });
      }
    } else {
      toast.warn(t('warnSelectStoreAndName'), {
        position: 'bottom-right',
      });
    }
  };

  return (
    <>
      <Button onClick={handleCheckIn}>{t('checkIn')}</Button>
      <ToastContainer />;
    </>
  );
};

const Button = styled.button`
  background-color: #96c747;
  border-radius: 30px;
  width: 16rem;
  height: 5rem;
  display: block;
  margin: 14rem auto 0;
  font-size: 2rem;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;
