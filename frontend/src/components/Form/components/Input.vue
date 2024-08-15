<script setup>
import { define_id } from "@Form/ID.js";
import Review from "@Form/components/Review.vue";
import ChoiceList from "@/components/Form/components/ChoiceList.vue";
import { h } from "vue";
import Address from "@Form/components/Address.vue";

const PROPS = defineProps({
  label: String,
  type: {
    type: String,
    default: 'TEXT'
  },
  placeholder: {
    type: String,
    default: 'Entrez votre texte ici'
  },
  options: {
    type: Array,
    default: () => []
  },
  name: String,
  required: {
    required: Boolean,
    default: false
  }
});
const ID = define_id(PROPS.label, PROPS.name);

const renderInput = () => {
  switch (PROPS.type) {
    case 'ADDRESS':
      return h(Address, {
        id: ID,
        name: PROPS.name,
        required: PROPS.required
      });

    case 'CHOICE':
      return h(ChoiceList, {
        id: ID,
        class: 'form__input',
        options: PROPS.options,
        name: PROPS.name
      });

    case 'REVIEW':
      return h(Review, {
        name: PROPS.name
      });

    case 'TEXTAREA':
      return h('textarea', {
        id: ID,
        class: 'form__input',
        placeholder: PROPS.placeholder,
        name: PROPS.name,
        required: PROPS.required
      });

    case 'TEXT':
    default:
      return h('input', {
        type: PROPS.type.toLowerCase(),
        id: ID,
        class: 'form__input',
        placeholder: PROPS.placeholder,
        name: PROPS.name,
        required: PROPS.required
      });
  }
};
</script>

<template>
  <div class="form__field">
    <label :for="ID" class="form__label">{{ label }}</label>
    <component :is="renderInput()"></component>
  </div>
</template>


<style>
  /* FORM */
  .form__field {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .form__label {
    min-width: 7rem;
    width: 20%;
    max-width: 14rem;
    font-size: 0.75rem;
    color: var(--accent);
  }
  .form__input {
    flex-grow: 1;
    background: var(--off-white-dark);
    padding: 0.5rem;
    border-radius: 0.25rem;
    color: var(--off-black-light);
    resize: none;
    transition: all 0.15s ease-in-out;
  }

  .form__input::placeholder,
  .form__input__default {
    color: var(--off-gray);
  }
  .form__input:focus {
    outline: none;
    border: 0.2rem solid var(--accent);
    color: var(--primary);
  }
  .form__input:hover {
    border: 0.2rem solid var(--accent);
    box-shadow: 0 0 0.1rem 0.2rem rgba(var(--accent-rgb), 0.30);
  }
</style>
