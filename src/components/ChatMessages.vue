<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from "vue";
import type { Message } from "../stores/chat";

const props = defineProps<{ messages: Message[] }>();
const container = ref<HTMLElement | null>(null);

const scrollToBottom = async () => {
  await nextTick();
  if (container.value) {
    container.value.scrollTop = container.value.scrollHeight;
  }
};

watch(() => props.messages.length, scrollToBottom);

onMounted(scrollToBottom);
</script>

<template>
  <div
    ref="container"
    class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scroll-smooth"
  >
    <div
      v-for="msg in messages"
      :key="msg.id"
      :class="[
        'flex w-full',
        msg.sender === 'me' ? 'justify-end' : 'justify-start',
      ]"
    >
      <div
        :class="[
          'max-w-[75%] p-3 rounded-2xl shadow-sm text-sm break-words transition-all duration-300',
          msg.sender === 'me'
            ? 'bg-blue-600 text-white rounded-tr-none'
            : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none',
        ]"
      >
        <p>{{ msg.text }}</p>
        <span class="text-[10px] opacity-70 mt-1 block text-right">
          {{
            new Date(msg.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          }}
        </span>
      </div>
    </div>
  </div>
</template>
