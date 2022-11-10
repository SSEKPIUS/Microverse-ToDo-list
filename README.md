![](https://img.shields.io/badge/Microverse-blueviolet)

# Project Name

> Microverse-ToDo-list


## Built With

- CSS, HTML
- Frameworks-none
- Technologies use- Git, npm

## Live Demo (if available)

[Live Demo Link]()


## About

"To-do list" is a tool that helps to organize your day. It simply lists the things that you need to do and allows you to mark them as complete. I will build a simple website that allows for doing that, and I will do it using ES6 and Webpack!


To get a local copy up and running follow these simple example steps.

## Getting Started
### WebPack
First let's create a directory, initialize npm, install webpack locally, and install the webpack-cli
1. npm init -y
2. npm install webpack webpack-cli --save-dev

### Loading CSS
1. npm install --save-dev style-loader css-loader

### Loading Data
1. npm install --save-dev csv-loader xml-loader

### HtmlWebpackPlugin
1. npm install --save-dev html-webpack-plugin

### Using webpack-dev-server
1. npm install --save-dev webpack-dev-server 
2. npm install --save-dev express webpack-dev-middleware

### Set-up GitHub Actions
1. create a .github/workflows folder and add a copy of .github/workflows/linters.yml (https://github.com/microverseinc/linters-config/blob/master/html-css/.github/workflows/linters.yml) to that folder.

### Setup & Install
Set-up linters in your local env
#### Webhint
1. you need to initialize npm to create package.json file.  npm init -y
2. Run npm install --save-dev hint@7.x
3. Copy .hintrc (https://github.com/microverseinc/linters-config/blob/master/html-css/.hintrc) to the root directory of your project.

#### Stylelint
A mighty, modern linter that helps you avoid errors and enforce conventions in your styles.
1. Run npm install --save-dev stylelint@13.x stylelint-scss@3.x stylelint-config-standard@21.x stylelint-csstree-validator@1.x
2. Copy .stylelintrc.json (https://github.com/microverseinc/linters-config/blob/master/html-css/.stylelintrc.json) to the root directory of your project.

#### ESLint
1. Run npm install --save-dev eslint@7.x eslint-config-airbnb-base@14.x eslint-plugin-import@2.x babel-eslint@10.x
2. Copy .eslintrc.json(https://github.com/microverseinc/linters-config/blob/master/html-css-js/.eslintrc.json) to the root directory of your project.

### Run tests

1. Run npx hint . to Fix Web validation errors.
2. Run npx eslint . --fix on the root of your directory of your project to Fix linter errors.
3. Run npx stylelint "**/*.{css,scss}" . --fix  on the root of your directory of your project to Fix linter errors.

## Authors
1. Ssekweyama Pius

- GitHub: [@githubhandle](https://github.com/SSEKPIUS)
- Twitter: [@twitterhandle](https://twitter.com/SSEK_PIUS)
- LinkedIn: [LinkedIn](https://linkedin.com/in/pius-ssekweyama-23665794)

## 🤝 Contributing


Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](../../issues/).

## Show your support
Give a ⭐️ if you like this project!

## Acknowledgments
- Big thanks to Microverse and all the student teams that contributed in any form

## 📝 License
This project is [MIT](./LICENSE) licensed.
