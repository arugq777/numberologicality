var numNames = [".whole_name", ".consonant", ".vowel", ".birthdate"];

$(document).ready( function(){
  // for (var i = numNames.length - 1; i >= 0; i--) {
  //   $("form"+numNames[i]).submit( function(ev){
  //     ev.preventDefault();
  //     getMoreNames(ev, $("form"+numNames[i]), numNames[i] );
  //   });
  // };
  $("form.whole_name").submit( function(ev){
    ev.preventDefault();
    getMoreNames(ev, $("form.whole_name"), ".whole_name" );
  });
  $("form.consonant").submit( function(ev){
    ev.preventDefault();
    getMoreNames(ev, $("form.consonant"), ".consonant"  );
  });
  $("form.vowel").submit( function(ev){
    ev.preventDefault();
    getMoreNames(ev, $("form.vowel"), ".vowel" );
  });
  $("form.birthdate").submit( function(ev){
    ev.preventDefault();
    getMoreNames(ev, $("form.birthdate"), ".birthdate" );
  });

});

function getMoreNames(ev, form, name){
  //console.log(form);
  $.ajax({
    timeout:3000,
    type: form.attr('method'),
    url: form.attr('action'),
    data: form.serialize(),
    dataType: 'html',
    success: function(data){
      console.log(data);
      ev.preventDefault();
      $(data).appendTo("ul.names" + name);
    },
    error: function() {
      //error();
    },
    complete: function(){
      //updateInfo();
    }
  });
}