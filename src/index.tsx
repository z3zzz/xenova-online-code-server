import TextEditor from "./components/text-editor";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDOM from "react-dom";
//import CodeCell from "./components/code-cell";

const App = () => {
  return (
    <div>
      <TextEditor initialValue="**Hello World!!**" />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
