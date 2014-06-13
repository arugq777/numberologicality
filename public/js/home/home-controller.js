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
    "rawDateInput": "",
    "dateInput" : "",
	"wholeName" : [],
	"vowel" : [],
	"consonant" : [],
	"birthdate" : [],
  };

  $scope.viewStrings = {
	"name":"",
	"vowels":"",
	"consonants":"",
    "birthdate": "",
    "reducedDate": "",
	"vNumbers": "",
	"cNumbers": "",
	"wCalculationString" : "",
	"cCalculationString" : "",
	"vCalculationString" : "",
    "dCalculationString" : "",
    "nErr":"",
    "dErr":""
  };

  var ns = $scope.viewStrings;
  var nm = $scope.modelData;

    $scope.updateName = function(name){
        nm.rawInput = name;
        if(!$scope.inputform.nameinput.$valid){
            clearNameStrings(); 
        } else {
            cleanNameInputString();
            formatStrings(nm.input);
                
            calculateAllNumbers();
            formatAllNumStrings();
        }
        if( $scope.inputform.nameinput.$error.pattern ){
            ns.nErr = "Invalid characters in name input field.";
        }
    };

    $scope.updateDate = function(date){
        nm.rawDateInput = date;
        nm.dateInput = new Date(date);

        if( nm.dateInput == "Invalid Date"){
            clearDateStrings();
            if(nm.rawDateInput.length > 0){   
                ns.dErr = "Invalid date in date input field.";
            }
        } else {
            ns.dErr = "";
            //console.log(nm.dateInput);
            ns.birthdate = new Date(date).toISOString();
            nm.birthdate = [];
            ns.reducedDate = calculateBirthdateNumber(nm.dateInput, nm.birthdate);
            ns.dCalculationString = formatNumString(nm.birthdate);
        }
    };

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
        ns.name = "";
        ns.consonants = "";
        ns.vowels = "";
        ns.vNumbers = "";
        ns.cNumbers = "";
        ns.wCalculationString = "";
        ns.cCalculationString = "";
        ns.vCalculationString = "";
        ns.nErr = "";
    }

    function clearDateStrings(){
        ns.birthdate = "";
        ns.reducedDate = "";
        ns.dCalculationString = "";
        ns.dErr = "";
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
        clearNameStrings();

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
        calculateNumber( ns.vNumbers + ns.cNumbers, nm.wholeName);
        calculateNumber( ns.cNumbers, nm.consonant);
        calculateNumber( ns.vNumbers, nm.vowel);
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

    function formatAllNumStrings(){
        ns.wCalculationString = formatNumString(nm.wholeName);
        ns.cCalculationString = formatNumString(nm.consonant);
        ns.vCalculationString = formatNumString(nm.vowel);
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
