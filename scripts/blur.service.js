angular.module('teachersAlly')
    .service('gwBlurService', ['$compile', function ($compile) {
        var that = this;
        this.dup = undefined;
        this.dupMenu = undefined;
        this.renameId = function () {
            var temp = that.dup;
            temp.find('[id]').each(function (key, value) {
                $(value).attr('id', $(value).attr('id') + '_nav')
            });
            return temp;
        }
        this.blurInit = function (scope) {
            that.dup = $compile(this.renameId())(scope);
            $('nav .content').html(that.dup);
            $(document).off('scroll', this.blurScroll);
            $(document).on('scroll', this.blurScroll);
        }
        this.blurScroll = function () {
            var translation = 'translate3d(0,' + (-$(document).scrollTop() + 'px') + ',0)';
            $('nav .content:first-child').css({
                '-webkit-transform': translation,
                '-moz-transform': translation,
                '-ms-transform': translation,
                'transform': translation
            });
        }
        this.customBlur = function (wrapper, content, scope) {
            that.dupMenu = this.customRenameId(wrapper, '_menu');
            $(content).html($compile(that.dupMenu)(scope));
            $(document).off('scroll', this.customBlurScroll);
            $(document).on('scroll', this.customBlurScroll);
        }
        this.customRenameId = function (wrapper, str) {
            var temp = $(wrapper).clone();
            temp.find('[id]').each(function (key, value) {
                $(value).attr('id', $(value).attr('id') + str)
            });
            return temp;
        }
        this.customBlurScroll = function () {
            var translation = 'translate3d(0,' + (-$(document).scrollTop() + 'px') + ',0)';
            that.dupMenu.css({
                '-webkit-transform': translation,
                '-moz-transform': translation,
                '-ms-transform': translation,
                'transform': translation
            });
        }
    }])