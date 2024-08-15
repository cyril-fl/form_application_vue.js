import { createApp } from 'vue'
import App from './App.vue'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiStarFill, BiStar, HiSolidLink } from "oh-vue-icons/icons";

addIcons(BiStarFill, BiStar, HiSolidLink);

const   app = createApp(App);
        app.component("v-icon", OhVueIcon);
        app.mount('#app');