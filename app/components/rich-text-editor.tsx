'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { Icon } from '@iconify/react'
import { useCallback } from 'react'

interface RichTextEditorProps {
  content?: string
  onChange?: (content: string) => void
  placeholder?: string
  editable?: boolean
  className?: string
}

export default function RichTextEditor({
  content = '',
  onChange,
  placeholder = 'Start typing...',
  editable = true,
  className = '',
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary hover:underline',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    editable,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none',
      },
    },
  })

  const setLink = useCallback(() => {
    if (!editor) return

    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div
      className={`border border-border rounded-md bg-background ${className}`}
    >
      {editable && (
        <div className='border-b border-border p-2 flex flex-wrap gap-1'>
          {/* Text formatting */}
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-muted transition-colors ${
              editor.isActive('bold')
                ? 'bg-muted text-primary'
                : 'text-muted-foreground'
            }`}
            title='Bold'
          >
            <Icon icon='ph:text-b-duotone' width={16} />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-muted transition-colors ${
              editor.isActive('italic')
                ? 'bg-muted text-primary'
                : 'text-muted-foreground'
            }`}
            title='Italic'
          >
            <Icon icon='ph:text-italic-duotone' width={16} />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-2 rounded hover:bg-muted transition-colors ${
              editor.isActive('strike')
                ? 'bg-muted text-primary'
                : 'text-muted-foreground'
            }`}
            title='Strikethrough'
          >
            <Icon icon='ph:text-strikethrough-duotone' width={16} />
          </button>

          {/* Separator */}
          <div className='w-px h-6 bg-border mx-1' />

          {/* Headings */}
          <button
            type='button'
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`p-2 rounded hover:bg-muted transition-colors ${
              editor.isActive('heading', { level: 1 })
                ? 'bg-muted text-primary'
                : 'text-muted-foreground'
            }`}
            title='Heading 1'
          >
            <Icon icon='ph:text-h-one-duotone' width={16} />
          </button>
          <button
            type='button'
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`p-2 rounded hover:bg-muted transition-colors ${
              editor.isActive('heading', { level: 2 })
                ? 'bg-muted text-primary'
                : 'text-muted-foreground'
            }`}
            title='Heading 2'
          >
            <Icon icon='ph:text-h-two-duotone' width={16} />
          </button>
          <button
            type='button'
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`p-2 rounded hover:bg-muted transition-colors ${
              editor.isActive('heading', { level: 3 })
                ? 'bg-muted text-primary'
                : 'text-muted-foreground'
            }`}
            title='Heading 3'
          >
            <Icon icon='ph:text-h-three-duotone' width={16} />
          </button>

          {/* Separator */}
          <div className='w-px h-6 bg-border mx-1' />

          {/* Lists */}
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-muted transition-colors ${
              editor.isActive('bulletList')
                ? 'bg-muted text-primary'
                : 'text-muted-foreground'
            }`}
            title='Bullet List'
          >
            <Icon icon='ph:list-bullets-duotone' width={16} />
          </button>
          <button
            type='button'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-muted transition-colors ${
              editor.isActive('orderedList')
                ? 'bg-muted text-primary'
                : 'text-muted-foreground'
            }`}
            title='Numbered List'
          >
            <Icon icon='ph:list-numbers-duotone' width={16} />
          </button>

          {/* Separator */}
          <div className='w-px h-6 bg-border mx-1' />

          {/* Link */}
          <button
            type='button'
            onClick={setLink}
            className={`p-2 rounded hover:bg-muted transition-colors ${
              editor.isActive('link')
                ? 'bg-muted text-primary'
                : 'text-muted-foreground'
            }`}
            title='Add Link'
          >
            <Icon icon='ph:link-duotone' width={16} />
          </button>

          {/* Separator */}
          <div className='w-px h-6 bg-border mx-1' />

          {/* Clear formatting */}
          <button
            type='button'
            onClick={() =>
              editor.chain().focus().clearNodes().unsetAllMarks().run()
            }
            className='p-2 rounded hover:bg-muted transition-colors text-muted-foreground'
            title='Clear Formatting'
          >
            <Icon icon='ph:text-aa-duotone' width={16} />
          </button>
        </div>
      )}

      <div className='p-3'>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
