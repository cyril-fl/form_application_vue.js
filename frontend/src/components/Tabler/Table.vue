<script setup>
import Checkbox from "@/components/Tabler/components/Checkbox.vue";
import Link from "@/components/Tabler/components/Link.vue";
import {toCapitalize} from "@/custom_method.js";
import {onMounted, ref} from "vue";

const companies = ref([]);

onMounted(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/data'); // Remplacez 3000 par le port de votre serveur
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json(); // Parse la réponse en JSON
      companies.value = data; // Stocke les données dans la variable commpanies
      console.log(companies.value);
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };
  fetchData();
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
</script>

<template>
  <section class="section__table">

    <table>
      <thead>
      <tr class="table__title">
        <th>Société</th>
        <th>Adresse</th>
        <th>Candidature</th>
        <th>Complement</th>
        <th>Commentaire</th>
        <th>Note</th>
        <th>Response</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in companies" :key="index" class="table__rows" :class="getReviewClass(Number(data.review_status))">
          <th class="table__cols-title">
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
            <Link :link="data.application_type_optional" name="hi-solid-link" :icons="true"/>
          </td>

          <td>{{ data.review_comment }}</td>

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
/* SECTION */
.section__table {
  grid-column: 6 / span 13;
  grid-row: 1 / span 12;
  background: var(--off-white-light);
}
/* TABLE */
table {
  border-collapse: collapse; /* Fusionne les bordures pour éviter les décalages */
  width: 100%;
  font-size: 0.875rem;
}

/* TABLE HEADER */
.table__title {
  background: var(--primary);
  color: white;
  text-transform: uppercase;
  font-weight: bold;
}
.table__title > * {
  padding: 0.75rem 1rem;
  text-align: left;
}

/* TABLE ROWS */
.table__rows {
  background: #c1d967;
  height: auto; /* Permet à la ligne de s'ajuster à la hauteur du contenu */
}

.table__rows > * {
  border-top: 1px solid var(--primary); /* Bordure uniforme pour éviter les décalages */
  padding: 0.5rem 0.75rem; /* Ajout de padding pour éviter que le contenu ne touche les bords */
  height: 100%;
  vertical-align: middle; /* Assure que le contenu reste centré verticalement */
  box-sizing: border-box; /* Inclut la bordure et le padding dans la hauteur/largeur */
}

/* ALIGNEMENT DES ICONES */
.table__cols-title {
  text-align: left;
  background-color: var(--off-white-light);

}
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

/* SECTION DU TABLEAU */
.section__table {
  width: 100%;
  height: fit-content;
  background: var(--off-white-light);
}

</style>