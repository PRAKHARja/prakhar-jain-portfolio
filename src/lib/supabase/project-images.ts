import { getSupabaseClient } from "@/lib/supabase/client";

export const PROJECT_IMAGES_BUCKET = "project-images";
export const MAX_PROJECT_IMAGE_BYTES = 5 * 1024 * 1024;

const imageExtensions: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
  "image/bmp": "bmp",
  "image/x-ms-bmp": "bmp",
};

export const acceptedProjectImageTypes = Object.keys(imageExtensions).join(",");

function matchesImageSignature(type: string, bytes: Uint8Array) {
  const ascii = String.fromCharCode(...bytes);
  switch (type) {
    case "image/jpeg":
      return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    case "image/png":
      return [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((byte, index) => bytes[index] === byte);
    case "image/webp":
      return ascii.slice(0, 4) === "RIFF" && ascii.slice(8, 12) === "WEBP";
    case "image/gif":
      return ascii.startsWith("GIF87a") || ascii.startsWith("GIF89a");
    case "image/avif":
      return ascii.slice(4, 8) === "ftyp" && (ascii.includes("avif") || ascii.includes("avis"));
    case "image/bmp":
    case "image/x-ms-bmp":
      return ascii.startsWith("BM");
    default:
      return false;
  }
}

export async function validateProjectImage(file: File) {
  const type = file.type.toLowerCase();
  if (!imageExtensions[type]) {
    throw new Error("Choose a JPEG, PNG, WebP, GIF, AVIF, or BMP image.");
  }
  if (file.size > MAX_PROJECT_IMAGE_BYTES) {
    throw new Error("Image must be 5 MB or smaller.");
  }
  const header = new Uint8Array(await file.slice(0, 32).arrayBuffer());
  if (!matchesImageSignature(type, header)) {
    throw new Error("The file contents do not match a supported image format.");
  }
}

export async function uploadProjectImage(file: File, projectId: string) {
  await validateProjectImage(file);
  const extension = imageExtensions[file.type.toLowerCase()];
  const path = `projects/${projectId}/${crypto.randomUUID()}.${extension}`;
  const { error } = await getSupabaseClient().storage.from(PROJECT_IMAGES_BUCKET).upload(path, file, {
    cacheControl: "3600",
    contentType: file.type,
    upsert: false,
  });
  if (error) throw new Error(`Image upload failed: ${error.message}`);
  return path;
}

export function getProjectImageStoragePath(value: string | null | undefined) {
  const thumbnail = value?.trim();
  if (!thumbnail) return null;

  if (/^https?:\/\//i.test(thumbnail)) {
    try {
      const imageUrl = new URL(thumbnail);
      const projectUrl = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "");
      if (imageUrl.origin !== projectUrl.origin) return null;
      const pathname = imageUrl.pathname;
      const marker = `/storage/v1/object/public/${PROJECT_IMAGES_BUCKET}/`;
      const markerIndex = pathname.indexOf(marker);
      if (markerIndex < 0) return null;
      return decodeURIComponent(pathname.slice(markerIndex + marker.length));
    } catch {
      return null;
    }
  }

  const relativePath = thumbnail.replace(/^\/+/, "");
  return relativePath.startsWith(`${PROJECT_IMAGES_BUCKET}/`)
    ? relativePath.slice(PROJECT_IMAGES_BUCKET.length + 1)
    : relativePath;
}

export function getProjectImageUrl(value: string | null | undefined) {
  const thumbnail = value?.trim();
  if (!thumbnail) return null;
  const storagePath = getProjectImageStoragePath(thumbnail);
  if (!storagePath) return thumbnail;
  return getSupabaseClient().storage.from(PROJECT_IMAGES_BUCKET).getPublicUrl(storagePath).data.publicUrl;
}

export async function removeProjectImage(value: string | null | undefined) {
  const path = getProjectImageStoragePath(value);
  if (!path) return;
  const { error } = await getSupabaseClient().storage.from(PROJECT_IMAGES_BUCKET).remove([path]);
  if (error) throw new Error(error.message);
}
