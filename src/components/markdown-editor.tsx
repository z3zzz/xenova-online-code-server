import { useEffect, useState, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./markdown-editor.css";
import { Cell } from "../state";
import { useActions } from "../hooks";

interface TextEditorProps {
  data: Cell;
}

const MarkDownEditor: React.FC<TextEditorProps> = ({ data }) => {
  const initialText = "Click to edit";
  const { id, content } = data;
  const { updateCell } = useActions();
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const onChange = (currentText: string | undefined) => {
    updateCell(id, currentText || "");
  };

  const onClick = () => setIsEditing(true);

  useEffect(() => {
    const finishEdit = (e: MouseEvent) => {
      const clickedElement = e.target as HTMLElement;
      if (editorRef.current?.contains(clickedElement)) {
        return;
      }
      setIsEditing(false);
    };

    window.addEventListener("click", finishEdit, { capture: true });

    return () => window.removeEventListener("click", finishEdit);
  }, []);

  return (
    <div className="container">
      {isEditing && (
        <div ref={editorRef}>
          <MDEditor value={content} onChange={onChange} />
        </div>
      )}
      {!isEditing && (
        <div className="card">
          <div className="card-content" onClick={onClick}>
            <MDEditor.Markdown source={content || initialText} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkDownEditor;
