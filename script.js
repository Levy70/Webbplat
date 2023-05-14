document.addEventListener('DOMContentLoaded', () => {
    const result = document.getElementById('result');
    let filter;
    const listItems = [];
  
    getData();
  
    async function getData() {
      const res = await fetch ('https://randomuser.me/api?results=50');
  
      const { results } = await res.json();
  
      // Clear result
      result.innerHTML = '';
  
      // Create new HTML element
      const ul = document.createElement('ul');
  
      results.forEach(user => {
        const li = document.createElement('li');
  
        listItems.push(li);
  
        li.innerHTML = ` 
           <img src="${user.picture.large}" alt="${user.name.first}">
           <div class="user-info">
              <h4>${user.name.first} ${user.name.last}</h4>
              <p>${user.location.city}, ${user.location.country}</p>
           </div>
          `;
        ul.appendChild(li);
      });
  
      // Append new HTML element
      result.appendChild(ul);
      filter = document.getElementById('filter');
      filter.addEventListener('input', (e) => filterData(e.target.value));
  
      // Save user data to JSON file
      const fs = require('fs');
      fs.writeFile('users.json', JSON.stringify(results), err => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('User data saved to users.json');
      });
    }
  
    function filterData(searchTerm) {
      const items = result.querySelectorAll('li');
      listItems.forEach(item => {
        if (item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
        }
      });
    }
  });
  