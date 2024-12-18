<template>
  <div>
    <div class="navbar navbar-end w-full bg-base-200">
      <nuxt-link to="/" class="btn btn-ghost">Home</nuxt-link>
      <nuxt-link to="/markdown" class="btn btn-ghost"
        >Text to Markdown</nuxt-link
      >
      <nuxt-link to="/image" class="btn btn-ghost">Image to Text</nuxt-link>
    </div>
    <slot />
  </div>
</template>

<script setup></script>
