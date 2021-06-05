#!/bin/bash

# https://docs.npmjs.com/cli/cache
npm cache verify

# install project dependencies
npm install

npm install --save nuxt

# generate static
# npm run generate

# run the development server
npm run dev