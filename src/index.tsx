import MarkDownEditor from "./components/markdown-editor";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDOM from "react-dom";
//import CodeCell from "./components/code-cell";

const App = () => {
  return (
    <div>
      <MarkDownEditor initialValue="# Hello World!" />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
