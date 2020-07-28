$(document).ready(function() {
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
    document.getElementById("date").addEventListener("click", function() {
        this.style.borderColor = "#CED4DA";
        $("#dateError").text("");
    }, false);
  });
  $(function() {
    document.getElementById("bag").addEventListener("click", function() {
        this.style.borderColor = "#CED4DA";
        $("#bagError").text("");
    }, false);
  });
  $(function() {
    document.getElementById("hour").addEventListener("click", function() {
        this.style.borderColor = "#CED4DA";
        $("#hourError").text("");
    }, false);
  });
  $(function() {
    document.getElementById("people").addEventListener("click", function() {
        this.style.borderColor = "#CED4DA";
        $("#peopleError").text("");
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

  //date checker
  var date = $("#date").val();
  if(date == "" || !dateChecker(date)){
    validated = false;
    if(date == ""){
      $("#dateError").text("Please select the date.");
    } else if(!dateChecker(date)){
      $("#dateError").text("You cannot select a future date. Please re-select the date.");
    }
    document.getElementById("date").style.borderColor = "red";
  }
  
  //location checker
  var lat = $("#marker-lat").val();
  var lng = $("#marker-lng").val();
  console.log(lat,lng)
  if(!locationChecker(lat,lng)){
    validated = false;
    $("#locationError").text("Please pick the location.");
    document.getElementById("pac-input").style.borderColor = "red";
  }

  //litter type checker
  var checkboxes = document.getElementsByName("litter[]");
  var selected = [];
  for (i in checkboxes){
    if(checkboxes[i].checked){
      selected.push(checkboxes[i].value);
    }
  }
  if(selected.length == 0){
    validated = false;
    $("#typeError").text("Please select at least one option.");
  } else{
    $("#typeError").text("");
  }

  //#bag checker
  var bag = $("#bag").val()
  if(!numberChecker(bag,"bag","bagError","Please enter the number of bags picked.")){
    validated = false;
  }

  //#hour checker
  var hour = $("#hour").val();
  if(!numberChecker(hour,"hour","hourError","Please enter the number of hours spent")){
    validated = false;
  };

  //#people checker
  var people = $("#people").val();
  if(!numberChecker(people,"people","peopleError","Please enter the number of people involved")){
    validated = false;
  };

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
  for (i in words){
    if(badWordList.includes(words[i])){
      return false;
    }
  }
  return true;
}

function dateChecker(date){
  var today = new Date();
  var yyyy = today.getFullYear();
  var mm = today.getMonth() + 1;
  var dd = today.getDate();
  var arr = date.split("-")
  y = parseInt(arr[0]);
  m = parseInt(arr[1]);
  d = parseInt(arr[2]);
  if(y > yyyy){
    return false;
  } else if(y = yyyy){
    if(m > mm){
      return false;
    } else{
      if(m == mm){
        if(d > dd){
          return false;
        }
      }
    }
  }
  return true;
}

function numberChecker(str,field,fieldError,description){
  if(str == ""){
    document.getElementById(fieldError).innerHTML = description;
    document.getElementById(field).style.borderColor = "red";
    return false;
  }
  num = parseFloat(str);
  if(num <= 0){
    document.getElementById(fieldError).innerHTML = "You cannot enter a negative number. Please re-enter.";
    document.getElementById(field).style.borderColor = "red";
    return false;
  }
  return true;
}

function locationChecker(lat,lng){
  if(lat == "" && lng == ""){
    return false;
  } else{
    return true;
  }
}
