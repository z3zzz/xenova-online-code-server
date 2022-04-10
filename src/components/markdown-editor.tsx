import { useEffect, useState, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./markdown-editor.css";

interface TextEditorProps {
  initialValue: string;
}

const MarkDownEditor: React.FC<TextEditorProps> = ({ initialValue }) => {
  const [text, setText] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const onChange = (currentText: string | undefined) => {
    if (!currentText) {
      return;
    }
    setText(currentText);
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
          <MDEditor value={text} onChange={onChange} />
        </div>
      )}
      {!isEditing && (
        <div className="card">
          <div className="card-content" onClick={onClick}>
            <MDEditor.Markdown source={text} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkDownEditor;
