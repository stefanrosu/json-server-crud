const requestHeader = { 'Content-Type': 'application/json' }
const baseApi = 'http://localhost:3000/';
const api = {
  users: 'users',
}

let usersData = [];

async function getUsers() {
  usersData = [];
  let response = await fetch(`${baseApi}${api.users}`, {
    method: 'GET',
  });
  let users = await response.json();
  usersData.push(users);
  let tableHead = `
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Age</th>
    </tr>`;

  const tableBody = users.map((user) => {
    return `
    <tr>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.age}</td>
      <td class='delete' onclick='deleteUser(${user.id})'>Delete</td>
      <td class='update' onclick='displayUpdateForm(${user.id})'>Update</td>
    </tr>
    `;
  });

  document.getElementById("usersTable").innerHTML = `<table>${tableHead}${tableBody}</table>`;
}

async function postUsers() {
  let name = document.getElementById('userName').value;
  let email = document.getElementById('email').value;
  let age = document.getElementById('age').value;
  const payload = { name, email, age }

  await fetch(`${baseApi}${api.users}`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: requestHeader
  });
}

async function deleteUser(userId) {
  await fetch(`${baseApi}${api.users}/${userId}`, {
    method: 'DELETE',
    headers: requestHeader
  }).then(() => getUsers());
}

function displayUpdateForm(userId) {
  const selectedUser = usersData[0].filter((user) => user.id === userId);
  const updateUserForm = `
    <form>
    <label for='userName'>Name</label>
    <input type='text' name='update_userName' id='update_userName' value='${selectedUser[0].name}'>
    <label for='email'>Email</label>
    <input type='email' name='update_email' id='update_email' value='${selectedUser[0].email}'>
    <label for='age'>Age</label>
    <input type='number' name='update_age' id='update_age' value='${selectedUser[0].age}'>
    <br>
    <button type='button' onclick='updateUsers(${userId})'>UPDATE Users</button>
    </form>
  `
  document.getElementById('updateUserForm').innerHTML = updateUserForm;
}

async function updateUsers(userId) {
  let name = document.getElementById('update_userName').value;
  let email = document.getElementById('update_email').value;
  let age = document.getElementById('update_age').value;
  const payload = { name, email, age }
  await fetch(`${baseApi}${api.users}/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: requestHeader
  }).then(() => getUsers());
}
