import React, { useState } from 'react';
import '../App.css';
import Button from '../Components/Button/Button';
import Plus from '../Components/Icons/PlusIcon';
import Card from '../Components/Card/Card';
import CreateContentModal from '../Components/CreateContentModal/CreateContentModal';
import Sidebar from '../Components/Sidebar/Sidebar';
import Share from '../Components/Icons/ShareIcon';
import useContent from '../hooks/useContent';
import ShareIcon from "../Components/Icons/ShareIcon"; 


function Dashboard() {
    const [modalOpen, setModalOpen] = useState(false);
    const { contents, refetch } = useContent();



async function shareDashboard() {
    const userId = localStorage.getItem("userId"); // we must save userId on signin

    const shareUrl = `${window.location.origin}/public-dashboard/${userId}`;

    if (navigator.share) {
        await navigator.share({
            title: "My ClipSync Public Dashboard",
            text: "Check out my saved content!",
            url: shareUrl
        });
    } else {
        await navigator.clipboard.writeText(shareUrl);
        alert("Public dashboard link copied!");
    }
}



    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 transition-all duration-300 md:ml-16 lg:ml-64 xl:ml-72">
                {/* Modal */}
                <CreateContentModal
                    open={modalOpen}
                    onClose={() => {
                        setModalOpen(false);
                    }}
                    onSuccess={refetch}
                />

                {/* Content Container */}
                <div className="p-4 pt-20 md:p-6 md:pt-6">
                    {/* Header Section with Buttons */}
                    <div className="mb-8">
                        <h1 className="mb-6 border border-slate-200 text-3xl font-bold text-gray-900">
                            Dashboard
                        </h1>

                        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:justify-end">
                            <Button
                                variant="primary"
                                size="sm"
                                text="Add Content"
                                startIcon={<Plus size="sm" />}
                                onClick={() => {
                                    setModalOpen(true);
                                }}
                            />
                            <Button
    variant="secondary"
    size="md"
    text="Share"
    startIcon={<Share size="md" />}
    onClick={shareDashboard}
/>

                        </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                        {contents.map((content) => (
                            <Card
                                key={content._id}
                                id={content._id}
                                title={content.title}
                                link={content?.link}
                                content={content?.content}
                                category={content?.category}
                                onDelete={refetch}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;