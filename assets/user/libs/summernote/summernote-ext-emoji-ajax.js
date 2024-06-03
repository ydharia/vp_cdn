/**
 * These extensions/snippets were used as templates to figure out how to build this extension.
 * Thanks to the original authors!
 *
 * http://summernote.org/examples/#hint-for-emoji
 * https://github.com/nilobarp/summernote-ext-emoji
 * https://github.com/JustinEldracher/summernote-plugins
 *
 */

(function (factory) {
    /* global define */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(window.jQuery);
    }
}(function ($) {

    // Extends plugins for emoji plugin.
    $.extend($.summernote.plugins, {

        'emoji': function (context) {
            var self = this;
            var ui = $.summernote.ui;
            var options = context.options;

            // Don't close when clicking in search input
            var addListener = function () {
                $('body').on('click', '.note-ext-emoji-search :input', function (e) {
                    e.stopPropagation();
                });
            };

            // This events will be attached when editor is initialized.
            this.events = {
                // This will be called after modules are initialized.
                'summernote.init': function (we, e) {
                    addListener();
                }
            };

            context.memo('button.emoji', function () {
                return ui.buttonGroup({
                    className: 'note-ext-emoji',
                    children: [
                        ui.button({
                            className: 'dropdown-toggle',
                            contents: '<i class="fa fa-smile-o"/> ' + ui.icon(options.icons.caret, 'span'),
                            tooltip: 'Emoji',
                            data: {
                                toggle: 'dropdown'
                            },
                            click: function() {
                                // Cursor position must be saved because is lost when dropdown is opened.
                                context.invoke('editor.saveRange');
                            }
                        }),
                        ui.dropdown({
                            className: 'dropdown-emoji',
                            items: [
                                '  <div class="note-ext-emoji-search">',
                                '   <input type="text" placeholder="search..." class="form-control" />',
                                '  </div>',
                                '  <div class="note-ext-emoji-list">',
                                '     <div class="note-ext-emoji-loading">',
                                '         <i class="fa fa-spinner fa-spin fa-fw"></i> Loading...',
                                '     </div>',
                                '  </div>'
                            ].join(''),
                            callback: function ($dropdown) {
                                self.$search = $('.note-ext-emoji-search :input', $dropdown);
                                self.$list = $('.note-ext-emoji-list', $dropdown);
                            }
                        })
                    ]
                }).render();
            });

            self.initialize = function () {
                var $search = self.$search;
                var $list = self.$list;

                var emojis = ["👍","❤️","😂","😮","😢","🙏","😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇","🙂","🙃","😉","😌","😍","🥰","😘","😗","😙","😚","😋","😛","😝","😜","🤪","🤨","🧐","🤓","😎","🤩","🥳","😏","😒","😞","😔","😟","😕","🙁","☹️","😣","😖","😫","😩","🥺","😢","😭","😮‍💨","😤","😠","😡","🤬","🤯","😳","🥵","🥶","😱","😨","😰","😥","😓","🤗","🤔","🤭","🤫","🤥","😶","😶","😐","😑","😬","🙄","😯","😦","😧","😮","😲","🥱","😴","🤤","😪","😵","😵‍💫","🤐","🥴","🤢","🤮","🤧","😷","🤒","🤕","🤑","🤠","😈","👿","👹","👺","🤡","💩","👻","💀","☠️","👽","👾","🤖","🎃","😺","😸","😹","😻","😼","😽","🙀","😿","😾","👋","🤚","🖐","✋","🖖","👌","🤏","✌️","🤞","🤟","🤘","🤙","👈","👉","👆","🖕","👇","☝️","👎","✊","👊","🤛","🤜","👏","🙌","👐","🤲","🤝","🙏","✍️","💅","🤳","💪","🦾","🦵","🦿","🦶","👣","👂","🦻","👃","🧠","🦷","🦴","👀","👁","👅","👄","💋","🩸","👶","👧","🧒","👦","👩","🧑","👨","👩‍🦱","🧑‍🦱","👨‍🦱","👩‍🦰","🧑‍🦰","👨‍🦰","👱‍♀️","👱","👱‍♂️","👩‍🦳","🧑‍🦳","👨‍🦳","👩‍🦲","🧑‍🦲","👨‍🦲","🧔‍♀️","🧔","🧔‍♂️","👵","🧓","👴","👲","👳‍♀️","👳","👳‍♂️","🧕","👮‍♀️","👮","👮‍♂️","👷‍♀️","👷","👷‍♂️","💂‍♀️","💂","💂‍♂️","🕵️‍♀️","🕵️","🕵️‍♂️","👩‍⚕️","🧑‍⚕️","👨‍⚕️","👩‍🌾","🧑‍🌾","👨‍🌾","👩‍🍳","🧑‍🍳","👨‍🍳","👩‍🎓","🧑‍🎓","👨‍🎓","👩‍🎤","🧑‍🎤","👨‍🎤","👩‍🏫","🧑‍🏫","👨‍🏫","👩‍🏭","🧑‍🏭","👨‍🏭","👩‍💻","🧑‍💻","👨‍💻","👩‍💼","🧑‍💼","👨‍💼","👩‍🔧","🧑‍🔧","👨‍🔧","👩‍🔬","🧑‍🔬","👨‍🔬","👩‍🎨","🧑‍🎨","👨‍🎨","👩‍🚒","🧑‍🚒","👨‍🚒","👩‍✈️","🧑‍✈️","👨‍✈️","👩‍🚀","🧑‍🚀","👨‍🚀","👩‍⚖️","🧑‍⚖️","👨‍⚖️","👰‍♀️","👰","👰‍♂️","🤵‍♀️","🤵","🤵‍♂️","👸","🤴","🦸‍♀️","🦸","🦸‍♂️","🦹‍♀️","🦹","🦹‍♂️","🤶","🧑‍🎄","🎅","🧙‍♀️","🧙","🧙‍♂️","🧝‍♀️","🧝","🧝‍♂️","🧛‍♀️","🧛","🧛‍♂️","🧟‍♀️","🧟","🧟‍♂️","🧞‍♀️","🧞","🧞‍♂️","🧜‍♀️","🧜","🧜‍♂️","🧚‍♀️","🧚","🧚‍♂️","👼","🤰","🤱","👩‍🍼","🧑‍🍼","👨‍🍼","🙇‍♀️","🙇","🙇‍♂️","💁‍♀️","💁","💁‍♂️","🙅‍♀️","🙅","🙅‍♂️","🙆‍♀️","🙆","🙆‍♂️","🙋‍♀️","🙋","🙋‍♂️","🧏‍♀️","🧏","🧏‍♂️","🤦‍♀️","🤦","🤦‍♂️","🤷‍♀️","🤷","🤷‍♂️","🙎‍♀️","🙎","🙎‍♂️","🙍‍♀️","🙍","🙍‍♂️","💇‍♀️","💇","💇‍♂️","💆‍♀️","💆","💆‍♂️","🧖‍♀️","🧖","🧖‍♂️","💅","🤳","💃","🕺","👯‍♀️","👯","👯‍♂️","🕴","👩‍🦽","🧑‍🦽","👨‍🦽","👩‍🦼","🧑‍🦼","👨‍🦼","🚶‍♀️","🚶","🚶‍♂️","👩‍🦯","🧑‍🦯","👨‍🦯","🧎‍♀️","🧎","🧎‍♂️","🏃‍♀️","🏃","🏃‍♂️","🧍‍♀️","🧍","🧍‍♂️","👭","🧑‍🤝‍🧑","👬","👫","👩‍❤️‍👩","💑","👨‍❤️‍👨","👩‍❤️‍👨","👩‍❤️‍💋‍👩","💏","👨‍❤️‍💋‍👨","👩‍❤️‍💋‍👨","👪","👨‍👩‍👦","👨‍👩‍👧","👨‍👩‍👧‍👦","👨‍👩‍👦‍👦","👨‍👩‍👧‍👧","👨‍👨‍👦","👨‍👨‍👧","👨‍👨‍👧‍👦","👨‍👨‍👦‍👦","👨‍👨‍👧‍👧","👩‍👩‍👦","👩‍👩‍👧","👩‍👩‍👧‍👦","👩‍👩‍👦‍👦","👩‍👩‍👧‍👧","👨‍👦","👨‍👦‍👦","👨‍👧","👨‍👧‍👦","👨‍👧‍👧","👩‍👦","👩‍👦‍👦","👩‍👧","👩‍👧‍👦","👩‍👧‍👧","🗣","👤","👥"];
                $('.note-ext-emoji-loading').remove();

                $.each(emojis, function (index, emoji) {
                    setTimeout(function() { // prevents lag during DOM insertion
                        var $btn = $('<button/>',
                            {
                                'class': 'note-emoji-btn btn btn-link',
                                'title': index,
                                'type': 'button',
                                'tabindex': '-1'
                            });
                        var $img = '<span>'+emoji+'</span>';
                        $btn.html($img);
                        $btn.click( function(event) {
                            event.preventDefault();
                            context.invoke('emoji.insertEmoji', index, emoji);
                        });
                        if (typeof $list != 'undefined') {
                            $list.append($btn);
                        }
                    }, 0);
                });
                
                // $.ajax({
                //     url: 'https://api.github.com/emojis'
                //     // async: false
                // }).then(function(data) {
                //     window.emojis = Object.keys(data);
                //     window.emojiUrls = data;

                //     // remove the loading icon
                //     $('.note-ext-emoji-loading').remove();

                //     $.each(window.emojiUrls, function (name, url) {
                //         setTimeout(function() { // prevents lag during DOM insertion
                //             var $btn = $('<button/>',
                //                 {
                //                     'class': 'note-emoji-btn btn btn-link',
                //                     'title': name,
                //                     'type': 'button',
                //                     'tabindex': '-1'
                //                 });
                //             var $img = $('<img/>', {'src': url});
                //             $btn.html($img);
                //             $btn.click( function(event) {
                //                 event.preventDefault();
                //                 context.invoke('emoji.insertEmoji', name, url);
                //             });
                //             if (typeof $list != 'undefined') {
                //                 $list.append($btn);
                //             }
                //         }, 0); //timeout
                //     }); // $each
                // }); // .then

                // filter the emoji list based on current search text
                try {
                    self.$search.keyup(function () {
                        self.filter($search.val());
                    });
                } catch (err) {
                    
                }

            };

            // apply search filter on each key press in search input
            self.filter = function (filter) {
                var $icons = $('button', self.$list);
                var rx_filter;

                if (filter === '') {
                    $icons.show();
                }
                else {
                    rx_filter = new RegExp(filter);
                    $icons.each(function () {
                        var $item = $(this);

                        if (rx_filter.test($item.attr('title'))) {
                            $item.show();
                        }
                        else {
                            $item.hide();
                        }
                    });
                }
            };

            self.insertEmoji = function (index, emoji) {
                // console.log("context ", context);
                // console.log(emoji);
                var img = $('<span />').html(emoji);
                // var img = new Image();
                // img.src = url;
                // img.alt = name;
                // img.title = name;
                // img.className = 'emoji-img-inline';
                // img = '<span>'+emoji+'</span>';

                // We restore cursor position and element is inserted in correct pos.
                context.invoke('editor.restoreRange');
                context.invoke('editor.focus');
                context.invoke('editor.insertText', emoji);
                context.invoke('editor.saveRange');
                context.invoke('editor.focus');
            };
        }
    });
}));
