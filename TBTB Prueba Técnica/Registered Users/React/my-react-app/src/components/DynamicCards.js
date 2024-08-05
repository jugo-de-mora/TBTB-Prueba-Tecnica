import Card from 'react-bootstrap/Card';
import React, { useState } from 'react';

const DynamicCards = ({ data }) => {
   const [searchTerm, setSearchTerm] = useState('');

   if (!data || data.length === 0) {
      return <div>No data available</div>;
   }

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

   const headers = Object.keys(data[0]);
   return (
      <>

         <input
            className="form-control"
            id="inputTable"
            type="text"
            placeholder="Search.."
            value={searchTerm}
            onChange={handleChange}
         />

         <br></br>

         <div className='row gy-3'>
         {
            data.filter(filterRows).map((row, rowIndex) => (

               <div className='col-md-4 card-container'>

                  <Card>
                     <Card.Header as="h5" key={rowIndex}>{row.id}. {row.username}</Card.Header>
                     <Card.Body>
                        <Card.Title>{row.name}</Card.Title>
                        <Card.Text>
                           Company: {row.company.name} {row.company.catchPhrase} {row.company.bs}
                        </Card.Text>
                        <Card.Text>
                           Email: {row.email}
                        </Card.Text>
                        <Card.Text>
                           Website: {row.website}
                        </Card.Text>
                        <Card.Text>
                           Phone: {row.phone}
                        </Card.Text>
                        <Card.Text>
                           Address: {row.address.street} {row.address.suite} {row.address.city} {row.address.zipcode} {row.address.geo.lat} {row.address.geo.lng}
                        </Card.Text>
                     </Card.Body>
                  </Card>
               </div>

            ))
            }
         </div>
      </>
   );
}

export default DynamicCards;