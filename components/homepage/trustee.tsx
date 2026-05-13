import React from 'react';

const Trustee = () => {
  // Generate image paths for picture1.png to picture16.png
  const imageCount = 17;
  const imagePaths = Array.from(
    { length: imageCount },
    (_, i) => `/companies/picture${i + 1}.png`
  );

  // Duplicate the array for seamless infinite scrolling
  const duplicatedImages = [...imagePaths, ...imagePaths];

  return (
    <>
      <style>
        {`
          .marquee-container {
            width: 100%;
            overflow: hidden;
            background: white;
            padding: 1rem 0;
          }

          .marquee-track {
            display: flex;
            animation: scroll 30s linear infinite;
            width: fit-content;
          }

          .marquee-track:hover {
            animation-play-state: paused;
          }

          .marquee-item {
            flex-shrink: 0;
            margin: 0 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* Fixed container to ensure uniform aspect ratio */
          .marquee-item img {
            width: auto;
            height: 60px; /* Adjust this value to control the logo size */
            max-width: 150px;
            object-fit: contain; /* Maintains aspect ratio */
            filter: grayscale(30%);
            transition: filter 0.3s ease;
          }

          .marquee-item img:hover {
            filter: grayscale(0%);
          }

          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          /* Responsive adjustments */
          @media (max-width: 768px) {
            .marquee-item img {
              height: 40px;
              max-width: 100px;
            }
            .marquee-item {
              margin: 0 1rem;
            }
          }
        `}
      </style>

      <section className="bg-white py-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-6">
            Trusted By Industry Leaders
          </p>
          <div className="marquee-container">
            <div className="marquee-track">
              {duplicatedImages.map((src, index) => (
                <div key={index} className="marquee-item">
                  <img
                    src={src}
                    alt={`Company logo ${(index % imageCount) + 1}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Trustee;