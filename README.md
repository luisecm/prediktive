# Prediktive - QA Challenge

This repository contains a small framework to Duck Duck Go website and validate three test cases assigned as a challenge to run QA

Tests running using GitHub Actions:

<p align="left">
    <a href="https://github.com/luisecm/prediktive/actions"><img src="https://github.com/luisecm/prediktive/actions/workflows/ci-tests.yml/badge.svg" /></a>
</p>

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Node.js is installed. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: npm is installed. It comes with Node.js.

## Setting up to run on the local machine

1. First, clone this testing repository:

```sh
git clone git@github.com:luisecm/prediktive.git
```

2. Install testing repository dependencies

```sh
npm install
```

3. Install Playwright and its dependencies in your local machine

```sh
npx playwright install --with-deps
```

4. Now, browse into the testing repository folder that you cloned before and run the following command on CLI

```sh
npx playwright test
```

5. If you would like to open the Playwright UI to run the test cases, you can use the following command

```sh
npx playwright test --ui
```

## Running Specific Tests

To run a specific test file:

```sh
npx playwright test tests/your-test-file.spec.js
```

Any contributions to the repository are welcome!
