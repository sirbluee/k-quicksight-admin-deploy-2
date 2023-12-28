"use client";

import axios from "axios";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  useField,
  useFormikContext,
} from "formik";
import { Input } from "@nextui-org/react";

import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useCreateTutorialMutation } from "@/store/features/tutorials/tutorialApiSlice";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { PiFloppyDiskLight } from "react-icons/pi";
import { useUploadSingleMutation } from "@/store/features/uploadFile/uploadImage";

const validationSchema = Yup.object({
  name: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  file: Yup.mixed()
    .test("fileSize", " File bigger than 5mb", (value) => {
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
    })
    .required("Thumnail is required"),
});

const FILE_SIZE = 1024 * 1024 * 5; // 5MB
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/png",
  "image/webp",
];

const FormAddNew = ({ closeModal, userId }) => {

  const [createTutorial, { isLoading: submitting }] =
    useCreateTutorialMutation();

  const [loading, setLoading] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [editorData, setEditorData] = useState(); //ckeditor data
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [tutorial, setTutorial] = useState({});
  const [filename, setFileName] = useState(null);
  // console.log(user, "current user");
  const editorRef = useRef();
  const { CKEditor, DecoupledEditor } = editorRef.current || {};

  const handleEditorChange = (data) => {
    setEditorData(data);
  };

  const [uploadImage] = useUploadSingleMutation()
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

  class MyUploadAdapter {
    constructor(loader) {
      this.loader = loader;
    }

    upload() {
      return this.loader.file.then(
        (file) =>
          new Promise((resolve, reject) => {

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
                    console.log(data?.url)
                    const url = data?.url;

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

  const uploadImageHandler = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/files/upload/images/`, values.file);
      // console.log(response.data, "respone when upload image");

      return (
        response.data?.data?.name ||
        "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
      );
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleSubmit = async (values) => {
    // create tutorial
    console.log("value ", values)
    const thumbnail = await uploadImage({ data: values.file });
    var raw = JSON.stringify({
      "title": values.name,
      "content": editorData,
      "thumbnail": thumbnail.data.filename,
      "description": values.description,
      "published_by": 26
    });
    try {
      console.log(raw)
      await createTutorial({ data: raw }).unwrap();
      console.log("respone : ", res)
      setEditorData("");
    } catch (error) {
      console.log(error, "error");
      setLoading(false);
    }
  };

  useEffect(() => {
    setEditorLoaded(true);
  }, []);


  return (
    <>
      {loading && <Loading />}
      <div className="bg-white dark:bg-secondary w-full mx-auto">
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: tutorial?.name,
            description: tutorial?.description,
            thumbnail: tutorial?.thumbnail,
            createdBy: userId || 32,
            htmlContent: tutorial?.htmlContent,
            file: undefined,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setLoading(true);
            const formData = new FormData();
            formData.append("file", values.file);
            console.log("values.file", values.file)
            handleSubmit(values);
            // alert(JSON.stringify(values, null, 2))
            closeModal();
            setSubmitting(false);
            resetForm();
            setLoading(false);
          }}
        >
          {({ setFieldValue, values }) => (
            <>
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
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-main focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="eg. How to Use the JavaScript Fullscreen API"
                    />
                    <ErrorMessage
                      name="name"
                      component="h1"
                      className="text-red-500 text-xs   "
                    />
                  </div>

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
                      className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-main border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="eg. The Fullscreen API is a browser web API that allows you to enable fullscreen mode for HTML elements. It saves you the stress of using CSS and JavaScript to implement fullscreen functionality."
                    />
                    <ErrorMessage
                      name="description"
                      component="h1"
                      className="text-red-500 text-xs   "
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
                            // Upload the images to the server using the CKFinder QuickUpload command
                            // You have to change this address to your server that has the ckfinder php connector
                            uploadUrl:
                              "https://photostad-api.istad.co/api/v1/files/upload/images/", //Enter your upload url
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
                          if (willEditorRestart) {
                            this.editor.ui.view.toolbar.element.remove();
                          }
                        }}
                      />
                    ) : (
                      <div>Editor loading</div>
                    )}
                  </div>


                  <div className="md:col-start-5 row-start-3 md:row-start-1 md:row-span-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Thumbnail
                    </label>
                    <Field
                      className="file-input rounded-main w-full bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      name="file"
                      type="file"
                      title="Select a file"
                      setFieldValue={setFieldValue} // Set Formik value
                      component={CustomInput} // component prop used to render the custom input
                    />
                    <ErrorMessage
                      name="file"
                      component="h1"
                      className="text-red-500 text-xs   "
                    />
                  </div>
                </div>
                <div className="space-x-3">
                  <button
                    type="submit"
                    // disabled={isSubmitting}
                    className="px-5 btn p-3 rounded-sm w-fit  bg-black text-white "
                  >
                    {/* {isSubmitting ? "Posting..." : "Post Now"}
                       */}
                    <PiFloppyDiskLight className="inline text-xl text-white font-black mr-1.5 " />{" "}
                    Save
                  </button>

                </div>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </>
  );
};

function CustomInput({ field, form, isSubmitting, ...props }) {
  const [preview, setPreview] = useState(null);
  // for reset imageds
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
          form.setFieldValue(field.name, event.currentTarget.files[0]);
          setPreview(URL.createObjectURL(event.currentTarget.files[0]));
        }}
        // {...props} is use to pass all props from Formik Field componen
        {...props}
      />
      {preview ? (
        <div className="w-full  rounded-[16px] mt-5">
          <Image
            src={preview}
            alt="dummy"
            width="100"
            height="100"
            className="w-full"
          />
        </div>
      ) : (
        <div className="w-full rounded-[16px] mt-5">
          <img
            className="rounded-main"
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png"
            }
            alt="dummy"
          />
        </div>
      )}
    </div>
  );
}



export default FormAddNew;
