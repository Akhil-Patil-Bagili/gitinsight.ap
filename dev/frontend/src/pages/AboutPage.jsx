import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonDark } from '../components/ButtonDark';
import { LandingBar } from '../components/LandingBar';

export const AboutPage = () => {
    const navigate = useNavigate();

    const handleStartSolving = () => {
        navigate('/signup')
    }

    return (
        <div>
            <LandingBar />
            <div className="mx-auto max-w-6xl p-8">
                <section className="text-gray-700 body-font">
                    <div className="container px-5 py-24 mx-auto flex flex-wrap">
                        <div className="flex flex-col text-center w-full mb-20">
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">About GitInsight</h1>
                            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                                GitInsight offers unparalleled insights into Git repositories, simplifying querying Git commits and understanding project trends for developers, project managers, and non-technical users.
                            </p>
                        </div>
                        <div className="flex flex-wrap md">
                            <div className="md:p-2 p-1 w-full">
                                <div className="bg-gray-100 p-6 rounded-lg">
                                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Purpose</h2>
                                    <p className="leading-relaxed text-base">
                                        Developed to provide users with an easy-to-use platform to enhance their workflow, GitInsight leverages OpenAI's GPT-4 and advanced data indexing to deliver real-time insights and analysis.
                                    </p>
                                </div>
                            </div>
                            <div className="md:p-2 p-1 w-full">
                                <div className="bg-gray-100 p-6 rounded-lg">
                                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Team</h2>
                                    <p className="leading-relaxed text-base">
                                        The project is led by Ankith Indrakumar, Akhil Patil Bagili, and Shanmukha Sri Harsha Anvilla, combining expertise in backend development, AI modeling, and user interface design to create a seamless user experience.
                                    </p>
                                </div>
                            </div>
                            <div className="md:p-2 p-1 w-full">
                                <div className="bg-gray-100 p-6 rounded-lg">
                                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Getting Started</h2>
                                    <p className="leading-relaxed text-base">
                                        To start using GitInsight, sign up to create an account, configure your settings, and begin exploring the capabilities of the platform. Dive into your Git repository analysis today and see the difference!
                                    </p>
                                </div>
                            </div>
                            <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                                <ButtonDark onClick={handleStartSolving} label="Get Started" />
                                <p className="text-gray-500 text-sm mt-3">
                                    Ready to enhance your workflow and gain insights into your projects? Sign up now and start exploring the features of GitInsight!
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
