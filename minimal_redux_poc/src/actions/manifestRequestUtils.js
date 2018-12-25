import { reject, resolve } from './actionCreators';

/**
 *
 * @param res
 * @param url
 * @param dispatch
 * @returns {*}
 */
function validateResponse(res, url, dispatch) {
  const contentType = res.headers.get('content-type');
  if (contentType && (contentType.includes('application/json') || contentType.includes('application/ld+ json'))) {
    if (res.ok) { // res.status >= 200 && res.status < 300
      return res.json();
    }
  }
  return handleNotAcceptable(res, url, dispatch);
}

/**
 *
 * @param res
 * @param url
 * @param dispatch
 * @returns {Promise<T|never>}
 */
function handleNotAcceptable(res, url, dispatch) {
  if (res.status === '406') {
    return fetchDefault(url, dispatch);
  }
  throw Error(res.status + res.statusText);
}

/**
 *
 * @param url
 * @param dispatch
 * @returns {Promise<T | never>}
 */
export default function fetchV3(url, dispatch) {
  return fetch(url, {
    headers: { Accept: 'application/ld+json;profile=http://iiif.io/api/presentation/3/context.json' },
  })
    .then(res => validateResponse(res))
    .then(json => dispatch(resolve('MANIFEST', url, json)))
    .catch((error) => {
      console.log('v3 API request failed, falling back to v2 API', error);
      return fetchDefault(url, dispatch);
    });
}

/**
 *
 * @param url
 * @param dispatch
 * @returns {Promise<T | never>}
 */
function fetchDefault(url, dispatch) {
  return fetch(url)
    .then(res => validateResponse(res, url, dispatch))
    .then(json => dispatch(resolve('MANIFEST', url, json)))
    .catch(error => dispatch(reject('MANIFEST', url, error)));
}
