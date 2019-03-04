// libs
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import Signal, { ISignal, SignalType } from "./Signal";

// components
import { MinimizeControl, ResizeControl, CloseControl, IActionProps } from "./Controls";
// styles
import "./WindowsBar.scss";

declare global {
  interface Window { fin: any; }
}
const currentWindow = (window.fin) ? window.fin.desktop.Window.getCurrent() : undefined;

interface IWindowsBarProps {
  children?: React.FC<IActionProps>[] | React.FC<IActionProps>;
  title?: string;
  signal: ISignal;
  warning: boolean;
  size: WindowsBarSize;
}

export enum WindowsBarSize {
  Small,
  Medium,
  Big
}

const WindowsBarHeight = {
  [WindowsBarSize.Small]: 16,
  [WindowsBarSize.Medium]: 19,
  [WindowsBarSize.Big]: 25
}

const WindowsBarTitleSize = {
  [WindowsBarSize.Small]: 13,
  [WindowsBarSize.Medium]: 16,
  [WindowsBarSize.Big]: 19
}

const WindowsBarCssClasses: any = {
  [SignalType.alert]: "windowsbar-animate-alert",
  [SignalType.warning]: "windowsbar-animate-warning"
}

const WindowsBar: React.FC<IWindowsBarProps> = ({ children, title, size, signal }) => {
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const windowsBarHeight = WindowsBarHeight[size];
  const titleBarFontSize = WindowsBarTitleSize[size];
  const windowsbarClassObj: any = { windowsbar: true, draggable: true };
  if (signal) {
    windowsbarClassObj[WindowsBarCssClasses[signal.type]] = true;
  }
  const windowsbarClassNames = classNames(windowsbarClassObj);

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
    if (signal) {
        signal.soundPlayer.play();
    }
  });

  return (
    <div
      className={windowsbarClassNames}
      style={{
        height: `${windowsBarHeight }px`,
        display: window.fin ? "block" : "none"
      }}
    >
      <div className="windowsbar-title" style={{
        fontSize: `${titleBarFontSize}px`,
      }}>
      {title}
      </div>
      <div className="windowsbar-controls">
        <MinimizeControl onClick={minimize} height={windowsBarHeight}/>
        <ResizeControl onClick={resize} height={windowsBarHeight}/>
        <CloseControl onClick={close} height={windowsBarHeight}/>
      </div>
      <div className="windowsbar-actions" style={{ height: `${windowsBarHeight}px`}}>
        {React.Children.map(children, child =>
          React.cloneElement(child as React.ReactElement, { height: windowsBarHeight })
        )}
      </div>
    </div>
  );
};

export default WindowsBar;
