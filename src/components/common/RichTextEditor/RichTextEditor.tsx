import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import "./RichTextEditor.css";

interface RichTextEditorProps {
    label: string;
    value?: string;
    placeholder?: string;
    onChange: (value: string) => void;
}

export default function RichTextEditor({
                                           label,
                                           value = "",
                                           placeholder,
                                           onChange
                                       }: RichTextEditorProps) {

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],

        content: value,

        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },

        editorProps: {
            attributes: {
                class: "rich-text-editor-content"
            }
        }
    });

    useEffect(() => {

        if (!editor) {
            return;
        }

        const currentContent = editor.getHTML();

        if (value !== currentContent) {
            editor.commands.setContent(value, {
                emitUpdate: false
            });
        }

    }, [value, editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="rich-text-editor">

            <label>
                {label}
            </label>

            <div className="rich-text-toolbar">

                <button
                    type="button"
                    className={
                        editor.isActive("bold")
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                    title="Bold"
                >
                    <strong>B</strong>
                </button>

                <button
                    type="button"
                    className={
                        editor.isActive("italic")
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleItalic()
                            .run()
                    }
                    title="Italic"
                >
                    <em>I</em>
                </button>

                <button
                    type="button"
                    className={
                        editor.isActive("underline")
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleUnderline()
                            .run()
                    }
                    title="Underline"
                >
                    <u>U</u>
                </button>

                <span className="toolbar-separator" />

                <button
                    type="button"
                    className={
                        editor.isActive("bulletList")
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleBulletList()
                            .run()
                    }
                    title="Bullet list"
                >
                    •
                </button>

                <button
                    type="button"
                    className={
                        editor.isActive("orderedList")
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleOrderedList()
                            .run()
                    }
                    title="Numbered list"
                >
                    1.
                </button>

                <span className="toolbar-separator" />

                <button
                    type="button"
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .undo()
                            .run()
                    }
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .undo()
                            .run()
                    }
                    title="Undo"
                >
                    ↶
                </button>

                <button
                    type="button"
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .redo()
                            .run()
                    }
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .redo()
                            .run()
                    }
                    title="Redo"
                >
                    ↷
                </button>

            </div>

            <div className="rich-text-editor-box">

                <EditorContent
                    editor={editor}
                />

                {placeholder &&
                    editor.isEmpty && (
                        <span className="rich-text-placeholder">
                            {placeholder}
                        </span>
                    )
                }

            </div>

        </div>
    );
}