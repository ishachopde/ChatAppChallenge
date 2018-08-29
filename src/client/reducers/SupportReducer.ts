/**
 * reducer to handle actions related to Agent.
 * @author  Isha CHopde
 */
import initialState from "../initialState";

export default (state = initialState.support, action) => {
    switch (action.type) {
        case "support-assigned":
            return action.payload.agent;
        case "support-disconnected":
            return {};
        case "set-connected-agent-online-status":
            return {
                ...state,
                isOnline: action.payload.status,
            };
        default:
            return state;
    }
};
