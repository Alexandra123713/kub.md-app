# KUB.MD-APP-CHECK-IN

O aplicație simplă care permite angajaților să facă check-in când ajung la locul de muncă, iar managerilor să monitorizeze întârzierile.

---

## Descriere

Această aplicație permite utilizatorilor să efectueze check-in prin:

- Selectarea filialei magazinului unde lucrează
- Introducerea numelui și prenumelui
- Adăugarea unui motiv al întârzierii (opțional)

Datele introduse sunt salvate într-o bază de date și afișate într-un **panou de administrare**, accesibil doar managerilor (prin logare).

### Panoul de administrare include trei secțiuni:

1. **Întârzieri**  
   - Selectare perioadă și angajat  
   - La apăsarea butonului de informații, este afișat un tabel cu:
     - Data și ora sosirii
     - Numele angajatului
     - Filiala magazinului
     - Motivul întârzierii
     - Întârzierile zilnice și totalul întârzierilor pentru perioada selectată

2. **Angajați**  
   - Tabel cu lista tuturor angajaților  
   - Posibilitatea de a adăuga sau șterge angajați

3. **Magazine**  
   - Tabel cu lista magazinelor, adresele și orele de deschidere  
   - Posibilitatea de a adăuga sau șterge magazine

### Localizare

Aplicația suportă două limbi:
- Română
- Rusă

---

## Tehnologii folosite

- **React** + **Vite**
- **Styled Components**
- **Axios**
- **React Hooks**: `useState`, `useEffect`, `useTranslation`, `useNavigate`
- **Librării externe**:
  - `react-toastify`
  - `react-select`
  - `react-datepicker`
- **Props** pentru transmiterea datelor între componente

---

## Status

Proiect finalizat și funcțional.

---

## Autor

Proiect realizat de Cerevatii Alexandra

