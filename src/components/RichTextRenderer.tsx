'use client'

import React from 'react'
import Image from 'next/image'

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
  value?: number
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
  value?: {
    id: string
    filename: string
    url: string
    width: number
    height: number
    alt?: string
  }
}

interface RichTextRendererProps {
  content: any
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
      const Tag = tag as keyof JSX.IntrinsicElements
      return (
        <Tag key={index} className="font-bold text-slate-800 mb-4 mt-6">
          {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
        </Tag>
      )
    }

    if (node.type === 'text') {
      let text = node.text || ''

      // Apply formatting based on format flags
      if (node.format) {
        if (node.format & 1) text = <strong key={index}>{text}</strong> // Bold
        if (node.format & 2) text = <em key={index}>{text}</em> // Italic
        if (node.format & 4) text = <u key={index}>{text}</u> // Underline
        if (node.format & 8)
          text = (
            <code key={index} className="bg-gray-100 px-1 rounded">
              {text}
            </code>
          ) // Code
      }

      return text
    }

    if (node.type === 'list') {
      const ListTag = node.listType === 'number' ? 'ol' : 'ul'
      return (
        <ListTag key={index} className="mb-4 ml-6">
          {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
        </ListTag>
      )
    }

    if (node.type === 'listitem') {
      return (
        <li key={index} className="mb-2">
          {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
        </li>
      )
    }

    if (node.type === 'image') {
      return (
        <div key={index} className="my-6">
          <img
            src={node.src}
            alt={node.altText || ''}
            width={node.width}
            height={node.height}
            className="max-w-full h-auto rounded-lg"
          />
          {node.caption && (
            <p className="text-sm text-gray-500 mt-2 text-center">
              {node.caption.map((captionNode, captionIndex) =>
                renderNode(captionNode, captionIndex),
              )}
            </p>
          )}
        </div>
      )
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
        <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic my-4">
          {node.children?.map((child, childIndex) => renderNode(child, childIndex))}
        </blockquote>
      )
    }

    // Default: render children if they exist
    if (node.children) {
      return node.children.map((child, childIndex) => renderNode(child, childIndex))
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
