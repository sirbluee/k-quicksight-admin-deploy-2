"use client"
import React, { useCallback, useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

export function CkEditorComponent() {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    class MyUploadAdapter {
        constructor(loader) {
            this.loader = loader;
        }

        upload() {
            return this.loader.file.then(
                (file) =>
                    new Promise((resolve, reject) => {
                        // Your upload logic here
                        // Example using fetch:
                        const formData = new FormData();
                        formData.append("file", file);

                        fetch("https://photostad-api.istad.co/api/v1/files/upload/images/", {
                            method: "POST",
                            body: formData,
                        })
                            .then((response) => {
                                if (response.ok) {
                                    response.json().then((data) => {
                                        // console.log(data, "data upload image");
                                        const url = data?.data?.url;
                                        resolve({ default: url });
                                    });
                                } else {
                                    reject(response.statusText);
                                }
                                // console.log(response, "response upload image");
                            })
                            .catch((error) => {
                                reject(error);
                                console.log(error, "error upload image");
                            });
                    })
            );
        }

        abort() {
            // Abort upload logic here
        }
    }

    const [editorData, setEditorData] = useState(); //ckeditor data
    const [editorLoaded, setEditorLoaded] = useState(false);
    const editorRef = useRef();
    // const { CKEditor, DecoupledEditor } = editorRef.current || {};

    const handleEditorChange = (data) => {
        setEditorData(data);
    };

    // console.log(editorData, "editor data use state");
    useEffect(() => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
            DecoupledEditor: require("@ckeditor/ckeditor5-build-decoupled-document"),
        };
        setEditorLoaded(true);
        // setEditorData("Enter your content");
    }, []);

    const shoulComponentUpdate = useCallback(() => {
        return false;
    }, []);





    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    return (
        <div>

            <CKEditor
                data={editorData}
                editor={DecoupledEditor}
                config={{
                    //config media embed
                    mediaEmbed: {
                        previewsInData: true,
                    },


                    ckfinder: {
                        // Upload the images to the server using the CKFinder QuickUpload command
                        // You have to change this address to your server that has the ckfinder php connector
                        uploadUrl:
                            " https://photostad-api.istad.co/api/v1/files", //Enter your upload url
                    },
                    placeholder: "Write your tutorial content here!",
                    // Automatic Editor Height Adjustment to Content
                    autoGrow_onStartup: true,
                    autoGrow_minHeight: 200,
                    autoGrow_maxHeight: 600,
                }}
                //create upload adapter to send image to server in Ckeditor
                onReady={(editor) => {
                    const editableElement = editor.ui.getEditableElement();
                    if (editableElement) {
                        editableElement.parentElement.insertBefore(
                            editor.ui.view.toolbar.element,
                            editableElement
                        );

                        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
                            return new MyUploadAdapter(loader);
                        };
                    }
                }}
                shoulComponentUpdate={shoulComponentUpdate}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    // console.log({ event, editor, data }, "editor data");
                    setEditorData(data.replace(/"/g, "'"));
                    handleEditorChange(data);
                }}
                onError={(error, { willEditorRestart }) => {
                    // If the editor is restarted, the toolbar element will be created once again.
                    // The onReady callback will be called again and the new toolbar will be added.
                    // This is why you need to remove the older toolbar.
                    if (willEditorRestart) {
                        this.editor.ui.view.toolbar.element.remove();
                    }
                }}
            />

        </div>
    )

}
