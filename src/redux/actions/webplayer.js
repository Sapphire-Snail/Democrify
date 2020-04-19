import {
    SET_DEVICE_ID
  } from './action-types';
  
  export function setDeviceId(deviceId) {
    return {
      type: SET_DEVICE_ID,
      deviceId
    };
  }
