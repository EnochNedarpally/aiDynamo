
import axios from "axios";
import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import { toast, ToastContainer } from "react-toastify";
import { api } from "../../config";

export default ({ content, setContent, name }) => {
    const token = JSON.parse(sessionStorage.getItem("authUser")) ? JSON.parse(sessionStorage.getItem("authUser")).token : null;
    const modules = {
        toolbar: [
            [{ header: [] }],
            ["bold", "italic", "underline", "strike"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["image", "link"]
        ],
    };
    const { quill, quillRef } = useQuill({ modules });

    const insertToEditor = (url) => {
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'image', url);
    };

    const saveToServer = async (file) => {
        const formData = new FormData();
        formData.append('previewImage', file);
        try {
            const data = await axios.post(
                `${api.API_URL}/api/newsletter/upload-preview`,

                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            insertToEditor(data?.data?.path);

        } catch (error) {
            toast.error("Encountered an error while uploading image.")
        }

    };

    const selectLocalImage = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = () => {
            const file = input.files[0];
            saveToServer(file);
        };
    };

    useEffect(() => {
        if (quill) {
            if (content) {
                try {
                    quill.clipboard.dangerouslyPasteHTML(content);
                } catch (error) {
                    return
                }
            }
            quill.getModule('toolbar').addHandler('image', selectLocalImage);
        }

    }, [quill]);

    return (
        <div style={{ width: '100%', height: 320, border: '1px solid lightgray', border: "none", marginBottom: 10 }}>
            <ToastContainer />
            <div ref={quillRef} onBlur={() => setContent(prev => { return { ...prev, [name]: quill?.root?.innerHTML } })} />
        </div>
    );
};