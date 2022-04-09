import { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";

interface TextEditorProps {
  initialValue: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ initialValue }) => {
  const [text, setText] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);

  const onChange = (currentText: string | undefined) => {
    if (!currentText) {
      return;
    }
    setText(currentText);
  };

  const onClick = () => setIsEditing(true);

  useEffect(() => {
    const finishEdit = (e: MouseEvent) => {
      const element = e.target as HTMLElement;
      console.log(element.tagName);
      if (element.tagName === "HTML") {
        setIsEditing(false);
      }
    };
    window.addEventListener("click", finishEdit, { capture: true });

    return () => window.removeEventListener("click", finishEdit);
  }, []);

  return (
    <div className="container">
      {isEditing && <MDEditor value={text} onChange={onChange} />}
      {!isEditing && (
        <div onClick={onClick}>
          <MDEditor.Markdown source={text} />
        </div>
      )}
    </div>
  );
};

export default TextEditor;
