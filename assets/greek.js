var greekAlphaCap = ["Α", "Β", "Γ", "Δ", "Ε", "Z", "H", "Θ", "Ι", "K", "Λ", "M", "N", "Ξ", "Ο", "Π", "P", "Σ", "T", "Y", "Φ", "Χ", "Ψ", "Ω"]

var greekAlphaLow = ["α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ", "μ", "ν", "ξ", "o", "π", "ρ", "σ", "τ", "u", "φ", "χ", "ψ", "ω"];

$("#greek").on("click", function(){

    for (var i = 0; i < greekAlphaLow.length; i++){
        var greekKey = $("<button>");
        greekKey.html(greekAlphaLow[i]);
        greekKey.attr("data-letter-low", greekAlphaLow[i]);
        greekKey.attr("data-letter-high", greekAlphaCap[i]);
        greekKey.attr("data-number", i);
        greekKey.attr("class", "btn-success keyboard-key");
        $("#keyboard-area").append(greekKey);
    }

    var shift = $("<button>");
    var space = $("<button>");

    space.text("space");
    shift.html("<i class='fas fa-arrow-alt-circle-up'></i>");
    shift.attr("class", "btn-success keyboard-key");
    shift.attr("id", "shift-button");
    space.attr("class", "btn-success keyboard-key");
    space.attr("id", "space-button");
    $("#keyboard-area").append(shift);
    $("#keyboard-area").append(space);

    $(document).on("click", "#shift-button", function(){
        $(".keyboard-key").each(function(){
            var upper = $(this).attr("data-letter-high");
            var lower = $(this).attr("data-letter-low");
            if ($(this).html() === lower) {
                $(this).html(upper);
            } else if ($(this).html() === upper) {
                $(this).html(lower);
            }
        });
    });
});


