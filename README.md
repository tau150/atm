## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About the challenge

  This is a challenge I found on the internet, ant I use it to make some tests with tools I wanted to try like Typescript, React-Query and Cypress.

  You can test the deployed solution here (https://atm-tau150.vercel.app/) or run locally as well, for both cases you can use  the login information below.

  On the live demo I am using a third party service to storage a little json file, but it seems some times it takes a little bit to update the data, so, you maybe will notice a delay to get the balance updated.

  ## Demo Login

  Because this simulate an atm, login is not persisted, once you refresh the screen, you will have to login again. And after 30 seconds of inactivity your session will close.

User Document: 33222111
User Password: 1234

## Tests

The project includes unit testing with react-testing-library and e2e testing with cypress.

Run unit testing
```bash
npm run test
```

Run e2e testing
```bash
npm run cypress:open
```