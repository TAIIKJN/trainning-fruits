// filepath: /C:/Users/User/Documents/GitHub/trainning-fruits/sample-web-fe/src/keycloak.js
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://www.keycloak.org',
  realm: 'taii-aif',
  clientId: 'training-fruits',
});

export default keycloak;