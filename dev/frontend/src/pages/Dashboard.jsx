import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Appbar } from "../components/Appbar";
import { LongButton } from "../components/LongButton";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { ClipLoader } from 'react-spinners';  // Importing a specific spinner


export const Dashboard = () => {
    const [username, setUsername] = useState("");
    const [reponame, setReponame] = useState("");
    const [loading, setLoading] = useState(false);  // State to handle loading
    const navigate = useNavigate();


    const handleSubmit = async () => {
        setLoading(true);  // Start loading before the API call
        try {
            const response = await fetch("https://34.229.180.222/fetch_commits", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    repo_name: reponame,
                    openai_key: import.meta.env.VITE_OPEN_AI_KEY
                })
            });
        
            if (response.ok) {
                navigate("/chatbot");
            } else {
                const errorData = await response.json();
                alert("Failed to fetch commits: " + response.status + " - " + errorData.message);
            }
        } catch (error) {
            if (error instanceof TypeError) {
                alert("No response from server.");
            } else {
                alert("Error: " + error.message);
            }
        } finally {
            setLoading(false);  // Stop loading after the API call is completed
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };


    return (
        <div>
            <Appbar />
            <div className="bg-slate-200 h-screen flex justify-center" onKeyDown={handleKeyPress}>
                <div className="flex flex-col justify-center">
                    <div className="rounded-lg bg-white w-90 text-center p-2 h-max px-4">
                        <Heading label="Let's Get Insight" />
                        <SubHeading label="Enter github information" />
                        <InputBox onChange={(e) => setUsername(e.target.value)} placeholder="john_doe" label="Github Username" />
                        <InputBox onChange={(e) => setReponame(e.target.value)} placeholder="facebook" label="Github Repo Name" />
                        <div className="pt-4 pb-4">
                            <LongButton onClick={handleSubmit} label="Proceed" disabled={loading} />
                        </div>
                        {loading && <ClipLoader color="#4A90E2" />}
                    </div>
                </div>
            </div>
        </div>
    );
};
