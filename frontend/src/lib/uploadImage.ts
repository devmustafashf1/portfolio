export async function uploadImage(file: File): Promise<string> {
  const token = localStorage.getItem("adminToken");
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${import.meta.env.VITE_API_URL}/read/blog/upload-image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to upload image");
  return data.url as string;
}
