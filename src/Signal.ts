import { Howl } from "howler";

const alertSound = new Howl({
  src: ["alert.ogg"],
});

const warningSound = new Howl({
  src: ["warning.ogg"],
});

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

const Signal: object = (type: SignalType, message: string): ISignal | null => {
  switch (type) {
    case SignalType.alert:
      return {
        type,
        soundPlayer: alertSound,
        message
      };
    case SignalType.warning:
      return {
        type,
        soundPlayer: warningSound,
        message
      };
    default:
      return null;
  }
};

export default Signal;
