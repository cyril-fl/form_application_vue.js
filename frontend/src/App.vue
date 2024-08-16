<script setup>
import "./assets/style/style.css";
import Form from "@Form/Form.vue";
import Tabler from "@/components/Tabler/Table.vue";
import {ref} from "vue";

const COMPAGNIES = ref([]);

const handleAdd_Temporary = (data) => {
  COMPAGNIES.value.push(data);
}

const handleAdd_Success = (insertedID) => {
  const lastIndex = COMPAGNIES.value.length - 1;
  COMPAGNIES.value[lastIndex]._id = insertedID;
}
const handleAdd_Error = () => {
  COMPAGNIES.value.pop(); // Suppression de la dernière entrée temporaire
}
</script>

<template>
  <Form @add_temporary="handleAdd_Temporary" @add_success="handleAdd_Success" @add_error="handleAdd_Error"/>
  <Tabler :compagnies="COMPAGNIES" />
</template>

<style scoped>
</style>
