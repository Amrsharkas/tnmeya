function goToNextStep() {
    var current_step = parseInt($(".form_step.active_step").attr('data-step'));
    var nextStep = current_step + 1;
    $(".form_step.active_step").hide(300);
    $(".form_step.active_step").removeClass('active_step');
    $active_step = $(".form_step[data-step='" + nextStep + "']");
    $active_step.addClass('active_step');
    initializeStep();
}
$(document).on('click', '.form_next', function() {
    // this will validate the fields in the current step and then do goToNextStep() function afterwards
    var my_form = $(this).parents('form').first();
    var name_class = my_form.attr('data-request');
    var on_start = my_form.attr('data-on-start');
    validate(my_form, name_class, on_start, true, true);
    // goToNextStep();
});
$(document).on('click', '.form_back', function() {
    var current_step = parseInt($(".form_step.active_step").attr('data-step'));
    var prevStep = current_step - 1;
    $(".form_step.active_step").hide(300);
    $(".form_step.active_step").removeClass('active_step');
    $active_step = $(".form_step[data-step='" + prevStep + "']");
    $active_step.addClass('active_step');
    initializeStep();
});

function initializeStep() {
    $steps = $(".form_step");
    // check if there are steps in the form
    if ($steps.length != 0) {
        $(".ajax_form input[type='submit']").hide();
        $(".form_back,.form_next").remove();
        //hide all steps then show anly the active one
        $steps.hide();
        $steps.find(':input').addClass("no_validation");
        $(".form_step.active_step").show(300);
        $(".form_step.active_step").find(':input').removeClass("no_validation");
        var current_step = parseInt($(".form_step.active_step").attr('data-step'));
        var prevStep = current_step - 1;
        $prev_step = $(".form_step[data-step='" + prevStep + "']");
        console.log($prev_step);
        if ($prev_step.length != 0) {
            $(".ajax_form").append("<button class='btn color form_back' type='button'>Back</button>");
        }
        var nextStep = current_step + 1;
        $next_step = $(".form_step[data-step='" + nextStep + "']");
        if ($next_step.length != 0) {
            $(".ajax_form").append("<button class='btn color form_next' type='button'>Next</button>");
        } else {
            $(".form_step").find(':input').removeClass("no_validation");
            $(".ajax_form input[type='submit']").show();
        }
    }
}
$(document).on('ready pjax:success', function() {
    initializeStep();
    //rename the step titles
    $steps = $(".form_step");
    // check if there are steps in the form
    if ($steps.length != 0) {
        $steps.each(function() {
            var step_name = $(this).find(".divider-text span").html();
            var step_number = parseInt($(this).attr('data-step'));
            var new_title = "Step " + step_number + "/" + $steps.length + " - " + step_name;
            $(this).find(".divider-text span").html(new_title);
        });
    }
});