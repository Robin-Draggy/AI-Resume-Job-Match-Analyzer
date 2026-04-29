"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileText, X } from "lucide-react";

export default function ResumeUpload({ onFileSelect }: { onFileSelect: (file: File | null) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selected = acceptedFiles[0];
    if (!selected) return;

    if (selected.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return;
    }

    if (selected.size > 2 * 1024 * 1024) {
      setError("File must be under 2MB");
      return;
    }

    setError("");
    setFile(selected);
    onFileSelect(selected); // ✅ send to parent
  }, [onFileSelect]);

  const removeFile = () => {
    setFile(null);
    onFileSelect(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div className="w-full max-w-xl mx-auto">
      {!file ? (
        <div
          {...getRootProps()}
          className={`glass-card text-center cursor-pointer transition 
          ${isDragActive ? "border-cyan-400" : "border-white/10"}`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="mx-auto mb-4 text-cyan-400" size={40} />
          <p className="text-lg">
            {isDragActive ? "Drop your resume here" : "Drag & drop your resume"}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            PDF only, max 2MB
          </p>
        </div>
      ) : (
        <div className="glass-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="text-emerald-400" />
            <div>
              <p className="text-sm">{file.name}</p>
              <p className="text-xs text-gray-400">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <button onClick={removeFile}>
            <X className="text-red-400" />
          </button>
        </div>
      )}

      {error && (
        <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
      )}
    </div>
  );
}