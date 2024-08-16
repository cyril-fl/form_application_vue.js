<script setup>
import { onMounted, ref } from "vue";

const PROPS = defineProps({
  id: {
    type: String,
    default: 'default_id_007'
  },
  state: Boolean
});

const state = ref(false); // Utiliser ref pour les données réactives

onMounted(() => {
  state.value = PROPS.state; // Initialiser l'état avec la prop
});

async function toggleState() {
  const newState = !state.value; // Inverser l'état actuel
  state.value = newState; // Mettre à jour l'état local

  // Envoyer la requête PATCH au serveur
  try {
    const response = await fetch(`http://localhost:3000/api/update/${PROPS.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ company_has_responded: newState }) // Envoyer le nouvel état au serveur
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour');
    }

    const result = await response.json();
    console.log('Mise à jour réussie:', result);
  } catch (error) {
    console.error('Erreur:', error);
    // Optionnel : réinitialiser l'état en cas d'erreur pour maintenir la synchronisation
    state.value = !newState;
  }
}
</script>

<template>
  <div @click="toggleState" class="table__cols-icons__flex">
    <v-icon v-if="state" name="bi-check-square-fill" class="icons" />
    <v-icon v-else name="bi-square" class="icons" />
  </div>
</template>

