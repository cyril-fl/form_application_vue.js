<script setup>
import {ref} from "vue";
import Input from "@Form/components/Input.vue";
import Address from "@Form/components/Address.vue";

const FORM= ref(null);
const FORM_FIELDS = [
  {
    label: 'Nom de la société',
    type: 'TEXT',
    placeholder: 'Societe SA',
    name: 'company_name',
    required: true
  },
  {
    label: 'Adresse',
    type: 'ADDRESS',
    name: 'company_location',
    required: true
  },
  //   Ajouter RUE, NUMERO, CODE POSTAL, VILLE
  {
    label: 'Site web',
    type: 'URL',
    placeholder: 'http://www.societe.com',
    name: 'company_website'
  },
  {
    label: 'Candidatures',
    type: 'CHOICE',
    options: [
      { label: 'Spontanée', field: null },
      { label: 'Annonce', field: {label:`Lien de l'annonce`, type: 'url', placeholder: 'http://www.societe.com/job'} },
      { label: 'Recrutement', field: {label: 'Mail du recruteur', type: 'email', placeholder: 'job@societe.com'} }
    ],
    name: 'application_type'
  },
  {
    label: 'Review',
    type: 'REVIEW',
    placeholder: '...',
    name: 'review_status'
  },
  {
    label: 'Commentaire',
    type: 'TEXTAREA',
    placeholder: 'Laissez votre commentaire ici ...',
    name: 'review_comment',
  }
]
const FORM_ERROR_NOTIFICATION = ref(null)

const cleanData = (data) => {
  const cleaned_data = {};

  for (const [key, value] of data.entries()) {
    let   cleanedValue = value.trim();
          cleanedValue =  cleanedValue.replace(/</g, "&lt;")  // Replace dangerous characters with HTML entity equivalents
                                      .replace(/>/g, "&gt;")
                                      .replace(/'/g, "&#39;")
                                      .replace(/"/g, "&quot;")
                                      .replace(/`/g, "&#96;")
                                      .replace(/<script.*?>.*?<\/script>/g, "") // Remove any script tags or event handler attributes to prevent XSS
                                      .replace(/on\w+\s*=\s*['"].*?['"]/g, "");
    cleaned_data[key] = cleanedValue;
  }

  return cleaned_data;
};

const formatData = (data) => {
  const formated_data = {};

  // Format form data
  for (const [key, value] of Object.entries(data)) {
    let temp_Value = value;

    /*
      // todo : gérer les erreurs possible et le contenue des champs obligatoires ect.
      Formatter les données genre nombres de caractères gestions des types ect ici
    */
    switch (key) {
      case "company_name" :
        break
      case "company_location" :
        break
      case "company_website" :
        break
      case "application_type" :
        temp_Value = temp_Value.toUpperCase()
        break
      case "application_type_optional" :
        break
      case "review_status" :
        break
      case "review_comment" :
        break
      default:
        break
    }
    formated_data[key] = temp_Value
  }

  // Add new data
  formated_data.application_date = new Date()
  formated_data.company_has_responded = false

  return formated_data;
}

const submitData = (data) => {
  fetch('http://localhost:3000/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // ou response.json() si vous attendez un JSON
      })
      .then(data => {
        console.log(data); // Affiche la réponse du serveur
        FORM.value.reset();
        // Todo : window.location.reload est sympa mais j'aurais prefere un fonctinement avec optimiste ,et ect ...
        window.location.reload(); // ou location.reload();

      })
      .catch(error => console.error('Erreur:', error));
};

const controlData = () => {
  if (!FORM.value) {
    FORM_ERROR_NOTIFICATION.value = `Un problème est survenue avec l'envoie du formulaire`
    return
  }

  const data_raw = new FormData(FORM.value);
  const data_cleaned = cleanData(data_raw);
  const data_formated = formatData(data_cleaned);
  const jsonString = JSON.stringify(data_formated);

  submitData(jsonString)
};
</script>

<template>
  <section class="section__form">
    <form @submit.prevent="controlData" ref="FORM">
      <div class="form__header">
        <h2 class="form__title">Candidature</h2>
        <h3 v-if="FORM_ERROR_NOTIFICATION !== null" class="form__notification">
          {{ FORM_ERROR_NOTIFICATION}}
        </h3>
      </div>


      <template v-for="field in FORM_FIELDS" :key="field.name">
        <Input
            :label="field.label"
            :placeholder="field.placeholder"
            :type="field.type"
            :options="field.options"
            :name="field.name"
            :required="field.required"
        />
      </template>

      <button type="submit" class="button button__submit">Envoyer</button>
    </form>


  </section>
</template>

<style scoped>
  /* SECTION */
  .section__form {
    grid-column: 1 / span 5;
    grid-row: 1 / span 12;
    min-width: 18rem;
  }

  /* FORM */
  form {
    height: 100%;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 1rem;
    padding: 2rem 1.5rem;
  }
  .form__header {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem 1rem;
  }
  .form__title {
    font-size: 1rem;
    font-weight: bold;
  }
  .form__notification {
    background: var(--secondary-bis);
    border-radius: 0.25rem;
    flex-grow: 1;
    padding: 0.3rem;
    color: var(--secondary);
    font-style: italic;
    font-size: 0.75rem;
    text-align: center;
  }

  /* BUTTON */
  .button {
    background: var(--primary);
    color: var(--background);
    padding: 0.5rem 1rem;
    margin: 1.5rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }
  .button:hover {
    background: var(--off-white-dark);
    color: var(--primary);
    transition: all 0.15s ease-in-out;
  }
  .button:active {
    background: var(--accent);
    color: var(--background);
  }
  .button__submit{
    align-self: center;
    width: fit-content;
  }
</style>