/**
 * Created by Shahzad on 09/012/2017.
 */

(function () {
  'use strict';

  /*dependencies*/
  var Nightmare = require('nightmare');

  /*locals*/
  
  // our new class that is going to be a wrapper over Nightmare
  function Lovely(config) {

    /*wrapper additional properties*/
    this.homeURL = config.homeURL;

    /*copy Nightmare properties and initialization*/
    Nightmare.call(this, config.nightmareOptions);
  }

  // extend the nightmare prototypes 
  Lovely.prototype = Object.create(Nightmare.prototype);
  
  // reset the constructor pointer to our class
  Lovely.prototype.constructor = Lovely;
  
  /*list of additional prototypes added into the wrapper*/
  Lovely.prototype.gotoHomePage = gotoHomePage;
  Lovely.prototype.logHomePage = logHomePage;


  /*initialization*/

  // starts the show - using the wrapper for navigation etc.
  start();


  /*function declarations*/

  //  open the selected 
  function start() {
    var browser;

    browser = new Lovely({
      homeURL: 'https://www.google.com.pk/',
      nightmareOptions: {

      }
    });
    
    // execute the request
    browser
      .logHomePage()
      .gotoHomePage()
      .evaluate(function () {
        // return the title of the target web page
        return document.title;
      })
      .end()
      .then(function (title) {
        console.log('Title of home page is ' + title);
        console.log('DONE');
      })
      .catch(function (err) {
        console.log('Error occurred.');
        console.log(err);
      });

  }

  // prototype - navigates the instance to the homepage
  function gotoHomePage() {
    return this.goto(this.homeURL);
  }
  
  // prototype - logs the homepage URL.
  function logHomePage() {
    console.log('homepage URL is: ' + this.homeURL);
    return this;
  }
  
})();
