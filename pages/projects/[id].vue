<template>
  <div>id ty vole: {{ id }}</div>
  <div v-if="project">Project: {{ project.name }}</div>
  <div v-else>Loading...</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
// Ensure $fetch is available or import it if necessary

const route = useRoute();
const id = ref(route.params.id);
const project = ref(null);

onMounted(async () => {
  try {
    const response = await $fetch(`/api/projects/${id.value}`); // Revert to original API endpoint
    console.log("Project:", response);

    project.value = response;
  } catch (error) {
    console.error("Error fetching project:", error);
  }
});
</script>
