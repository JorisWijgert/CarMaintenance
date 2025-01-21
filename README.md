# CarMaintenance

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.3.

## Install packages

To install the latest packages, run:
```bash
npm install
```

## Development server

To start a local development server, run:

```bash
npm run start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Assumptions

While working on this project, I've made the following assumptions:
* Currently this application is only designed to show the theoretical prices when a job would be performed on a car
* For this reason, I chose not to implement the ability to actually schedule the maintenance jobs, nor the management of the cars, customers and engineer
* I did choose to implement the brand and model class, to complete that part of the class diagram and make it easier to implement the management of cars, customers and engineers.
* I also made an assumptions on prices of the spare parts, the VAT, the hourly rate, the weekend markup, etc.
