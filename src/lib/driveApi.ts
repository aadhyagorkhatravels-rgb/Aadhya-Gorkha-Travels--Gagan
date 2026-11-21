/**
 * Client-Side Google Drive v3 REST API Client
 * Used with permission from the app's users for managing travel permits,
 * itineraries, and booking vouchers.
 */

export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  createdTime?: string;
  modifiedTime?: string;
  webViewLink?: string;
  webContentLink?: string;
  iconLink?: string;
  thumbnailLink?: string;
}

const DRIVE_API_BASE = "https://www.googleapis.com/drive/v3";
const DRIVE_UPLOAD_BASE = "https://www.googleapis.com/upload/drive/v3";

export const APP_FOLDER_NAME = "Aadhya Gorkha Travels - Trip Documents";

/**
 * Find or create the dedicated Aadhya Gorkha Travels documents folder in user's Drive
 */
export async function getOrCreateAppFolder(token: string): Promise<string> {
  // Check if folder already exists
  const query = encodeURIComponent(
    `name = '${APP_FOLDER_NAME}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`
  );
  const searchRes = await fetch(`${DRIVE_API_BASE}/files?q=${query}&fields=files(id,name)`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!searchRes.ok) {
    const errorText = await searchRes.text();
    throw new Error(`Failed to query Google Drive: ${errorText}`);
  }

  const searchData = await searchRes.json();
  if (searchData.files && searchData.files.length > 0) {
    return searchData.files[0].id;
  }

  // Create the folder
  const createRes = await fetch(`${DRIVE_API_BASE}/files`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: APP_FOLDER_NAME,
      mimeType: "application/vnd.google-apps.folder",
      description: "Travel permits, tour itineraries, and cab vouchers managed via Aadhya Gorkha Travels",
    }),
  });

  if (!createRes.ok) {
    const errorText = await createRes.text();
    throw new Error(`Failed to create Google Drive folder: ${errorText}`);
  }

  const newFolder = await createRes.json();
  return newFolder.id;
}

/**
 * List files in the user's travel documents folder (or root)
 */
export async function listTravelFiles(token: string, folderId?: string): Promise<DriveFileItem[]> {
  let query = "trashed = false";
  if (folderId) {
    query += ` and '${folderId}' in parents`;
  }

  const fields =
    "files(id, name, mimeType, size, createdTime, modifiedTime, webViewLink, webContentLink, iconLink, thumbnailLink)";
  const res = await fetch(
    `${DRIVE_API_BASE}/files?q=${encodeURIComponent(query)}&orderBy=modifiedTime desc&fields=${encodeURIComponent(fields)}&pageSize=50`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to list files from Google Drive: ${errorText}`);
  }

  const data = await res.json();
  return data.files || [];
}

/**
 * Upload text/markdown content (e.g., Tour Itinerary, Booking summary) to Google Drive
 */
export async function uploadTextToDrive(
  token: string,
  fileName: string,
  content: string,
  folderId?: string
): Promise<DriveFileItem> {
  const metadata: Record<string, unknown> = {
    name: fileName,
    mimeType: "text/plain",
  };
  if (folderId) {
    metadata.parents = [folderId];
  }

  const boundary = "-------314159265358979323846";
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const multipartRequestBody =
    delimiter +
    "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
    JSON.stringify(metadata) +
    delimiter +
    "Content-Type: text/plain; charset=UTF-8\r\n\r\n" +
    content +
    closeDelimiter;

  const res = await fetch(
    `${DRIVE_UPLOAD_BASE}/files?uploadType=multipart&fields=id,name,mimeType,webViewLink,webContentLink,createdTime`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": `multipart/related; boundary=${boundary}`,
      },
      body: multipartRequestBody,
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Google Drive upload failed: ${errorText}`);
  }

  return res.json();
}

/**
 * Upload a binary File (e.g. Permit photo, Passport copy, Voter ID)
 */
export async function uploadBinaryFileToDrive(
  token: string,
  file: File,
  folderId?: string
): Promise<DriveFileItem> {
  const metadata: Record<string, unknown> = {
    name: file.name,
    mimeType: file.type || "application/octet-stream",
  };
  if (folderId) {
    metadata.parents = [folderId];
  }

  const form = new FormData();
  form.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );
  form.append("file", file);

  const res = await fetch(
    `${DRIVE_UPLOAD_BASE}/files?uploadType=multipart&fields=id,name,mimeType,size,webViewLink,webContentLink,createdTime`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Google Drive file upload failed: ${errorText}`);
  }

  return res.json();
}

/**
 * Permanently delete a file from Google Drive (Caller MUST ask explicit user confirmation first!)
 */
export async function deleteDriveFile(token: string, fileId: string): Promise<void> {
  const res = await fetch(`${DRIVE_API_BASE}/files/${fileId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok && res.status !== 204 && res.status !== 404) {
    const errorText = await res.text();
    throw new Error(`Failed to delete file from Google Drive: ${errorText}`);
  }
}
