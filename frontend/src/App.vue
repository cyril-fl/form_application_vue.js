<script setup>
import "./assets/style/style.css";
import Form from "@Form/Form.vue";
import Tabler from "@/components/Tabler/Table.vue";
import {ref} from "vue";

const COMPAGNIES = ref([]);
const handleAddedData = (data) => {
  COMPAGNIES.value.push(data);
}

</script>

<template>
  <Form @added="handleAddedData" />
  <Tabler :compagnies="COMPAGNIES" />
</template>

<style scoped>
</style>
