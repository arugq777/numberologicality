//  	var uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//  	var lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
//  	var vowels = "aeiouAEIOU";
//  	var letterValues = {};
//  	function setValues(array, obj){
// 	 	for(var i = 0; i < array.length; i++){
// 	 		var v = (i+1)%9;
// 	 		if(v == 0){
// 	 			obj[array[i]] = 9;
// 	 		} else {
// 	 			obj[array[i]] = v;
// 	 		}
// 	 	}
//  	}
//  	setValues(uppercaseLetters, letterValues);
//  	setValues(lowercaseLetters, letterValues);

// angular.module('numberologicality')
//   .controller('NumbersController', ['$scope', function ($scope) {
//   	var this.vowels = vowels;
//   	var this.letters = uppercaseLetters + lowercaseLetters;
//   	var this.values = letterValues;
//   	var this.nameInput = "";
//   	var this.nameVowels = "";
//   	var this.nameConsonants = "";
//   	var this.nameVNumbers = "";
//   	var this.nameCNumbers = "";

//   	//this.nameInput = $scope.nameInput;

//   }])