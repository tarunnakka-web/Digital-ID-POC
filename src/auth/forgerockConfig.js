import { UserManager } from 'oidc-client-ts';

const config = {
  authority: 'https://<your-forgerock-domain>/am/oauth2', //we need to update this
  client_id: 'digital-id-client', //  ForgeRock client ID
  redirect_uri: `${window.location.origin}/callback`,
  response_type: 'code',
  scope: 'openid profile email',
  post_logout_redirect_uri: `${window.location.origin}/`,
};

const userManager = new UserManager(config);
export default userManager;
