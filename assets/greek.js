//Basically four arrays, two for the keyboard in Greek and two for the transliteration.

var greekAlphaCap = ["Α", "Β", "Γ", "Δ", "Ε", "Z", "H", "Θ", "Ι", "K", "Λ", "M", "N", "Ξ", "Ο", "Π", "P", "Σ", "Σ", "T", "Y", "Φ", "Χ", "Ψ", "Ω"]

var greekAlphaLow = ["α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "o", "π", "ρ", "σ", "ς", "τ", "u", "φ", "χ", "ψ", "ω"];

var ancientGreekTransliteration = ["a", "b", "g", "d", "e", "z", "h", "th", "i", "k", "l", "m", "n", "ks", "o", "p", "r", "s", "s", "t", "y", "ph", "kh", "ps", "aw"];

var modernGreekTransliteration = ["a", "v", "gh", "dh", "e", "z", "h", "th", "i", "k", "l", "m", "n", "ks", "o", "p", "r", "s", "s", "t", "i", "f", "x", "ps", "o"];

var greekInput = [];


//When the Greek option is selected by the user...

$("#greek").on("click", function(){
    $(".btn-warning").removeAttr("id");
    $(".btn-warning").attr("id", "greek-search");
    $("#keyboard-area").empty();
    $(".form-control").attr("dir", "ltr");
    //A keyboard of Upper case greek letters is generated. Eventually I want it to be all upper case and then after the first click it shifts to lower, but having just gotten the shift button to work, I'm not going to do this. 
    for (var i = 0; i < greekAlphaLow.length; i++){
        var greekKey = $("<button>");
        greekKey.html(greekAlphaLow[i]);
        //Every key has two data attributes for it's case and one for it's number (might be vestigial);
        greekKey.attr("data-letter-low", greekAlphaLow[i]);
        greekKey.attr("data-letter-high", greekAlphaCap[i]);
        greekKey.attr("data-number", i);
        greekKey.attr("class", "btn-success keyboard-key");
        $("#keyboard-area").append(greekKey);
    }

    //Two additional buttons are generated, a shift and a space.
    var shift = $("<button>");
    var space = $("<button>");

    space.text("space");
    shift.html("<i class='fas fa-arrow-alt-circle-up'></i>");
    shift.attr("class", "btn-success");
    shift.attr("id", "shift-button");
    space.attr("class", "btn-success keyboard-key");
    space.attr("id", "space-button");
    $("#keyboard-area").append(shift);
    $("#keyboard-area").append(space);

    //When shift is clicked...
    $(document).on("click", "#shift-button", function(){
        //For each key...
        $(".keyboard-key").each(function(){
            //Define the key's cases
            var upper = $(this).attr("data-letter-high");
            var lower = $(this).attr("data-letter-low");
            //If it's lower case...
            if ($(this).html() === lower) {
                //Make it upper case
                $(this).html(upper);
            //If it's upper case...
            } else if ($(this).html() === upper) {
                //Make it lower case.
                $(this).html(lower);
            }
        });

        //Having pressed the shift button already, when the next keyboard key is pressed
        $(document).on("click", ".keyboard-key", function(){
            //Take every key in the keyboard
            $(".keyboard-key").each(function(){
                //And make it lower case. So the user need only enter one shifted value upfront, just like a conventional text app. Maybe a double click all caps function could come later. Then again, maybe key mapping will come later as well, so I don't know.
                var lowerB = $(this).attr("data-letter-low");
                $(this).html(lowerB);
            });
        });
    });
});

    //When a greek key is clicked...
$(document).on("click", ".keyboard-key", function(){
    //If it's the spacebar, don't put 'space' into the array. Put a space ' ' into the array.
    if ($(this).html() === "space"){
        greekInput.push(" ");
    //Otherwise, go ahead and add the text value of that letter to the array, and then update the input field with the letter. (this enables the user to copy/paste text as well, without having to use the keyboard to generate the value.)    
    } else {
        greekInput.push($(this).html());
        $(".form-control").val(greekInput.join(""));
    }
});

//For the transliteration button...
$(document).on("click", "#greek-search", function(){
    //Take the content of the input field...
    var searchValue = $(".form-control").val();
    $(".form-control").val("");
    console.log("The program believes that", $(".form-control").val(), "Is still in the search bar.");
    //Generate a transliteration area at the bottom of the page.

    var translitSectionTitle = $("<h2>");
    translitSectionTitle.text("Your Transliterations:");
    $("#success-area").html(translitSectionTitle);

    var transliterationSuccess = $("<div>");
    transliterationSuccess.attr("class", "card translit-result");
    var originalWord = $("<h3>");
    originalWord.attr("class", "text-success card-title");
    originalWord.text(searchValue);
    //And add the word the user typed into the field.
    transliterationSuccess.append(originalWord);
    transliterationSuccess.append("<hr>");

    for (var j = 0; j < greekAlphaLow.length; j++){
        for (var k = 0; k < greekInput.length; k++){
            if (greekInput[k] === greekAlphaLow[j] || 
                greekInput[k] === greekAlphaCap[j]) {
                    greekInput[k] = ancientGreekTransliteration[j];
                    var ancientGreekText = greekInput.join("");
                    greekInput[k] = modernGreekTransliteration[j];
                    var modernGreekText = greekInput.join("");
            }
        }
    }
    
    greekInput = [];
    console.log("Input still contains", greekInput);

    var ancientGreekDisplay = $("<p>");
    ancientGreekDisplay.attr("class", "card-text");
    ancientGreekDisplay.text("Ancient Greek: " + ancientGreekText);

    var modernGreekDisplay = $("<p>");
    modernGreekDisplay.attr("class", "card-text");
    modernGreekDisplay.text("Modern Greek: " + modernGreekText);

    $(transliterationSuccess).append(ancientGreekDisplay);
    $(transliterationSuccess).append(modernGreekDisplay);

    $("#success-area").append(transliterationSuccess);
        
});



