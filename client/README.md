# Client

## Overview

This is the client for the app bootstrapped using create-react-app. It uses Tailwind CSS as a CSS framework.

## Example

![](../example.gif)

You can try the client online at [https://priceless-kilby-bee307.netlify.app/](https://priceless-kilby-bee307.netlify.app/).

## Third party libraries

All of the libraries used in this project are Open Source and provide clear benefits over doing everything on my own.

### Tailwind CSS, autoprefixer, cross-env, npm-run-all, postcss-cli

All of these libraries were used to set up Tailwind CSS for the project. I know it looks like a lot of added complexity, but it just took me around 3 minutes to set it all up and having this setup gives me a lot of benefits like Intellisense, automatic file watch for custom css, etc.

I think one of the main benefits from this setup is really shown when making the production build of the project, since you can remove unused css and chop off a lot of bundle size due to this.

### Axios

Axios is a really cool library that provides functions to make all kinds of HTTP requests and easily set headers or body.

### Cypress

Cypress is a testing library that makes development really easy. Specially if using TDD. You can run cypress tests and interact with the site just like a human would.

### Create react app

Although it's not really a library, it's an amazing tool to quickly bootstrap react projects and get up and going really fast.

## Code structure

I usually like to make a components folder in which I create reusable components and split my code in small pieces.

## Tests

There are some tests written under the cypress directory to make sure the app properly works. These tests can be run from the container terminal by using the following command:

```
yarn run test
```

Here's a gif showing how the tests might look if you run the command.

![](../test.gif)
