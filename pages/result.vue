<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Converted Markdown</h1>
    <div class="prose">
      <MarkdownViewer :content="markdownContent" />
    </div>
    <button @click="downloadMarkdown" class="btn btn-secondary mt-4">
      Download .md File
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import MarkdownViewer from "@/components/MarkdownViewer.vue"; // You'll create this component

const route = useRoute();
const markdownContent = ref("");

onMounted(() => {
  const content = route.query.content;
  if (content) {
    markdownContent.value = decodeURIComponent(content);
  } else {
    markdownContent.value = "No content available.";
  }
});

const downloadMarkdown = () => {
  const blob = new Blob([markdownContent.value], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "converted.md";
  link.click();
  URL.revokeObjectURL(url);
};
</script>
