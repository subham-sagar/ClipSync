import React from 'react';
import axios from 'axios';
import Delete from '../Icons/Delete';
import Doc from '../Icons/Doc';
import DocMd from '../Icons/DocMd';
import TwitterIcon from '../Icons/TwitterIcon';
import YoutubeIcon from '../Icons/YoutubeIcon';
import { BACKEND_URL } from '../../BACKEND_URL';

function Card(props) {
    const extractVideoId = (url) => {
        try {
            const u = new URL(url);
            if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
            return u.searchParams.get("v");
        } catch {
            return null;
        }
    };

    const category = props.category;
    const videoId = extractVideoId(props.link);

    async function deleteContent() {
        axios.delete(`${BACKEND_URL}/content/${props.id}`, {
            headers: {
                "Authorization": localStorage.getItem("accessToken")
            }
        });
        if (props.onDelete) props.onDelete();
    }

    return (
        <div className="flex h-auto w-full flex-col rounded-md border border-slate-100 bg-white p-4 shadow-sm">

            {/* HEADER */}
            <div className="mb-3 flex items-start justify-between text-md">
                <div className="flex min-w-0 flex-1 items-start">
                    <div className="mr-3 flex-shrink-0 text-gray-500">
                        {category === "tweet" && <TwitterIcon size="xs" />}
                        {category === "youtube" && <YoutubeIcon size="xs" />}
                        {category === "text" && <Doc size="xs" />}
                        {category === "md" && <DocMd size="xs" />}
                    </div>

                    <h2 className="break-words text-sm font-bold leading-tight text-neutral-800 md:text-base">
                        {props.title}
                    </h2>
                </div>

                {/* DELETE ONLY */}
                <div className="ml-2 flex flex-shrink-0 items-center gap-2 text-gray-500">
                    <div className="cursor-pointer" onClick={deleteContent}>
                        <Delete size="xs" />
                    </div>
                </div>
            </div>

            {/* BODY */}
            <div className="flex-1">

                {/* YOUTUBE FIX */}
                {category === "youtube" && videoId && (
                    <div className="pt-4">
                        <iframe
                            className="w-full h-64 rounded-md"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={props.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}

                {/* TWEET */}
                {category === "tweet" && (
                    <div className="w-full max-w-full overflow-x-auto">
                        <blockquote className="twitter-tweet w-full">
                            <a href={props.link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                    </div>
                )}

                {/* TEXT CONTENT */}
                {props.content && (
                    <p className="mt-4 break-words text-sm leading-relaxed text-gray-700 md:text-base">
                        {props.content}
                    </p>
                )}
            </div>

        </div>
    );
}

Card.defaultProps = {
    category: "",
    title: "",
    link: "",
    content: "",
    id: "",
    onDelete: () => {}
};

export default Card;
