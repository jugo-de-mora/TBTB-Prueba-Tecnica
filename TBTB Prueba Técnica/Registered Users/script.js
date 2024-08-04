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

function createTable(data) {
   const main_container = document.getElementById("insertTable"),
      div = document.createElement("div"),
      table = document.createElement("table"),
      thead = document.createElement("thead"),
      tbody = document.createElement("tbody")

   const header = table.insertRow();
   header.insertCell().appendChild(document.createTextNode("ID"));
   header.insertCell().appendChild(document.createTextNode("Name"));
   header.insertCell().appendChild(document.createTextNode("Username"));
   header.insertCell().appendChild(document.createTextNode("Email"));
   header.insertCell().appendChild(document.createTextNode("Website"));
   header.insertCell().appendChild(document.createTextNode("Address"));
   header.insertCell().appendChild(document.createTextNode("Company"));
   header.insertCell().appendChild(document.createTextNode("Phone"));


   for (let i = 0; i < data.length; i++) {
      const tr = table.insertRow();
      const id = tr.insertCell();
      id.appendChild(document.createTextNode(data[i].id));
      const name = tr.insertCell();
      name.appendChild(document.createTextNode(data[i].name));
      const username = tr.insertCell();
      username.appendChild(document.createTextNode(data[i].username));
      const email = tr.insertCell();
      email.appendChild(document.createTextNode(data[i].email));
      const website = tr.insertCell();
      website.appendChild(document.createTextNode(data[i].website));
      const address = tr.insertCell();
      const fullAddress = `${data[i].address.street} ${data[i].address.suite} ${data[i].address.city} ${data[i].address.zipcode} ${data[i].address.geo.lat} ${data[i].address.geo.lng}`;
      address.appendChild(document.createTextNode(fullAddress));
      const company = tr.insertCell();
      const fullCompany = `${data[i].company.name} ${data[i].company.catchPhrase} ${data[i].company.bs}`;
      company.appendChild(document.createTextNode(fullCompany));
      const phone = tr.insertCell();
      phone.appendChild(document.createTextNode(data[i].phone));
      tbody.appendChild(tr)
   }

   tbody.id = "myTable"
   tbody.classList.add("table-group-divider")
   header.classList.add("align-middle")
   thead.classList.add("text-center")
   div.classList.add("table-responsive", "mt-4", "p-4", "wrapper", "rounded-3")
   table.classList.add("table", "table-scrollable", "table-hover", "table-striped")

   thead.appendChild(header)
   table.appendChild(thead)
   table.appendChild(tbody)
   div.appendChild(table)
   main_container.appendChild(div)
}

function addFilterTable() {
   $(document).ready(function () {
      $("#inputTable").on("keyup", function () {
         var value = $(this).val().toLowerCase();
         $("#myTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
         });
      });
   });
}

function createCards(data) {
   for (let i = 0; i < data.length; i++) {
      const card_container = document.createElement("div"),
         card = document.createElement("div"),
         card_header = document.createElement("div"),
         card_body = document.createElement("div"),
         cardTitle = document.createElement("h4"),
         company = document.createElement("p"),
         email = document.createElement("p"),
         website = document.createElement("p"),
         phone = document.createElement("p"),
         address = document.createElement("p"),
         main_container = document.getElementById("insertCards")

      card.id = "card" + i

      card_container.classList.add("col-md-4", "card-container")
      card.classList.add("card")
      card_header.classList.add("card-header")
      card_body.classList.add("card-body")
      cardTitle.classList.add("card-title")
      company.classList.add("card-text")
      email.classList.add("card-text")
      website.classList.add("card-text")
      phone.classList.add("card-text")
      address.classList.add("card-text")

      card_header.textContent = `${data[i].id}. ${data[i].username}`
      cardTitle.textContent = data[i].name
      company.textContent = `Company: ${data[i].company.name} ${data[i].company.catchPhrase} ${data[i].company.bs}`
      email.textContent = `Email: ${data[i].email}`
      website.textContent = `Website: ${data[i].website}`
      phone.textContent = `Phone: ${data[i].phone}`
      address.textContent = `Address: ${data[i].address.street} ${data[i].address.suite} ${data[i].address.city} ${data[i].address.zipcode} ${data[i].address.geo.lat} ${data[i].address.geo.lng}`

      card_body.appendChild(cardTitle)
      card_body.appendChild(company)
      card_body.appendChild(email)
      card_body.appendChild(website)
      card_body.appendChild(phone)
      card_body.appendChild(address)
      card.appendChild(card_header)
      card.appendChild(card_body)
      card_container.appendChild(card)
      main_container.appendChild(card_container)
   }
}

function addFilterCards() {
   $(document).ready(function () {
      $("#inputCards").on("keyup", function () {
         var value = $(this).val().toLowerCase();
         $(".card-container").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
         });
      });
   });
}

async function main() {
   const url = 'https://jsonplaceholder.typicode.com/users';
   const data = await fetchData(url);

   if (data) {
      createTable(data)
      createCards(data)
   }
   addFilterTable()
   addFilterCards()
}

main()
