// libs
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { ISignal, SignalType } from "./Signal";

// components
import { MinimizeControl, ResizeControl, CloseControl, IActionProps } from "./Controls";
// styles
import "./TitleBar.scss";

declare global {
  interface Window { fin: any; }
}
const currentWindow = (window.fin) ? window.fin.desktop.Window.getCurrent() : undefined;

interface ITitleBarProps {
  children?: React.FC<IActionProps>[] | React.FC<IActionProps>;
  title?: string;
  signal: ISignal;
  size: TitleBarSize;
}

export enum TitleBarSize {
  Small,
  Medium,
  Big
}

const TitleBarHeight = {
  [TitleBarSize.Small]: 16,
  [TitleBarSize.Medium]: 19,
  [TitleBarSize.Big]: 25
}

const TitleBarTitleSize = {
  [TitleBarSize.Small]: 13,
  [TitleBarSize.Medium]: 16,
  [TitleBarSize.Big]: 19
}

const TitleBarCssClasses: any = {
  [SignalType.alert]: "titlebar-animate-alert",
  [SignalType.warning]: "titlebar-animate-warning"
}

const TitleBar: React.FC<ITitleBarProps> = ({ children, title, size, signal }) => {
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const windowsBarHeight = TitleBarHeight[size];
  const titleBarFontSize = TitleBarTitleSize[size];
  const titlebarClassObj: any = { titlebar: true, draggable: true };
  if (signal) {
    titlebarClassObj[TitleBarCssClasses[signal.type]] = true;
  }
  const titlebarClassNames = classNames(titlebarClassObj);

  const close = () => {
    currentWindow.close();
  };

  const minimize = () => {
    currentWindow.minimize();
  };

  const resize = () => {
    if (isMaximized) {
      currentWindow.restore();
    } else {
      currentWindow.maximize();
    }
    setIsMaximized(!isMaximized)
  };

  useEffect(() => {
    if (signal != undefined) {
        signal.soundPlayer.play();
    }
  });

  return (
    <div
      className={titlebarClassNames}
      style={{
        height: `${windowsBarHeight }px`,
        display: window.fin ? "block" : "none"
      }}
    >
      <div className="titlebar-title" style={{
        fontSize: `${titleBarFontSize}px`,
      }}>
      {title}
      </div>
      <div className="titlebar-controls">
        <MinimizeControl onClick={minimize} height={windowsBarHeight}/>
        <ResizeControl onClick={resize} height={windowsBarHeight}/>
        <CloseControl onClick={close} height={windowsBarHeight}/>
      </div>
      <div className="titlebar-actions" style={{ height: `${windowsBarHeight}px`}}>
        {React.Children.map(children, child =>
          React.cloneElement(child as React.ReactElement, { height: windowsBarHeight })
        )}
      </div>
    </div>
  );
};

export default TitleBar;
