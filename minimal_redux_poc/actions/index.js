import ActionTypes from '../action-types';
import axios from 'axios';

/*
 * Action creators
 */

export function focusWindow(windowId) {
  return { type: ActionTypes.FOCUS_WINDOW, windowId };
}

export function addWindow() {
  return { type: ActionTypes.ADD_WINDOW };
}

export function removeWindow(windowId) {
  return { type: ActionTypes.REMOVE_WINDOW, windowId };
}

export function nextCanvas(windowId) {
  return { type: ActionTypes.NEXT_CANVAS, windowId };
}

export function previousCanvas(windowId) {
  return { type: ActionTypes.PREVIOUS_CANVAS, windowId };
}

export function requestManifest(manifestId) {
  axios.get(manifestId)
    .then(function(result){
      receiveManifest(result);
    });
}

export function receiveManifest(manifest) {
  return {
    type: ActionTypes.RECEIVE_MANIFEST,
    manifest: manifest,
    manifestId: manifest['@id'] };
}
