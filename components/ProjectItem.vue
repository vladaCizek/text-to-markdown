<template>
  <tr>
    <td>{{ title }}</td>
    <td>{{ description }}</td>
    <td class="w-32">
      <div class="space-x-2 text-xl mb-4">
        <Icon
          name="tabler:square-rounded-arrow-right-filled"
          class="bg-gray-400 hover:bg-pink-500 cursor-pointer"
          @click="$emit('openProject', index)"
        />
        <Icon
          name="tabler:trash-x-filled"
          class="bg-gray-400 hover:bg-red-500 cursor-pointer"
          @click="$emit('deleteProject', index)"
        />
      </div>
    </td>
  </tr>
</template>

<script setup>
const { title, content, accordionName, isChecked } = defineProps({
  index: {
    type: Number,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});
</script>
