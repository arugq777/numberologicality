angular.module('numberologicality')
  .controller('HomeController', ['$scope', '$http', function ($scope, $http) {
  }])
          .config(function($httpProvider) {

            $httpProvider.interceptors.push(function($q, $rootScope) {
                return {
                    'request': function(config) {
                        $rootScope.$broadcast('loading-started');
                        return config || $q.when(config);
                    },
                    'response': function(response) {
                        $rootScope.$broadcast('loading-complete');
                        return response || $q.when(response);
                    }
                };
            });

        })


        .directive("loadingIndicator", function() {
            return {
                restrict : "A",
                template: "<div>Loading...</div>",
                link : function(scope, element, attrs) {
                    scope.$on("loading-started", function(e) {
                        element.css({"display" : ""});
                    });

                    scope.$on("loading-complete", function(e) {
                        element.css({"display" : "none"});
                    });

                }
            };
        })

  .controller('NumbersController', ['$scope', '$http', function ($scope, $http) {

  var uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  var letters = uppercaseLetters + lowercaseLetters + " " + "!";
  var values = {" ":" ", "!":"" };
  
  function initValues(array, obj){
    for(var i = 0; i < array.length; i++){
      var v = (i+1) % 9;
      if(v == 0){
        obj[array[i]] = 9;
      } else {
        obj[array[i]] = v;
      }
    }
  }

  initValues(uppercaseLetters, values);
  initValues(lowercaseLetters, values);

  $scope.letters = {
    "vowels" : "aeiouAEIOU",
    "all" : letters,
    "values" : values
  };

  $scope.modelData = {
    "rawInput":"",
    "input":"",
    "rawDateInput": "",
    "dateInput" : "",
    "wholeName" : [],
    "vowel" : [],
    "consonant" : [],
    "birthdate" : []
  };

  $scope.viewStrings = {
    "numbers":{      
      "wholeName" : "",
      "vowel"     : "",
      "consonant" : "",
      "birthdate" : ""
    },
    "letters":{      
      "wholeName" : "",
      "vowel"     : "",
      "consonant" : "",
      "birthdate" : ""
    },
    "calculations" : {
      "wholeName" : "",
      "vowel"     : "",
      "consonant" : "",
      "birthdate" : ""
    }
  };

  $scope.keys = [
    {
      "rb" : "whole_name", 
      "js": "wholeName",
      "str": "Whole Name"
    },
    {
      "rb" : "vowel", 
      "js": "vowel",
      "str": "Vowel"
    },
    {
      "rb" : "consonant", 
      "js": "consonant",
      "str": "Consonant"
    },
    {
      "rb" : "birthdate", 
      "js": "birthdate",
      "str": "Birthdate"
    }
  ];

  var ns = $scope.viewStrings;
  var nm = $scope.modelData;

  $scope.updateName = function(name){
    nm.rawInput = name;
    $scope.responseData = {};

    // if( name == undefined ){
    //   ns.nErr = "Name is required.";
    // }

    if(!$scope.inputform.nameinput.$valid || $scope.inputform.nameinput.$error.pattern){
      clearNameStrings(); 
      ns.nErr = "Valid name is required.";
    } else {
      cleanNameInputString();
      formatStrings(nm.input);
                
      calculateNameNumbers();
      formatNameNumStrings();
    }

    // if(  ){
    //   // clearNameStrings();
    //   ns.nErr = "Invalid characters in name input field.";
    // }
    

  };

  $scope.updateDate = function(date){
    nm.rawDateInput = date;
    nm.dateInput = new Date(date);
    $scope.responseData = {};

    if( nm.dateInput == "Invalid Date" ){
      clearDateStrings();
      if( nm.rawDateInput == undefined ){
        ns.dErr = "Date is required";
      } else if( nm.rawDateInput.length > 0 ){   
        ns.dErr = "Invalid date in date input field.";
      }
    } else {
      ns.dErr = "";
      //console.log(nm.dateInput);
      ns.letters.birthdate = new Date(date).toISOString();
      nm.birthdate = [];
      ns.numbers.birthdate = calculateBirthdateNumber(nm.dateInput, nm.birthdate);
      ns.calculations.birthdate = formatNumString(nm.birthdate);
    }
  };

  $scope.submitForm = function(){
    //console.log($scope.modelData)
    var data = {
      "raw_name_input" : nm.rawInput,
      "name"           : nm.input,
      "raw_date_input" : nm.rawDateInput,
      "birthday"       : nm.dateInput,
      "whole_name"     : nm.wholeName,
      "vowel"          : nm.vowel,
      "consonant"      : nm.consonant,
      "birthdate"      : nm.birthdate,
    };
    $scope.currentData = { 
      "name"           : nm.input,
      "birthday"       : nm.dateInput,     
      "whole_name"     : nm.wholeName[nm.wholeName.length - 1],
      "vowel"          : nm.vowel[nm.vowel.length - 1],
      "consonant"      : nm.consonant[nm.consonant.length - 1],
      "birthdate"      : nm.birthdate[nm.birthdate.length - 1],
    };

    console.log(data);
    if( $scope.inputform.nameinput.$valid ){      
      var response = $http.post('/json', data, {});
      response.success(function(responseData, status, headers, config) {
        $scope.responseData = responseData;
        //console.log(responseData);
        //console.log(typeof(responseData));
      });
      response.error(function(data, status, headers, config) {
        $scope.responseError = data;
        alert("Submitting form failed!");
      });
    }

  };

  $scope.getMoreNames = function(key, number, limit){
    if( limit == undefined ){
      limit = 10;
    }

    var data = {  "key"   : key, 
                  "number": number,
                  "index" : $scope.responseData[key].length,
                  "limit" : limit
                };
    console.log("gmn:" + " key " + key + " number " + number + " limit " + limit);
    var response = $http.post('/json/more', data, {});
    response.success(function(moreResponseData, status, headers, config) {
      for(var i = 0; i < moreResponseData.length; i++){
        moreResponseData[i].mrd_index = i;
      }
      $scope.responseData[key] = $scope.responseData[key].concat(moreResponseData);
      console.log(moreResponseData);
      //console.log(typeof(responseData));
    });
    // response.error(function(data, status, headers, config) {
    //   $scope.responseError = data;
    //   alert("Submitting form failed!");
    // });

  }

  function cleanNameInputString(){
    nm.input = "";
    if(nm.rawInput.length > 0){
      for(var i = 0; i < nm.rawInput.length; i++){
        if( $scope.letters["all"].indexOf(nm.rawInput[i]) > -1){
          nm.input += nm.rawInput[i];
        }
      }
    }
  }

  function clearNameStrings(){
    var vsKeys = Object.keys(ns);
    for(var i = 0 ; i < vsKeys.length-1; i++){
      for(var k = 0 ; k < $scope.keys.length; k++){
        ns[ vsKeys[i] ][ $scope.keys[k].js ] = "";
      }
    }
    // ns.letters.wholeName = "";
    // ns.letters.vowel     = "";
    // ns.letters.consonant = "";
    // ns.numbers.wholeName = "";
    // ns.numbers.vowel     = "";
    // ns.numbers.consonant = "";
    // ns.calculations.wholeName = "";
    // ns.calculations.vowel     = "";
    // ns.calculations.consonant = "";
    ns.nErr = "";
  }

  function clearDateStrings(){
    var vs = ["letters","numbers","calculations"];
    for(i = 0 ; i < vs.length; i++){
      ns[vs[i]].birthdate = "";
    }
    // ns.letters.birthdate      = "";
    // ns.numbers.birthdate      = "";
    // ns.calculations.birthdate = "";
    ns.dErr = "";
  }

  function addVowel(letter){
    ns.letters.wholeName += letter;
    ns.letters.vowel     += letter;
    ns.letters.consonant += " ";
    ns.numbers.wholeName += $scope.letters.values[letter];
    ns.numbers.vowel     += $scope.letters.values[letter];
    ns.numbers.consonant += " "
  }

  function addConsonant(letter){
    ns.letters.wholeName += letter;
    ns.letters.vowel     += " ";
    ns.letters.consonant += letter;
    ns.numbers.wholeName += $scope.letters.values[letter];
    ns.numbers.vowel     += " "
    ns.numbers.consonant += $scope.letters.values[letter];
  }

  function formatStrings(name){
    clearNameStrings();

    if( name.indexOf("!") != -1 ){
      for(var i = 0; i < name.length; i++){
        if(name[i] == "!"){
          if(name[i+1] != undefined && name[i+1] != "!"){
            if( $scope.letters.vowels.indexOf(name[i+1]) > -1 || name[i+1] == " "){
              addConsonant(name[i+1]);
            } else {
              addVowel(name[i+1]);
            }
            i += 1;
          }         
        } else {
          if( $scope.letters.vowels.indexOf(name[i]) > -1 || name[i] == " "){
            addVowel(name[i]);
          } else {
            addConsonant(name[i]);
          }
        }
      }
    } else {
      for(var i = 0; i < name.length; i++){
        if( $scope.letters.vowels.indexOf(name[i]) > -1 || name[i] == " "){
          addVowel(name[i]);
        } else {
          addConsonant(name[i]);
        }
      }
    }
  }

  function calculateNameNumbers(){
    nm.wholeName = [];
    nm.consonant = [];
    nm.vowel = [];
    calculateNumber( ns.numbers.vowel + ns.numbers.consonant, nm.wholeName);
    calculateNumber( ns.numbers.consonant, nm.consonant);
    calculateNumber( ns.numbers.vowel, nm.vowel);
  }

  var masterNumbers = [11,22,33];

  function calculateNumber(numberString, array){
    var total = 0;
    num = numberString.replace(/\s/g, "");
    for(var i=0; i < num.length; i++){
      total += parseInt(num[i]);
    }
    array.push(total);
    if(total > 9 && masterNumbers.indexOf(total) == -1 ){
      calculateNumber(("" + total), array);
    }
  }

  function calculateNumberFromString(string, array){
    var total = 0;
    str = string.replace(/\s/g, "");
    for(var i=0; i < str.length; i++){
      total += $scope.letters.values[str[i]];
    }
    array.push(total);
    if(total > 9 && masterNumbers.indexOf(total) == -1 ){
      reduce(total, array);
    }
  }

  function calculateBirthdateNumber(date, array){
    var m = [], d = [], y = [], total = 0;
    var d = date.toJSON().toString().split('T').shift().split('-')
    reduce(d[0], y);
    reduce(d[1], m);
    reduce(d[2], d);
    total = y[y.length-1] + m[m.length-1] + d[d.length-1];
    //console.log(""+m+" "+d+" "+y+" "+total);
    array.push(total);
    if(total > 9 && masterNumbers.indexOf(total) == -1 ){
      reduce(total, array);
    }
    var r_d = "" + y[y.length-1] + " " + m[m.length-1] + " " + d[d.length-1];
    return r_d;
  }

  function reduce(number, array){
    var total = 0;
    while(number > 0){
        total += number % 10;
        number = Math.floor(number/10);
    }
    array.push(total);
    if( total > 9 ){
        reduce(total, array);
    }
  }

  function formatNameNumStrings(){
    ns.calculations.wholeName = formatNumString(nm.wholeName);
    ns.calculations.consonant = formatNumString(nm.consonant);
    ns.calculations.vowel = formatNumString(nm.vowel);
  }

  function formatNumString(ary){
    var str = "";
    for(var i = 0; i < ary.length; i++){
      str += ary[i];
      if( !((i+1) == ary.length) ){
        str += " >> ";
      }
    }
    return str;
  }
}]);
