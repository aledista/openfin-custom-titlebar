import { Howl } from "howler";

export enum SignalType {
  alert,
  warning,
  null
}

export interface ISignal {
  type: SignalType;
  soundPlayer: Howl;
  message?: string;
}

export const Signal: object = (type: SignalType, soundSrc: string, message: string): ISignal => {
  return {
    type,
    soundPlayer: new Howl({
      src: [soundSrc],
    }),
    message
  };
};
