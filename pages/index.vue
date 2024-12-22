<template>
  <div class="container min-h-screen flex flex-col mx-auto p-4 text-center">
    <div class="flex items-center justify-between px-4 text-2xl">
      <h1 class="font-bold mb-4">Welcome to my AI project</h1>
      <Icon
        name="tabler:hexagon-plus-filled"
        class="bg-gray-400 hover:bg-sky-500 cursor-pointer"
      />
    </div>
    <div>
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <ProjectItem
              v-for="(project, index) in projects"
              :key="index"
              :index="index"
              :title="project.title"
              :description="project.description"
              @openProject="openProject"
              @deleteProject="deleteProject"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const projects = reactive([]);

onMounted(async () => {
  const { data, error } = await useFetch("/api/projects");
  if (error.value) {
    console.error("Failed to fetch projects:", error.value);
  } else {
    projects.push(...data.value);
  }
});

function deleteProject(index) {
  // TODO: prompt user to confirm deletion
  // remove project from projects array if confirmed
  projects.splice(index, 1);
}

// TODO: conver to navigateTo id instead of index
async function openProject(index) {
  await navigateTo({
    path: `/projects/${index}`,
  });
}
</script>
