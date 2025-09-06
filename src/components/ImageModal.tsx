'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import { FaTimes, FaExternalLinkAlt } from 'react-icons/fa'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  imageAlt: string
  title: string
  link?: string | null
}

const ImageModal = ({ isOpen, onClose, imageUrl, imageAlt, title, link }: ImageModalProps) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleLinkClick = () => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative">
        {/* Close Button - Positioned just outside the modal */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 p-2 bg-black/80 text-white hover:bg-black rounded-full transition-colors duration-200 z-10 shadow-lg"
          aria-label="Close modal"
        >
          <FaTimes className="w-4 h-4" />
        </button>

        {/* Image Container - Just the image, no extra white space */}
        <div
          className="relative shadow-2xl rounded-lg overflow-hidden"
          style={{ aspectRatio: '210/297', width: 'min(70vw, 500px)' }}
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-contain bg-white"
            sizes="(max-width: 768px) 70vw, 500px"
            priority
          />
        </div>

        {/* Link Button - Floating below image */}
        {link && (
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <button
              onClick={handleLinkClick}
              className="flex items-center gap-2 px-3 py-2 bg-white text-slate-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium shadow-lg text-sm"
            >
              <FaExternalLinkAlt className="w-3 h-3" />
              Buka Link
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageModal
