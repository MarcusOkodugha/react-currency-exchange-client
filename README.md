# Currency Exchange Frontend

A modern React frontend for the currency exchange service.

## Setup

```bash
npm install
```

## Running the Application

```bash
npm run dev
```

The application will start on `http://localhost:3000`

## Building for Production

```bash
npm run build
```

## Features

- Convert between SEK, EUR, and USD
- Fetch latest exchange rates (ready to connect to Java backend)
- Real-time currency conversion
- Responsive design with beautiful UI

## Backend Integration

To connect to the Java backend, update the `fetchRates` function in `src/App.jsx`:

```javascript
const response = await fetch('http://localhost:8080/api/rates/fetch');
const data = await response.json();
setRates(data);
```
# react-currency-exchange-client
