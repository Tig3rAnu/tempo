import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { MenuBar } from './tiptap/MenuBar';

export default function HtmlEditor({ value, onChange = () => {}, placeholder = '' }) {
  const editor = useEditor({
    extensions: [
      StarterKit.extend({
        addKeyboardShortcuts() {
          return {
            'Mod-b': () => this.editor.chain().focus().toggleBold().run(),
            'Mod-i': () => this.editor.chain().focus().toggleItalic().run(),
            'Mod-u': () => this.editor.chain().focus().toggleUnderline().run(),
            'Mod-k': () => {
              const url = prompt('Enter URL');
              if (url) this.editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
              return true;
            },
            'Mod-z': () => this.editor.chain().focus().undo().run(),
            'Mod-y': () => this.editor.chain().focus().redo().run(),
          };
        }
      }),
      Underline,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty' // allows styling when empty
      })
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-full focus:outline-none min-h-[120px] p-2',
        'data-placeholder': placeholder
      }
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    }
  });

  // keep editor in sync when the value prop changes externally
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value == null) return;
    if (current !== value) {
      // only update when the two differ to avoid cursor jumps
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  // if editor hasn't initialized yet render nothing
  if (!editor) return null;
  return (<><MenuBar editor={editor} /><EditorContent editor={editor} /></>);
}
