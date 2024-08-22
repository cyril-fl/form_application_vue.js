<script setup>
import {ref, defineEmits, watchEffect} from "vue";
import Input from "@Form/components/Input.vue";

const EMIT = defineEmits(['add_temporary','add_success','add_error']);
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
const FORM_SUCCESS_NOTIFICATION = ref(false)

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
      // Todo : gérer les erreurs possible et le contenue des champs obligatoires ect.
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
        temp_Value = temp_Value === "" ? null : temp_Value
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
  console.log(data);
  fetch('http://localhost:3000/api/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
      .then(res => {
        if (!res.ok) {
          FORM_ERROR_NOTIFICATION.value = `Erreur HTTP: ${res.status}`;
          throw new Error('Network res was not ok');
        }
        return res.json(); // res.json() if res isJSON
      })
      .then(res => {
        console.log('submitData',res); // Affiche la réponse du serveur
        FORM_SUCCESS_NOTIFICATION.value = true;
        EMIT('add_success', res.id);
        FORM.value.reset();
      })
      .catch(error => {
        console.error('Erreur:', error)
        FORM_ERROR_NOTIFICATION.value = `Erreur lors de l'envoie du formulaire : ${error}`;
        EMIT('add_error');
      });
};

const controlData = () => {
  if (!FORM.value) {
    FORM_ERROR_NOTIFICATION.value = `Un problème est survenue avec l'envoie du formulaire`
    return
  }

  const data_raw = new FormData(FORM.value);
  const data_cleaned = cleanData(data_raw);
  const data_formated = formatData(data_cleaned);

  EMIT('add_temporary', data_formated);

  submitData(data_formated);
};

watchEffect(() => {
  if (FORM_SUCCESS_NOTIFICATION.value) {
    setTimeout(() => {
      FORM_SUCCESS_NOTIFICATION.value = false;
    }, 1500); // Réinitialiser après 1,5 seconde
  }
});

</script>

<template>
  <section class="section__box section__form">
    <form @submit.prevent="controlData" ref="FORM">
      <div class="form__header">
        <h2 class="form__title">Candidature</h2>

        <transition name="fade">
          <h3 v-if="FORM_ERROR_NOTIFICATION" class="form__notification__Error">{{ FORM_ERROR_NOTIFICATION }}</h3>
        </transition>
        <transition name="fade">
          <div v-if="FORM_SUCCESS_NOTIFICATION" class="form__notification__Success">
            <v-icon name="hi-solid-check-circle" />
          </div>
        </transition>

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

<style>
  /* FORM */
  form {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
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
  .form__notification__Error {
    background: var(--secondary-bis);
    color: var(--secondary);
    border-radius: 0.25rem;
    flex-grow: 1;
    padding: 0.3rem;
    font-style: italic;
    font-size: 0.75rem;
    text-align: center;
  }

  .form__notification__Success {
    color: var(--accent);
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

  /* Transition fade */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  .fade-enter-to, .fade-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
</style>