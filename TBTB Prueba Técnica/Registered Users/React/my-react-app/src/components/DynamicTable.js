// src/components/DynamicTable.js
import React, { useState } from 'react';

const DynamicTable = ({ data }) => {
   const [searchTerm, setSearchTerm] = useState('');

   if (!data || data.length === 0) {
      return <div>No data available</div>;
   }

   const headers = Object.keys(data[0]);

   const handleChange = (event) => {
      setSearchTerm(event.target.value);
   }

   const getAllValues = (obj) => {
      let values = [];

      const extractValues = (currentObj) => {
         for (let key in currentObj) {
            if (currentObj.hasOwnProperty(key)) {
               if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
                  // Si el valor es un objeto, hacer llamada recursiva
                  extractValues(currentObj[key]);
               } else {
                  // Si el valor no es un objeto, agregar a la lista de valores
                  values.push(currentObj[key]);
               }
            }
         }
      };

      extractValues(obj);
      return values;
   };

   const filterRows = (row) => {
      const rowValues = getAllValues(row).join(' ').toLowerCase();
      return rowValues.includes(searchTerm.toLowerCase());
   }

   return (
      <div>
         <input
            className="form-control"
            id="inputTable"
            type="text"
            placeholder="Search.."
            value={searchTerm}
            onChange={handleChange}
         />
         <div className='table-responsive mt-4 rounded-3'>
            <table className='table table-scrollable table-hover table-striped'>
               <thead className='align-middle'>
                  <tr>
                     {headers.map((header, index) => (
                        <th className='text-center' key={index}>{header}</th>
                     ))}
                  </tr>
               </thead>
               <tbody className='table-group-divider'>
                  {data.filter(filterRows).map((row, rowIndex) =>

                     (
                        <tr key={rowIndex}>
                           {headers.map((header, colIndex) => {
                              if (header === "address") {
                                 return <td key={colIndex}>{row.address.street} {row.address.suite} {row.address.city} {row.address.zipcode} {row.address.geo.lat} {row.address.geo.lng}</td>

                              } else if (header === "company") {
                                 return <td key={colIndex}>{row.company.name} {row.company.catchPhrase} {row.company.bs}</td>

                              } else {
                                 return <td key={colIndex}>{row[header]}</td>
                              }
                           })}
                        </tr>
                     )
                  
                  )}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default DynamicTable;
