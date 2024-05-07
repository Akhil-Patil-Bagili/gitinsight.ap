import React from 'react';
import { LandingBar } from '../components/LandingBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export const ContactPage = () => {
    const teamMembers = [
        {
            name: "Ankith Indrakumar",
            email: "ankith.indrakumar@sjsu.edu",
            github: "https://github.com/ankith-i/CS-161-Sec-01-Ankith-Indrakumar.git",
            linkedin: "https://www.linkedin.com/in/ankithi"
        },
        {
            name: "Akhil Patil Bagili",
            email: "akhilpatil.bagili@sjsu.edu",
            github: "https://github.com/Akhil-Patil-Bagili",
            linkedin: "https://www.linkedin.com/in/akhil-patil-bagili/"
        },
        {
            name: "Shanmukha Sri Harsha Anvilla",
            email: "shanmukhasriharsha.anivilla@sjsu.edu",
            github: "https://github.com/shanmukha-harsha",
            linkedin: "https://www.linkedin.com/in/shanmukha-sri-harsha"
        }
    ];

    return (
        <div>
            <LandingBar />
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900">Contact Our Team</h1>
                    <p className="text-md text-gray-600">Connect with us for collaboration or inquiries.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-6">
                    {teamMembers.map(member => (
                        <div key={member.name} className="bg-white shadow-lg rounded-lg p-6 w-96">
                            <h3 className="text-2xl text-gray-900 font-semibold">{member.name}</h3>
                            <p className="text-gray-500">Email: <a href={`mailto:${member.email}`} className="text-blue-500">{member.email}</a></p>
                            <div className="flex justify-center mt-4">
                                <a href={member.github} className="text-gray-700 mx-4" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faGithub} size="2x" />
                                </a>
                                <a href={member.linkedin} className="text-gray-700 mx-4" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faLinkedin} size="2x" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
