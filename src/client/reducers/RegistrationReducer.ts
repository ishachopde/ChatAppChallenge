import { userConstants } from "../_constants";

export default (state = {}, action) => {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:
      return {
        ...state, alert: action.error,
      };
    default:
      return state;
  }
};
