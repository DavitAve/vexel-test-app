<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["send"]);
const text = ref("");

const submit = () => {
  if (!text.value.trim()) return;
  emit("send", text.value);
  text.value = "";
};
</script>

<template>
  <footer class="p-4 bg-white border-t">
    <div class="flex items-end gap-2 max-w-4xl mx-auto">
      <textarea
        v-model="text"
        @keydown.enter.exact.prevent="submit"
        placeholder="Напишите сообщение..."
        class="flex-1 bg-gray-100 border border-gray-200 rounded-2xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none min-h-11 max-h-32 outline-none"
        rows="1"
      ></textarea>
      <button
        @click="submit"
        :disabled="!text.trim()"
        class="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M3.4 20.4L20.85 12.04L3.4 3.69L3.4 10.2L13.85 12.04L3.4 13.89L3.4 20.4Z"
          />
        </svg>
      </button>
    </div>
  </footer>
</template>
