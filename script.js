document.addEventListener('DOMContentLoaded', () => {
  const result = document.getElementById('result');
  let filter;
  const listItems = [];

  getData();

  async function getData() {
    const savedUsers = localStorage.getItem('users');
    let results;

    if (savedUsers) {
      results = JSON.parse(savedUsers);
    } else {
      const res = await fetch('https://randomuser.me/api?results=50');
      const data = await res.json();
      results = data.results;

      // Save user data to localStorage
      localStorage.setItem('users', JSON.stringify(results));
      console.log('User data saved to localStorage');
    }

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
