const Imagepreview = ({ imageUrl, name }) => {
  return (
    <div className="w-32 h-32 p-2 bg-main border border-border rounded">
      <img
        src={imageUrl ? imageUrl : "/images/movies/1.jpg"}
        alt={name}
        className="w-full h-full object-cover rounded"
      />
    </div>
  );
};

export default Imagepreview;
