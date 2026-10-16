// ===============================
// COLLEGE PORTAL - JAVASCRIPT ONLY
// ===============================

// Default users
if (!localStorage.getItem("collegeUsers")) {
    const users = [
        {
            username: "admin",
            password: "admin123",
            role: "admin"
        },
        {
            username: "student",
            password: "student123",
            role: "student"
        }
    ];

    localStorage.setItem("collegeUsers", JSON.stringify(users));
}


// ===============================
// LOGIN FUNCTION
// ===============================

function login() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
        alert("Please enter username and password.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("collegeUsers")) || [];

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        alert("Invalid username or password.");
        return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    if (user.role === "admin") {
        window.location.href = "admin-dashboard.html";
    } 
    else if (user.role === "student") {
        window.location.href = "student-dashboard.html";
    }
}


// ===============================
// LOGOUT
// ===============================

function logout() {

    localStorage.removeItem("loggedInUser");

    window.location.href = "index.html";
}


// ===============================
// CHECK LOGIN
// ===============================

function checkLogin(requiredRole) {

    const loggedInUser =
        JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
        window.location.href = "index.html";
        return;
    }

    if (loggedInUser.role !== requiredRole) {
        alert("Access denied.");
        window.location.href = "index.html";
        return;
    }

    const userNameElement = document.getElementById("userName");

    if (userNameElement) {
        userNameElement.textContent = loggedInUser.username;
    }
}


// ===============================
// CREATE NEW USER
// ===============================

function registerUser(username, password, role) {

    const users =
        JSON.parse(localStorage.getItem("collegeUsers")) || [];

    const existingUser = users.find(
        user => user.username === username
    );

    if (existingUser) {
        alert("Username already exists.");
        return;
    }

    const newUser = {
        username: username,
        password: password,
        role: role
    };

    users.push(newUser);

    localStorage.setItem(
        "collegeUsers",
        JSON.stringify(users)
    );

    alert("User registered successfully!");
}
