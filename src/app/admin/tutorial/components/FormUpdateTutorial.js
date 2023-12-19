//({ id, title, name, description, thumbnail, htmlContent, closeModal, userId })
"use client";


import { useGetTutorialByIdQuery, useUpdateTutorialMutation } from "@/store/features/tutorials/tutorialApiSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { use, useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiFloppyDiskLight } from "react-icons/pi";
import Loading from "./Loading";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    file: Yup.mixed()
        .test("fileSize", "File bigger than 5mb", (value) => {
            if (!value) {
                return true;
            }
            return value.size <= FILE_SIZE;
        })
        .test("filsFormat", "Unsupported format", (value) => {
            if (!value) {
                return true;
            }
            return SUPPORTED_FORMATS.includes(value.type);
        }),
});

const FILE_SIZE = 1024 * 1024 * 5; // 5MB

const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
    "image/webp",
];

const UpdateForm = ({
    tutorialId,
    closeModal,
}) => {
    const { data, isLoading: processing, error } = useGetTutorialByIdQuery(tutorialId);

    const tutorialById = data;
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const [editorData, setEditorData] = useState(data?.content); //ckeditor data
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [tutorial, setTutorial] = useState({});
    const [imgName, setImgName] = useState(""); // for upload image to db
    const [preview, setPreview] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    /** ckeditor goes here  */
    const editorRef = useRef();
    const { CKEditor, DecoupledEditor } = editorRef.current || {};
    useEffect(() => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
            DecoupledEditor: require("@ckeditor/ckeditor5-build-decoupled-document"),
        };
        setEditorLoaded(true);
    }, []);

    useEffect(() => {
        if (tutorialById) {
            setTutorial(tutorialById);
            setEditorData(tutorialById?.content);
        }

    }, [tutorialById]);

    useEffect(() => {
        setPreview(tutorial?.thumbnail);
    }, []);

    const [updateTutorial, { isLoading: isSubmitting, isSuccess }] =
        useUpdateTutorialMutation();

    function stringToSlug(str) {
        return str
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");
    }



    const handleSubmit = async (values) => {

        setIsLoading(true);
        let raw = JSON.stringify({
            title: values.name,
            slug: stringToSlug(values.description),
            description: values.description,
            thumbnail: values.thumbnail || tutorialById.thumbnail, //refer to imgId
            content: editorData,
            published_by: data?.published_by?.id
        });

        try {
            const respone = await updateTutorial({ id: tutorialId, data: raw }).unwrap();
            setTimeout(() => {
                toast.success(respone.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }, 100);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setTimeout(() => {
                if (error.status === 400) {
                    // Bad Request error
                    const errorMessage = error?.data?.errors[0]?.message;
                    toast.error(errorMessage, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else if (error.status >= 500 && error.status <= 500) {
                    // Unauthorized error
                    toast.error("Internal server error please contact CHENTO !", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                    // Other errors
                    toast.error("Update has been failed.", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            }, 100);
        }
    };

    const handleEditorChange = (newData) => {
        setEditorData(newData);
    };

    const handleInputChange = (e) => {
        let data = { ...tutorial };
        data[e.target.name] = e.target.value;
        setTutorial(data);
    };

    const handleUploadImage = async (file) => {

        try {

            var formdata = new FormData();
            formdata.append("file", file.target.files[0]);

            var requestOptions = {
                method: "POST",
                body: formdata,
                redirect: "follow",
            };

            const response = await fetch(
                "https://photostad-api.istad.co/api/v1/files/upload/images/",
                requestOptions
            );

            const res = await response.json();
            const result = await res?.filename;

            setImgName(result);
            setPreview(result);

            setTimeout(() => {
                toast.success("File uploaded successfully: ", result, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }, 100);
            return result;
        } catch (error) {
            setTimeout(() => {
                if (error.status === 400) {
                    // Bad Request error
                    const errorMessage = error.data.errors[0].message;
                    toast.error(errorMessage, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else if (error.status >= 500 && error.status <= 500) {
                    // Unauthorized error
                    toast.error("Internal server error please contact CHENTO !", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                    // Other errors
                    toast.error("Failed to upload file", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            }, 100);
        }
    };


    return (
        <>
            {isLoading && <Loading />}
            <div className="bg-white dark:bg-secondary w-full h-[600px] overflow-y-scroll">
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        name: tutorial?.title,
                        description: tutorial?.description,
                        thumbnail: tutorial?.thumbnail,
                        content: tutorial?.content,
                        image: tutorial?.thumbnail,
                        file: undefined,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        handleSubmit(values);
                        setSubmitting(false);
                        resetForm();
                        closeModal();
                    }}
                >
                    {({ isSubmitting, setFieldValue, values }) => (
                        <Form>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                <div className="md:mb-5 mb-2 md:col-span-4 ">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Title
                                    </label>
                                    <Field
                                        type="text"
                                        name="name"
                                        value={values.name}
                                        // onChange={(e) => handleInputChange(e)}
                                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="John"
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="h1"
                                        className="text-red-500 text-xs    "
                                    />
                                </div>
                                {/* file for avarta */}
                                <div className="md:col-start-5 row-start-1 md:row-start-1 md:row-span-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Thumbnail
                                    </label>

                                    <Field
                                        className="file-input rounded-main  w-full bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        name="file"
                                        type="file"
                                        title="Select a file"
                                        setFieldValue={setFieldValue} // Set Formik value
                                        isSubmitting={isSubmitting}
                                        onChange={handleUploadImage}
                                    />
                                    {preview ? (
                                        <>
                                            <div className="w-full rounded-[16px] mt-5">
                                                <img
                                                    src={`https://photostad-api.istad.co/api/v1/files/${preview}`}
                                                    alt={values.image}
                                                    className="rounded-main"

                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="w-full rounded-[16px] mt-5">
                                            <img
                                                src={`https://photostad-api.istad.co/api/v1/files/${values.image}`}
                                                alt={values.image}
                                                className="rounded-main"

                                            />
                                        </div>
                                    )}

                                    <ErrorMessage
                                        name="file"
                                        component="h1"
                                        className="text-red-500 text-xs    "
                                    />
                                </div>
                                {/* email */}
                                <div className="md:mb-5 mb-2 md:col-span-4 ">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Description
                                    </label>
                                    <Field
                                        type="text"
                                        name="description"
                                        component="textarea"
                                        rows="4"
                                        value={values.description}
                                        onChange={(e) => handleInputChange(e)}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-main border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="description"
                                    />
                                    <ErrorMessage
                                        name="description"
                                        component="h1"
                                        className="text-red-500 text-xs    "
                                    />
                                </div>
                                {/* ckeditor  */}
                                <div className="md:col-span-4  ">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Content
                                    </label>
                                    {editorLoaded ? (
                                        <CKEditor
                                            data={editorData}
                                            editor={DecoupledEditor}
                                            config={{
                                                //config media embed
                                                mediaEmbed: {
                                                    previewsInData: true,
                                                },
                                                ckfinder: {

                                                    uploadUrl: "https://photostad-api.istad.co/api/v1/files/upload/images/", //Enter your upload url
                                                },
                                            }}
                                            //create upload adapter to send image to server in Ckeditor
                                            onReady={(editor) => {
                                                editor.ui
                                                    .getEditableElement()
                                                    .parentElement.insertBefore(
                                                        editor.ui.view.toolbar.element,
                                                        editor.ui.getEditableElement()
                                                    );
                                                editor.plugins.get("FileRepository").createUploadAdapter = (
                                                    loader
                                                ) => {
                                                    return new MyUploadAdapter(loader);
                                                };
                                                // console.log("Editor is ready to use!", editor);
                                            }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();

                                                // console.log({ event, editor, data });

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
                                    ) : (
                                        <div>Editor loading</div>
                                    )}
                                </div>
                            </div>

                            <div className="space-x-3">
                                <button
                                    disabled={isSubmitting}
                                    className="rounded-main px-5 btn   w-fit  bg-black text-white "
                                >
                                    {/* {isSubmitting ? "Posting..." : "Post Now"}
                 */}
                                    <PiFloppyDiskLight className="inline text-xl text-white font-black mr-1.5" />{" "}
                                    Save
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};
function CustomInput({
    handleFileUpload,
    image,
    field,
    form,
    isSubmitting,
    ...props
}) {
    useEffect(() => {
        if (isSubmitting) {
            setPreview(null);
        }
    }, [isSubmitting]);

    return (
        <div>
            <input
                type="file"
                onChange={(event) => {
                    handleFileUpload(event);
                }}
                {...props}
            />
            {preview ? (
                <div className="w-full  rounded-[16px] mt-5">
                    <img
                        src={`https://photostad-api.istad.co/files/${preview}`}
                        alt="dummy"

                    />
                </div>
            ) : (
                <>
                    <div className="w-full  rounded-[16px] mt-5">
                        <img
                            src={`https://photostad-api.istad.co/files/${image}`}
                            alt="dummy"

                        />
                    </div>
                </>
            )}
        </div>
    );
}

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

                    fetch("https://photostad-api.istad.co/api/v1/files", {
                        method: "POST",
                        body: formData,
                    })
                        .then((response) => {
                            if (response.ok) {
                                response.json().then((data) => {
                                    // console.log(data, "data upload image");
                                    const url = data?.data?.url;
                                    // const cleanUrl = url.replace(/\\/g,'')
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

export default UpdateForm;
