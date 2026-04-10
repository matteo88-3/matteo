"use client";
import { useEffect, useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  /* Close on ESC + lock scroll */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Contact Form:", form); // connect API here later

    onClose(); // close after submit
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#0a3e6d] text-white rounded-2xl shadow-2xl max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-8">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 hover:bg-white/10 rounded-full p-1"
          >
            ✕
          </button>

          {/* Title */}
          <h3 className="text-3xl font-bold text-center mb-2">
            Contact Us
          </h3>
          <p className="text-center text-white/70 text-sm mb-8">
            Let’s discuss how we can support your staffing or logistics needs.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="border border-white/30 rounded-xl px-5 py-3">
              <label className="text-xs text-white/70">Full Name</label>
              <input
                name="name"
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none text-white"
                placeholder="Your name"
              />
            </div>

            <div className="border border-white/30 rounded-xl px-5 py-3">
              <label className="text-xs text-white/70">Email Address</label>
              <input
                name="email"
                type="email"
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none text-white"
                placeholder="your@email.com"
              />
            </div>

            <div className="border border-white/30 rounded-xl px-5 py-3">
              <label className="text-xs text-white/70">Message</label>
              <textarea
                name="message"
                rows={4}
                onChange={handleChange}
                required
                className="w-full bg-transparent outline-none text-white resize-none"
                placeholder="How can we help you?"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}