<script setup lang="ts">
import { ref } from "vue";

defineProps<{ name: string; status: string; hasMessages: boolean }>();
const emit = defineEmits(["goBack", "clear"]);

const isConfirmOpen = ref(false);

const handleClear = () => {
  emit("clear");
  isConfirmOpen.value = false;
};
</script>

<template>
  <header
    class="p-4 bg-white border-b flex items-center justify-between relative z-50"
  >
    <div class="flex items-center">
      <button
        @click="$emit('goBack')"
        class="md:hidden mr-3 text-blue-600 font-bold"
      >
        ←
      </button>
      <div>
        <h2 class="font-bold text-gray-800">{{ name }}</h2>
        <span class="text-xs text-gray-500 uppercase tracking-wider">{{
          status
        }}</span>
      </div>
    </div>

    <div class="relative">
      <button
        @click="isConfirmOpen = !isConfirmOpen"
        class="p-2 text-gray-400 cursor-pointer hover:text-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        :disabled="!hasMessages"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>

      <div
        v-if="isConfirmOpen"
        class="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-xl p-3 animate-in fade-in zoom-in duration-200"
      >
        <p class="text-xs text-gray-600 mb-3 text-center">Очистить историю?</p>
        <div class="flex gap-2">
          <button
            @click="handleClear"
            class="flex-1 bg-red-500 text-white text-xs py-1.5 rounded hover:bg-red-600 transition-colors"
          >
            Да
          </button>
          <button
            @click="isConfirmOpen = false"
            class="flex-1 bg-gray-100 text-gray-700 text-xs py-1.5 rounded hover:bg-gray-200 transition-colors"
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  </header>

  <div
    v-if="isConfirmOpen"
    @click="isConfirmOpen = false"
    class="fixed inset-0 z-40 bg-black/5"
  ></div>
</template>
