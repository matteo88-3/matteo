"use client";

import React, { useEffect, useRef, useState } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";

/*
  Floating language switcher powered by Google Website Translator.
  - Injects Google's translate script once, hidden from view.
  - Renders a custom-styled dropdown (flags + names) instead of Google's
    default ugly widget.
  - Selecting a language sets the hidden Google <select>'s value and
    dispatches a change event, which triggers translation in place
    (no page reload).

  Edit the LANGUAGES array below to add/remove languages. The `code`
  must be a valid Google Translate language code.
*/

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
];

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Guard against a known Google Translate + React DOM conflict:
  // Google Translate rewrites text nodes directly, which can make React
  // try to remove/insert nodes that no longer exist where it expects,
  // throwing "Failed to execute 'removeChild'/'insertBefore' on 'Node'".
  // This patch makes those specific calls fail silently instead of
  // crashing the whole app.
  useEffect(() => {
    if (typeof Node === "function" && Node.prototype) {
      const originalRemoveChild = Node.prototype.removeChild;
      const originalInsertBefore = Node.prototype.insertBefore;

      // @ts-ignore
      Node.prototype.removeChild = function (child: any) {
        if (child.parentNode !== this) {
          if (console) console.warn("Cannot remove a child from a different parent", child, this);
          return child;
        }
        return originalRemoveChild.apply(this, arguments as any);
      };

      // @ts-ignore
      Node.prototype.insertBefore = function (newNode: any, referenceNode: any) {
        if (referenceNode && referenceNode.parentNode !== this) {
          if (console) console.warn("Cannot insert before a reference node from a different parent", referenceNode, this);
          return newNode;
        }
        return originalInsertBefore.apply(this, arguments as any);
      };

      return () => {
        Node.prototype.removeChild = originalRemoveChild;
        Node.prototype.insertBefore = originalInsertBefore;
      };
    }
  }, []);

  // Load Google Translate script once
  useEffect(() => {
    if (scriptLoaded.current) return;
    scriptLoaded.current = true;

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: LANGUAGES.map((l) => l.code).join(","),
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Restore previously selected language (persisted via cookie by Google,
    // but we also mirror it in localStorage for our own UI state)
    const saved = localStorage.getItem("preferredLang");
    if (saved) setCurrentLang(saved);
  }, []);

  const changeLanguage = (code: string) => {
    setOpen(false);
    setCurrentLang(code);
    localStorage.setItem("preferredLang", code);

    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = code;
      select.dispatchEvent(new Event("change"));
    } else {
      // Google widget not ready yet; retry shortly
      setTimeout(() => {
        const retrySelect = document.querySelector<HTMLSelectElement>(".goog-te-combo");
        if (retrySelect) {
          retrySelect.value = code;
          retrySelect.dispatchEvent(new Event("change"));
        }
      }, 800);
    }
  };

  const current = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <>
      {/* Hidden Google widget mount point — Google injects its UI here,
          we keep it visually hidden and drive it via our own dropdown */}
      <div id="google_translate_element" style={{ display: "none" }} />

      <div ref={containerRef} className="fixed bottom-6 left-6 z-40">
        {open && (
          <div className="mb-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="text-base">{lang.flag}</span>
                  {lang.label}
                </span>
                {currentLang === lang.code && <Check className="w-4 h-4 text-primary" />}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Change language"
          className="flex items-center gap-2 bg-white shadow-lg border border-gray-200 rounded-full pl-3 pr-3.5 py-2.5 hover:shadow-xl transition-shadow"
        >
          <Globe className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-gray-700">{current.flag} {current.code.toUpperCase()}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Hide Google's default banner/toolbar that appears at the top of the page */}
      <style jsx global>{`
        .goog-te-banner-frame.skiptranslate {
          display: none !important;
        }
        body {
          top: 0px !important;
        }
        .goog-te-gadget {
          height: 0;
          overflow: hidden;
        }
        #goog-gt-tt, .goog-te-balloon-frame {
          display: none !important;
        }
        .goog-text-highlight {
          background: none !important;
          box-shadow: none !important;
        }
      `}</style>
    </>
  );
}
