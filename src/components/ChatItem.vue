<script setup lang="ts">
import type { Chat } from "../stores/chat";

defineProps<{
  chat: Chat;
  isActive: boolean;
}>();

defineEmits(["select"]);
</script>

<template>
  <div
    @click="$emit('select', chat.id)"
    :class="[
      'flex items-center p-4 cursor-pointer transition-all duration-300 border-b select-none',
      isActive
        ? 'bg-blue-100'
        : chat.unread
          ? 'bg-orange-100 hover:bg-orange-200'
          : 'hover:bg-gray-100',
    ]"
  >
    <div class="relative shrink-0 pointer-events-none">
      <div
        class="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700 uppercase"
      >
        {{ chat.name.charAt(0) }}
      </div>
      <span
        :class="[
          'absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full transition-colors duration-500',
          chat.status === 'online' ? 'bg-green-500' : 'bg-gray-400',
        ]"
      ></span>
    </div>

    <div class="ml-4 flex-1 min-w-0 pointer-events-none">
      <div class="flex justify-between items-baseline">
        <h3
          :class="[
            'font-semibold truncate',
            chat.unread ? 'text-orange-900' : 'text-gray-900',
          ]"
        >
          {{ chat.name }}
        </h3>

        <span
          v-if="chat.unread"
          class="w-3 h-3 bg-orange-500 rounded-full animate-pulse shadow-sm"
        ></span>
      </div>

      <p
        :class="[
          'text-sm truncate mt-0.5',
          chat.unread ? 'text-orange-700 font-medium' : 'text-gray-500',
        ]"
      >
        {{ chat.lastMessage || "Начните общение..." }}
      </p>
    </div>
  </div>
</template>
