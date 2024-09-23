<template>
  <div v-html="compiledMarkdown"></div>
</template>

<script setup>
import { ref, watch } from "vue";
import { marked } from "marked";

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});

const compiledMarkdown = ref("");

watch(
  () => props.content,
  (newContent) => {
    compiledMarkdown.value = marked(newContent);
  },
  { immediate: true }
);
</script>
