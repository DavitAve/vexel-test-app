<template>
  <div class="flex h-screen w-full bg-gray-100 overflow-hidden">
    <aside
      :class="[
        'w-full md:w-1/3 border-r bg-white flex flex-col',
        isChatOpen ? 'hidden md:flex' : 'flex',
      ]"
    >
      <div class="p-4 border-b font-bold text-xl">Messenger</div>
      <router-view />
    </aside>

    <main
      :class="[
        'flex-1 flex flex-col bg-slate-50',
        isChatOpen ? 'flex' : 'hidden md:flex',
      ]"
    >
      <router-view name="window" />

      <div
        v-if="!isChatOpen"
        class="hidden md:flex flex-col items-center justify-center h-full text-gray-400"
      >
        <p>Выберите чат, чтобы начать общение</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isChatOpen = computed(() => !!route.params.id);
</script>
