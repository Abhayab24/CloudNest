import { useEffect, useState } from "react";

export default function Dashboard() {

  const [files, setFiles] = useState([]);
  const [visibility, setVisibility] = useState("private");

  const fetchFiles = async () => {

    try {

      const response = await fetch(
        "https://cloudnest-backend-4y4y.onrender.com/files",
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

      await fetch(
        "https://cloudnest-backend-4y4y.onrender.com/upload",
        {
          method: "POST",

          headers: {
            Authorization: localStorage.getItem("token")
          },

          body: formData
        }
      );

      fetchFiles();

    } catch(error) {

      console.log(error);
    }
  };

  /* Delete */

  const deleteFile = async (fileName) => {

    try {

      await fetch(
        `https://cloudnest-backend-4y4y.onrender.com/delete/${encodeURIComponent(fileName)}`,
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

    window.location.href = "/";
  };

  return (

    <div className="min-h-screen bg-[#5C4033] text-white p-8 font-mono">

      {/* Navbar */}

      <div className="flex justify-between items-center mb-10 bg-[#3E2723] border-4 border-[#2E1B0E] p-5">

        <div>

          <h1 className="text-5xl font-bold text-[#7CFC00] tracking-widest">
            CLOUDNEST
          </h1>

        

        </div>

        <button
          onClick={logout}
          className="bg-red-700 border-4 border-red-900 px-6 py-3 hover:bg-red-600 active:translate-y-1"
        >
          Logout
        </button>

      </div>

      {/* Upload Box */}

      <div className="bg-[#8B5A2B] border-4 border-[#5D3A1A] p-8 mb-10">

        <h2 className="text-3xl font-bold mb-3 text-[#7CFC00]">
          Upload File
        </h2>

        <p className="mb-6 text-gray-200">
          Store your blocks securely
        </p>

        <div className="flex flex-col md:flex-row gap-5">

          <input
            type="file"
            onChange={handleUpload}
            className="bg-[#3E2723] border-4 border-[#2E1B0E] p-4 w-full"
          />

          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="bg-[#3E2723] border-4 border-[#2E1B0E] p-4"
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

      <h2 className="text-4xl font-bold mb-8 text-[#7CFC00]">
        Inventory
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {files.map((file, index) => (

          <div
            key={index}
            className="bg-[#8B5A2B] border-4 border-[#5D3A1A] p-6 hover:scale-[1.02] transition"
          >

            <div className="text-5xl mb-4">
              📦
            </div>

            <h2 className="text-xl break-words font-bold mb-2">

  {file.fileName || file}

</h2>

<p className="text-sm text-gray-200 mb-4">

  Uploaded by: {file.uploadedBy || "Unknown"}

</p>

            <div className="mb-5">

              <span
                className={`px-4 py-2 border-2 font-bold ${
                  file.visibility === "public"
                  ? "bg-green-700 border-green-900"
                  : "bg-yellow-700 border-yellow-900"
                }`}
              >

                {file.visibility
                  ? file.visibility.toUpperCase()
                  : "PRIVATE"}

              </span>

            </div>

            <div className="flex gap-3">

              <button

                onClick={() => {

                  window.open(

                    `https://cloudnest-backend-4y4y.onrender.com/download/${
                      file.fileName || file
                    }?token=${localStorage.getItem("token")}`
                  );
                }}

                className="flex-1 bg-green-700 border-4 border-green-900 py-3 font-bold hover:bg-green-600 active:translate-y-1"
              >
                Download
              </button>

              <button

                onClick={() => deleteFile(file.fileName || file)}

                className="flex-1 bg-red-700 border-4 border-red-900 py-3 font-bold hover:bg-red-600 active:translate-y-1"
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