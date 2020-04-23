import {
    SET_DEVICE_ID,
    SET_PLAYSTATE
  } from './action-types';
  
export function setDeviceId(deviceId) {
  return {
    type: SET_DEVICE_ID,
    deviceId
  };
}

export function setPlayState(playState) {
  return {
    type: SET_PLAYSTATE,
    playState
  };
}


