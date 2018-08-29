/**
 * User-agent communication messages related redux actions.
 * @author  Isha CHopde
 */
import { messageConstants } from "../_constants";
export function updateMessage(message) {
  return { type: messageConstants.UPDATE_MESSAGE, message };
}
export function sendMessageToAgent(message) {
  return {
    type: messageConstants.SEND_MESSAGE_TO_AGENT,
    payload: {
      message,
    },
  };
}

export function messageReceive(message) {
  return { type: messageConstants.MESSAGE_RECEIVED,
          payload : {
            message,
          },
       };
}
