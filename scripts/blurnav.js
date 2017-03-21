var g_blurnav = {
    dup: $('.wrapper:eq(0)').clone(),
    dupMenu: $('.wrapper:eq(0)').clone(),
    renameId: function () {
        var temp = $('.wrapper:eq(0)').clone();
        temp.find('[id]').each(function (key, value) {
            $(value).attr('id', $(value).attr('id') + '_nav')
        });
        return temp;
    },
    blurInit: function () {
        g_blurnav.dup = g_blurnav.renameId();
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
    },
    customBlur: function (wrapper, content) {
        g_blurnav.dupMenu = g_blurnav.customRenameId(wrapper, '_menu');
        $(content).html(g_blurnav.dupMenu);
        $(document).off('scroll', g_blurnav.customBlurScroll);
        $(document).on('scroll', g_blurnav.customBlurScroll);
    },
    customRenameId: function (wrapper, str) {
        var temp = $(wrapper).clone();
        temp.find('[id]').each(function (key, value) {
            $(value).attr('id', $(value).attr('id') + str)
        });
        return temp;
    },
    customBlurScroll:function(){
        var translation = 'translate3d(0,' + (-$(document).scrollTop() + 'px') + ',0)';
        g_blurnav.dupMenu.css({
            '-webkit-transform': translation,
            '-moz-transform': translation,
            '-ms-transform': translation,
            'transform': translation
        });
    }
}
module.exports = g_blurnav;