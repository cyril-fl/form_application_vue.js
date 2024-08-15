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
        <th v-if="data.company_website !== '' "><Link :link="data.company_website" :name="data.company_name"/> </th>
        <th v-else>{{ data.company_name }}</th>
        <td>{{ data.company_location }}</td>
        <td>{{ toCapitalize(data.application_type) }}</td>
        <td><Link :link="data.application_type_optional" :name="`...`"/> </td>
        <td>{{ data.review_comment }}</td>
        <td>{{ data.review_status }}</td>
        <td><Checkbox :state="data.company_has_responded" /></td>
      </tr>
      </tbody>
  </table>
  </section>
</template>

<style scoped>
/* SECTION */
.section__table {
  grid-column: 6 / span 13;
  grid-row: 1 / span 12;
  height: fit-content;
  background: var(--off-white-light);
}

/* TABLE */
table {
  border-collapse: collapse;
  font-size: 0.875rem;
  width: 100%;
}

/* TABLE HEADER */
.table__title {
  background: var(--primary);
  color: white;
  text-transform: uppercase;
  font-weight: bold;
}
.table__title th {
  padding: 0.75rem 1rem;
  text-align: left;
}

/* TABLE ROWS */
.table__rows > * {
  border-top: 1px solid var(--primary);
}
.table__rows td,
.table__rows th {
  padding: 0.75rem 1rem;
  text-align: left;
}
.table__rows th {
  color: var(--primary);
  background: white;
  border-right: 1px solid var(--primary);
}

/* REVIEW COLORS */
.review_1 {
  background-color: #3f7bcf05;
}
.review_2 {
  background-color: #3f7bcf25;
}
.review_3 {
  background-color: #3f7bcf40;
}
.review_4 {
  background-color: #3f7bcf65;
}
.review_5 {
  background-color: #3f7bcf90;
}

/* CHECKBOX */
.checkbox {
  cursor: pointer;
}
</style>
