// src/App.js
import React from 'react';
import DynamicTable from './components/DynamicTable';
import DynamicCards from './components/DynamicCards';
import 'bootstrap/dist/css/bootstrap.min.css';

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

const url = 'https://jsonplaceholder.typicode.com/users';
const data = await fetchData(url);

const App = () => {
  return (
    <div className="container">
      <h1 >Registered Users</h1>
      <p>
        Type something in the input field to search the table for first names,
        last names or emails:
      </p>
      <DynamicTable data={data} />

      <br/>

      <DynamicCards data={data} />

    </div>
  );
};

export default App;
