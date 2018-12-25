import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetch from 'jest-fetch-mock';
import * as actions from '../../actions/actionCreators';
import ActionTypes from '../../actions/action-types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  describe('addWindow', () => {
    it('should create a new window with merged defaults', () => {
      const options = {
        id: 'helloworld',
        canvasIndex: 1,
      };

      const expectedAction = {
        type: ActionTypes.ADD_WINDOW,
        payload: {
          id: 'helloworld',
          canvasIndex: 1,
          collectionIndex: 0,
          manifestId: null,
          rangeId: null,
          xywh: [0, 0, 400, 400],
          rotation: null,
        },
      };
      expect(actions.addWindow(options)).toEqual(expectedAction);
    });
  });
  describe('removeWindow', () => {
    it('removes the window and returns windowId', () => {
      const id = 'abc123';
      const expectedAction = {
        type: ActionTypes.REMOVE_WINDOW,
        windowId: id,
      };
      expect(actions.removeWindow(id)).toEqual(expectedAction);
    });
  });
  describe('nextCanvas', () => {
    it('moves to the next canvas', () => {
      const id = 'abc123';
      const expectedAction = {
        type: ActionTypes.NEXT_CANVAS,
        windowId: id,
      };
      expect(actions.nextCanvas(id)).toEqual(expectedAction);
    });
  });
  describe('previousCanvas', () => {
    it('moves to the previous canvas', () => {
      const id = 'abc123';
      const expectedAction = {
        type: ActionTypes.PREVIOUS_CANVAS,
        windowId: id,
      };
      expect(actions.previousCanvas(id)).toEqual(expectedAction);
    });
  });
  describe('requestManifest', () => {
    it('requests a manifest given a url', () => {
      const url = 'abc123';
      const expectedAction = {
        type: `${ActionTypes.REQUEST}MANIFEST`,
        url,
      };
      expect(actions.request('MANIFEST', url)).toEqual(expectedAction);
    });
  });
  describe('resolveManifest', () => {
    it('moves to the previous canvas', () => {
      const url = 'abc123';
      const json = {
        url,
        content: 'lots of metadata, canvases, and other IIIFy things',
      };
      const expectedAction = {
        type: `${ActionTypes.RESOLVE}MANIFEST`,
        url,
        json,
      };
      expect(actions.resolve('MANIFEST', url, json)).toEqual(expectedAction);
    });
  });
  describe('fetchManifest', () => {
    let store = null;
    beforeEach(() => {
      store = mockStore({});
    });
    describe('success response', () => {
      beforeEach(() => {
        fetch.mockResponseOnce(JSON.stringify({ data: '12345' })); // eslint-disable-line no-undef
      });
      it('dispatches the REQUEST_MANIFEST action', () => {
        store.dispatch(actions.fetchManifest('https://purl.stanford.edu/sn904cj3429/iiif/manifest'));
        expect(store.getActions()).toEqual([
          { url: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest', type: 'REQUEST_MANIFEST' },
        ]);
      });
      it('dispatches the REQUEST_MANIFEST and then RESOLVE_MANIFEST', () => {
        store.dispatch(actions.fetchManifest('https://purl.stanford.edu/sn904cj3429/iiif/manifest'))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              { url: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest', type: 'REQUEST_MANIFEST' },
              { url: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest', json: { data: '12345' }, type: 'RESOLVE_MANIFEST' },
            ]);
          });
      });
    });
    describe('error response', () => {
      it('dispatches the REQUEST_MANIFEST and then RESOLVE_MANIFEST', () => {
        store.dispatch(actions.fetchManifest('https://purl.stanford.edu/sn904cj3429/iiif/manifest'))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              { manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest', type: 'REQUEST_MANIFEST' },
              { manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest', error: new Error('invalid json response body at undefined reason: Unexpected end of JSON input'), type: 'REJECT_MANIFEST' },
            ]);
          });
      });
    });
  });
});
