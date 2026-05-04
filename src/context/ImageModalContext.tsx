"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type MediaType = "image" | "video";

interface ImageModalContextType {
  openModal: (src: string, alt?: string, type?: MediaType) => void;
  closeModal: () => void;
}

const ImageModalContext = createContext<ImageModalContextType | undefined>(undefined);

export function ImageModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMedia, setCurrentMedia] = useState({ src: "", alt: "", type: "image" as MediaType });

  const openModal = (src: string, alt: string = "", type: MediaType = "image") => {
    setCurrentMedia({ src, alt, type });
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <ImageModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="image-modal-overlay"
          >
            <motion.button
              className="image-modal-close"
              onClick={closeModal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={32} />
            </motion.button>

            <div className="image-modal-content-wrap" onClick={(e) => e.stopPropagation()}>
              {currentMedia.type === "image" ? (
                <motion.img
                  src={currentMedia.src}
                  alt={currentMedia.alt}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="image-modal-img"
                />
              ) : (
                <motion.video
                  src={currentMedia.src}
                  controls
                  autoPlay
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="image-modal-video"
                />
              )}
              
              {currentMedia.alt && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="image-modal-caption"
                >
                  {currentMedia.alt}
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ImageModalContext.Provider>
  );
}

export function useImageModal() {
  const context = useContext(ImageModalContext);
  if (!context) {
    throw new Error("useImageModal debe usarse dentro de un ImageModalProvider");
  }
  return context;
}
