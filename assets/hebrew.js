var hebrewAlpha = ["א‬", "ב‬", "בּ‬", "ג‬", "ד‬", "ה‬", "ו‬", "ז‬", "ח‬", "ט‬", "י‬", "כ‬", "כּ‬", "ךּ‬", "ך‬", "ל‬", "מ‬", "ם‬", "נ‬", "ן‬", "ס‬", "ע‬", "פ‬", "פּ‬", "ף‬", "צ‬", "ץ‬", "ק‬", "ר‬", "ש‬", "ת‬", "תּ‬"];

var hebrewTranslit = ["'", "v", "b", "g", "d", "h", "v", "z", "kh", "t", "y", "kh", "k", "k", "kh", "l", "m", "m", "n", "n", "s", "'", "f", "p", "f", "ts", "ts", "k", "r", "sh", "t", "t"];

var hebrewInput = [];

$("#hebrew").on("click", function(){
    $(".btn-warning").removeAttr("id");
    $(".btn-warning").attr("id", "heb-search");
    $("#keyboard-area").empty();

    for (var aa = 0; aa < hebrewAlpha.length; aa++){
        var hebrewKey = $("<button>");
        hebrewKey.html(hebrewAlpha[aa]);
        hebrewKey.attr("data-number", aa);
        hebrewKey.attr("class", "btn-success keyboard-key");
        $("#keyboard-area").append(hebrewKey);
    }

    var space = $("<button>");
    space.text("space");
    space.attr("class", "btn-success keyboard-key");
    space.attr("id", "space-button");
    $("#keyboard-area").append(space);

    $(document).on("click", ".keyboard-key", function(){

        $(".form-control").attr("dir", "rtl");

        if ($(this).html() === "space"){
            hebrewInput.push(" ");
        } else{
            hebrewInput.push($(this).html());
            $(".form-control").val(hebrewInput.join(""));
        }
    });
});

$(document).on("click", "#heb-search", function(){
    //Take the content of the input field...
    var hebSearchValue = $(".form-control").val();
    $(".form-control").val("");
    //Generate a transliteration area at the bottom of the page.

    var translitSectionTitle = $("<h2>");
    translitSectionTitle.text("Your Transliterations:");
    $("#success-area").html(translitSectionTitle);

    var hebTranslitSuccess = $("<div>");
    hebTranslitSuccess.attr("class", "card translit-result");
    var hebrewSearchTerm = $("<h3>");
    hebrewSearchTerm.attr("class", "text-success card-title");
    hebrewSearchTerm.text(hebSearchValue);
    //And add the word the user typed into the field.
    hebTranslitSuccess.append(hebrewSearchTerm);
    hebTranslitSuccess.append("<hr>");

    for (var bb = 0; bb < hebrewAlpha.length; bb++){
        for (var cc = 0; cc < hebrewInput.length; cc++){
            if (hebrewInput[cc] === hebrewAlpha[bb]){
                    hebrewInput[cc] = hebrewTranslit[bb];
                    var hebrewResultText = hebrewInput.join("-");
            }
        }
    }
    
    hebrewInput = [];

    var hebrewDisplay = $("<p>");
    hebrewDisplay.attr("class", "card-text");
    hebrewDisplay.text("Transliterated Hebrew: " + hebrewResultText);

    $(hebTranslitSuccess).append(hebrewResultText);

    $("#success-area").append(hebTranslitSuccess);
        
});

