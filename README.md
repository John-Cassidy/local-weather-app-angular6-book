# LocalWeatherApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## ng commands for Docker from book

"predocker:build": "npm run build -- --prod --output-path dist && npm test -- --watch=false && npm run e2e",
"docker:build": "cross-conf-env docker image build . -t $npm_package_config_imageRepo:$npm_package_version",
"postdocker:build": "npm run docker:tag",
"docker:tag": " cross-conf-env docker image tag $npm_package_config_imageRepo:$npm_package_version $npm_package_config_imageRepo:latest",
"docker:run": "run-s -c docker:clean docker:runHelper",
"docker:runHelper": "cross-conf-env docker run -e NODE_ENV=local --name $npm_package_config_imageName -d -p $npm_package_config_imagePort:3000 $npm_package_config_imageRepo",
"predocker:publish": "echo Attention! Ensure `docker login` is correct.",
"docker:publish": "cross-conf-env docker image push $npm_package_config_imageRepo:$npm_package_version",
"postdocker:publish": "cross-conf-env docker image push $npm_package_config_imageRepo:latest",
"docker:clean": "cross-conf-env docker rm -f $npm_package_config_imageName",
"docker:taillogs": "cross-conf-env docker logs -f $npm_package_config_imageName",
"docker:open:win": "echo Trying to launch on Windows && timeout 2 && start http://localhost:%npm_package_config_imagePort%",
"docker:open:mac": "echo Trying to launch on MacOS && sleep 2 && URL=http://localhost:$npm_package_config_imagePort && open \$URL",
"predocker:debug": "run-s docker:build docker:run",
"docker:debug": "run-s -cs docker:open:win docker:open:mac docker:taillogs"
