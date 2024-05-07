import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonDark } from './ButtonDark';


export const Appbar = () => {
    const navigate = useNavigate();
   
    // Assuming you want to retrieve the firstName of the first user in the array
    const getUsers = () => {
        const usersJson = localStorage.getItem('users');
        return usersJson ? JSON.parse(usersJson) : [];
    };


    const users = getUsers();
    const userFirstName = users.length > 0 ? users[0].firstName : 'Guest';


    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/signin");
    };
    return (
        <div className="shadow h-14 flex justify-between items-center px-4">
            <a href="/dashboard" className="text-3xl font-bold font-poppins">
                GitInsight
            </a>
            <div className="flex items-center">
                <div className="mr-4 text-gray-700">
                    Hello, {userFirstName}
                </div>
                <ButtonDark onClick={handleLogout} label="Logout" />
            </div>
        </div>
    );
};
