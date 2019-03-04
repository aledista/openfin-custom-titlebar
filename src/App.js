import React, { useState } from "react";
import TitleBar, { TitleBarSize } from "./TitleBar.tsx";
import { ActionControl, ActionType } from "./Controls";
import { Signal, SignalType } from "./Signal";

const alertSignal = Signal(
  SignalType.alert,
  "public/alert.ogg",
  "this is an alert!"
);
const warningSignal = Signal(
  SignalType.warning,
  "public/warning.ogg",
  "this is a warning!"
);

function App() {
  const [signal, setSignal] = useState(null);

  return (
    <div className="App">
      <TitleBar
        size={TitleBarSize.Small}
        title={"Custom TitleBar App"}
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
      </TitleBar>
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
