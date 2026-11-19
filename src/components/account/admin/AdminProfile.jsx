import { useEffect, useState } from "react";
import { getAdmin, setAdmin } from "../../../utils/auth";
import { getProfile, uploadAvatar } from "../../../api/admin.api";
import { getImgUrl } from "../../../utils/getImgUrl";

const AdminProfile = () => {
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [admin, setAdminState] = useState(getAdmin());

  // Fetch admin profile
  const fetchProfile = async () => {
    try {
      const res = await getProfile();

      setAdmin(res.data);
      setAdminState(res.data);
    } catch (error) {
      console.error("PROFILE ERROR:", error);
      alert("Failed to load admin profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Upload profile image
  const handleUpload = async () => {
    if (!avatar) {
      alert("Please select an image");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("avatar", avatar);

      const response = await uploadAvatar(formData);

      if (response.data.success) {
        // Refresh admin profile from MongoDB
        await fetchProfile();

        setAvatar(null);

        alert("Profile image updated successfully!");
      }
    } catch (error) {
      console.error("UPLOAD ERROR:", error.response?.data || error);

      alert(error.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex flex-col items-center">
        {/* Admin Avatar */}
        {admin?.avatar ? (
          <img
            src={getImgUrl(admin?.avatar)}
            alt="Admin"
            className="w-32 h-32 rounded-full object-cover border"
            onError={(e) => {
              console.error("Image loading failed:", admin.avatar);
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-32 h-32 rounded-full border flex items-center justify-center">
            No Image
          </div>
        )}

        {/* Admin Information */}
        <h2 className="mt-4 text-xl font-bold">{admin?.username}</h2>

        <p className="text-gray-500">{admin?.role}</p>

        {/* Image Upload */}
        <div className="mt-4 w-full flex flex-col items-center">
          <p className="text-sm mb-2">
            Upload profile image (Maximum size: 5MB)
          </p>

          <input
            type="file"
            accept="image/*"
            className="cursor-pointer bg-primary/20 rounded-md px-2 py-2"
            onChange={(e) => {
              const file = e.target.files[0];

              if (!file) return;

              if (!file.type.startsWith("image/")) {
                alert("Please select a valid image");
                e.target.value = "";
                return;
              }

              if (file.size > 5 * 1024 * 1024) {
                alert("Image size must be less than 5MB");
                e.target.value = "";
                return;
              }

              setAvatar(file);
            }}
          />

          {avatar && (
            <p className="mt-2 text-sm text-gray-500">
              Selected: {avatar.name}
            </p>
          )}
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={uploading || !avatar}
          className="mt-4 cursor-pointer bg-blue-500 disabled:bg-gray-400 text-white px-4 py-2 rounded"
        >
          {uploading ? "Uploading..." : "Update Profile Image"}
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
