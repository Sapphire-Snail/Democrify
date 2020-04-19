/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
import {
    SET_DEVICE_ID
  } from '../actions/action-types';
  
  export default function user(state = [], action) {
    // Perform different things based on the type of action
    switch (action.type) {
      case SET_DEVICE_ID:
        return webplayer_setDeviceId(state, action);
  
      default:
        return state;
    }
  }
  
  /* ------------------------------------------------------SET DEVICE ID------*/
  function webplayer_setDeviceId(state, action) {
    return {
      ...state,
      deviceId: action.deviceId
    };
  }