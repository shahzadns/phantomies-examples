/**
 * Created by Shahzad on 13/01/2017.
 */

(function () {
  'use strict';

  /*dependencies*/
  var Nightmare = require('nightmare');


  /*locals*/
  var browser, search;

  /*initialization*/
  browser = Nightmare({
    show: true
  });

  search = 'Headless Browsers';
  searchGoogle(search);


  /*function declarations*/

  //Retrieves the Title and Link info for top 10 google results
  function searchGoogle(searchString) {
    var URL, encodedString;

    //encodes the string for query
    encodedString = encodeURIComponent(searchString);

    //Google desired - replace the encoded space with plus character
    encodedString = encodedString.replace(/%20/g, '+');

    //generate URL to use for query
    URL = 'https://www.google.com.pk/#q=' + encodedString;

    //console.log(URL);

    //execute the request
    browser
      .goto(URL)
      //.wait('#main #cnt #center_col #res ._NId') //faster but could get outdated if Google changes the layout
      .wait('#res')
      .wait(500)
      .evaluate(function () {
        var resultsDOM, resultsArray;

        resultsArray = [];

        resultsDOM = document.querySelectorAll('#res ._NId:last-child h3 a');

        for (var i = 0; i < resultsDOM.length; i++) {
          resultsArray.push({
            title: resultsDOM[i].innerHTML,
            link: resultsDOM[i].href
          });
        }

        return resultsArray;
      })
      .end()
      .then(function (results) {
        console.log('Top '+ results.length +' results retrieved');
        console.log(results);
      })
      .catch(function (err) {
        console.log('Error occurred.');
        console.log(err);
      });

  }

})();
