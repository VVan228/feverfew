import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import "./App.css";
import worksheet from "./worksheet/base";

function App() {
  const ref: RefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    // called twice cuz strict mode during dev!
    const reffedObj = ref.current;
    if (reffedObj === null) {
      return;
    }
    worksheet.event.setListeners(reffedObj);
    return () => worksheet.event.removeListeners(reffedObj);
  }, []);

  return (
    <div className="container" ref={ref}>
      <table className="worksheet">
        <colgroup>
          <col style={{ width: "50px" }} />
          <col style={{ width: "20px" }} />
          <col style={{ width: "80px" }} />
        </colgroup>
        <thead>
          <tr>
            <td d-x="0"></td>
            <td d-x="1">A</td>
            <td d-x="2">B</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td d-x="0" d-y="0">
              1
            </td>
            <td d-x="1" d-y="0">
              1341234123412341234
            </td>
            <td d-x="2" d-y="0">
              34223
            </td>
          </tr>
          <tr>
            <td d-x="0" d-y="1">
              2
            </td>
            <td d-x="1" d-y="1">
              1324123
            </td>
            <td d-x="2" d-y="1">
              2341234
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
