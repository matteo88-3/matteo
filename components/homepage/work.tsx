"use client";

import React, { useState, useEffect } from "react";
import {
  X, Send, Users, Mic2, BookOpen, Globe, ChevronDown, CheckCircle2,
} from "lucide-react";

type CollabType = "" | "speaking" | "partnership" | "investment" | "media" | "mentorship" | "other";

interface FormState {
  name: string;
  email: string;
  organization: string;
  collabType: CollabType;
  message: string;
}

const COLLAB_TYPES: { value: CollabType; label: string }[] = [
  { value: "speaking", label: "Speaking Engagement" },
  { value: "partnership", label: "Strategic Partnership" },
  { value: "investment", label: "Investment / VC" },
  { value: "media", label: "Media & Podcast" },
  { value: "mentorship", label: "Mentorship / Advisory" },
  { value: "other", label: "Other" },
];

const HIGHLIGHTS = [
  { icon: Mic2, text: "Speaking & keynotes" },
  { icon: Users, text: "Strategic partnerships" },
  { icon: Globe, text: "Global FinTech network" },
  { icon: BookOpen, text: "Media & thought leadership" },
];

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  organization: "",
  collabType: "",
  message: "",
};

export default function CollaborateSection() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => { setSubmitted(false); setForm(EMPTY_FORM); setErrors({}); }, 300);
  };

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Your name is required.";
    if (!form.email.trim()) e.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email.";
    if (!form.collabType) e.collabType = "Please select a collaboration type." as any;
    if (!form.message.trim()) e.message = "Please tell us a bit about your proposal.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  return (
    <>
      {/* ── SECTION ── */}
      <section id="collaborate" className="py-20 bg-primary text-white text-center px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold tracking-widest uppercase text-white/60 mb-3">
            Let's Build Together
          </p>
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Want to collaborate or host an event?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Matteo is open to speaking engagements, strategic partnerships, advisory roles, and media collaborations worldwide.
          </p>

          {/* Highlight pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {HIGHLIGHTS.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm font-medium"
              >
                <Icon className="w-4 h-4 text-white/80" />
                {text}
              </div>
            ))}
          </div>

          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-xl"
          >
            <Users className="w-5 h-5" />
            Partner With Matteo
          </button>
        </div>
      </section>

      {/* ── MODAL ── */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

            {/* Modal header */}
            <div className="flex items-start justify-between p-6 pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Collaborate with Matteo</h3>
                <p className="text-gray-500 text-sm mt-0.5">Fill in the details and he'll be in touch.</p>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0 ml-4"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Success state */}
            {submitted ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Request Sent!</h4>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto mb-6">
                  Thanks for reaching out. Matteo's team will review your message and get back to you shortly.
                </p>
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-full bg-primary text-white font-semibold text-sm hover:opacity-90 transition"
                >
                  Close
                </button>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} noValidate className="p-6 space-y-5">

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sarah Müller"
                    value={form.name}
                    onChange={set("name")}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary/20 transition ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-primary"}`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={set("email")}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary/20 transition ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-primary"}`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Organization */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Organization / Company
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Bank, Startup XYZ"
                    value={form.organization}
                    onChange={set("organization")}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  />
                </div>

                {/* Collaboration type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Type of Collaboration <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={form.collabType}
                      onChange={set("collabType")}
                      className={`w-full appearance-none px-4 py-2.5 rounded-xl border text-sm text-gray-900 outline-none focus:ring-2 focus:ring-primary/20 transition pr-10 ${errors.collabType ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-primary"} ${!form.collabType ? "text-gray-400" : ""}`}
                    >
                      <option value="" disabled>Select a type…</option>
                      {COLLAB_TYPES.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.collabType && <p className="text-red-500 text-xs mt-1">{errors.collabType}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your Proposal <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Briefly describe your idea, event, or proposal…"
                    value={form.message}
                    onChange={set("message")}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary/20 transition resize-none ${errors.message ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-primary"}`}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:opacity-90 disabled:opacity-60 transition-all shadow-md"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Request
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-5 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold text-sm transition"
                  >
                    Cancel
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}