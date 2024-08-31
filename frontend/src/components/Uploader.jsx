import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

const Uploader = () => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxFiles: 5, // số lượng file có thể chấp nhận
    onDrop: (acceptedFiles) => {
      alert(acceptedFiles[0].name);
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
          (only .jpg and .png files will be accepted)
        </em>
      </div>
    </div>
  );
};

export default Uploader;
