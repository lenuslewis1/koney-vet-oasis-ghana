import MainLayout from "@/components/layout/MainLayout";
import { useState, useEffect } from "react";

const imageAlbums = [
  {
    title: "Hospital",
    images: [
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526048/_MG_2339_sw833f.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526048/_MG_2096_lzzbst.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526046/_MG_2223_fkxcna.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526048/_MG_2072_py3x31.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526047/_MG_2164_tve1cf.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526046/_MG_2263_maovcx.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526044/_MG_2169_di9o8p.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526044/_MG_2158_tnoqlk.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748526044/_MG_2122_svr52z.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1747825784/_MG_2419_wasgbi.jpg",
    ],
  },
  {
    title: "Rabies walk 2025",
    images: [
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072523/_MG_2131_mqrkxr.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072522/_MG_2126_nm7bod.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072521/_MG_2123_h6ec0l.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072521/_MG_2106_hydt3v.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072522/_MG_2146_iwddsp.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072521/_MG_2142_cljea2.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072521/_MG_2122_ujzeer.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072799/_MG_2251_apqmv4.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072799/_MG_2267_wdxe9f.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072798/_MG_2315_opgoxh.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072794/_MG_2288_uxfrmm.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072795/_MG_2262_caoiao.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072794/_MG_2252_hmyalo.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072793/_MG_2287_xcvtrd.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072793/_MG_2328_yh2qrx.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072789/_MG_2300_mlmnvr.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072788/_MG_2234_wrzmgw.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072788/_MG_2255_mowiyu.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072787/_MG_2243_qndksn.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072746/_MG_2338_scceu3.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072745/_MG_2313_xdvimi.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072744/_MG_2271_auqmlw.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072744/_MG_2256_yoft8l.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072739/_MG_2274_lfiv2f.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072739/_MG_2301_izmoro.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072624/_MG_2261_tf20qt.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072607/_MG_2248_xw9tyc.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072606/_MG_2228_peloej.jpg",
      "https://res.cloudinary.com/dzmvzdcpx/image/upload/v1752072607/_MG_2231_ldayd6.jpg",
    ],
  },
];

const sampleVideos = [
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://www.w3schools.com/html/movie.mp4",
];

const tabList = ["Images", "Videos"];

const Media = () => {
  const [activeTab, setActiveTab] = useState("Images");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [selectedAlbumIdx, setSelectedAlbumIdx] = useState(0);

  const openModal = (idx: number) => {
    setCurrentImageIdx(idx);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const prevImage = (
    albumLength = imageAlbums[selectedAlbumIdx].images.length
  ) => {
    setCurrentImageIdx((prev) => (prev === 0 ? albumLength - 1 : prev - 1));
  };

  const nextImage = (
    albumLength = imageAlbums[selectedAlbumIdx].images.length
  ) => {
    setCurrentImageIdx((prev) => (prev === albumLength - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevImage(imageAlbums[selectedAlbumIdx].images.length);
      } else if (e.key === "ArrowRight") {
        nextImage(imageAlbums[selectedAlbumIdx].images.length);
      } else if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen, selectedAlbumIdx, prevImage, nextImage, closeModal]);

  return (
    <MainLayout>
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold text-vet-dark mb-8 text-center">
          Media Gallery
        </h1>
        {/* Tabs */}
        <div className="flex justify-center mb-8 gap-4">
          {tabList.map((tab) => (
            <button
              key={tab}
              className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 border-2 ${
                activeTab === tab
                  ? "bg-vet-teal text-white border-vet-teal"
                  : "bg-white text-vet-teal border-vet-teal hover:bg-vet-teal hover:text-white"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Tab Content */}
        {activeTab === "Images" && (
          <>
            {/* Album Tabs */}
            <div className="flex justify-center mb-6 gap-2 flex-wrap">
              {imageAlbums.map((album, idx) => (
                <button
                  key={album.title}
                  className={`px-4 py-1 rounded-full font-semibold transition-colors duration-200 border-2 text-sm mb-2 ${
                    selectedAlbumIdx === idx
                      ? "bg-vet-blue text-white border-vet-blue"
                      : "bg-white text-vet-blue border-vet-blue hover:bg-vet-blue hover:text-white"
                  }`}
                  onClick={() => setSelectedAlbumIdx(idx)}
                >
                  {album.title}
                </button>
              ))}
            </div>
            {/* Album Images */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {imageAlbums[selectedAlbumIdx].images.map((img, idx) => (
                <div
                  key={"img-" + idx}
                  className="bg-white rounded-lg shadow overflow-hidden flex items-center justify-center cursor-pointer hover:ring-4 hover:ring-vet-teal"
                  onClick={() => openModal(idx)}
                >
                  <img
                    src={img}
                    alt={`Gallery Image ${idx + 1}`}
                    className="w-full h-32 object-contain"
                  />
                </div>
              ))}
            </div>
          </>
        )}
        {activeTab === "Videos" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sampleVideos.map((vid, idx) => (
              <div
                key={"vid-" + idx}
                className="bg-white rounded-lg shadow overflow-hidden flex items-center justify-center"
              >
                <video controls className="w-full h-64 object-contain">
                  <source src={vid} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        )}
        {/* Modal for image expansion and carousel */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold z-60"
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>
            <button
              className="absolute left-4 text-white text-3xl font-bold z-60"
              onClick={() =>
                prevImage(imageAlbums[selectedAlbumIdx].images.length)
              }
              aria-label="Previous"
            >
              &#8592;
            </button>
            <img
              src={imageAlbums[selectedAlbumIdx].images[currentImageIdx]}
              alt={`Gallery Image ${currentImageIdx + 1}`}
              className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-lg object-contain"
            />
            <button
              className="absolute right-4 text-white text-3xl font-bold z-60"
              onClick={() =>
                nextImage(imageAlbums[selectedAlbumIdx].images.length)
              }
              aria-label="Next"
            >
              &#8594;
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Media;
