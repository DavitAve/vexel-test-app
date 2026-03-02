import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export interface Message {
  id: number;
  text: string;
  sender: "me" | "them";
  timestamp: Date;
}

export interface Chat {
  id: number;
  name: string;
  status: "online" | "offline";
  lastMessage?: string;
  messages: Message[];
  unread?: boolean;
}

export const useChatStore = defineStore("chat", () => {
  const chats = ref<Chat[]>([]);
  const activeChatId = ref<number | null>(null);
  const saved = localStorage.getItem("messenger_history");

  async function fetchChats() {
    if (chats.value.length > 0) return;

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      const users = await response.json();

      chats.value = users.slice(0, 5).map((user: any) => ({
        id: user.id,
        name: user.name,
        status: Math.random() > 0.5 ? "online" : "offline",
        messages: [],
        unread: false,
      }));
    } catch (e) {
      console.error("Failed to fetch users", e);
    }
  }

  const activeChat = computed(
    () => chats.value.find((c) => c.id === activeChatId.value) || null,
  );

  function toggleRandomStatus(chatId: number) {
    const chat = chats.value.find((c) => c.id === chatId);
    if (chat) {
      const statuses: ("online" | "offline")[] = ["online", "offline"];
      const newStatus =
        statuses[Math.floor(Math.random() * statuses.length)] || "offline";

      chat.status = newStatus;
    }
  }

  function sendMessage(chatId: number, text: string) {
    const chat = chats.value.find((c) => c.id === chatId);
    if (!chat) return;

    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: "me",
      timestamp: new Date(),
    };

    chat.messages.push(newMessage);
    chat.lastMessage = text;

    setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        text: "Спасибо за сообщение!)",
        sender: "them",
        timestamp: new Date(),
      };
      chat.messages.push(reply);
      chat.lastMessage = reply.text;

      if (activeChatId.value !== chatId) {
        chat.unread = true;
      }
    }, 1500);
  }

  watch(
    chats,
    (state) => {
      localStorage.setItem("messenger_history", JSON.stringify(state));
    },
    { deep: true },
  );

  if (saved) {
    chats.value = JSON.parse(saved);
  }

  function receiveRandomMessage() {
    const eligibleChats = chats.value.filter(
      (c) => c.id !== activeChatId.value,
    );
    if (eligibleChats.length === 0) return;

    const randomChat =
      eligibleChats[Math.floor(Math.random() * eligibleChats.length)];

    const newMessage: Message = {
      id: Date.now(),
      text: "Я жду...",
      sender: "them",
      timestamp: new Date(),
    };

    if (!randomChat) return;

    randomChat.messages.push(newMessage);
    randomChat.lastMessage = newMessage.text;

    randomChat.unread = true;
  }

  function clearChatHistory(chatId: number) {
    const chat = chats.value.find((c) => c.id === chatId);
    if (chat) {
      chat.messages = [];
      chat.lastMessage = "";
    }
  }

  return {
    chats,
    activeChatId,
    activeChat,
    fetchChats,
    sendMessage,
    toggleRandomStatus,
    receiveRandomMessage,
    clearChatHistory,
  };
});
