# JW Boilerplate

## Environment

-   Node v20

-   Yarn v4.7.0

-   DON'T USE NPM

## Using Library

-   framer-motion
-   react-query
-   shadcn/ui
-   tailwind + cva
-   react hook form + zod

## Setup environment guide

### Node

-   Using command `node -v` to check whether node version and install correct version

-   You can use `nvm` tool for node version management

### Yarn

-   Install yarn: `npm install -g yarn`

-   Using command `yarn -v` to check whether yarn version

-   Upgrade/downgrade yarn to v4 `yarn set version 4.7.0 && yarn cache clean`

-   Add line .yarnrc.yml >> nodeLinker: node-modules 

-   After upgrade/downgrade yarn, remove `node_modules` folder, `package-lock.json` (if existed) and then `yarn install`