import React, { useState } from 'react';
import TwitterIcon from '../Icons/TwitterIcon';
import YoutubeIcon from '../Icons/YoutubeIcon';
import Logo from '../Icons/Logo';
import Links from '../Icons/Links';
import Doc from '../Icons/Doc';

function SidebarItem({ text, icon, isActive = false }) {
    return (
        <div
            className={`group flex cursor-pointer items-center rounded-lg p-3 transition-all duration-200 ${isActive
                    ? 'border-r-2 border-purple-600 bg-purple-100 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
        >
            <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center">{icon}</div>
            <span className="ml-3 font-medium transition-opacity duration-200 md:hidden md:group-hover:block lg:block">
                {text}
            </span>
        </div>
    );
}

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile menu button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed left-4 top-4 z-50 rounded-md bg-white p-2 shadow-md md:hidden"
            >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 ease-in-out
                    ${isOpen ? 'w-64' : 'w-0 md:w-16'} 
                    md:w-16 md:hover:w-60 lg:w-64 xl:w-72
                    overflow-hidden
                `}
            >
                {/* Logo Section */}
                <div className="flex items-center border-b border-gray-100 px-6 py-8 pt-16 md:pt-8">
                    <div className="flex-shrink-0 text-purple-600">
                        <Logo size="md" />
                    </div>
                    <span
                        className={`ml-3 text-2xl font-semibold text-gray-900 transition-opacity duration-200
                            ${isOpen ? 'block' : 'hidden'} 
                            md:hidden md:group-hover:block lg:block
                        `}
                    >
                        ClipSync
                    </span>
                </div>

                {/* Navigation Section */}
                <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
                    <SidebarItem text="Twitter" icon={<TwitterIcon size="sm" />} />
                    <SidebarItem text="Youtube" icon={<YoutubeIcon size="sm" />} />
                    <SidebarItem text="Documents" icon={<Doc size="sm" />} />
                    <SidebarItem text="Links" icon={<Links size="sm" />} />
                </nav>

                {/* Footer Section */}
                <div className="border-t border-gray-100 px-4 py-4">
                    <div
                        className={`text-xs text-gray-500 transition-opacity duration-200
                            ${isOpen ? 'block' : 'hidden'} 
                            md:hidden md:group-hover:block lg:block
                        `}
                    >
                        © 2024 Brainly
                    </div>
                </div>
            </div>
        </>
    );
}

SidebarItem.defaultProps = {
    text: '',
    icon: null,
    isActive: false
};

export default Sidebar;