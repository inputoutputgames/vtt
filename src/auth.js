import { createAuth0Client } from "@auth0/auth0-spa-js";

export const auth0 = await createAuth0Client({
  domain: "<AUTH0_DOMAIN>",
  clientId: "<AUTH0_CLIENT_ID>",
  authorizationParams: {
    redirect_uri: window.location.origin
  }
});

export async function login() {
  await auth0.loginWithRedirect();
}

export async function logout() {
  auth0.logout({ logoutParams: { returnTo: window.location.origin } });
}

export async function getToken() {
  return await auth0.getTokenSilently();
}