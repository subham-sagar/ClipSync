import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../BACKEND_URL';

function useContent() {
    const [contents, setContents] = useState([]);

    const fetchContent = async () => {
        try {
            const token = localStorage.getItem("accessToken");

            // No token → redirect to signin
            if (!token) {
                window.location.href = "/signin";
                return;
            }

            const response = await axios.get(`${BACKEND_URL}/content`, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });

            setContents(response.data.data.contents);

        } catch (error) {
            console.log("Error:", error);

            if (error.response && error.response.status === 401) {
                // Token invalid → logout and redirect
                localStorage.removeItem("accessToken");
                window.location.href = "/signin";
            }
        }
    };

    useEffect(() => {
        fetchContent();
    }, []);

    return { contents, refetch: fetchContent };
}

export default useContent;
