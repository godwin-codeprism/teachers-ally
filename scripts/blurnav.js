String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}
Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};
var g_blurnav = {
    dup: $('.wrapper:eq(0)').clone(),
    dupMenu: $('.wrapper:eq(0)').clone(),
    dupRibbon: $('.wrapper:eq(0)').clone(),
    renameId: function () {
        var temp = $('.wrapper:eq(0)').clone();
        temp.find('[id]').each(function (key, value) {
            $(value).attr('id', $(value).attr('id') + '_nav')
        });
        return temp;
    },
    blurInit: function (target) {
        if (target == undefined) {
            g_blurnav.dup = g_blurnav.customRenameId($('.ui-classroom .wrapper:eq(0)').clone(), '_nav');
            $('.content:eq(0)').html(g_blurnav.dup);
            $(document).off('scroll', g_blurnav.blurScrollHome);
            $(document).off('scroll', g_blurnav.blurScroll);
            $(document).on('scroll', g_blurnav.blurScroll);
        } else if (target == 'ribbon') {
            g_blurnav.dupRibbon = g_blurnav.customRenameId($('.ui-classroom .wrapper:eq(0)').clone(), '_nav');
            $('.controls-ribbion .content:eq(0)').html(g_blurnav.dupRibbon);
            $(document).off('scroll', g_blurnav.blurScrollRibbion);
            $(document).on('scroll', g_blurnav.blurScrollRibbion);
        } else {
            g_blurnav.dup = g_blurnav.renameId();
            $('.content:eq(0)').html(g_blurnav.dup);
            $(document).off('scroll', g_blurnav.blurScrollHome);
            $(document).off('scroll', g_blurnav.blurScroll);
            $(document).off('scroll', g_blurnav.blurScrollRibbion);
            $(document).on('scroll', g_blurnav.blurScrollHome);
        }

    },
    blurScrollRibbion: function () {
        var translation = 'translate3d(0,' + (-$(document).scrollTop() + 'px') + ',0)';
        if ($('.ui-classroom .wrapper:eq(0)').html().match(/id="/g) != null) {
            if ($('.controls-ribbion .wrapper').html().length != ($('.ui-classroom .wrapper:eq(0)').html().length + $('.ui-classroom .wrapper:eq(0)').html().match(/id="/g).length)) {
                console.log('I made Ribbon content and wrapper equal and removed IDs');
                $('.controls-ribbion .wrapper').html($('.ui-classroom .wrapper:eq(0)').html().replace(/id="/g, 'ids="'));
            }
        } else {
            if ($('.controls-ribbion .wrapper').html().length != $('.ui-classroom .wrapper:eq(0)').html().length) {
                console.log('I made Ribbon content and wrapper equal');
                $('.controls-ribbion .wrapper').html($('.ui-classroom .wrapper:eq(0)').html());
            }
        }

        g_blurnav.dupRibbon.css({
            '-webkit-transform': translation,
            '-moz-transform': translation,
            '-ms-transform': translation,
            'transform': translation
        });
    },
    blurScrollHome: function () {
        var translation = 'translate3d(0,' + (-$(document).scrollTop() + 'px') + ',0)';
        g_blurnav.dup.css({
            '-webkit-transform': translation,
            '-moz-transform': translation,
            '-ms-transform': translation,
            'transform': translation
        });
    },
    blurScroll: function () {
        var translation = 'translate3d(0,' + (-$(document).scrollTop() + 'px') + ',0)';
        console.log($('.ui-classroom .wrapper:eq(0)'));
        if ($('.ui-classroom .wrapper:eq(0)').html().match(/id="/g) != null) {
            if ($('nav .wrapper').html().length != ($('.ui-classroom .wrapper:eq(0)').html().length + $('.ui-classroom .wrapper:eq(0)').html().match(/id="/g).length)) {
                console.log('I made nav content and wrapper equal and Removed Ids');
                $('nav .wrapper').html($('.ui-classroom .wrapper:eq(0)').html().replace(/id="/g, 'idg="'));
            }
        } else {
            if ($('nav .wrapper').html().length != $('.ui-classroom .wrapper:eq(0)').html().length) {
                console.log('I made nav content and wrapper equal and Removed Ids');
                $('nav .wrapper').html($('.ui-classroom .wrapper:eq(0)').html());
            }
        }
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
        var translation = 'translate3d(0,' + (-$(document).scrollTop() + 'px') + ',0)';
        g_blurnav.dupMenu.css({
            '-webkit-transform': translation,
            '-moz-transform': translation,
            '-ms-transform': translation,
            'transform': translation
        });
    },
    customRenameId: function (wrapper, str) {
        var temp = $(wrapper).clone();
        temp.find('[id]').each(function (key, value) {
            $(value).attr('id', $(value).attr('id') + str)
        });
        return temp;
    },
    customBlurScroll: function () {
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