<script setup>
import { ref, computed } from 'vue';
const PROPS = defineProps({
  id: String,
  name: String
});

// Déclaration des champs d'adresse
const addressData = ref({
  address_number: '',
  address_street: '',
  address_city: '',
  address_zipcode: '',
  address_country: ''
});

const ADDRESS_FIELDS = [
  {
    id: PROPS.id,
    type: 'NUMBER',
    placeholder: 'N°',
    name: 'address_number',
    class: 'col-span-1 no-spinner',
  },
  {
    type: 'TEXT',
    placeholder: 'Rue',
    name: 'address_street',
    class: 'col-span-2',
  },
  {
    type: 'TEXT',
    placeholder: 'Ville',
    name: 'address_city',
    class: 'col-span-2',
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
const formattedAddress = computed(() => {
  return `${addressData.value.address_number} ${addressData.value.address_street}, ${addressData.value.address_zipcode} ${addressData.value.address_city}, ${addressData.value.address_country}`.trim();
});
</script>

<template>
  <div class="form__field">
    <div class="form__address-field form__input">
      <input
          v-for="field in ADDRESS_FIELDS" :key="field.name"
          v-model="addressData[field.name]"
          :id="field.id"
          :type="field.type.toLowerCase()"
          :placeholder="field.placeholder"
          class="form__address-item "
          :class="field.class"
          :required="field.required"
      />
    </div>
    <input type="hidden" :name="name" :value="formattedAddress">
  </div>
</template>

<style scoped>
/* Conteneur de la grille */
.form__address-field {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)); /* 3 colonnes égales */
  gap: 0.5rem; /* Espacement entre les éléments */
  width: 100%; /* S'assure que le conteneur prend toute la largeur disponible */
  overflow: hidden; /* Cache tout dépassement */
}

/* Styles des champs individuels */
.form__address-item {
  box-sizing: border-box; /* Inclut padding et bordure dans la largeur/hauteur */
  background: none  ;
  color: var(--off-black-light);
  max-width: 100%; /* S'assure que l'élément ne dépasse pas */
  height: 100%; /* Prend toute la hauteur disponible */
}

.form__address-item::placeholder {
  color: var(--off-gray);
}

.form__address-item:focus {
  outline: none;
}

/* Gère les colonnes pour les différents champs */
.col-span-1 {
  grid-column: span 1 / span 1;
}
.col-span-2 {
  grid-column: span 2 / span 2;
}
.col-span-3 {
  grid-column: span 3 / span 3;
}

/* Optionnel : Réactivité pour les écrans plus petits */
@media (max-width: 768px) {
  .form__address-field {
    grid-template-columns: repeat(2, minmax(0, 1fr)); /* Passe à 2 colonnes */
  }
}

@media (max-width: 480px) {
  .form__address-field {
    grid-template-columns: 1fr; /* Passe à 1 colonne */
  }
}

.no-spinner::-webkit-inner-spin-button,
.no-spinner::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Masquer les flèches dans Firefox */
.no-spinner[type='number'] {
  -moz-appearance: textfield;
}
</style>
