function register() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({ username: user.value, password: pass.value });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registered successfully");
  window.location = "login.html";
}

function login() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let found = users.find(
    u => u.username === user.value && u.password === pass.value
  );

  if (found) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("currentUser", found.username);
    window.location = "index.html";   // 🔥 Redirect
  } else {
    alert("Invalid login");
  }
}
