let isLoginMode = true;
const form = document.getElementById("auth-form");
const formTitle = document.getElementById("form-title");
const nameGroup = document.getElementById("name-group");
const submitBtn = document.getElementById("submit-btn");
const toggleAuth = document.getElementById("toggle-auth");
const toggleText = document.getElementById("toggle-text");

// --- 1. PASSWORD VISIBILITY TOGGLE ---
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("toggle-password");

if (togglePassword) {
  togglePassword.addEventListener("click", function() {
    console.log("Eye clicked!"); // Debugging line
    
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      togglePassword.innerText = "🙈"; 
    } else {
      passwordInput.type = "password";
      togglePassword.innerText = "👁️"; 
    }
  });
}

// --- 2. TOGGLE LOGIN/REGISTER ---
toggleAuth.addEventListener("click", (e) => {
  e.preventDefault();
  isLoginMode = !isLoginMode;
  
  if (isLoginMode) {
    formTitle.innerText = "Login";
    nameGroup.style.display = "none";
    submitBtn.innerText = "Login";
    toggleText.innerText = "Don't have an account?";
    toggleAuth.innerText = "Register";
  } else {
    formTitle.innerText = "Register";
    nameGroup.style.display = "block";
    submitBtn.innerText = "Register";
    toggleText.innerText = "Already have an account?";
    toggleAuth.innerText = "Login";
  }
});

// --- 3. FORM SUBMISSION ---
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const email = document.getElementById("email").value;
  const password = passwordInput.value; // Using our variable
  
  if (isLoginMode) {
    // LOGIN
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    
    if (res.ok) {
      alert("Welcome back, " + data.name + "!");
      window.location.href = "/marketplace.html";
    } else {
      alert(data.error);
    }
  } else {
    // REGISTER
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    const name = document.getElementById("name").value;
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    
    if (res.ok) {
      alert("Registration successful! Please login.");
      toggleAuth.click(); // Switch back to login mode
    } else {
      const data = await res.json();
      alert(data.error);
    }
  }
});