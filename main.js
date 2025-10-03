const userList = document.getElementById("user-list");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");

let users = [];
let filteredUsers = [];

// Fetch API data
async function fetchUsers() {
  const res = await fetch("https://randomuser.me/api/?results=100");
  const data = await res.json();
  users = data.results;
  filteredUsers = [...users];
  renderUsers(filteredUsers);
}

// Render users
function renderUsers(userArray) {
  userList.innerHTML = "";
  userArray.forEach(user => {
    const card = document.createElement("div");
    card.classList.add("user-card");

    card.innerHTML = `
      <img src="${user.picture.large}" alt="${user.name.first}">
      <h3>${user.name.first} ${user.name.last}</h3>
      <p>Age: ${user.dob.age}</p>
      <p>${user.location.city}, ${user.location.country}</p>
    `;

    userList.appendChild(card);
  });
}

// Search filter
searchInput.addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  filteredUsers = users.filter(user =>
    (user.name.first + " " + user.name.last).toLowerCase().includes(term)
  );
  renderUsers(filteredUsers);
});

// Sorting
sortSelect.addEventListener("change", () => {
  const val = sortSelect.value;
  if (val === "az") {
    filteredUsers.sort((a, b) => (a.name.first + a.name.last).localeCompare(b.name.first + b.name.last));
  } else if (val === "za") {
    filteredUsers.sort((a, b) => (b.name.first + b.name.last).localeCompare(a.name.first + a.name.last));
  } else if (val === "young") {
    filteredUsers.sort((a, b) => a.dob.age - b.dob.age);
  } else if (val === "old") {
    filteredUsers.sort((a, b) => b.dob.age - a.dob.age);
  }
  renderUsers(filteredUsers);
});

// Start
fetchUsers();
