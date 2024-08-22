<script setup>
import Checkbox from "@/components/Tabler/components/Checkbox.vue";
import Link from "@/components/Tabler/components/Link.vue";
import {toCapitalize, toDecodeHtml} from "@/custom_method.js";
import {onMounted, onUnmounted, ref, watch, nextTick, computed} from "vue";
import InfoBulle from "@/components/Tabler/components/InfoBulle.vue";
import OrderIcon from "@/components/Tabler/components/OrderIcon.vue";

const PROPS = defineProps({
  compagnies: Array
});
const TABLE_CONTAINER = ref(null);
const FIRST_LOAD = ref(true); // Variable pour suivre si c'est le premier chargement
const INFO = ref({state: false, date: new Date()});
const ORDER = ref({
  by: 'DEFAULT',
  click: 0
})
const ENUM_TYPE = {
  NAME : 'COMPANY_NAME',
  LOCATION : 'COMPANY_LOCATION',
  APPLICATION : 'APPLICATION_TYPE',
  REVIEW : 'REVIEW_STATUS',
  RESPONDED : 'COMPANY_HAS_RESPONDED',
}

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

      const data = await response.json();
      console.log(data);
      PROPS.compagnies.push(...data); // Add data to shared state

    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };
  fetchData();
});

onUnmounted(() => {
  PROPS.compagnies.value = []; // Clear data on unmount
});

const getReviewClass = (review) => {
  switch (review) {
    case 1:
      return 'review_1';
    case 2:
      return 'review_2';
    case 3:
      return 'review_3';
    case 4:
      return 'review_4';
    case 5:
      return 'review_5';
    default:
      return '';
  }
}

const handleHover_link = (data) => {
  INFO.value = {
    state: !INFO.value.state,
    date: new Date(data)
  };
}

watch(
    () => PROPS.compagnies.length,
    async () => {
      if (!FIRST_LOAD.value) {
        await nextTick(); // Await DOM update
        if (TABLE_CONTAINER.value) {
          TABLE_CONTAINER.value.scrollTo({
            top: TABLE_CONTAINER.value.scrollHeight,
            behavior: 'smooth'
          });
        }
      } else {
        FIRST_LOAD.value = false; // Set FIRST_LOAD to false after first load
      }
    }
);

const computedCompagnies = computed(() => {
  if (ORDER.value.click === 0) {
    return PROPS.compagnies; // Retourne les données non triées si aucun tri n'est demandé
  }

  const sortKey = ORDER.value.by.toLowerCase();
  const isReverse = ORDER.value.click === 2;

  return [...PROPS.compagnies].sort((a, b) => {
    let aValue;
    let bValue;

    // Rule by ENUM_TYPE
    if (sortKey === ENUM_TYPE.LOCATION.toLowerCase()) {
      // Extraire le nom de la rue (première partie avant la première virgule)
      aValue = a[sortKey].split(', ')[0].split(' ').slice(1).join(' ');
      bValue = b[sortKey].split(', ')[0].split(' ').slice(1).join(' ');

    } else {
      aValue = a[sortKey];
      bValue = b[sortKey];
    }

    let comparison = 0;

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      comparison = aValue.localeCompare(bValue);
    } else {
      comparison = aValue - bValue;
    }

    return isReverse ? -comparison : comparison;
  });
});

const orderBy = (type) => {
  let temp_click;
  console.log(ORDER.value)

  if (ORDER.value.click == 2) {
    temp_click = 0
  } else {
    temp_click = ORDER.value.click + 1
  }

  ORDER.value = {by: type, click: temp_click}
}

</script>

<template>
  <section class="section__table" ref="TABLE_CONTAINER">
    <table class="section__box-sm">
      <thead>
        <tr class="table__title">
          <th class="table__origin"><span class="order">Société<OrderIcon :order="ORDER" :th_type="ENUM_TYPE.NAME" @onCLick="orderBy"/></span></th>
          <th class="table__rows__fixed"><span class="order">Adresse<OrderIcon :order="ORDER" :th_type="ENUM_TYPE.LOCATION" @onCLick="orderBy" /></span></th>
          <th class="table__rows__fixed"><span class="order">Candidature<OrderIcon :order="ORDER" :th_type="ENUM_TYPE.APPLICATION" @onCLick="orderBy" /></span></th>
          <th class="table__rows__fixed">Complement</th>
          <th class="table__rows__fixed">Commentaire</th>
          <th class="table__rows__fixed"><span class="order">Note <OrderIcon :order="ORDER" :th_type="ENUM_TYPE.REVIEW" @onCLick="orderBy" /></span></th>
          <th class="table__rows__fixed"><span class="order">Response <OrderIcon :order="ORDER" :th_type="ENUM_TYPE.RESPONDED" @onCLick="orderBy" /></span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in computedCompagnies" :key="index" class="table__rows" :class="getReviewClass(Number(data.review_status))">
          <th class="table__cols__fixed rows__compagnie-name">
            <template v-if="data.company_website !== '' ">
              <Link @hover="handleHover_link" :link="data.company_website" :name="data.company_name" :date="data.application_date"/>
            </template>
            <template v-else>
              {{ data.company_name }}
            </template>
          </th>

          <td>{{ toDecodeHtml(data.company_location) }}</td>
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
          <td class="table__cols-icons__frame"><Checkbox :id="data._id" :state="data.company_has_responded" /></td>
        </tr>
      </tbody>
    </table>
    <aside class="section__box-md table__footer">
      <div class="table__footer__background">
        <p colspan="7" class="table__footer__content ">{{ computedCompagnies.length }} candidatures</p>
      </div>
    </aside>
    <InfoBulle v-if="INFO.state" :date="INFO.date"/>
  </section>

</template>

<style>

/* TABLE */
table {
  font-size: 0.875rem;
  width: 100%;
  flex-grow: 0;
  overflow: clip;

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
  height: fit-content; /* Permet à la ligne de s'ajuster à la hauteur du contenu */
}
.table__rows > * {

  border-top: 1px solid var(--primary); /* Bordure uniforme pour éviter les décalages */
  padding: 0.5rem 0.75rem; /* Ajout de padding pour éviter que le contenu ne touche les bords */
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
/* TABLE FOOTER */
.table__footer {
  width: 100%;
  height: 100%;
  background: var(--background);
  border-radius: 0.2rem;
  position: sticky;
  bottom: 0;
  left: 0;
  overflow: hidden;
  max-height: 2rem;



}
.table__footer__background {
  background: rgba(var(--primary-rgb), 0.3);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  //justify-content: center;
}
.table__footer__content{
  font-size: 0.75rem;
  color: var(--off-white-light);
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
}
.table__rows__fixed {
  position: sticky;
  top: 0;
}

.order {
  cursor: pointer;
  display: flex;
  gap: 0.25rem;
}

/* ROWS CONDITIONAL COLOR */
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