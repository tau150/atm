## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Demo Login

Because this simulate an atm, login is not persisted, once you refresh the screen, you will have to login again

User Document: 33222111
User Password: 1234


## About the challenge

This is a challenge I found on the internet, ant I use to make some tests with tools I am learning like Typescript, React-Query and Cypress.

At the moment there is an small json as database, so you will need to run the project locally.

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