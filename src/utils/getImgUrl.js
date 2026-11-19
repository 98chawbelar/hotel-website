import getBaseUrl from "./baseURL";

const BACKEND_URL = getBaseUrl().replace(/\/+$/, "");

function getImgUrl(image) {
  const placeholder = "https://placehold.co/600x400";

  if (!image) return placeholder;

  // Handle image arrays
  if (Array.isArray(image)) {
    image = image[0];
  }

  // Handle image objects
  if (typeof image === "object" && image !== null) {
    image = image.secure_url || image.url || image.path || image.src || "";
  }

  if (typeof image !== "string" || !image.trim()) {
    return placeholder;
  }

  image = image.trim();

  // Cloudinary or any full URL
  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  // Protocol-relative URL
  if (image.startsWith("//")) {
    return `https:${image}`;
  }

  // Avoid duplicate backend URL
  if (image.startsWith(BACKEND_URL)) {
    image = image.slice(BACKEND_URL.length);
  }

  // Old local upload paths
  return `${BACKEND_URL}/${image.replace(/^\/+/, "")}`;
}

export { getImgUrl };
