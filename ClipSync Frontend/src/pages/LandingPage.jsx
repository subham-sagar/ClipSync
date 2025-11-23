import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300">
            <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center">
                <h1 className="text-4xl font-bold text-purple-700 mb-4">Welcome to ClipSync</h1>
                <p className="text-gray-600 mb-8 text-center max-w-md">
                    Your personal knowledge hub. Save, organize, and share your favorite links, notes, and more!
                </p>
                <div className="flex gap-4">
                    <Link to="/signin">
                        <button className="bg-purple-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-purple-600 transition">
                            Sign In
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button className="bg-white border border-purple-500 text-purple-600 px-6 py-2 rounded-md font-semibold hover:bg-purple-100 transition">
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
            <footer className="mt-8 text-gray-400 text-sm">© 2024 SecondBrain</footer>
        </div>
    );
}

export default LandingPage;