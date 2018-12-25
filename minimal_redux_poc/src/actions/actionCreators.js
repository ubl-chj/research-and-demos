import ActionTypes from './action-types';
import fetchV3 from './manifestRequestUtils';

/**
 * Action Creators for Mirador
 * @namespace ActionCreators
 */


/**
 * setConfig - action creator
 *
 * @param  {Object} config
* @memberof ActionCreators
 */
export function setConfig(config) {
  return { type: ActionTypes.SET_CONFIG, config };
}

/**
 * updateConfig - action creator
 *
 * @param  {Object} config
* @memberof ActionCreators
 */
export function updateConfig(config) {
  return { type: ActionTypes.UPDATE_CONFIG, config };
}

/**
 * focusWindow - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function focusWindow(windowId) {
  return { type: ActionTypes.FOCUS_WINDOW, windowId };
}

/**
 * addWindow - action creator
 *
 * @param  {Object} options
 * @memberof ActionCreators
 */
export function addWindow(options) {
  const defaultOptions = {
    // TODO: Windows should be a hash with id's as keys for easy lookups
    // https://redux.js.org/faq/organizing-state#how-do-i-organize-nested-or-duplicate-data-in-my-state
    id: `window-${new Date().valueOf()}`,
    canvasIndex: 0,
    collectionIndex: 0,
    manifestId: null,
    rangeId: null,
    xywh: [0, 0, 400, 400],
    rotation: null,
  };
  return { type: ActionTypes.ADD_WINDOW, payload: Object.assign({}, defaultOptions, options) };
}

/**
 * removeWindow - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function removeWindow(windowId) {
  return { type: ActionTypes.REMOVE_WINDOW, windowId };
}

/**
 * nextCanvas - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function nextCanvas(windowId) {
  return { type: ActionTypes.NEXT_CANVAS, windowId };
}

/**
 * previousCanvas - action creator
 *
 * @param  {String} windowId
 * @memberof ActionCreators
 */
export function previousCanvas(windowId) {
  return { type: ActionTypes.PREVIOUS_CANVAS, windowId };
}

/**
 * request - action creator
 *
 * @memberof ActionCreators
 * @param id
 * @param url
 */
export function request(id, url) {
  return {
    type: ActionTypes.REQUEST + id,
    url,
  };
}

/**
 * resolve - action creator
 *
 * @param id
 * @param  {String} url
 * @param  {Object} json
 * @memberof ActionCreators
 */
export function resolve(id, url, json) {
  return {
    type: ActionTypes.RESOLVE + id,
    url,
    json,
  };
}

/**
 * reject - action creator
 *
 * @param id
 * @param url
 * @param  {String} error
 * @memberof ActionCreators
 */
export function reject(id, url, error) {
  return {
    type: ActionTypes.REJECT + id,
    url,
    error,
  };
}

/**
 * fetchManifest - action creator
 *
 * @param  {String} url
 * @memberof ActionCreators
 */
export function fetchManifest(url) {
  return ((dispatch) => {
    dispatch(request('MANIFEST', url));
    return fetchV3(url, dispatch);
  });
}
