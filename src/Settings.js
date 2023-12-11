import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
export const appId = "ee11ffc3e5f14e999617cd9f6f767d53";
export const token =
  "007eJxTYBC2dGE/b/SYf0XkklfPvM1uZr98Fy8cYDtR4/rNXX/cX0YpMKSmGhqmpSUbp5qmGZqkWlpamhmaJ6dYppmlmZuZp5gaSz8tS20IZGSQKVnEwAiFID4LQ25iZh4DAwByYh/1";

export const config = { mode: "rtc", codec: "vp8", appId, token }
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main"