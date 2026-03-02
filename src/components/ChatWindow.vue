<script setup lang="ts">
import { watch } from "vue";
import { useChatStore } from "../stores/chat";
import { useRoute, useRouter } from "vue-router";

import ChatHeader from "./ChatHeader.vue";
import ChatMessages from "./ChatMessages.vue";
import ChatInput from "./ChatInput.vue";

const store = useChatStore();
const router = useRouter();
const route = useRoute();

const handleSend = (text: string) => {
  if (store.activeChatId) store.sendMessage(store.activeChatId, text);
};

const handleClear = () => {
  if (store.activeChatId) store.clearChatHistory(store.activeChatId);
};

watch(
  () => route.params.id,
  (newId) => {
    if (newId) store.toggleRandomStatus(Number(newId));
  },
  { immediate: true },
);
</script>

<template>
  <div v-if="store.activeChat" class="flex flex-col h-full bg-white shadow-xl">
    <ChatHeader
      :name="store.activeChat.name"
      :status="store.activeChat.status"
      :has-messages="!!store.activeChat.messages.length"
      @go-back="router.push({ name: 'home' })"
      @clear="handleClear"
    />

    <ChatMessages :messages="store.activeChat.messages" />

    <ChatInput @send="handleSend" />
  </div>
</template>
