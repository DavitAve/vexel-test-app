<script setup lang="ts">
import { onMounted } from "vue";
import { useChatStore } from "../stores/chat";
import { useRouter, useRoute } from "vue-router";
import ChatItem from "./ChatItem.vue";

const store = useChatStore();
const router = useRouter();
const route = useRoute();

const selectChat = (id: number) => {
  store.activeChatId = id;
  const chat = store.chats.find((c) => c.id === id);
  if (chat) chat.unread = false;
  router.push({ name: "chat", params: { id } });
};

const resetChat = () => {
  store.activeChatId = null;
  router.push({ name: "home" });
};

onMounted(() => {
  store.fetchChats();

  setTimeout(() => {
    store.receiveRandomMessage();
  }, 5000);
});
</script>

<template>
  <div
    class="flex-1 overflow-y-auto h-full flex flex-col bg-white border-r border-gray-100"
    @click.self="resetChat"
  >
    <ChatItem
      v-for="chat in store.chats"
      :key="chat.id"
      :chat="chat"
      :is-active="route.params.id === String(chat.id)"
      @select="selectChat"
    />

    <div
      class="flex-1 bg-transparent cursor-default"
      @click.self="resetChat"
    ></div>
  </div>
</template>
