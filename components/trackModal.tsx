"use client";
import { useEffect } from "react";

interface TrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TrackingModal({ isOpen, onClose }: TrackingModalProps) {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose} // Close when clicking backdrop
    >
      <div 
        className="bg-[#0a3e6d] backdrop-blur text-white rounded-2xl p-6 shadow-xl max-w-md w-full mx-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className="relative p-6 py-8 bg-blueGray-900 bg-opacity-30 rounded-5xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 hover:bg-white/10 rounded-full p-1 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <h3 className="mb-4 text-2xl font-bold text-white text-center">
            Track Your Shipment
          </h3>
          <p className="mb-6 text-white/80 text-center text-sm">
            Enter your tracking number to check the status of your shipment
          </p>

          <div className="flex flex-wrap -m-2">
            <div className="w-full p-2">
              <div className="relative border border-white overflow-hidden rounded-2xl">
                <span className="absolute top-2.5 left-6 inline-block text-xs text-gray-300">
                  Tracking Number
                </span>
                <input
                  className="px-6 pt-6 pb-2.5 text-white w-full placeholder-gray-300 outline-none bg-transparent"
                  type="text"
                  placeholder="Enter tracking number"
                />
              </div>
            </div>

            <div className="w-full p-2">
              <div className="flex flex-wrap pt-2 -m-3">
                <div className="w-full p-3">
                  <button
                    className="w-full px-14 py-2 text-center font-medium tracking-2xl border-2 border-yellow-400 bg-yellow-400 hover:bg-yellow-500 text-black focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-40 rounded-full transition duration-300"
                  >
                    Track Shipment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}