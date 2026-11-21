import React, { useState, useEffect, useRef } from "react";
import { User } from "firebase/auth";
import {
  Folder,
  FileText,
  Upload,
  Download,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Plus,
  ShieldCheck,
  FileCheck,
  Lock,
  Compass,
} from "lucide-react";
import {
  initAuth,
  googleSignIn,
  logout,
} from "../lib/firebase";
import {
  listTravelFiles,
  getOrCreateAppFolder,
  uploadBinaryFileToDrive,
  uploadTextToDrive,
  deleteDriveFile,
  DriveFileItem,
  APP_FOLDER_NAME,
} from "../lib/driveApi";

export const DriveDocsPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [, setIsLoadingAuth] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [folderId, setFolderId] = useState<string | null>(null);
  const [files, setFiles] = useState<DriveFileItem[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [driveError, setDriveError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [fileToDelete, setFileToDelete] = useState<DriveFileItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteTitle, setNoteTitle] = useState("Darjeeling & Sikkim Tour - Travel Notes");
  const [noteContent, setNoteContent] = useState(
    `Aadhya Gorkha Travels - Trip Itinerary & Notes\n` +
      `---------------------------------------------\n` +
      `Office: Salugara, Siliguri, West Bengal\n` +
      `Phone: +91 8670374242 / +91 8899505665\n\n` +
      `Checklist for Sikkim Permits:\n` +
      `[ ] Voter ID / Passport (2 Photocopies)\n` +
      `[ ] Passport Size Photos (4 copies)\n` +
      `[ ] Nathula Pass Permit applied via Siliguri desk\n` +
      `[ ] Bagdogra Airport Pickup confirmed (Innova Crysta)\n`
  );

  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        setIsLoadingAuth(false);
      },
      () => {
        setUser(null);
        setToken(null);
        setIsLoadingAuth(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const loadDriveData = async (accessToken: string) => {
    setIsLoadingFiles(true);
    setDriveError(null);
    try {
      const fId = await getOrCreateAppFolder(accessToken);
      setFolderId(fId);
      const items = await listTravelFiles(accessToken, fId);
      setFiles(items);
    } catch (err: unknown) {
      console.error("Error loading Drive files:", err);
      const msg = err instanceof Error ? err.message : "Failed to connect to Google Drive";
      setDriveError(msg);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadDriveData(token);
    } else {
      setFiles([]);
      setFolderId(null);
    }
  }, [token]);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    setAuthError(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
        await loadDriveData(res.accessToken);
      }
    } catch (err: unknown) {
      console.error("Sign-in failed:", err);
      const msg =
        err instanceof Error
          ? err.message
          : "Sign-in failed. Please verify popup permissions.";
      setAuthError(msg);
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      setUser(null);
      setToken(null);
      setFiles([]);
      setFolderId(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile || !token || !folderId) return;

    setIsUploading(true);
    setDriveError(null);
    setUploadSuccess(null);
    try {
      const newFile = await uploadBinaryFileToDrive(token, selectedFile, folderId);
      setFiles((prev) => [newFile, ...prev]);
      setUploadSuccess(`"${selectedFile.name}" successfully saved to your Google Drive!`);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "File upload failed";
      setDriveError(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !folderId || !noteTitle.trim()) return;

    setIsUploading(true);
    setDriveError(null);
    try {
      const fileName = noteTitle.endsWith(".txt") ? noteTitle : `${noteTitle}.txt`;
      const newDoc = await uploadTextToDrive(token, fileName, noteContent, folderId);
      setFiles((prev) => [newDoc, ...prev]);
      setShowNoteModal(false);
      setUploadSuccess(`"${fileName}" created and saved to Google Drive!`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Note creation failed";
      setDriveError(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const confirmDeleteFile = async () => {
    if (!fileToDelete || !token) return;
    setIsDeleting(true);
    try {
      await deleteDriveFile(token, fileToDelete.id);
      setFiles((prev) => prev.filter((f) => f.id !== fileToDelete.id));
      setUploadSuccess(`Deleted "${fileToDelete.name}" from Google Drive.`);
      setFileToDelete(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete file";
      setDriveError(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full bg-[#F6F9FC] min-h-screen pb-24">
      {/* Header Banner */}
      <section className="bg-himalayan-navy text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-[#E2A829]/40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/src/assets/images/hero_himalayas_kanchenjunga_1794309509093.jpg"
            alt="Himalayan panorama"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-5xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#F3C853] uppercase tracking-wider">
            <Folder className="w-4 h-4 text-[#F3C853]" />
            <span>Google Workspace Drive Integration</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Trip Documents & Drive Locker
          </h1>
          <p className="text-sm sm:text-base text-white/85 max-w-2xl mx-auto leading-relaxed">
            Manage your Sikkim tourist permits, travel vouchers, Bagdogra flight tickets, and day-wise itineraries directly in your Google Drive with end-to-end security.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {!user || !token ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-[#F6F9FC] border border-[#E2A829]/45 rounded-2xl flex items-center justify-center mx-auto shadow-inner text-[#0A2D6E]">
              <Lock className="w-8 h-8 text-[#E2A829]" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-[#0A2D6E]">
                Connect Your Google Drive
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Sign in with your Google account to access, store, and organize your trip documents, Sikkim permit copies, and travel itineraries in your private Google Drive.
              </p>
            </div>

            {authError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg text-left">
                {authError}
              </div>
            )}

            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={handleSignIn}
                disabled={isSigningIn}
                className="inline-flex items-center gap-3 px-5 py-3 bg-white border border-slate-300 rounded-lg shadow-sm hover:shadow-md hover:bg-slate-50 transition-all text-slate-800 text-sm font-medium disabled:opacity-50"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 48 48">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                  <path fill="none" d="M0 0h48v48H0z" />
                </svg>
                <span>{isSigningIn ? "Connecting to Google..." : "Sign in with Google"}</span>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-[#13469E]" />
              <span>Permission granted directly to your private Google Drive</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-11 h-11 rounded-full border border-slate-200 shadow-xs"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-[#0A2D6E] text-white flex items-center justify-center font-bold text-base">
                    {user.email?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-[#0F1E3A]">
                      {user.displayName || "Himalayan Traveler"}
                    </h3>
                    <span className="text-[11px] text-emerald-700 font-semibold">
                      · Google Drive Connected
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => token && loadDriveData(token)}
                  disabled={isLoadingFiles}
                  className="p-2 text-slate-600 hover:text-[#0A2D6E] border border-slate-200 rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                  title="Refresh files"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingFiles ? "animate-spin" : ""}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>

                <button
                  onClick={handleSignOut}
                  className="px-3 py-2 text-slate-600 hover:text-red-700 border border-slate-200 rounded-lg text-xs font-semibold transition-colors"
                >
                  Disconnect
                </button>
              </div>
            </div>

            {uploadSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center justify-between animate-in fade-in">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{uploadSuccess}</span>
                </div>
                <button
                  onClick={() => setUploadSuccess(null)}
                  className="text-emerald-700 hover:text-emerald-900 font-bold"
                >
                  ×
                </button>
              </div>
            )}

            {driveError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center justify-between animate-in fade-in">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{driveError}</span>
                </div>
                <button
                  onClick={() => setDriveError(null)}
                  className="text-red-700 hover:text-red-900 font-bold"
                >
                  ×
                </button>
              </div>
            )}

            {/* Actions Bar */}
            <div className="bg-himalayan-navy text-white rounded-xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-[#E2A829]/40">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Folder className="w-4 h-4 text-[#F3C853]" />
                  <span className="font-semibold text-sm">Folder: {APP_FOLDER_NAME}</span>
                </div>
                <p className="text-xs text-white/75">
                  Documents saved here remain in your personal Google Drive and can be viewed or printed anytime.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,application/pdf,text/plain"
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="flex-1 md:flex-none px-4 py-2 bg-metallic-gold text-[#071F4D] font-bold text-xs rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isUploading ? "Uploading..." : "Upload Document / Permit"}</span>
                </button>

                <button
                  onClick={() => setShowNoteModal(true)}
                  className="flex-1 md:flex-none px-4 py-2 bg-white/12 hover:bg-white/20 text-white font-semibold text-xs rounded-lg border border-white/25 transition-all flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 text-[#F3C853]" />
                  <span>New Travel Checklist</span>
                </button>
              </div>
            </div>

            {/* File List */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-base font-bold text-[#0A2D6E]">
                    Stored Travel Files ({files.length})
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Sikkim permits, booking vouchers, flight passes, and saved itineraries
                  </p>
                </div>
              </div>

              {isLoadingFiles ? (
                <div className="py-16 text-center space-y-2 text-slate-500 text-xs">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#0A2D6E]" />
                  <p>Syncing files with Google Drive...</p>
                </div>
              ) : files.length === 0 ? (
                <div className="py-16 text-center space-y-3 px-4">
                  <div className="w-12 h-12 bg-[#F6F9FC] rounded-full flex items-center justify-center mx-auto text-slate-400">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-sm text-[#0F1E3A]">
                    No documents uploaded yet
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Upload your passport copies, voter ID cards (required for Nathula & North Sikkim permits), or save custom tour itineraries directly into your Drive.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-[#0A2D6E] hover:bg-[#13469E] text-white text-xs font-semibold rounded-lg shadow-sm"
                    >
                      Upload First File
                    </button>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="p-4 sm:px-6 hover:bg-[#F6F9FC] transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="p-2.5 rounded-lg bg-[#F6F9FC] border border-[#E2A829]/35 text-[#0A2D6E] shrink-0">
                          <FileText className="w-5 h-5 text-[#E2A829]" />
                        </div>
                        <div className="overflow-hidden">
                          <div className="font-medium text-xs sm:text-sm text-[#0F1E3A] truncate max-w-xs sm:max-w-md">
                            {file.name}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                            <span>
                              {file.createdTime
                                ? new Date(file.createdTime).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })
                                : "Uploaded recently"}
                            </span>
                            {file.size && (
                              <>
                                <span>•</span>
                                <span>{(parseInt(file.size, 10) / 1024).toFixed(1)} KB</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        {file.webViewLink && (
                          <a
                            href={file.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-slate-600 hover:text-[#0A2D6E] hover:bg-slate-100 rounded-md transition-colors"
                            title="Open in Google Drive"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}

                        {file.webContentLink && (
                          <a
                            href={file.webContentLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-slate-600 hover:text-emerald-600 hover:bg-slate-100 rounded-md transition-colors"
                            title="Direct Download"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        )}

                        <button
                          onClick={() => setFileToDelete(file)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete from Drive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Travel Permits Guide Info Box */}
            <div className="bg-white border border-[#E2A829]/45 rounded-xl p-5 text-xs text-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-[#0A2D6E] font-bold">
                <Compass className="w-4 h-4 text-[#E2A829]" />
                <span>Important Documentation Guidelines for Sikkim & Bhutan</span>
              </div>
              <p className="leading-relaxed">
                Protected Area Permits (PAP) are mandatory for Indian and foreign nationals visiting North Sikkim (Lachung, Lachen, Yumthang, Gurudongmar Lake), Tsomgo Lake, and Nathula Pass. Keep digital copies of your Voter ID Card / Passport and passport-sized photographs stored in this Drive folder for rapid permit processing by our Siliguri operations desk.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* MANDATORY USER CONFIRMATION MODAL FOR DESTRUCTIVE ACTION (deleteDriveFile) */}
      {fileToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#071F4D]/65 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-300 max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-serif text-lg font-bold text-[#0F1E3A]">
                Delete File from Google Drive?
              </h3>
              <p className="text-xs text-slate-600">
                Are you sure you want to permanently delete{" "}
                <span className="font-semibold text-slate-800">"{fileToDelete.name}"</span>?
                This action cannot be undone.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setFileToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteFile}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold shadow transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isDeleting ? "Deleting..." : "Delete Permanently"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create New Travel Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#071F4D]/65 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-300 max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-serif text-base font-bold text-[#0A2D6E]">
                Create Travel Note in Google Drive
              </h3>
              <button
                onClick={() => setShowNoteModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateNote} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Document Title
                </label>
                <input
                  type="text"
                  required
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0A2D6E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Content / Checklist
                </label>
                <textarea
                  rows={8}
                  required
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  className="w-full px-3 py-2 font-mono border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0A2D6E]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNoteModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-4 py-2 bg-[#0A2D6E] hover:bg-[#13469E] text-white rounded-lg text-xs font-semibold shadow flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5 text-[#F3C853]" />
                  <span>{isUploading ? "Saving to Drive..." : "Save to Google Drive"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
