<script setup>
const props = defineProps({
  link: String,
  name: String
});
</script>

<template>
<!-- todo : gerer si le link est une URL ou un email.
  dans le cas d'un mail utiliser un lien avec mail.to
 -->
  {{console.log(link)}}
  <a v-if="link !== undefined" :href="decodeURIComponent(link)" target="_blank" rel="noopener noreferrer">
<!--    {{console.log(decodeURIComponent(link))}}-->
    {{ props.name }}
  </a>
</template>

<style scoped>
  a {
    color: var(--primary);
    font-style: italic;
  }
  a:hover {
    color: var(--off-gray-dark);
    //text-decoration: underline;
  }
  a:active {
    color: var(--off-black-dark);
    //text-decoration: none;
  }
</style>