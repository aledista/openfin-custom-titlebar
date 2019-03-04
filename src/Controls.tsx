import React from "react";
import { MinimizeSvg, CloseSvg, ResizeSvg, GearSvg, UserSvg, LogSvg } from "./Svg";

interface IControlProps {
  onClick?: any;
  height: number;
}

export enum ActionType {
  Gear,
  User,
  Log
}

export interface IActionProps {
  onClick?: any;
  height: number;
  type: ActionType
}

export const MinimizeControl: React.FC<IControlProps> = ({
  onClick,
  height
}) => {
  return (
    <div
      className="windowsbar-minimize"
      onClick={onClick}
      style={{
        height: `${height}px`,
        lineHeight: `${height - 2}px`
      }}
    >
      <MinimizeSvg />
    </div>
  );
};

export const ResizeControl: React.FC<IControlProps> = ({ onClick, height }) => {
  return (
    <div
      className="windowsbar-resize"
      onClick={onClick}
      style={{
        height: `${height}px`,
        lineHeight: `${height - 2}px`
      }}
    >
      <ResizeSvg />
    </div>
  );
};

export const CloseControl: React.FC<IControlProps> = ({ onClick, height }) => {
  return (
    <div
      className="windowsbar-close"
      onClick={onClick}
      style={{
        height: `${height}px`,
        lineHeight: `${height - 2}px`
      }}
    >
      <CloseSvg />
    </div>
  );
};

export const ActionControl: React.FC<IActionProps> = ({
  onClick,
  type,
  height
}) => {
  let svg =<GearSvg/>; 
  switch (type) {
    case ActionType.User:
      svg = <UserSvg/>;
      break;
    case ActionType.Log:
      svg = <LogSvg/>;
      break;
  }
  return (
    <div className="windowsbar-action" style={{ height: `${height}px` }} onClick={onClick}>
      {svg}
    </div>
  );
};
