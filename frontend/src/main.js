import { createApp } from 'vue'
import App from './App.vue'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiStarFill, BiStar, BiSquare, BiCheckSquareFill, HiSolidLink, HiSolidAtSymbol, HiSolidCheckCircle } from "oh-vue-icons/icons";

addIcons(BiStarFill, BiStar, BiSquare, BiCheckSquareFill, HiSolidLink, HiSolidAtSymbol, HiSolidCheckCircle);

const   app = createApp(App);
        app.component("v-icon", OhVueIcon);
        app.mount('#app');