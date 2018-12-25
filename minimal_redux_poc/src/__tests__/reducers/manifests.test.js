import reducer from '../../reducers/manifests';
import ActionTypes from '../../actions/action-types';

describe('manifests reducer', () => {
  it('should handle REQUEST_MANIFEST', () => {
    expect(reducer({}, {
      type: `${ActionTypes.REQUEST}MANIFEST`,
      url: 'abc123',
    })).toEqual({
      abc123: {
        isFetching: true,
      },
    });
  });
  it('should handle RESOLVE_MANIFEST', () => {
    expect(reducer(
      {
        abc123: {
          isFetching: true,
        },
      },
      {
        type: `${ActionTypes.RESOLVE}MANIFEST`,
        url: 'abc123',
        json: {
          id: 'abc123',
          '@type': 'sc:Manifest',
          content: 'lots of canvases and metadata and such',
        },
      },
    )).toMatchObject({
      abc123: {
        isFetching: false,
        manifestation: {},
      },
    });
  });
  it('should handle REJECT MANIFEST', () => {
    expect(reducer(
      {
        abc123: {
          isFetching: true,
        },
      },
      {
        type: `${ActionTypes.REJECT}MANIFEST`,
        url: 'abc123',
        error: "This institution didn't enable CORS.",
      },
    )).toEqual({
      abc123: {
        isFetching: false,
        error: "This institution didn't enable CORS.",
      },
    });
  });
});
