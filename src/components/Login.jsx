import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../firebase';
import { useNavigate } from "react-router-dom";
import './Login.css'; // Import your CSS file

const Auth = () => {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                username,
                email,
            });
            alert("User Created Successfully!");
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Login successful!");
            navigate('/');

        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return (
        <div className="auth-container">
            <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
            <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
                {isSignUp && (
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {isSignUp && (
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                )}
                <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
            </form>
            <button onClick={() => setIsSignUp(!isSignUp)}>
                Switch to {isSignUp ? "Sign In" : "Sign Up"}
            </button>
        </div>
    );
};

export default Auth;
