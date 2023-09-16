# ESLint Custom Rule Example
## Topic of the Week: Linting 
This repository is being used in a Rise8 Topic of the Week presentation covering Linting. Its purpose is to show how easily you can add custom rules to ESLint.

Starting in ESLint v9.0, the old configuration files (.eslinrc, etc.) will be deprecated in favor of the new flat configs. This brings with it the benefit of greatly simplifying developer ability to add custom linting rules. This is currently available in v8 by adding an `eslint.config.js` file to your project root. Please see [docs](https://eslint.org/docs/latest/use/configure/configuration-files-new).

## Development
```shell
nvm use
npm install -g pnpm
pnpm install
pnpm run lint
```
