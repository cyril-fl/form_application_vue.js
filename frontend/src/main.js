import { createApp } from 'vue'
import App from './App.vue'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiStarFill, BiStar, HiSolidLink, HiSolidAtSymbol } from "oh-vue-icons/icons";

addIcons(BiStarFill, BiStar, HiSolidLink, HiSolidAtSymbol);

const   app = createApp(App);
        app.component("v-icon", OhVueIcon);
        app.mount('#app');