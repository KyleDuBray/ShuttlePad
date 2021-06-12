import { CREATE_LINK, DELETE_LINK } from '../actions/types';

const linksFromLocalStorage = () => {
  const links = JSON.parse(localStorage.getItem('links'));
  if (!links || links.linksList.length === 0) {
    const state = {
      linksList: [
        {
          url: 'https://github.com',
          siteName: 'GitHub',
        },
      ],
    };

    return state;
  }

  return links;
};
const INITIAL_STATE = linksFromLocalStorage();

const linksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_LINK:
      localStorage.removeItem('links');
      localStorage.setItem(
        'links',
        JSON.stringify({
          ...state,
          linksList: [
            ...state.linksList,
            { url: action.payload.url, siteName: action.payload.siteName },
          ],
        })
      );
      return {
        ...state,
        linksList: [
          ...state.linksList,
          { url: action.payload.url, siteName: action.payload.siteName },
        ],
      };
    case DELETE_LINK:
      localStorage.removeItem('links');
      localStorage.setItem(
        'links',
        JSON.stringify({
          ...state,
          linksList: state.linksList.filter((item) => {
            return item.siteName !== action.payload;
          }),
        })
      );
      return {
        ...state,
        linksList: state.linksList.filter((item) => {
          return item.siteName !== action.payload;
        }),
      };
    default:
      localStorage.setItem('links', JSON.stringify(state));
      return state;
  }
};

export default linksReducer;
