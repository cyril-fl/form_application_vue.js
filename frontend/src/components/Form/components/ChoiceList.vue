<script setup>
import { ref } from 'vue';

const PROPS = defineProps({
  id: String,
  class: String,
  options: {
    type: Array,
    default: []
  },
  name: String
});
const CHOICE_SELECTED = ref(null);

const updateChoice = (event) => {
  const event_value = event.target.value;
  console.log(event_value)
  console.log(PROPS.options)
  const temp_choice = PROPS.options.find(option => option.label === event_value);
  console.log(temp_choice)
  CHOICE_SELECTED.value = temp_choice;
  console.log(CHOICE_SELECTED)

};

console.log(CHOICE_SELECTED)
</script>

<template>
  <div class="custom-select-wrapper">
    <select :id="id" @change="updateChoice"
            :class="[PROPS.class, CHOICE_SELECTED === null || CHOICE_SELECTED.value === '-' ? 'form__input--placeholder' : '']"
            :name="name"
    >
      <option v-for="(option, index) in options" :key="index" :value="option.label" >{{ option.label }}</option>
    </select>
  </div>

  <template v-if="CHOICE_SELECTED && CHOICE_SELECTED.field !== null">
    <div class="form__field">
      <label :for="`${id}_additionalInfo`" class="form__label">{{ CHOICE_SELECTED.field.label }}</label>
      <input :id="`${id}_additionalInfo`" :type="CHOICE_SELECTED.field.type"  :class="PROPS.class" :name="name+'_optional'" :placeholder="CHOICE_SELECTED.field.placeholder" />
    </div>
  </template>
  <input v-else type="hidden" :name="name+'_optional'" :value="null">
</template>

<style scoped>
  /* SELECT */
  .custom-select-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
  }
  .custom-select-wrapper select {
    width: 100%;
    appearance: none; /* Enlever l'apparence native du select */
    -webkit-appearance: none; /* Safari */
    -moz-appearance: none; /* Firefox */
  }
  .custom-select-wrapper::after {
    content: '▼'; /* Flèche personnalisée */
    font-size: 0.75rem;
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none; /* Empêche de cliquer sur la flèche */
  }
</style>