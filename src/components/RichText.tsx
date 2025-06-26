import React from 'react'

// Type for Payload's Lexical rich text format
interface LexicalRichText {
  root: {
    type: string
    children: {
      type: string
      version: number
      text?: string
      [k: string]: unknown
    }[]
    direction: ('ltr' | 'rtl') | null
    format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
    indent: number
    version: number
  }
  [k: string]: unknown
}

interface RichTextProps {
  content: LexicalRichText | string | null | undefined
  className?: string
}

export default function RichText({ content, className = '' }: RichTextProps) {
  if (!content) return null

  // If content is a string, render it directly
  if (typeof content === 'string') {
    return (
      <div className={className}>
        {content.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < content.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    )
  }

  // Handle Lexical rich text format
  const extractTextFromLexical = (lexicalContent: LexicalRichText): string => {
    if (!lexicalContent.root?.children) return ''

    return lexicalContent.root.children.map((child) => child.text || '').join('\n')
  }

  const text = extractTextFromLexical(content)

  return (
    <div className={className}>
      {text.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < text.split('\n').length - 1 && <br />}
        </React.Fragment>
      ))}
    </div>
  )
}
