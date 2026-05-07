import { useEffect, useState } from "react";

export default function Dashboard() {

  const [files, setFiles] = useState([]);
  const [visibility, setVisibility] = useState("private");

  /* Fetch Files */

  const fetchFiles = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/files",
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );

      const data = await response.json();

      setFiles(data);

    } catch(error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchFiles();

  }, []);

  /* Upload */

  const handleUpload = async (e) => {

    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    const formData = new FormData();

    formData.append("file", selectedFile);

    formData.append("visibility", visibility);

    try {

      await fetch("http://localhost:5000/upload", {

        method: "POST",

        headers: {
          Authorization: localStorage.getItem("token")
        },

        body: formData
      });

      fetchFiles();

    } catch(error) {

      console.log(error);
    }
  };

  /* Delete */

  const deleteFile = async (fileName) => {

    try {

      await fetch(

        `http://localhost:5000/delete/${encodeURIComponent(fileName)}`,

        {

          method: "DELETE",

          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );

      fetchFiles();

    } catch(error) {

      console.log(error);
    }
  };

  /* Logout */

  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      {/* Navbar */}

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-5xl font-bold text-cyan-400">
          CloudNest
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 px-5 py-3 rounded-xl hover:bg-red-600"
        >
          Logout
        </button>

      </div>

      {/* Upload */}

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

        {/* Visibility */}

        <div className="mt-5">

          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="bg-gray-900 p-4 rounded-xl"
          >

            <option value="private">
              Private
            </option>

            <option value="public">
              Public
            </option>

          </select>

        </div>

      </div>

      {/* Files */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

        {files.map((file, index) => (

          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >

            <h2 className="text-xl font-semibold mb-3 break-words">

              {file.fileName || file}

            </h2>

            <p className="text-gray-400 mb-5">

              {file.visibility
                ? file.visibility.toUpperCase()
                : "PRIVATE"}

            </p>

            <div className="flex gap-3">

              {/* Secure Download */}

              <button

                onClick={() => {

                  window.open(

                    `http://localhost:5000/download/${
                      file.fileName || file
                    }?token=${localStorage.getItem("token")}`
                  );
                }}

                className="bg-cyan-500 px-4 py-2 rounded-lg hover:bg-cyan-600"
              >
                Download
              </button>

              {/* Delete */}

              <button

                onClick={() => deleteFile(file.fileName || file)}

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