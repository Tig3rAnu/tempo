import React from 'react';

// lightweight Tailwind‑styled toolbar for tiptap
export const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const btn = (active = false) =>
    `px-2 py-1 rounded text-sm hover:bg-gray-100 focus:outline-none ${
      active ? 'bg-gray-200 text-gray-900' : 'text-gray-600'
    }`;

  return (
    <div className="flex flex-wrap gap-1 mb-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={btn(editor.isActive('bold'))}
        title="Bold (Ctrl+B)"
      >
        <strong>B</strong>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={btn(editor.isActive('italic'))}
        title="Italic (Ctrl+I)"
      >
        <em>I</em>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={btn(editor.isActive('underline'))}
        title="Underline (Ctrl+U)"
      >
        <u>U</u>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={btn(editor.isActive('strike'))}
        title="Strikethrough"
      >
        <s>S</s>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={btn(editor.isActive('code'))}
        title="Inline code"
      >
        {'</>'}
      </button>
      <button
        type="button"
        onClick={() => {
          const url = prompt('Enter URL');
          if (url) editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        }}
        className={btn(editor.isActive('link'))}
        title="Link (Ctrl+K)"
      >
        🔗
      </button>
      <select
        className="px-2 py-1 rounded border border-gray-200 bg-white text-sm focus:outline-none"
        value={
          editor.isActive('heading', { level: 1 })
            ? 1
            : editor.isActive('heading', { level: 2 })
            ? 2
            : editor.isActive('heading', { level: 3 })
            ? 3
            : ''
        }
        onChange={(e) => {
          const lvl = Number(e.target.value);
          if (!lvl) {
            editor.chain().focus().unsetHeading().run();
          } else {
            editor.chain().focus().toggleHeading({ level: lvl }).run();
          }
        }}
        title="Heading"
      >
        <option value="">Normal</option>
        <option value="1">H1</option>
        <option value="2">H2</option>
        <option value="3">H3</option>
      </select>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={btn(editor.isActive('bulletList'))}
        title="Bullet list"
      >
        • List
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={btn(editor.isActive('orderedList'))}
        title="Numbered list"
      >
        1. List
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={btn(editor.isActive('blockquote'))}
        title="Blockquote"
      >
        “ ”
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={btn(editor.isActive('codeBlock'))}
        title="Code block"
      >
        {'{}'}
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={btn(false)}
        title="Horizontal rule"
      >
        —
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className={btn(false)}
        title="Undo (Ctrl+Z)"
      >
        ↺
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className={btn(false)}
        title="Redo (Ctrl+Y)"
      >
        ↻
      </button>
    </div>
  );
};
