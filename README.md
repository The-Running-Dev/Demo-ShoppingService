# Shopping Service using TypeScript

AWS lambda function that provides wardrobe suggestions based on the current weather in a location.

== Demo
* Run from the web at

== Running Locally
1. Install the servless NPM package: ```npm i serverless -g```
2. Install the NPM package: ```npm i demo-shopping-service```
3. Run with serveless: ```serverless invoke -f suggest -l```

== Technologies
* [Webpack] (https://github.com/webpack/webpack) for compilation and bundling
* [Mocha] (http://mochajs.org/) for unit testing
* [Chai] (http://chaijs.com/) for assertions and expectations in unit testing
* [Sinon] (http://sinonjs.org/) for spies, mocks and stubs in unit testing
* [TypScript](http://www.typescriptlang.org/) for strongly typed JavaScript
* [TSD](https://github.com/DefinitelyTyped/tsd) for Type Script definition files for existing npm packages.
* [Serverless] (https://serverless.com) for testing and deployment