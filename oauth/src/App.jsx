import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import googleButton from './assets/google_signin_buttons/web/1x/btn_google_signin_dark_pressed_web.png';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './Home';

async function auth(set, navigate) {
  try {
    // Send request to initiate Google Auth
    const response = await fetch('http://127.0.0.1:3000/request', { method: 'post' });
    const data = await response.json();

    if (data && data.url) {
      // Redirect user to Google Auth URL
      window.open(data.url, '_blank');

      // Simulate a callback after authentication completion (or use actual callback URL from your server)
      setTimeout(async () => {
        // After Google authentication completes, fetch user data
        const userResponse = await fetch('http://127.0.0.1:3000/user'); // Endpoint to get authenticated user details
        const userData = await userResponse.json();
        
        if (userData && userData.email) {
          setUserEmail(userData.email); 

          // Navigate to the home page after successful login
          
          alert(`You have logged in successfully with ${userData.email}`); 
        } else {
          alert("Failed to retrieve user information.");
        }
      }, 1000); // Adjust this delay as needed
    } else {
      console.error("Authentication failed.");
    }
  } catch (error) {
    console.error("An error occurred during authentication:", error);
  }
}

function LoginSignup({ isLogin }) {
  const [userEmail, setUserEmail] = useState(null); // Store the user's email
  const navigate = useNavigate(); // Initialize useNavigate for redirection
 const handleSubmit =(e)=>{
 e.preventDefault()
 auth( navigate('/home'), setUserEmail)
 }
  return (
    <>
      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
          <h2 className="text-center mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
          <form>
            {!isLogin && (
              <div className="form-group mb-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="form-control"
                />
              </div>
            )}
            <div className="form-group mb-3">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              {isLogin ? "Login" : "Sign Up"}
            </button>
            <div className="text-center text-muted mb-3">or</div>
            <button
              className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center"
              type="button"
              onClick={handleSubmit} // Pass navigate to auth function
            >
              <img
                src={googleButton}
                alt="Google sign in"
                style={{ height: "20px", marginRight: "10px" }}
              />
              Sign in with Google
            </button>
          </form>
          <p className="text-center mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <a href={isLogin ? "/signup" : "/login"} className="text-primary">
              {isLogin ? "Sign Up" : "Login"}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup isLogin={true} />} />
        <Route path="/signup" element={<LoginSignup isLogin={false} />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
