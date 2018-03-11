# Candidate Matching.

I used primeng treetable to list all the jobs and an arrow button to display
a candidate that I think is the most-qulified to fill that job.

Candidate matching score and skills will be displayed as the leaf of the tree table.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Method to get most-qualified candidate
1. I weight the skills job required based on the order that from left the most-relevant to right the least-relevant.
  e.g. 
  `mobile weight: 10, java weight: 9, swift weight: 8, objective-c weight: 7, iOS weight: 6, xcode weight: 5, fastlane weight: 4, aws weight: 3, kotlin weight: 2, hockey-app weight: 1`

2. I find the candidate who has the skills matching with the required skills of the job, weight that from left the strongest to right the weakest.
 e.g. 
    `skillTags: placements, iOS weight: 3, entertainment, mobile weight: 2, xcode weight: 1`

3. Multiply those two weights and add up all of the matching skills
  
     `iOS 6 * 3 + mobile 10 * 2 + xcode 1 * 5 = 44`

4. Divide the total weight by the amount of matching skills to get score.

     `Score: 44 / 3 = 14.66666`

5. Find candidate with the highest score.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
