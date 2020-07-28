"use strict";

$(document).ready(function() {

  // image gallery
  // init the state from the input
  $(".image-checkbox").each(function () {
    if ($(this).find('input[type="checkbox"]').first().attr("checked")) {
      $(this).addClass('image-checkbox-checked');
    }
    else {
      $(this).removeClass('image-checkbox-checked');
    }
  });

  // sync the state to the input
  $(".image-checkbox").on("click", function (e) {
    $(this).toggleClass('image-checkbox-checked');
    var $checkbox = $(this).find('input[type="checkbox"]');
    $checkbox.prop("checked",!$checkbox.prop("checked"))

    e.preventDefault();
  });

  $("form").bind("keypress", function (e) {
    if (e.keyCode == 13) {
        return false;
    }
  });
  $(function() {
    document.getElementById("title-select").addEventListener("click", function() {
        this.style.borderColor = "#CED4DA";
        $("#titleError").text("");
    }, false);
  });
  $(function() {
    document.getElementById("name").addEventListener("click", function() {
        this.style.borderColor = "#CED4DA";
        $("#nameError").text("");
    }, false);
  });
  $(function() {
    document.getElementById("description").addEventListener("click", function() {
        this.style.borderColor = "#CED4DA";
        $("#descriptionError").text("");
    }, false);
  });
  $(function(){
    $("#description").keyup(function(){
      $("#descriptionHelp").text("Description limited to 280 characters. Characters left: " + (280 - $(this).val().length));
    });
  });
  $(function() {
    document.getElementById("pac-input").addEventListener("click", function() {
        this.style.borderColor = "#CED4DA";
        $("#locationError").text("");
    }, false);
  });
});

var badWordList = ['anal', 'anus', 'arse', 'ass', 'ballsack', 'balls', 'bastard', 'bitch', 'biatch', 'bloody', 'blowjob', 'blow job', 'bollock', 'bollok', 'boner', 'boob', 'bugger', 'bum', 'butt', 'buttplug', 'clitoris', 'cock', 'coon', 'crap', 'cunt', 'damn', 'dick', 'dildo', 'dyke', 'fag', 'feck', 'fellate', 'fellatio', 'felching', 'fuck', 'f u c k', 'fudgepacker', 'fudge packer', 'flange', 'Goddamn', 'God damn', 'hell', 'homo', 'jerk', 'jizz', 'knobend', 'knob end', 'labia', 'lmao', 'lmfao', 'muff', 'nigger', 'nigga', 'null', 'omg', 'penis', 'piss', 'poop', 'prick', 'pube', 'pussy', 'queer', 'scrotum', 'sex', 'shit', 's hit', 'sh1t', 'slut', 'smegma', 'spunk', 'tit', 'tosser', 'turd', 'twat', 'vagina', 'wank', 'whore', 'wt'];

function qualityCheck(){
  var validated = true;

  //title checker
  var title = $("#title-select").val();
  if(title == ""){
    validated = false;
    $("#titleError").text("Please select your title.");
    document.getElementById("title-select").style.borderColor = "red";
  }

  //name checker
  var name = $("#name").val();
  if(!badWordCheck(name) || name == ""){
    validated = false;
    if(name == ""){
      $("#nameError").text("Please enter your name.");
    } else{
      $("#nameError").text("There's something wrong with your name. Please re-enter your name.");
    }
    document.getElementById("name").style.borderColor = "red";
  }

  var email = $("#email").val();
  var phone = $("#phone").val();

  //location checker
  var lat = $("#marker-lat").val();
  var lng = $("#marker-lng").val();
  console.log(lat,lng)
  if(!locationChecker(lat,lng)){
    validated = false;
    $("#locationError").text("Please pick the location.");
    document.getElementById("pac-input").style.borderColor = "red";
  }

  //litter scale checker
  var checkboxes = document.getElementsByName("species[]");
  var selected = [];
  for (var i in checkboxes){
    if(checkboxes[i].checked){
      selected.push(checkboxes[i].value);
    }
  }
  if(selected.length == 0){
    validated = false;
    $("#speciesError").text("Please select the invasive species.");
  } else{
    $("#speciesError").text("");
  }

  //description checker
  var description = $("#description").val();
  if(!badWordCheck(description) || description.length >= 250){
    validated = false;
    if(!badWordCheck(description)){
      $("#descriptionError").text("There's something wrong with your description. Please remove swear words.");
    }
    document.getElementById("description").style.borderColor = "red";
  }

  //agreement checker
  var agreed = document.getElementsByName("agreement")[0].checked;
  if(!agreed){
    validated = false;
    $("#agreeError").text("You must agree before submitting");
  }

  if(validated){
    $('#form').get(0).submit();
  }
}

function badWordCheck(input){
  var words = input.toLowerCase().split(" ");
  for (var i in words){
    if(badWordList.includes(words[i])){
      return false;
    }
  }
  return true;
}

function locationChecker(lat,lng){
  if(lat == "" && lng ==""){
    return false;
  } else{
    return true;
  }
}
