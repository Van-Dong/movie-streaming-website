import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import Loader from "./Notifications/Loader";

const Uploader = ({ setImageUrl }) => {
  const [loading, setLoading] = useState(false);

  // upload file
  // const onDrop = useCallback(
  //   async (acceptedFiles) => {
  //     const file = new FormData();
  //     file.append("file", acceptedFiles[0]);
  //     const imageUrl = await uploadImageService(file, setLoading);
  //     setImageUrl(data);
  //   },
  //   [setImageUrl]
  // );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      multiple: false,
      maxFiles: 5, // số lượng file có thể chấp nhận
      onDrop: (acceptedFiles) => {
        console.log(acceptedFiles[0]);
      },
    });
  return (
    <div className="w-full text-center">
      {loading ? (
        <div className="bg-main p-6 flex-colo border-2 border-dashed border-border rounded-md text-subMain cursor-pointer">
          <Loader />
        </div>
      ) : (
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
              : "only .jpg and .png files will be accepted"}
          </em>
        </div>
      )}
    </div>
  );
};

export default Uploader;
