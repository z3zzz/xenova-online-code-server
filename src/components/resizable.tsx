import { ResizableBox, ResizableBoxProps } from "react-resizable";
import { useEffect, useState } from "react";
import "./resizable.css";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const codeEditorRatio = 0.7;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [currentEditorWidth, setCurrentEditorWidth] = useState(
    window.innerWidth * codeEditorRatio
  );

  useEffect(() => {
    let timer: any;

    const resize = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        const maxEditorWidth = window.innerWidth * codeEditorRatio;
        const editorWidthShouldBe =
          maxEditorWidth < currentEditorWidth
            ? maxEditorWidth
            : currentEditorWidth;

        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        setCurrentEditorWidth(editorWidthShouldBe);
      }, 100);
    };
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [currentEditorWidth]);

  let resizableProps: ResizableBoxProps;

  if (direction === "vertical") {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ["s"],
      minConstraints: [Infinity, 50],
      maxConstraints: [Infinity, innerHeight * 0.9],
    };
  } else {
    resizableProps = {
      className: "resize-horizantal",
      height: Infinity,
      width: currentEditorWidth,
      resizeHandles: ["e"],
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * codeEditorRatio, Infinity],
      onResizeStop: (event, data) => {
        setCurrentEditorWidth(data.size.width);
      },
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
