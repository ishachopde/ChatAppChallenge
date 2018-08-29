/**
 * User-agent communication messages related redux actions.
 * @author  Isha CHopde
 */
export const UPDATE_MESSAGE = "update-message";
export const SEND_MESSAGE_TO_AGENT = "message-sent";
export const MESSAGE_RECEIVED = "message-received";
export function updateMessage(message) {
  return { type: UPDATE_MESSAGE, message };
}
export function sendMessageToAgent(message) {
  return {
    type: SEND_MESSAGE_TO_AGENT,
    payload: {
      message,
    },
  };
}

export function messageReceive(message) {
  return { type: MESSAGE_RECEIVED,
          payload : {
            message,
          },
       };
}
