import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://id.frappet.synology.me/', // URL ของ Keycloak Server
  realm: 'taii-aif',                    // Realm ที่คุณใช้งาน
  clientId: 'training-fruits',          // Client ID ที่กำหนดใน Keycloak
});

export default keycloak;
