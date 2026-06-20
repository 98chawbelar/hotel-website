// components/common/ImageUpload.jsx

const ImageUpload = ({ title = "Room Images", images = [], onChange }) => {
  return (
    <div className="space-y-3">
      <label className="block font-medium">{title}</label>

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {images.map((image, index) => (
            <img
              key={index}
              src={
                typeof image === "string" ? image : URL.createObjectURL(image)
              }
              alt="preview"
              className="h-48 w-full rounded-xl object-cover"
            />
          ))}
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={onChange}
        className="max-w-fit w-full"
      />
    </div>
  );
};

export default ImageUpload;
