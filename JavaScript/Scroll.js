    var position = $(window).scrollTop(); 
    var topPos = $(window).scrollTop(); 
    $(window).scroll(function(){
        var scroll_pos = $(window).scrollTop();
        if (scroll_pos > position){
            //$("#mainNav").removeClass("fixed-top");
            $("#mainNav").removeClass("animate-nav");
            $("#mainNav").slideUp();
            $("#burgerNav").slideUp();


            
        } else {
       //   
            $("#mainNav").addClass("animate-nav");
            $("#mainNav").slideDown();


        }
        position = scroll_pos;
    });

    
