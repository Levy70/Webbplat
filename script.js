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
            <button class="delete-btn">Delete</button>
         </div>
        `;
      ul.appendChild(li);
    });

    // Append new HTML element
    result.appendChild(ul);

    filter = document.getElementById('filter');
    filter.addEventListener('input', (e) => filterData(e.target.value));

    // Add event listeners for delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach((button, index) => {
      button.addEventListener('click', () => deleteUser(index));
    });
  }

  function filterData(searchTerm) {
    listItems.forEach(item => {
      if (item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  function saveNewUser(user) {
    const savedUsers = localStorage.getItem('users');
    let users = [];

    if (savedUsers) {
      users = JSON.parse(savedUsers);
    }

    users.push(user);

    // Update localStorage with new user data
    localStorage.setItem('users', JSON.stringify(users));
    console.log('New user data saved to localStorage');

    // Update the displayed list of users
    updateUserList();
  }

  function deleteUser(index) {
    const savedUsers = localStorage.getItem('users');
    let users = [];

    if (savedUsers) {
      users = JSON.parse(savedUsers);
      users.splice(index, 1); // Remove the user from the array
      localStorage.setItem('users', JSON.stringify(users)); // Update localStorage
      console.log('User deleted from localStorage');
      updateUserList(); // Update the displayed list of users
    }
  }

  function updateUserList() {
    const savedUsers = localStorage.getItem('users');
    const users = JSON.parse(savedUsers);

    result.innerHTML = '';

    const ul = document.createElement('ul');

    users.forEach(user => {
      const li = document.createElement('li');
      listItems.push(li);

      li.innerHTML = ` 
         <img src="${user.picture.large}" alt="${user.name.first}">
         <div class="user-info">
            <h4>${user.name.first} ${user.name.last}</h4>
            <p>${user.location.city}, ${user.location.country}</p>
            <button class="delete-btn">Delete</button>
         </div>
        `;
      ul.appendChild(li);
    });

    result.appendChild(ul);

    // Add event listeners for delete buttons
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach((button, index) => {
      button.addEventListener('click', () => deleteUser(index));
    });
  }

  const addUserForm = document.getElementById('addUserForm');
  addUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstName = document.getElementById('firstNameInput').value;
    const lastName = document.getElementById('lastNameInput').value;
    const city = document.getElementById('cityInput').value;
    const country = document.getElementById('countryInput').value;

    const newUser = {
      name: {
        first: firstName,
        last: lastName
      },
      location: {
        city: city,
        country: country
      },
      picture: {
        large: 'path/to/profile-picture.jpg'
      }
    };

    saveNewUser(newUser);
    addUserForm.reset();
  });
});
