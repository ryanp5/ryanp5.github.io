$(document).ready(function(){
    $("#burger-btn").click(function(){
        var burger;
        $(navbarSupportedContent).toggle("slow");
        // if ($("#burgerNav").is(":visible")){
        //     $("#burgerNav").slideUp();
        //     //open toggle menu
        // } else {
        //     $("#burgerNav").slideDown();
        //     //close toggle menu
        //     toggled = false;
        // }
    });
});
