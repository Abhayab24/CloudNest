import { useState } from "react";

export default function App() {

  const [files, setFiles] = useState([]);

  const handleUpload = (e) => {

    const uploadedFiles = Array.from(e.target.files);

    setFiles([...files, ...uploadedFiles]);
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">

      {/* Navbar */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-bold text-cyan-400">
          CloudNest
        </h1>

        <button className="bg-cyan-500 px-6 py-3 rounded-xl hover:bg-cyan-600">
          Upload File
        </button>
      </div>

      {/* Upload Section */}
      <div className="border-2 border-dashed border-cyan-500 rounded-3xl p-16 text-center bg-white/5">

        <h2 className="text-3xl mb-5 font-semibold">
          Drag & Drop Files
        </h2>

        <p className="text-gray-400 mb-6">
          Upload and share files securely
        </p>

        <input
          type="file"
          multiple
          onChange={handleUpload}
          className="bg-gray-900 p-4 rounded-xl"
        />
      </div>

      {/* File Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

        {files.map((file, index) => (

          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >

            <h2 className="text-xl font-semibold mb-3">
              {file.name}
            </h2>

            <p className="text-gray-400">
              {(file.size / 1024).toFixed(2)} KB
            </p>

            <button className="mt-5 bg-cyan-500 px-4 py-2 rounded-lg hover:bg-cyan-600">
              Download
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}