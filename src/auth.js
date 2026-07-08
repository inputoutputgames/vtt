
const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

const redirectUri = isLocal ? "http://localhost:8080" : "https://inputoutputgames.github.io/vtt";

const auth0Client = new auth0.Auth0Client({
    domain: "dev-5pwlkrdud4th17h7.us.auth0.com",
    clientId: "yeQaaVAMFdOa2VsWqqGIBLmVhrw9ruxv",
    authorizationParams: {
        redirect_uri: redirectUri,
        scope: "openid profile email"
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    console.log("isLocal:", isLocal);
    console.log("redirectUri:", redirectUri);

    // Handle Auth0 redirect callback
    if (window.location.search.includes("code=") &&
        window.location.search.includes("state=")) {

        console.log("Handling Auth0 redirect callback...");
        await auth0Client.handleRedirectCallback();

        // Clean the URL so the callback doesn't run again
        window.history.replaceState({}, document.title, "/");
    }

    // Check authentication state
    const isAuth = await auth0Client.isAuthenticated();
    console.log("isAuthenticated:", isAuth);

    // Build the login/logout button
    const btn = document.createElement("button");

    if (isAuth) {
        btn.textContent = "Logout";
        btn.addEventListener("click", logout);
    } else {
        btn.textContent = "Login";
        btn.addEventListener("click", login);
    }

    document.body.appendChild(btn);
});


// Login / Logout / Token functions
export async function login() {
    console.log("Logging in...");
    await auth0Client.loginWithRedirect();
}

export async function logout() {
    console.log("Logging out...");
    await auth0Client.logout({
        logoutParams: { returnTo: redirectUri }
    });
}

export async function getToken() {
    console.log("Getting token...");
    return await auth0Client.getTokenSilently();
}