# Dashboard
![Deployment](https://github.com/PGP1/Dashboard/workflows/Deployment/badge.svg)

## 1. Pre-requisite

For the project to work, this is the requirements:

-   Node `^10.16.3`
-   Npm `^6.9.0`

### 1.1 Dependencies

**a. For development**

To install all the dependencies for development.

```bash
npm install
```

**b. For integration testing**

```bash
cd webdriverio-test/
npm install 
```

Besides, allure might needed for report rendering

```bash
npm install allure-commandline -g
```

## 2. Development

To start the development session, run

```bash
npm run dev
```

### 3. For testing

**1. Run test**

```bash
cd webdriverio-test
npm run test 
```

**2. To export into html** 

```bash
npm run report
```

**3. To serve the report**

Use anything to serve it, an easy way is to install the serve package.

```bash
npm install serve -g
serve -S allure-report
```