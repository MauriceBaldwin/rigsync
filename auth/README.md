# Auth

My personal notes on how the auth has been implemented:

## Auth setup
1. Visit [Google Cloud Auth](https://console.cloud.google.com/auth) and create a new client with the following details:
    - Authorised JS origins = https://rigsync-api.azurewebsites.net (backend url)
    - Authorised redirect URIs = https://rigsync-api.azurewebsites.net/.auth/login/google/callback ({backend url}/.auth/login/google/callback)
1. Copy the generated Client ID and Client Secret.
1. In the Azure Portal, on the Azure Functions resource, configure the following authentication settings:
    - App Service authentication = Enabled
    - Restrict access = Require authentication
    - Token store = Yes
    - Allowed external redirect URLs = https://gentle-bush-08d423903.6.azurestaticapps.net (frontend url)
1. Also in the Azure Portal, on the Azure Functions resource, add a new identity provider using the client ID and secret retrieved from the previous step.
1. Back in the Google Cloud Auth, under the 'Data access' tab, add the scopes that you want to be able to access.

## Auth in the backend code
1. Somewhat counterintuitively, you still need to use `AuthorizationLevel.Anonymous` on HTTP triggers for Azure Functions. My understanding of what's going on here is that the actual authentication happens in a 'wrapper' around the actual Azure Functions app, so the application itself doesn't ever know about the authentication.
1. To authenticate a request to the API, pass your identity token in the header `X-ZUMO-AUTH`
1. Using a JWT decoder, the backend can read this identity token and extract the SID value. This is a unique identifier of the user. (note that, according to the google auth docs, you should not rely on the email address as being the unique identifier, since that can apparently change; the SID will always remain the same for a single user)
1. The scopes/claims that have been configured on the Google Cloud Auth 'Data access' will NOT be included in the standard identity token. You can, however, access this information by making a request to {backend url}/.auth/me

## Auth in the frontend code
1. In the frontend, use the following link to log in with google:
    - https://rigsync-api.azurewebsites.net/.auth/login/google?post_login_redirect_uri=https://gentle-bush-08d423903.6.azurestaticapps.net ({backend url}/.auth/login/google?post_login_redirect_uri={frontend url})
  After successful authentication, this will redirect you back to the frontend app (or whatever the post_login_redirect_uri was), and the identity token will be a url parameter. Use this identity token to authenticate the backend requests.
