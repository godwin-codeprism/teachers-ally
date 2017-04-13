angular.module('teachersAlly')
    .service('smoothScroll',[function(){
        this.scrollTo = function(elm){
            $('html, body').animate({
                scrollTop:$(elm).offset().top
            },800)
        }
    }])