document.addEventListener('DOMContentLoaded', () => {
  const result = document.getElementById('result');
  let filter;
  const listItems = [];

  getData();

  async function getData() {
    // Show loading state
    result.innerHTML = '<p>Loading...</p>';

    try {
      const response = await fetch('/users');
      const users = await response.json();

      // Clear result
      result.innerHTML = '';

      // Create new HTML element
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

      // Append new HTML element
      result.appendChild(ul);

      filter = document.getElementById('filter');
      filter.addEventListener('input', (e) => filterData(e.target.value));

      // Add event listeners for delete buttons
      const deleteButtons = document.querySelectorAll('.delete-btn');
      deleteButtons.forEach((button, index) => {
        button.addEventListener('click', () => deleteUser(index));
      });
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
      result.innerHTML = '<p>Error occurred while fetching data.</p>';
    }
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

  async function saveNewUser(user) {
    try {
      const response = await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        const newUser = await response.json();
        console.log('New user added:', newUser);

        // Update the displayed list of users
        updateUserList();
      } else {
        console.error('Failed to add new user:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while adding new user:', error);
    }
  }

  async function deleteUser(index) {
    try {
      const response = await fetch('/users/' + (index + 1), {
        method: 'DELETE'
      });

      if (response.ok) {
        console.log('User deleted');
        updateUserList(); // Update the displayed list of users
      } else {
        console.error('Failed to delete user:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while deleting user:', error);
    }
  }

  function updateUserList() {
    getData();
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
