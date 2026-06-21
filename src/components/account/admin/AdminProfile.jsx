import { useEffect, useState } from "react";
import axios from "axios";
import getBaseUrl from "../../../utils/baseURL";
import { getAdmin, setAdmin } from "../../../utils/auth";
import { getProfile, uploadAvatar } from "../../../api/admin.api";

const AdminProfile = () => {
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdinState] = useState(getAdmin());
  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      setAdmin(res.data);
      setAdinState(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpload = async () => {
    if (!avatar) {
      alert("Please select an image");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("avatar", avatar);

      const response = await uploadAvatar(formData);

      alert(response.data.message);

      await fetchProfile();
    } catch (error) {
      console.log("UPLOAD ERROR:", error);
      alert("Upload failed");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex flex-col items-center">
        {admin?.avatar ? (
          <img
            src={`${getBaseUrl()}${admin.avatar}`}
            alt="Admin"
            className="w-32 h-32 rounded-full object-cover border"
          />
        ) : (
          <div className="w-32 h-32 rounded-full border flex items-center justify-center">
            No Image
          </div>
        )}

        <h2 className="mt-4 text-xl font-bold">{admin?.username}</h2>

        <p className="text-gray-500">{admin?.role}</p>

        <div className="mt-4 w-full flex flex-col items-center">
          <p className="text-sm  mb-2">
            Upload profile image (Maximum size: 5MB)
          </p>

          <input
            type="file"
            accept="image/*"
            className="cursor-pointer bg-primary/20 rounded-md px-2 py-2  "
            onChange={(e) => {
              const file = e.target.files[0];

              if (!file) return;

              // 2MB validation
              if (file.size > 5 * 1024 * 1024) {
                alert("Image size must be less than 5MB");
                e.target.value = "";
                return;
              }

              setAvatar(file);
            }}
          />
        </div>

        <button
          onClick={handleUpload}
          className="mt-4 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Profile Image
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
