import { createApp } from 'vue'
import './style.css'
import './tailwind.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import KeyCloakService from "./services/KeycloakService";
import HttpService from "./services/HttpService";
const app = createApp(App);

const renderApp = () => {
    app.mount("#app");
  };
app.use(router)
app.use(createPinia())
app.use(Antd);

KeyCloakService.CallLogin(renderApp);
HttpService.configureAxiosKeycloak();

// app.mount('#app')