import { FETCH_LOCATION, FETCH_WEATHER } from '../actions/types';

const INITIAL_STATE = {location: {coords: {}},condition: ''}

const weatherReducer = (state= INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_LOCATION:
            return {
                ...state,
                location: {
                    coords: action.payload
                } 
            }

        case FETCH_WEATHER:
            return {
                ...state,
                condition: action.payload
            }

        default:
            return state;
    }
}

export default weatherReducer;