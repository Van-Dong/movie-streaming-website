import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import Loader from "./Notifications/Loader";

const Uploader = ({ setValue, note, nameField }) => {
  const [name, setName] = useState("");

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      multiple: false,
      maxFiles: 1, // số lượng file có thể chấp nhận
      onDrop: (acceptedFiles) => {
        setName(acceptedFiles[0].name);
        setValue(nameField, acceptedFiles[0]);
        // console.log(acceptedFiles[0]);
      },
    });
  return (
    <div className="w-full text-center">
      <div
        {...getRootProps()}
        className="bg-main p-6 flex-colo border-2 border-dashed border-border rounded-md text-subMain cursor-pointer"
      >
        <input {...getInputProps()} />
        <FiUploadCloud className="text-2xl" />
        <p className="text-white font-medium text-base my-2">
          Drag your file here
        </p>
        <em className="text-border text-sm">
          {isDragActive
            ? "Drop it like it's hot!"
            : isDragReject
            ? "Unsupported file type..."
            : name
            ? name
            : note
            ? note
            : "only .jpg and .png files will be accepted"}
        </em>
      </div>
    </div>
  );
};

export default Uploader;
