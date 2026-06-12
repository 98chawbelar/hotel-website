// components/common/ImageUpload.jsx

const ImageUpload = ({ title = "Cover Image", image, onChange }) => {
  return (
    <div className="space-y-3">
      <label className="block font-medium">{title}</label>

      {image && (
        <img
          src={typeof image === "string" ? image : URL.createObjectURL(image)}
          alt="preview"
          className="h-48 w-full rounded-xl object-cover"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="w-full"
      />
    </div>
  );
};

export default ImageUpload;
