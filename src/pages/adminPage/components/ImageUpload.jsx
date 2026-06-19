// components/common/ImageUpload.jsx

const ImageUpload = ({ title = "Cover Image", images, onChange }) => {
  return (
    <div className="space-y-3">
      <label className="block font-medium">{title}</label>

      {images && (
        <img
          src={
            typeof images === "string" ? images : URL.createObjectURL(images)
          }
          alt="preview"
          className="h-48 w-full rounded-xl object-cover"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="max-w-fit w-full"
      />
    </div>
  );
};

export default ImageUpload;
