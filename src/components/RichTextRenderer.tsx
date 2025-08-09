'use client'

import React from 'react'
import Image from 'next/image'

interface MediaValue {
  id: string
  filename: string
  url: string
  width: number
  height: number
  alt?: string
  caption?: string
}

interface LexicalNode {
  type: string
  children?: LexicalNode[]
  text?: string
  format?: number
  tag?: string
  version?: number
  direction?: string
  indent?: number
  listType?: string
  start?: number
  listValue?: number
  checked?: boolean
  url?: string
  altText?: string
  width?: number
  height?: number
  src?: string
  titleText?: string
  caption?: LexicalNode[]
  // Additional properties for Payload CMS uploads
  relationTo?: string
  value?: MediaValue
}

interface LexicalContent {
  root: {
    children: LexicalNode[]
  }
}

interface RichTextRendererProps {
  content: LexicalContent | null | undefined
  className?: string
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content, className = '' }) => {
  if (!content || !content.root || !content.root.children) {
    return <div className={className}>No content available</div>
  }

  const renderNode = (node: LexicalNode, index: number): React.ReactNode => {
    if (node.type === 'paragraph') {
      return (
        <p key={index} className="mb-4 leading-relaxed text-slate-700">
          {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
        </p>
      )
    }

    if (node.type === 'heading') {
      const tag = node.tag || 'h2'
      const validTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
      const Tag = validTags.includes(tag) ? tag : 'h2'

      const headingClasses = {
        h1: 'text-3xl font-bold text-slate-800 mb-6 mt-8',
        h2: 'text-2xl font-bold text-slate-800 mb-4 mt-6',
        h3: 'text-xl font-bold text-slate-800 mb-4 mt-6',
        h4: 'text-lg font-bold text-slate-800 mb-3 mt-5',
        h5: 'text-base font-bold text-slate-800 mb-3 mt-4',
        h6: 'text-sm font-bold text-slate-800 mb-2 mt-3',
      }

      const className = headingClasses[Tag as keyof typeof headingClasses] || headingClasses.h2

      return React.createElement(
        Tag,
        { key: index, className },
        node.children?.map((child, childIndex) => renderNode(child, childIndex)),
      )
    }

    if (node.type === 'text') {
      let text: React.ReactNode = node.text || ''

      // Apply formatting based on format flags
      if (node.format) {
        if (node.format & 1) text = <strong>{text}</strong> // Bold
        if (node.format & 2) text = <em>{text}</em> // Italic
        if (node.format & 4) text = <u>{text}</u> // Underline
        if (node.format & 8) text = <code className="bg-gray-100 px-1 rounded">{text}</code> // Code
      }

      return <React.Fragment key={index}>{text}</React.Fragment>
    }

    if (node.type === 'list') {
      const ListTag = node.listType === 'number' ? 'ol' : 'ul'
      const listStyles =
        node.listType === 'number'
          ? 'list-decimal list-inside mb-4 space-y-2 text-slate-700'
          : 'list-disc list-inside mb-4 space-y-2 text-slate-700'

      return (
        <ListTag key={index} className={listStyles}>
          {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
        </ListTag>
      )
    }

    if (node.type === 'listitem') {
      return (
        <li key={index} className="leading-relaxed">
          {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
        </li>
      )
    }

    if (node.type === 'image') {
      // Handle Payload CMS upload relationship
      if (node.relationTo === 'media' && node.value) {
        const media = node.value
        return (
          <div key={index} className="my-8">
            <div className="w-full rounded-2xl overflow-hidden">
              <Image
                src={media.url}
                alt={media.alt || node.altText || ''}
                width={media.width || 800}
                height={media.height || 600}
                className="w-full h-auto object-contain"
              />
            </div>
            {node.caption && (
              <p className="text-sm text-gray-500 mt-3 text-center italic">
                {node.caption.map((captionNode, captionIndex) =>
                  renderNode(captionNode, captionIndex),
                )}
              </p>
            )}
          </div>
        )
      }

      // Handle direct image src
      if (node.src) {
        return (
          <div key={index} className="my-8">
            <div className="w-full rounded-2xl overflow-hidden">
              <Image
                src={node.src}
                alt={node.altText || ''}
                width={node.width || 800}
                height={node.height || 600}
                className="w-full h-auto object-contain"
              />
            </div>
            {node.caption && (
              <p className="text-sm text-gray-500 mt-3 text-center italic">
                {node.caption.map((captionNode, captionIndex) =>
                  renderNode(captionNode, captionIndex),
                )}
              </p>
            )}
          </div>
        )
      }

      return null
    }

    // Handle Payload CMS upload nodes
    if (node.type === 'upload') {
      if (node.relationTo === 'media' && node.value) {
        const media = node.value
        return (
          <div key={index} className="my-8">
            <div className="w-full rounded-2xl overflow-hidden">
              <Image
                src={media.url}
                alt={media.alt || media.filename || 'Uploaded image'}
                width={media.width || 800}
                height={media.height || 600}
                className="w-full h-auto object-contain"
              />
            </div>
            {media.caption && (
              <p className="text-sm text-gray-500 mt-3 text-center italic">{media.caption}</p>
            )}
          </div>
        )
      }

      return null
    }

    if (node.type === 'link') {
      return (
        <a
          key={index}
          href={node.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
        </a>
      )
    }

    if (node.type === 'quote') {
      return (
        <blockquote
          key={index}
          className="border-l-4 border-sky-400 pl-6 italic my-6 text-slate-600 bg-sky-50 py-4 rounded-r-lg"
        >
          {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
        </blockquote>
      )
    }

    // Handle code blocks
    if (node.type === 'code') {
      return (
        <pre key={index} className="bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto">
          <code className="text-sm font-mono">
            {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
          </code>
        </pre>
      )
    }

    // Handle line breaks
    if (node.type === 'linebreak') {
      return <br key={index} />
    }

    // Handle horizontal rules
    if (node.type === 'horizontalrule') {
      return <hr key={index} className="my-8 border-gray-300" />
    }

    // Handle unknown node types
    // (Removed debug logging since images are now working properly)

    // Default: render children if they exist
    if (node.children) {
      return node.children.map((child, childIndex) => renderNode(child, childIndex))
    }

    // If it's an unknown node type that might be an image/media
    if (
      node.type &&
      (node.type.includes('media') || node.type.includes('upload') || node.type.includes('image'))
    ) {
      return (
        <div
          key={index}
          className="my-4 p-4 border-2 border-dashed border-yellow-300 bg-yellow-50 rounded-lg"
        >
          <p className="text-sm text-yellow-700">
            Media content detected but not rendered. Node type: {node.type}
          </p>
          <details className="mt-2">
            <summary className="text-xs text-yellow-600 cursor-pointer">Debug Info</summary>
            <pre className="text-xs mt-2 overflow-auto">{JSON.stringify(node, null, 2)}</pre>
          </details>
        </div>
      )
    }

    return null
  }

  return (
    <div className={className}>
      {content.root.children.map((node: LexicalNode, index: number) => renderNode(node, index))}
    </div>
  )
}

export default RichTextRenderer
