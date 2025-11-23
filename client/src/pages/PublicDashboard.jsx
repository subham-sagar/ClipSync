import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../BACKEND_URL";
import Card from "../Components/Card/Card";

export default function PublicDashboard() {
    const { userId } = useParams();
    const [contents, setContents] = useState([]);

    useEffect(() => {
        async function load() {
            try {
                const res = await axios.get(`${BACKEND_URL}/content/public/dashboard/${userId}`);
                setContents(res.data.data);
            } catch (err) {
                console.log("Error loading public dashboard:", err);
            }
        }
        load();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Public Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {contents.map((content) => (
                    <Card
                        key={content._id}
                        id={content._id}
                        title={content.title}
                        link={content.link}
                        content={content.content}
                        category={content.category}
                    />
                ))}
            </div>
        </div>
    );
}
