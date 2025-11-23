import React, { useRef } from 'react';
import CrossIcon from '../Icons/CrossIcon';
import Button from '../Button/Button';
import axios from 'axios';
import { BACKEND_URL } from '../../BACKEND_URL';

function CreateContentModal({ open, onClose, onSuccess }) {
    const titleRef = useRef(null);
    const linkRef = useRef(null);
    const contentRef = useRef(null);
    const categoryRef = useRef(null);

    async function handleCreateContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const content = contentRef.current?.value;
    const category = categoryRef.current?.value;

    if (!title || !category) {
        alert("Please enter title and select category");
        return;
    }

await axios.post(
    `${BACKEND_URL}/content`,
    {
        category,
        title,
        link,
        content
    },
    {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
    }
);



    if (onSuccess) onSuccess();

    // CLEAR THE INPUT FIELDS 🔥
    titleRef.current.value = "";
    linkRef.current.value = "";
    contentRef.current.value = "";
    categoryRef.current.value = "";

    onClose();
}


    return (
        <div>
            {open && (
                <div className="w-screen h-screen bg-slate-600 fixed top-0 left-0 opacity-92 flex justify-center items-center">
                    <div className="p-4 rounded-md bg-white opacity-100 size-fit">
                        <div className="flex justify-between" onClick={onClose}>
                            Content
                            <CrossIcon size="xs" />
                        </div>

                        <div className="pt-4">
                            <InputForm placeholder="Title" reference={titleRef} />
                            <InputForm placeholder="link" reference={linkRef} />
                            <InputForm placeholder="content" reference={contentRef} />
                            <div className="m-2">
                                <select 
                                    className="px-4 py-2 border rounded-md w-full"
                                    defaultValue=""
                                    ref={categoryRef}
                                >
                                    <option value="" disabled>Select content type</option>
                                    <option value="youtube">YouTube</option>
                                    <option value="tweet">Tweet</option>
                                    <option value="md">Markdown</option>
                                    <option value="text">Text</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end p-2">
                            <Button variant="primary" size="md" text="Save" onClick={handleCreateContent} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function InputForm({ reference, placeholder }) {
    return (
        <div>
            <input
                placeholder={placeholder}
                type="text"
                className="px-4 py-2 m-2 border rounded-md min-w-xs"
                ref={reference}
            />
        </div>
    );
}

CreateContentModal.defaultProps = {
    open: false,
    onClose: () => {},
    onSuccess: () => {}
};

export default CreateContentModal;
export { InputForm };