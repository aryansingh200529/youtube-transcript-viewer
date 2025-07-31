import { useState } from "react";

export default function TranscriptViewer() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [docs, setDocs] = useState([]);
  const [error, setError] = useState("");

  const fetchTranscript = async () => {
    setLoading(true);
    setError("");
    setDocs([]);
    try {
      const res = await fetch(`/api/transcript?url=${encodeURIComponent(url)}`);
      if (!res.ok) throw new Error("Failed to fetch transcript");
      const data = await res.json();
      setDocs(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const extractYouTubeId = (url) => {
    const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = extractYouTubeId(url);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f7fd] to-white text-gray-900 font-sans">
      <header className="bg-white shadow-sm py-6">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-blue-700 to-yellow-500 bg-clip-text">
            YouTube Transcript Viewer
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Get clean transcripts from any YouTube video
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 space-y-10">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Paste YouTube URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 shadow-inner text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              onClick={fetchTranscript}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-6 py-3 rounded-xl shadow-md transition text-sm"
            >
              {loading ? "Loading..." : "Get Transcript"}
            </button>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>

        {docs.length > 0 && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
            {/* Embedded YouTube Video with increased height */}
            {videoId && (
              <div className="w-full h-[360px] sm:h-[480px] md:h-[540px] lg:h-[600px]">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-xl border"
                ></iframe>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-semibold text-blue-700">
                {docs[0].metadata.title}
              </h2>
              <p className="text-sm text-gray-500">By {docs[0].metadata.author}</p>
            </div>

            <hr />

            <div className="max-h-[500px] overflow-y-auto space-y-3 pr-2 scroll-smooth text-left">
              {docs.map((doc, idx) => (
                <p
                  key={idx}
                  className="bg-gray-50 px-4 py-2 rounded-md text-gray-800 hover:bg-blue-50 transition"
                >
                  {doc.pageContent}
                </p>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
