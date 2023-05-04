document.addEventListener('DOMContentLoaded', () => {
const result = document.getElementById('result')
let filter;
const listItems = []


getData()

async function getData() {
    const res = await fetch ('https://randomuser.me/api?results=50');

    const { results } = await res.json();

   //Clear result
   result.innerHTML = '';

   //create new HTML element
   const ul = document.createElement('ul')

   results.forEach(user => {
     const li = document.createElement('li')

     listItems.push(li)

      li.innerHTML = ` 
         <img src="${user.picture.large}" alt="${user.name.first}">
         <div class="user-info">
            <h4>${user.name.first} ${user.name.last}</h4>
            <p>${user.location.city}, ${user.location.country}</p>
         </div>
        `;
        ul.appendChild(li);
    });

    //append new html element
    result.appendChild(ul);
    filter = document.getElementById('filter');
    filter.addEventListener('input', (e) => filterData(e.target.value));
}

function filterData(searchTerm) {
    const items = result.querySelectorAll('li')
   listItems.forEach(item => {
    if(item.innerText.toLowerCase().includes(searchTerm.toLowerCase())){
        item.classList.remove('hide')
    } else {
        item.classList.add('hide')
    }
   })
}

//function to fetch the data
async function fetchData() {
    const res = await fetch('https://randomuser.me/api?results=50');
    const { results } = await res.json();
    return results;
  }
  
  // save the results as JSON data
  fetchData().then((results) => {
    const jsonData = JSON.stringify(results);
    
    // Save the JSON data to a file using a server-side script or a database
  });
  
})
