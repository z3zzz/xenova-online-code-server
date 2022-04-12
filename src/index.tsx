import MarkDownEditor from "./components/markdown-editor";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import ReactDOM from "react-dom";
import { store } from "./state";
import { Provider } from "react-redux";
//import CodeCell from "./components/code-cell";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <MarkDownEditor initialValue="# Hello World!" />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
