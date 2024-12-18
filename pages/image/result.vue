<template>
  <div class="container mx-auto p-4">
    <div class="sticky top-0 bg-[#1d232a] pb-4">
      <div class="flex gap-4 mb-4">
        <button @click="goBack" class="btn btn-accent mt-4">Go Back</button>
        <button @click="downloadMarkdown" class="btn btn-secondary mt-4">
          Download .txt File
        </button>
      </div>
      <h1 class="text-2xl font-bold mb-4">Converted Markdown</h1>
      <div class="divider">Content</div>
    </div>

    <div class="prose">
      <MarkdownViewer :content="markdownContent" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "nuxt/app";
import MarkdownViewer from "@/components/MarkdownViewer.vue"; // You'll create this component

const route = useRoute();
const markdownContent = ref("");
const documentName = ref("converted");

onMounted(() => {
  const content = route.query.content;
  const name = route.query.name;
  if (content) {
    markdownContent.value = decodeURIComponent(content);
    if (name) {
      documentName.value = decodeURIComponent(name).split(".")[0];
    }
  } else {
    markdownContent.value = "No content available.";
  }
});

const downloadMarkdown = () => {
  const blob = new Blob([markdownContent.value], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${documentName.value}.txt`;
  link.click();
  URL.revokeObjectURL(url);
};

async function goBack() {
  await navigateTo("/image");
}
</script>
