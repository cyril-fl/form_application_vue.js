import { createApp } from 'vue'
import App from './App.vue'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiStarFill, BiStar, BiSquare, BiCheckSquareFill, HiSolidLink, HiSolidAtSymbol, HiSolidCheckCircle, HiChevronUp, HiMinus, HiChevronDown} from "oh-vue-icons/icons";

addIcons(BiStarFill, BiStar, BiSquare, BiCheckSquareFill, HiSolidLink, HiSolidAtSymbol, HiSolidCheckCircle, HiChevronUp, HiMinus, HiChevronDown);

const   app = createApp(App);
        app.component("v-icon", OhVueIcon);
        app.mount('#app');