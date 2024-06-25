document.addEventListener("DOMContentLoaded", () => {
  const profiles = document.getElementById("profiles");
  const tableBody = document.querySelector("#table tbody");
  const fetchUsersButton = document.getElementById("fetch_users");

  const createUserProfile = (user) => `
        <div class="user-profile">
            <img src="${user.picture.large}" alt="User Picture">
            <h2>${user.name.first} ${user.name.last}</h2>
            <p>${user.email}</p>
        </div>
    `;

  const createUserTableRow = (user) => `
        <tr>
            <td>${user.name.first} ${user.name.last}</td>
            <td>${user.email}</td>
        </tr>
    `;

  const showLoading = () => {
    profiles.innerHTML = "<p>Loading...</p>";
  };

  const clearContent = () => {
    profiles.innerHTML = "";
    tableBody.innerHTML = "";
  };

  const displayUsers = (users) => {
    clearContent();
    users.forEach((user) => {
      profiles.insertAdjacentHTML("beforeend", createUserProfile(user));
      tableBody.insertAdjacentHTML("beforeend", createUserTableRow(user));
    });
  };

  const fetchUsers = async () => {
    showLoading();
    try {
      const response = await fetch("https://randomuser.me/api/?results=5");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      displayUsers(data.results);
    } catch (error) {
      profiles.innerHTML = `<p>Error fetching user data: ${error.message}</p>`;
    }
  };

  fetchUsersButton.addEventListener("click", fetchUsers);
  fetchUsers();
});
