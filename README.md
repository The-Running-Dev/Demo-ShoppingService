##Demo Shopping Service

AWS lambda function that provides wardrobe suggestions based on the current weather in a location.

####[Online Demo](http://plnkr.co/edit/PkmLCK6wBdesWV1b60kB)

####Running Locally
1. Install the NPM package: ```npm i demo-shopping-service```
2. Run all tests: ```npm run test```

####Deploying to Your Own AWS
1. Create IAM user with API access and put the user in the "administrator" policy.
2. Install the servless NPM package
```npm i serverless -g```
3. Configure serverless credentials:
```serverless config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY```
4. Deploy: 
```serverless deploy```
5. Run:
```serverless invoke -f suggest -l -p .\src\data\zipCode.json```

5. Run: ```serverless invoke -f suggest -l -p .\src\data\zipCodeExtended.json```

####Technologies
* [Webpack] (https://github.com/webpack/webpack) for compilation and bundling
* [Mocha] (http://mochajs.org/) for unit testing
* [Chai] (http://chaijs.com/) for assertions and expectations in unit testing
* [Sinon] (http://sinonjs.org/) for spies, mocks and stubs in unit testing
* [TypScript](http://www.typescriptlang.org/) for strongly typed JavaScript
* [TSD](https://github.com/DefinitelyTyped/tsd) for Type Script definition files for existing npm packages.
* [Serverless] (https://serverless.com) for testing and deployment