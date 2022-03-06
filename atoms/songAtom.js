import { atom } from "recoil";

//current tranck id that user select
export const currentTrackIdState = atom({
    key: "currentTrackIdState", //unique id
    default: null,
}); 

export const isPlayingState = atom({
    key: "isPlayingState", //unique id
    default: false,
}); 