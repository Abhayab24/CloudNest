import { useEffect, useState } from "react";

export default function App() {

  const [files, setFiles] = useState([]);

  /* Fetch Files */

  const fetchFiles = async () => {

    try {

      const response = await fetch("http://localhost:5000/files");

      const data = await response.json();

      setFiles(data);

    } catch(error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchFiles();

  }, []);

  /* Upload File */

  const handleUpload = async (e) => {

    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    const formData = new FormData();

    formData.append("file", selectedFile);

    try {

      await fetch("http://localhost:5000/upload", {

        method: "POST",
        body: formData
      });

      fetchFiles();

    } catch(error) {

      console.log(error);
    }
  };

  /* Delete File */

  const deleteFile = async (fileName) => {

    try {

      await fetch(
        `http://localhost:5000/delete/${encodeURIComponent(fileName)}`,
        {
          method: "DELETE"
        }
      );

      fetchFiles();

    } catch(error) {

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      {/* Navbar */}

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-5xl font-bold text-cyan-400">
          CloudNest
        </h1>

      </div>

      {/* Upload Section */}

      <div className="border-2 border-dashed border-cyan-500 rounded-3xl p-16 text-center bg-white/5">

        <h2 className="text-3xl mb-5 font-semibold">
          Upload Files
        </h2>

        <p className="text-gray-400 mb-6">
          Upload and share your files securely
        </p>

        <input
          type="file"
          onChange={handleUpload}
          className="bg-gray-900 p-4 rounded-xl"
        />

      </div>

      {/* Files Grid */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

        {files.map((file, index) => (

          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >

            <h2 className="text-xl font-semibold mb-5 break-words">
              {file}
            </h2>

            <div className="flex gap-3">

              {/* Download Button */}

              <a
                href={`http://localhost:5000/uploads/${file}`}
                download
                className="bg-cyan-500 px-4 py-2 rounded-lg hover:bg-cyan-600"
              >
                Download
              </a>

              {/* Delete Button */}

              <button
                onClick={() => deleteFile(file)}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}