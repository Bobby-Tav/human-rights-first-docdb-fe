// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Declare action TYPES at the top of the file

import { getDSData, axiosWithAuth } from '../../api';

export const BOOKMARKS = 'BOOKMARKS';

export const SAVE_BOOKMARKS = 'SAVE_BOOKMARKS';
export const THUMBNAIL = 'THUMBNAIL';

export const LIST_VIEW = 'LIST_VIEW';


export const SEARCH = 'SEARCH';

export const SET_DOCS = 'SET_DOCS';

export const START_FETCH = 'START_FETCH';

export const getDocs = authState => dispatch => {
  dispatch({ type: START_FETCH });
  // london is a placeholder. In future versions, ideally we would call the users bookmarked docs.
  getDSData('/search/london', authState)
    .then(data => dispatch({ type: SET_DOCS, payload: data.Response }))
    .catch(console.error);
};

export const searchDocs = (search, authState) => dispatch => {
  dispatch({ type: START_FETCH });
  getDSData(`/search/${search}`, authState)
    .then(data => {
      dispatch({ type: SET_DOCS, payload: data.Response });
    })
    .catch(console.error);
};

const apiURI = process.env.REACT_APP_API_URI;
const dsApiURI = process.env.REACT_APP_DS_API_URI;

export const SET_BOOKMARKS = 'SET_BOOKMARKS';

export const getBookmarks = authState => async dispatch => {
  try {
    dispatch({ type: START_FETCH });
    const { data } = await axiosWithAuth(authState).get(`${apiURI}/bookmarks`);
    const ids = data.map(b => b.fileId).join(' ');
    const { Response } = await axiosWithAuth(authState).get(
      `${dsApiURI}/search/${ids}`
    );

    dispatch({ type: SET_BOOKMARKS, payload: Response });
  } catch (err) {
    console.log(err);
  }
};

export const saveBookmarks = (authState, bookmarkId) => async dispatch => {
  try {
    await axiosWithAuth(authState).post(
      `${process.env.REACT_APP_API_URI}/bookmarks/${bookmarkId}`,
      bookmarkId
    );
    dispatch({ type: SAVE_BOOKMARKS, payload: bookmarkId });
  } catch (err) {
    console.error(err);
  }
};

export const bookmarks = () => ({ type: BOOKMARKS });

export const displayListView = () => ({ type: LIST_VIEW });

export const displayThumbnail = () => ({ type: THUMBNAIL });
