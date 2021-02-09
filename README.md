# settle-braintree-transactions

The application iterates through all the Braintree transactions in `Authorized` status and tries to settle them. It is intentionally simple because of the context. No bells and whistles. Only `braintree` as dependency. It includes more comments than necesary to make ports to facilitate ports to other programming languages.

## Prerequisites

Have NodeJS installed in your machine. The official site is https://nodejs.org/en/download/.

## How can I run this?

1. Edit the `script.js` file and substitute the placeholders for the merchantId, publicKey, and privateKey. 
2. Open a terminal, navigate to the project folder (the one containing the `package.json` file)
3. Execute `npm install`. This will install the `braintree` dependency automatically.
4. Execute `npm start`. This will execute the application. You will see the results in the screen.

