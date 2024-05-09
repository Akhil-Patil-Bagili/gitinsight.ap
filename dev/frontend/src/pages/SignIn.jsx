import { BottomWarning } from "../components/BottomWarning"
import { LongButton } from "../components/LongButton"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { LandingBar } from "../components/LandingBar"


export const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleSubmit = () => {
        if (!username || !password) {
            alert('All fields are required.');
            return;
          }
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user)); // Optionally save the current user to local storage
            alert('Login successful');
            navigate("/dashboard");
        } else {
            alert('Invalid credentials');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };


    return (
        <div>
            <LandingBar />
            <div className="bg-slate-200 h-screen flex justify-center" onKeyDown={handleKeyPress}>
                <div className="flex flex-col justify-center">
                    <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                        <Heading label="Sign in" />
                        <SubHeading label="Enter your credentials to access your account" />
                        <InputBox onChange={(e) => setUsername(e.target.value)} placeholder="johndoe@gmail.com" label="Email" />
                        <InputBox type="password" onChange={(e) => setPassword(e.target.value)} placeholder="john@12345" label="Password"/>
                        <div className="pt-4">
                            <LongButton onClick={handleSubmit} label="Sign in" />
                        </div>
                        <BottomWarning label="Don't have an account?" buttonText="Sign up" to="/signup" />
                    </div>
                </div>
            </div>
        </div>
    );
};
