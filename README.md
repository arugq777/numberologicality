#Numberologilicality

A basic numerology calculator, written mostly as a coding exercise. Given a name and Birthdate, it calculates:

- Whole Name Number (known as the Destiny Number or Expression Number)
- Vowel Number (known as the Heart's Desire Number or Soul Urge Number)
- Consonant Number (known as the Expression Number or Persona Number)
- Birthdate Number (known as the Life Path Number or Destiny Number)

As you might gather from the parenthetical notes, different sources in print and around the web are inconsistent with regards to what to call the numbers, so I just set those aside and gave each a more self-explanatory name.

If you have a consonant in your name that is pronounced as a vowel (typically the 'y' in names like  'Tony' or 'Lynn'), place an exclamation point in front of it (i.e., "Larr!y") to calculate it as a vowel. Exclamation points will also switch vowels into consonants if you want, not that there's any reason to do that. Hey, I don't judge.

##Try it

There are a few different versions, roughly tracing the project's evolution:

##### Rough, original Sinatra version

- http://tranquil-mesa-2581.herokuapp.com/

##### Prettier version with SQL database, using Foundation and Postgres/ActiveRecord

- http://tranquil-mesa-2581.herokuapp.com/v2

##### Immediate feedback version using AngularJS, MongoDB/Mongoid, and Bootstrap

 - http://tranquil-mesa-2581.herokuapp.com/index2.html


##TODO
- Write a Node.js version, and move the Angular code there.
- Write tests.
- Convert templates to slim or haml
