angular.module('numberologicality')
  .controller('HomeController', ['$scope', function ($scope) {
  }])
  .controller('NumbersController', ['$scope', function ($scope) {

  var uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  var letters = uppercaseLetters + lowercaseLetters + " " + "!";
  var values = {" ":" ", "!":"" };
  
  function initValues(array, obj){
	for(var i = 0; i < array.length; i++){
	  var v = (i+1)%9;
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
	"wholeName" : [],
	"vowel" : [],
	"consonant" : [],
	"birthdate" : [],
    // "wholeNameAlt" : [],
    // "vowelAlt" : [],
    // "consonantAlt" : []
  };

  $scope.viewStrings = {
	"name":"",
	"vowels":"",
	"consonants":"",
	"vNumbers": "",
	"cNumbers": "",
	"wCalculationString" : "",
	"cCalculationString" : "",
	"vCalculationString" : "",
    // "altWCalculationString":"",
    // "altCCalculationString":"",
    // "altVCalculationString":""
  };

  var ns = $scope.viewStrings;
  var nm = $scope.modelData;

  $scope.update = function(name){
	nm.rawInput = name;

	cleanNameInputString();
	formatStrings(nm.input);
	
	calculateAllNumbers();
	formatAllNumStrings();
  };

  function cleanNameInputString(){
	nm.input = "";
	for(var i = 0; i < nm.rawInput.length; i++){
	  if( $scope.letters["all"].indexOf(nm.rawInput[i]) > -1){
		nm.input += nm.rawInput[i];
	  }
	}
  }

  function addVowel(letter){
	ns.name += letter;
	ns.vowels += letter;
	ns.consonants += " ";
	ns.vNumbers += $scope.letters.values[letter];
	ns.cNumbers += " "
  }

  function addConsonant(letter){
	ns.name += letter;
	ns.vowels += " ";
	ns.consonants += letter;
	ns.vNumbers += " "
	ns.cNumbers += $scope.letters.values[letter];
  }

  function formatStrings(name){
	ns.name = "";
	ns.consonants = "";
	ns.vowels = "";
	ns.vNumbers = "";
	ns.cNumbers = "";

	if( name.indexOf("!") > -1 ){
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

  function calculateAllNumbers(){
    nm.wholeName = [];
    nm.consonant = [];
    nm.vowel = [];
    // nm.wholeNameAlt = [];
    // nm.consonantAlt = [];
    // nm.vowelAlt = [];
    calculateNumber( ns.vNumbers + ns.cNumbers, nm.wholeName);
    calculateNumber( ns.cNumbers, nm.consonant);
    calculateNumber( ns.vNumbers, nm.vowel);
    // calculateNumberFromString(ns.name, nm.wholeNameAlt);
    // calculateNumberFromString(ns.consonants, nm.consonantAlt);
    // calculateNumberFromString(ns.vowels, nm.vowelAlt);    
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
    //console.log("cnfs: "+array);
    if(total > 9 && masterNumbers.indexOf(total) == -1 ){
      reduce(total, array);
    }
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

  function formatAllNumStrings(){
    ns.wCalculationString = formatNumString(nm.wholeName);
    ns.cCalculationString = formatNumString(nm.consonant);
    ns.vCalculationString = formatNumString(nm.vowel);
    // ns.altWCalculationString = formatNumString(nm.wholeNameAlt);
    // ns.altCCalculationString = formatNumString(nm.consonantAlt);
    // ns.altVCalculationString = formatNumString(nm.vowelAlt);    
    // console.log("w:" + ns.wCalculationString);
    // console.log("c:" + ns.cCalculationString);
    // console.log("v:" + ns.vCalculationString);
  }

  function formatNumString(ary){
    var str = "";
    //console.log("ary: " + ary);
    for(var i = 0; i < ary.length; i++){
      str += ary[i];
      if( !((i+1) == ary.length) ){
        str += " >> ";
      }
    }
    //console.log(str);
    return str;
  }

}]);
