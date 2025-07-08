# RigSync

This project aims to create an application that enables easy management of multiple skydiving rigs, namely for use by university clubs and other organisations who may hire out their equipment.

## Auth

User's can authenticate using Google.
- [Google Identity Setup](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid)
- [Google RigSync Clients Config](https://console.cloud.google.com/auth/clients?project=rigsync)

Further information about the implementation of authentication can be found at the following links:
- [Authentication and authorization in Azure App Service and Azure Functions](https://learn.microsoft.com/en-us/azure/app-service/overview-authentication-authorization)
- [Customize sign-ins and sign-outs in Azure App Service authentication](https://learn.microsoft.com/en-us/azure/app-service/configure-authentication-customize-sign-in-out)
- [Tutorial: Authenticate and authorize users end-to-end in Azure App Service](https://learn.microsoft.com/en-us/azure/app-service/tutorial-auth-aad)

My personal notes on how the auth has been implemented:

1. Visit [Google Cloud Auth](https://console.cloud.google.com/auth) and create a new client with the following details:
    - Authorised JS origins = https://rigsync-api.azurewebsites.net (backend url)
    - Authorised redirect URIs = https://rigsync-api.azurewebsites.net/.auth/login/google/callback ({backend url}/.auth/login/google/callback)
1. Copy the generated Client ID and Client Secret.
1. In the Azure Portal, on the Azure Functions resource, configure the following authentication settings:
    - App Service authentication = Enabled
    - Restrict access = Allow unauthenticated access
    - Token store = Yes
    - Allowed external redirect URLs = https://gentle-bush-08d423903.6.azurestaticapps.net (frontend url)
1. Also in the Azure Portal, on the Azure Functions resource, add a new identity provider using the client ID and secret retrieved from the previous step.
1. In the frontend, use the following link to log in with google:
    - https://rigsync-api.azurewebsites.net/.auth/login/google?post_login_redirect_uri=https://gentle-bush-08d423903.6.azurestaticapps.net ({backend url}/.auth/login/google?post_login_redirect_uri={frontend url})