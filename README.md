**English**

# KUB.MD-APP-CHECK-IN

A simple application that allows employees to check in when they arrive at work, and enables managers to monitor delays.

---

## Description

This application allows users to check in by:

- Selecting the store branch where they work
- Entering their first and last name
- Optionally adding a reason for being late

The submitted data is saved in a database and displayed in an **admin panel**, which is accessible only to managers (via login).

### The admin panel includes three sections:

1. **Delays**

   - Select a time period and an employee
   - When clicking the information button, a table is displayed showing:
     - Date and time of arrival
     - Employee’s name
     - Store branch
     - Reason for the delay
     - Daily delays and the total delay time for the selected period

2. **Employees**

   - A table listing all employees
   - Ability to add or remove employees

3. **Stores**
   - A table listing all store branches, their addresses, and opening hours
   - Ability to add or remove store branches

### Localization

The application supports two languages:

- Romanian
- Russian

---

## Technologies Used

- **React** + **Vite**
- **Styled Components**
- **Axios**
- **React Hooks**: `useState`, `useEffect`, `useTranslation`, `useNavigate`
- **External Libraries**:
- `react-toastify` – for displaying success, error, or informational messages.
- `react-select` – for dropdown menus, used to select the store branch or employee.
- `react-datepicker` – for selecting the date range.
- **Props** for passing data between components

---

## Status

Project completed and fully functional.

---

## Author

Project created by **Cerevatii Alexandra**

---





**Română**

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
  - `react-toastify` - pentru afișarea mesajelor de succes, eroare sau informare.
  - `react-select` - pentru meniuri dropdown, folosit la selectarea filialei sau angajatului.
  - `react-datepicker` - pentru selectarea perioadei.
- **Props** pentru transmiterea datelor între componente

---

## Status

Proiect finalizat și funcțional.

---

## Autor

Proiect realizat de Cerevatii Alexandra
