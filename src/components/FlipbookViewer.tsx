'use client'

import React, { useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaDownload, FaExpand, FaCompress } from 'react-icons/fa'
import type { PDFDocumentProxy } from 'pdfjs-dist'

interface FlipbookViewerProps {
  pdfUrl: string
  title?: string
  className?: string
  showHeader?: boolean
}

const FlipbookViewer: React.FC<FlipbookViewerProps> = ({
  pdfUrl,
  title,
  className = '',
  showHeader = true,
}) => {
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [scale, setScale] = useState(1.2)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const [isTwoPage, setIsTwoPage] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  // Flip animation states
  const [flipImage, setFlipImage] = useState<string | null>(null)
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null)
  const [flipActive, setFlipActive] = useState(false)
  const [flipOverlayStyle, setFlipOverlayStyle] = useState<React.CSSProperties | null>(null)
  // Logical (CSS) width of the rendered canvas; the backing store is rendered at
  // devicePixelRatio for sharpness, so we track the CSS size separately.
  const [canvasCssWidth, setCanvasCssWidth] = useState<number | null>(null)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pageContainerRef = useRef<HTMLDivElement>(null)

  // Shared gap used when rendering two pages
  const PAGE_GAP_PX = 20

  // Load PDF.js
  useEffect(() => {
    const loadPDFJS = async () => {
      try {
        const pdfjsLib = await import('pdfjs-dist')

        // Resolve the worker from the installed pdfjs-dist package so the bundler
        // emits it at build time. This guarantees the worker version always matches
        // the API version — bumping pdfjs-dist can no longer cause a version mismatch.
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
          'pdfjs-dist/build/pdf.worker.min.mjs',
          import.meta.url,
        ).toString()

        // Use optimized loading settings for large files
        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          // Enable range requests for better performance
          disableRange: false,
          // Enable streaming for progressive loading
          disableStream: false,
          // Set higher timeout for large files
          maxImageSize: -1,
          // Disable font loading to improve performance
          disableFontFace: true,
        })

        // Add timeout to prevent hanging (increased for large files)
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('PDF loading timeout')), 60000) // 60 seconds
        })

        const pdf = (await Promise.race([loadingTask.promise, timeoutPromise])) as PDFDocumentProxy
        setPdfDoc(pdf)
        setTotalPages(pdf.numPages)
        setIsLoading(false)
      } catch (err) {
        setError('Failed to load PDF. Please try again or contact support.')
        setIsLoading(false)
        console.error('PDF loading error:', err)
      }
    }

    loadPDFJS()
  }, [pdfUrl])

  // Render current page(s)
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return

    const renderPages = async () => {
      try {
        const canvas = canvasRef.current!
        const context = canvas.getContext('2d')!

        // Render the backing store at device resolution so it stays sharp on
        // high-DPI (Retina) screens; the CSS size is kept at the logical size.
        const dpr = window.devicePixelRatio || 1
        const pdfTransform = dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined

        // Page 1 is always shown alone as the cover. Interior pages are paired
        // into spreads (2-3, 4-5, …). On narrow screens everything is single-page.
        const renderAsSpread = isTwoPage && currentPage !== 1 && currentPage + 1 <= totalPages

        if (renderAsSpread) {
          // Render two pages side by side
          const page1 = await pdfDoc.getPage(currentPage)
          const page2 = await pdfDoc.getPage(currentPage + 1)

          const viewport1 = page1.getViewport({ scale })
          const viewport2 = page2.getViewport({ scale })

          const cssWidth = viewport1.width + viewport2.width + PAGE_GAP_PX
          const cssHeight = Math.max(viewport1.height, viewport2.height)

          // Backing store in device pixels, CSS size kept logical
          canvas.width = Math.floor(cssWidth * dpr)
          canvas.height = Math.floor(cssHeight * dpr)
          setCanvasCssWidth(cssWidth)

          // Clear canvas with white background
          context.fillStyle = 'white'
          context.fillRect(0, 0, canvas.width, canvas.height)

          // Create temporary canvases for each page
          const tempCanvas1 = document.createElement('canvas')
          const tempCanvas2 = document.createElement('canvas')
          const tempContext1 = tempCanvas1.getContext('2d')!
          const tempContext2 = tempCanvas2.getContext('2d')!

          // Set temp canvas sizes (device pixels)
          tempCanvas1.width = Math.floor(viewport1.width * dpr)
          tempCanvas1.height = Math.floor(viewport1.height * dpr)
          tempCanvas2.width = Math.floor(viewport2.width * dpr)
          tempCanvas2.height = Math.floor(viewport2.height * dpr)

          // Fill temp canvases with white background
          tempContext1.fillStyle = 'white'
          tempContext1.fillRect(0, 0, tempCanvas1.width, tempCanvas1.height)
          tempContext2.fillStyle = 'white'
          tempContext2.fillRect(0, 0, tempCanvas2.width, tempCanvas2.height)

          // Render pages to temp canvases
          await page1.render({
            canvasContext: tempContext1,
            viewport: viewport1,
            canvas: tempCanvas1,
            transform: pdfTransform,
          }).promise

          await page2.render({
            canvasContext: tempContext2,
            viewport: viewport2,
            canvas: tempCanvas2,
            transform: pdfTransform,
          }).promise

          // Draw temp canvases to main canvas (device-pixel coordinates)
          context.drawImage(tempCanvas1, 0, 0)
          context.drawImage(tempCanvas2, Math.floor((viewport1.width + PAGE_GAP_PX) * dpr), 0)
        } else {
          // Render single page (cover, mobile view, or trailing odd page)
          const page = await pdfDoc.getPage(currentPage)
          const viewport = page.getViewport({ scale })

          canvas.width = Math.floor(viewport.width * dpr)
          canvas.height = Math.floor(viewport.height * dpr)
          setCanvasCssWidth(viewport.width)

          // Clear canvas with white background
          context.fillStyle = 'white'
          context.fillRect(0, 0, canvas.width, canvas.height)

          await page.render({
            canvasContext: context,
            viewport: viewport,
            canvas: canvas,
            transform: pdfTransform,
          }).promise
        }
      } catch (err) {
        console.error('Page rendering error:', err)
      }
    }

    renderPages()
  }, [pdfDoc, currentPage, scale, isTwoPage, totalPages])

  // Check screen size for two-page layout
  useEffect(() => {
    const checkScreenSize = () => {
      const twoPage = window.innerWidth >= 1024 // lg breakpoint
      setIsTwoPage(twoPage)
      // Snap odd interior pages down to the even page so spreads stay aligned
      // (2-3, 4-5, …) after the lone cover when entering two-page mode.
      if (twoPage) {
        setCurrentPage((p) => (p !== 1 && p % 2 === 1 ? p - 1 : p))
      }
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Keep isFullscreen in sync with the real fullscreen state (e.g. Esc to exit).
  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const goToPage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages || isFlipping) return

    const canvas = canvasRef.current
    const pageContainer = pageContainerRef.current

    // Prepare flip overlay snapshot & placement
    if (canvas && pageContainer) {
      try {
        let dataUrl: string | null = null
        let overlayStyle: React.CSSProperties | null = null

        const canvasRect = canvas.getBoundingClientRect()
        const parentRect = pageContainer.getBoundingClientRect()
        const cssWidth = canvasCssWidth || canvas.width
        // Whether the page currently on screen is a two-page spread (the cover
        // and trailing odd pages render single even in two-page mode).
        const currentIsSpread = isTwoPage && currentPage !== 1 && currentPage + 1 <= totalPages

        if (currentIsSpread) {
          const deviceScale = canvas.width / cssWidth // device px per CSS px (~dpr)
          const gapDevice = PAGE_GAP_PX * deviceScale
          const nativePageWidth = Math.max(0, (canvas.width - gapDevice) / 2)
          const isNext = pageNumber > currentPage
          const which = isNext ? 'right' : 'left'
          const sx = which === 'right' ? nativePageWidth + gapDevice : 0

          // Crop only the half being flipped
          const tempCanvas = document.createElement('canvas')
          tempCanvas.width = nativePageWidth
          tempCanvas.height = canvas.height
          const tctx = tempCanvas.getContext('2d')!
          tctx.fillStyle = 'white'
          tctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height)
          tctx.drawImage(
            canvas,
            sx,
            0,
            nativePageWidth,
            canvas.height,
            0,
            0,
            nativePageWidth,
            canvas.height,
          )
          dataUrl = tempCanvas.toDataURL('image/png')

          // Position overlay exactly over the flipped half
          const gapDisplay = PAGE_GAP_PX * (canvasRect.width / cssWidth)
          const pageDisplayWidth = (canvasRect.width - gapDisplay) / 2
          const overlayLeft =
            canvasRect.left -
            parentRect.left +
            (which === 'right' ? pageDisplayWidth + gapDisplay : 0)
          overlayStyle = {
            position: 'absolute',
            top: canvasRect.top - parentRect.top,
            left: overlayLeft,
            width: pageDisplayWidth,
            height: canvasRect.height,
            borderRadius: 8,
          }

          setFlipDirection(isNext ? 'next' : 'prev')
        } else {
          // Single page: capture full canvas
          dataUrl = canvas.toDataURL('image/png')
          overlayStyle = {
            position: 'absolute',
            top: canvasRect.top - parentRect.top,
            left: canvasRect.left - parentRect.left,
            width: canvasRect.width,
            height: canvasRect.height,
            borderRadius: 8,
          }
          setFlipDirection(pageNumber > currentPage ? 'next' : 'prev')
        }

        setFlipImage(dataUrl)
        setFlipOverlayStyle(overlayStyle)
        setFlipActive(false)
        // Ensure transition kicks in after overlay is mounted
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setFlipActive(true))
        })
      } catch (e) {
        setFlipImage(null)
        setFlipDirection(null)
        setFlipOverlayStyle(null)
      }
    }

    setIsFlipping(true)
    setCurrentPage(pageNumber) // Render target page(s) beneath the flipping overlay

    // End flip after animation duration
    setTimeout(() => {
      setIsFlipping(false)
      setFlipImage(null)
      setFlipDirection(null)
      setFlipOverlayStyle(null)
      setFlipActive(false)
    }, 600)
  }

  // In two-page mode, page 1 is the lone cover, then spreads start at even pages
  // (2-3, 4-5, …). canGoNext/canGoPrev also drive the arrow disabled states.
  const canGoPrev = currentPage > 1
  const canGoNext = isTwoPage
    ? currentPage === 1
      ? totalPages >= 2
      : currentPage + 2 <= totalPages
    : currentPage < totalPages

  const nextPage = () => {
    if (!canGoNext) return
    if (isTwoPage) {
      // From the cover (page 1) step into the first spread (page 2).
      goToPage(currentPage === 1 ? 2 : currentPage + 2)
    } else {
      goToPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (!canGoPrev) return
    if (isTwoPage) {
      // From the first spread (page 2) step back to the cover.
      goToPage(currentPage === 2 ? 1 : currentPage - 2)
    } else {
      goToPage(currentPage - 1)
    }
  }

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
      // isFullscreen is synced by the fullscreenchange listener below.
    } catch (err) {
      console.error('Fullscreen error:', err)
    }
  }

  const downloadPDF = async () => {
    const fileName = `${(title || 'document').replace(/\.pdf$/i, '')}.pdf`
    try {
      // Fetch as a blob so the browser downloads the file (with the right name)
      // instead of navigating to / opening the PDF in a new tab.
      const response = await fetch(pdfUrl)
      const blob = await response.blob()
      const objectUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = objectUrl
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(objectUrl)
    } catch (err) {
      console.error('Download error:', err)
      // Fallback: open in a new tab if the fetch/blob download fails.
      window.open(pdfUrl, '_blank')
    }
  }

  // Swipe handlers for mobile
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentPage < totalPages) {
      nextPage()
    }
    if (isRightSwipe && currentPage > 1) {
      prevPage()
    }
  }

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center min-h-[400px] ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading PDF...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center min-h-[400px] ${className}`}>
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`${isFullscreen ? 'bg-white flex items-center justify-center' : showHeader ? 'bg-white' : 'bg-transparent'} rounded-lg shadow-lg overflow-hidden ${className}`}
    >
      {/* Header */}
      {showHeader && (
        <div className="bg-slate-50 border-b border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">{title || 'PDF Document'}</h2>
              <p className="text-sm text-slate-600">
                {isTwoPage
                  ? `${Math.ceil(currentPage / 2)} / ${Math.ceil(totalPages / 2)}`
                  : `${currentPage} / ${totalPages}`}{' '}
                pages
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={downloadPDF}
                className="p-2 text-slate-600 hover:text-sky-600 hover:bg-slate-100 rounded-lg transition-colors"
                title="Download PDF"
              >
                <FaDownload className="w-4 h-4" />
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 text-slate-600 hover:text-sky-600 hover:bg-slate-100 rounded-lg transition-colors"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? (
                  <FaCompress className="w-4 h-4" />
                ) : (
                  <FaExpand className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Viewer */}
      <div
        className={`relative ${showHeader ? 'bg-slate-100' : 'bg-white/80 backdrop-blur-sm'} ${isFullscreen ? 'h-screen w-screen' : 'min-h-[600px]'} flex items-center justify-center rounded-xl border border-slate-200/50`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ perspective: '2000px' }}
      >
        {/* Page Display */}
        <div
          ref={pageContainerRef}
          className={`relative transition-transform duration-300 ${isFlipping ? 'scale-95' : 'scale-100'} p-4`}
        >
          <canvas
            ref={canvasRef}
            className="shadow-2xl rounded-lg bg-white"
            style={{
              maxWidth: '100%',
              height: 'auto',
              width: canvasCssWidth ? `${canvasCssWidth}px` : undefined,
            }}
          />
          {/* Flip Overlay */}
          {flipImage && flipOverlayStyle && (
            <div
              className="z-20 shadow-2xl"
              style={{
                ...flipOverlayStyle,
                backgroundImage: `url(${flipImage})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                transformOrigin:
                  flipDirection === 'next' ? ('left center' as const) : ('right center' as const),
                transform: flipActive
                  ? `rotateY(${flipDirection === 'next' ? '180deg' : '-180deg'})`
                  : 'rotateY(0deg)',
                transition: 'transform 0.6s ease',
                backfaceVisibility: 'hidden' as const,
              }}
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-2">
            <button
              onClick={downloadPDF}
              className="p-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
              title="Download PDF"
            >
              <FaDownload className="w-4 h-4 text-slate-600" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg hover:bg-white transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? (
                <FaCompress className="w-4 h-4 text-slate-600" />
              ) : (
                <FaExpand className="w-4 h-4 text-slate-600" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Controls - Hidden on mobile for swipe functionality */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 hidden lg:block">
          <button
            onClick={prevPage}
            disabled={!canGoPrev}
            className="p-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            title="Previous Page"
          >
            <FaChevronLeft className="w-5 h-5 text-slate-700" />
          </button>
        </div>

        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 hidden lg:block">
          <button
            onClick={nextPage}
            disabled={!canGoNext}
            className="p-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            title="Next Page"
          >
            <FaChevronRight className="w-5 h-5 text-slate-700" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default FlipbookViewer
