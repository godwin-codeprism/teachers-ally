var g_blurnav = {
    dup: $('.wrapper:eq(0)').clone(),
    blurInit: function () {
        g_blurnav.dup = $('.wrapper:eq(0)').clone();
        $('.content:eq(0)').html(g_blurnav.dup);
        $(document).off('scroll', g_blurnav.blurScroll);
        $(document).on('scroll', g_blurnav.blurScroll);
    },
    blurScroll: function () {
        var translation = 'translate3d(0,' + (-$(document).scrollTop() + 'px') + ',0)';
        g_blurnav.dup.css({
            '-webkit-transform': translation,
            '-moz-transform': translation,
            '-ms-transform': translation,
            'transform': translation
        });
    }
}
module.exports = g_blurnav;