<script setup>
const props = defineProps({
  state: Boolean
});

function handleChange(event) {
  const isChecked = event.target.checked;
  alert(`Checkbox is now ${isChecked ? 'checked' : 'unchecked'}`);
}
</script>

<template>
  <input
      type="checkbox"
      :checked="state"
      @change="handleChange"
  />
</template>
