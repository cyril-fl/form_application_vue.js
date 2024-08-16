<script setup>
import {ref, computed} from 'vue';
const PROPS = defineProps({
  id: String,
  name: String,
  required: {
    type: Boolean,
    default: false
  }
});

const ADDRESS_FIELDS = [
  {
    id: PROPS.id,
    type: 'NUMBER',
    placeholder: 'N°',
    name: 'address_number',
    class: 'col-span-1 no-spinner',
    required: PROPS.required
  },
  {
    type: 'TEXT',
    placeholder: 'Rue',
    name: 'address_street',
    class: 'col-span-2',
    required: PROPS.required
  },
  {
    type: 'TEXT',
    placeholder: 'Ville',
    name: 'address_city',
    class: 'col-span-2',
    required: PROPS.required
  },
  {
    type: 'ZIP',
    placeholder: 'Code postal',
    name: 'address_zipcode',
    class: 'col-span-1',
  },
  {
    type: 'TEXT',
    placeholder: 'Pays',
    name: 'address_country',
    class: 'col-span-3',
  }
]
const ADDRESS_DATA = ref({
  address_number: '',
  address_street: '',
  address_city: '',
  address_zipcode: '',
  address_country: ''
});
const ADDRESS_INPUTS_IS_FOCUSED = ref(false);

const formattedAddress = computed(() => {
  return `${ADDRESS_DATA.value.address_number} ${ADDRESS_DATA.value.address_street}, ${ADDRESS_DATA.value.address_zipcode} ${ADDRESS_DATA.value.address_city}, ${ADDRESS_DATA.value.address_country}`.trim();
});

const handleFocus = () => {
  if (!ADDRESS_INPUTS_IS_FOCUSED.value) {
    ADDRESS_INPUTS_IS_FOCUSED.value = true;
  }
};

const handleFocusOut = () => {
  ADDRESS_INPUTS_IS_FOCUSED.value = false;
};

</script>

<template>
  <div class="form__field">
    <div class="form__address-field form__input" :class="{'form__input__focus': ADDRESS_INPUTS_IS_FOCUSED}">
      <input
          v-for="field in ADDRESS_FIELDS" :key="field.name"
          v-model="ADDRESS_DATA[field.name]"
          :id="field.id"
          :type="field.type.toLowerCase()"
          :placeholder="field.placeholder"
          class="form__address-item "
          :class="field.class"
          :required="field.required"
          :onfocus="handleFocus"
          :onfocusout="handleFocusOut"
      />
    </div>
    <input type="hidden" :name="name" :value="formattedAddress">
  </div>
</template>

<style>
/* GLOBAL COMPONENT */
.form__input__focus {
  border: 0.2rem solid var(--accent);
}
.form__address-field {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)); /* 3 colonnes égales */
  gap: 0.5rem; /* Espacement entre les éléments */
  width: 100%; /* S'assure que le conteneur prend toute la largeur disponible */
  overflow: hidden; /* Cache tout dépassement */
}

/* FIELDS */
.form__address-item {
  box-sizing: border-box; /* Inclut padding et bordure dans la largeur/hauteur */
  background: none  ;
  color: var(--off-black-light);
  max-width: 100%; /* S'assure que l'élément ne dépasse pas */
}
.form__address-item::placeholder {
  color: var(--off-gray);
}
.form__address-item:focus {
  outline: none;
}

/* COLUMNS */
.col-span-1 {
  grid-column: span 1 / span 1;
}
.col-span-2 {
  grid-column: span 2 / span 2;
}
.col-span-3 {
  grid-column: span 3 / span 3;
}

/* Disable input type number arrow */
.no-spinner::-webkit-inner-spin-button,
.no-spinner::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.no-spinner[type='number'] {
  -moz-appearance: textfield;
}
</style>
