<script setup>
import Checkbox from "@/components/Tabler/components/Checkbox.vue";
import Link from "@/components/Tabler/components/Link.vue";
import {toCapitalize, toDecodeHtml} from "@/custom_method.js";
import {onMounted, onUnmounted, ref, watch} from "vue";

const PROPS = defineProps({
  compagnies: Array
});
const tableContainer = ref(null);

const MOCKUP_EMPTY_DATA = []
const MOCKUP_DATA = [
  {
    company_name: 'Google',
    company_location: 'Mountain View, CA',
    application_type: 'Stage',
    application_type_optional: 'https://www.google.com',
    review_comment: 'Très bonne expérience',
    review_status: 5,
    company_has_responded: true
  },
  {
    company_name: 'Facebook',
    company_location: 'Menlo Park, CA',
    application_type: 'Emploi',
    application_type_optional: 'https://www.facebook.com',
    review_comment: 'Expérience mitigée',
    review_status: 3,
    company_has_responded: false
  },
  {
    company_name: 'Amazon',
    company_location: 'Seattle, WA',
    application_type: 'Emploi',
    application_type_optional: 'https://www.amazon.com',
    review_comment: 'Expérience négative',
    review_status: 1,
    company_has_responded: false
  }, {
    company_name: 'Microsoft',
    company_location: 'Redmond, WA',
    application_type: 'Emploi',
    application_type_optional: 'https://www.microsoft.com',
    review_comment: 'Expérience positive',
    review_status: 4,
    company_has_responded: true
  },
  {
    company_name: 'Apple',
    company_location: 'Cupertino, CA',
    application_type: 'Emploi',
    application_type_optional: 'https://www.apple.com',
    review_comment: 'Expérience très positive',
    review_status: 5,
    company_has_responded: true
  }
]

onMounted(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/data'); // Remplacez 3000 par le port de votre serveur
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json(); // Parse la réponse en JSON

      PROPS.compagnies.push(...data); // Stocke les données dans la variable commpanies
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };
  fetchData();
});

onUnmounted(() => {
  COMPAGNIES.value = []; // Réinitialise la valeur de companies lorsque le composant est démonté
});

function getReviewClass(review) {
  if (review === 1) {
    return 'review_1';
  } else if (review === 2) {
    return 'review_2';
  } else if (review === 3) {
    return 'review_3';
  } else if (review === 4) {
    return 'review_4';
  } else if (review === 5) {
    return 'review_5';
  } else {
    return '';
  }
}

watch(
    () => PROPS.compagnies.length,
    () => {
      if (tableContainer.value) {
        tableContainer.value.scrollTo({
          top: tableContainer.value.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
);
</script>

<template>
  <section class="section__table" ref="tableContainer">
    <table>
      <thead>
      <tr class="table__title">
        <th class="table__origin">Société</th>
        <th class="table__rows__fixed">Adresse</th>
        <th class="table__rows__fixed">Candidature</th>
        <th class="table__rows__fixed">Complement</th>
        <th class="table__rows__fixed">Commentaire</th>
        <th class="table__rows__fixed">Note</th>
        <th class="table__rows__fixed">Response</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in PROPS.compagnies" :key="index" class="table__rows" :class="getReviewClass(Number(data.review_status))">
          <th class="table__cols__fixed rows__compagnie-name">
            <template v-if="data.company_website !== '' ">
              <Link :link="data.company_website" :name="data.company_name"/>
            </template>
            <template v-else>
              {{ data.company_name }}
            </template>
          </th>

          <td>{{ data.company_location }}</td>
          <td>{{ toCapitalize(data.application_type) }}</td>

          <td class="table__cols-icons__frame">
            <Link :link="data.application_type_optional" :icons="{link: 'hi-solid-link', mail: 'hi-solid-at-symbol'}"/>
          </td>

          <td>{{ toDecodeHtml(data.review_comment) }}</td>

          <td class="table__cols-icons__frame">
            <div class="table__cols-icons__flex">
              <v-icon
                  v-for="index in Number(data.review_status)"
                  :key="index"
                  name="bi-star-fill"
                  class="icons"
              />
              <v-icon
                  v-for="index in 5 - Number(data.review_status)"
                  :key="index"
                  name="bi-star"
                  class="icons"
              />
            </div>
          </td>
          <td><Checkbox :state="data.company_has_responded" /></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style>
/* TABLE */
table {
  width: 100%;
  font-size: 0.875rem;
}

/* TABLE HEADER */
.table__title {
  color: white;
  text-transform: uppercase;
  font-weight: bold;
}
.table__title > * {
  background: var(--primary);
  padding: 0.75rem 1rem;
  text-align: left;
}

/* TABLE ROWS */
.table__rows {
  height: auto; /* Permet à la ligne de s'ajuster à la hauteur du contenu */
}
.table__rows > * {
  border-top: 1px solid var(--primary); /* Bordure uniforme pour éviter les décalages */
  padding: 0.5rem 0.75rem; /* Ajout de padding pour éviter que le contenu ne touche les bords */
  height: 100%;
  vertical-align: middle; /* Assure que le contenu reste centré verticalement */
  box-sizing: border-box; /* Inclut la bordure et le padding dans la hauteur/largeur */
}
.rows__compagnie-name {
  text-align: left;
  background-color: var(--off-white-light);
}
/* TABLE COLUMN */
.table__cols-icons__frame {
  display: table-cell; /* Aligne les icônes horizontalement */
}
.table__cols-icons__flex {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 0.5rem; /* Ajoute du padding pour centrer les icônes */
  height: 100%; /* Prend toute la hauteur du parent */
  box-sizing: border-box;
}
.icons {
  display: block; /* Assure que chaque icône est sur une nouvelle ligne */
  width: 1rem; /* Taille fixe pour les icônes */
  aspect-ratio: 1/1;
  color: currentColor;
}

/* FIXED CELLS */
.table__origin {
  z-index: 2;
  position: sticky;
  top: 0;
  left: 0;
}
.table__cols__fixed {
  position: sticky;
  left: 0;
  z-index: 1;
}
.table__rows__fixed {
  position: sticky;
  top: 0;
  z-index: 1;
}


/* COULEURS DE REVUE */
.review_1 {
  background-color: rgba(var(--primary-rgb), 0.05);
}
.review_2 {
  background-color: rgba(var(--primary-rgb), 0.25);
}
.review_3 {
  background-color: rgba(var(--primary-rgb), 0.40);
}
.review_4 {
  background-color: rgba(var(--primary-rgb), 0.65);
}
.review_5 {
  background-color: rgba(var(--primary-rgb), 0.90);
}



</style>