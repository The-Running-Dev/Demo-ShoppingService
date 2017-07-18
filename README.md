## Demo Shopping Service

AWS lambda function that provides wardrobe suggestions based on the current weather at a location.

#### [Online Demo](https://the-running-dev.github.io/Demo-ShoppingService/)

#### Running Locally
The NPM package contains both the client and the server code.
Install with: ```npm i demo-shopping-service```

#### AWS Lambda Function (Service)
1. Change directory to server: ```cd service```

2. Install the dependencies: ```npm install```

3. Run all tests: ```npm run test```

##### Deploying Service on Your Own Amazon Web Services
1. Create IAM user with API access and put the user in the "administrator" policy.

2. Install the servrless NPM package

    ```npm i serverless -g```

3. Configure serverless credentials

    ```serverless config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY```

4. Deploy

    ```serverless deploy```

5. Run:

    ```serverless invoke -f suggest -l -p .\src\data\zipCode.json```
    ```serverless invoke -f suggest -l -p .\src\data\zipCodeExtended.json```

#### Client (Angular)
1. Change directory to client: ```cd .\client```
2. Install the dependencies: ```npm install```
3. Run the client: ```ng serve```
4. Browse to ```http://localhost:4200```

#### Technologies
* [Angular] (https://angular.io) for demo client consumer
* [Chai] (http://chaijs.com/) for assertions and expectations in unit testing
* [DefinitelyTyped](https://github.com/DefinitelyTyped/tsd) for Type Script definition files for existing npm packages.
* [Mocha] (http://mochajs.org/) for unit testing
* [TypScript](http://www.typescriptlang.org/) for strongly typed JavaScript
* [Serverless] (https://serverless.com) for testing and deployment
* [Sinon] (http://sinonjs.org/) for spies, mocks and stubs in unit testing
* [Webpack] (https://github.com/webpack/webpack) for compilation and bundling