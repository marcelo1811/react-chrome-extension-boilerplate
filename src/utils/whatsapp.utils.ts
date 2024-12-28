import { MessageHistoryItem } from "../types/MessageHistory";

function getMessageHistory() {
  if (import.meta.env.DEV) {
    return [
      {
        isFromUser: true,
        text: "Olá",
      },
      {
        isFromUser: false,
        text: "Olá, como posso ajudá-lo?",
      },
      {
        isFromUser: true,
        text: "Preciso de ajuda com meu pedido",
      },
    ];
  }
  const rows = [...document.querySelectorAll('[role="row"]')] as HTMLElement[];

  const messages = rows
    .map((el) => {
      if (el.querySelector(".message-in")) {
        return { isFromUser: false, text: el.innerText };
      } else if (el.querySelector(".message-out")) {
        return { isFromUser: true, text: el.innerText };
      }
      return null;
    })
    .filter(Boolean) as MessageHistoryItem[];
  return messages;
}

function fillMessageInput(message: string) {
  const messageInputEl = document
    .querySelector("#main")
    ?.querySelector('div[contenteditable="true"]') as HTMLElement;

  if (!messageInputEl) {
    return;
  }

  messageInputEl.focus();
  document.execCommand("insertText", false, message);
  messageInputEl.dispatchEvent(new Event("change", { bubbles: true }));
}

export const WhatsappUtils = {
  getMessageHistory,
  fillMessageInput,
};
