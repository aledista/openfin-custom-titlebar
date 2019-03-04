import React, { useState } from "react";
import WindowsBar, { WindowsBarSize } from "./WindowsBar.tsx";
import { ActionControl, ActionType } from "./Controls";
import Signal, { SignalType } from "./Signal";

const alertSignal = Signal(SignalType.alert, "this is an alert!");
const warningSignal = Signal(SignalType.warning, "this is a warning!");

function App() {
  const [signal, setSignal] = useState(null);

  return (
    <div className="App">
      <WindowsBar
        size={WindowsBarSize.Small}
        title={"Custom Bar App"}
        signal={signal}
      >
        <ActionControl type={ActionType.Gear} />
        <ActionControl type={ActionType.User} />
        <ActionControl
          type={ActionType.Log}
          onClick={() => {
            console.log("logging");
          }}
        />
      </WindowsBar>
      <div style={{ margin: "10px" }}>
        <button onClick={() => setSignal(alertSignal)}>Send Alert</button>
      </div>
      <div style={{ margin: "10px" }}>
        <button onClick={() => setSignal(warningSignal)}>Send Warning</button>
      </div>
    </div>
  );
}

export default App;
