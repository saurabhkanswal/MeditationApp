import {IS_NEW_USER} from '../action/action.types';

const initialState = {
  isNewUser: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_NEW_USER:
      return {
        ...state,
        isNewUser: action.payload,
      };

    default:
      return state;
  }
};
