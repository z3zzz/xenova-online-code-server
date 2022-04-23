import { useTypedSelector } from "../hooks";

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { order, data } = state.cells;

    const fakeShowFunc = `var show = () => {}`;
    const realShowFunc = `
      import _React from 'react'
      import { createRoot as _createRoot } from 'react-dom/client'

      const _root = document.querySelector('#root');
      
      var show = (value) => {
        if (typeof value === "object") {
          console.log(value);

          if (value.$$typeof && value.props) {
            _createRoot(_root).render(value)
            return;
          }

          _root.innerHTML = JSON.stringify(value);
          return;
        }
        
        _root.innerHTML = value;
      }
    `;

    const codesArray = [];
    for (let id of order) {
      if (data[id].type !== "code") {
        continue;
      }

      if (id === cellId) {
        codesArray.push(realShowFunc);
      } else {
        codesArray.push(fakeShowFunc);
      }

      codesArray.push(data[id].content);

      if (id === cellId) {
        break;
      }
    }

    const resultCode = codesArray.join("\n");

    return resultCode;
  });
};
