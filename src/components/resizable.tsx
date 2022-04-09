import { ResizableBox } from "react-resizable";
import "./resizable.css";

interface ResizableProps {
  direction: "horizantal" | "vertical";
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox height={300} width={600} resizeHandles={["s"]}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;
