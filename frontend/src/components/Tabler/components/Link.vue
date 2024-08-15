<script setup>
const props = defineProps({
  link: String,
  name: String,
  icons: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
<!-- todo : gerer si le link est une URL ou un email.
  dans le cas d'un mail utiliser un lien avec mail.to
 -->
  {{console.log(link)}}
  <a v-if="link !== undefined" :href="decodeURIComponent(link)" target="_blank" rel="noopener noreferrer" :class="{'table__cols-icons__flex': icons}">
    <v-icon v-if="icons" :name="name" class="icons" />
    <template v-else>{{ name }}</template>
  </a>
</template>

<style scoped>
  a {
    color: var(--primary);
    font-style: italic;
    height: 100%;
      text-align: left;
  }
  a:hover {
    color: var(--off-gray-dark);
    text-decoration: underline;
  }
  a:active {
    color: var(--off-black-dark);
    text-decoration: none;
  }
</style>