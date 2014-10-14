/*
 * This is the UI controller JavaScript file of Ding.app
 * Create by quietshu@gmail.com at 2014.9.14
 * */

var ui = (function () {

// private

    var waitingTime = 0,
        coversRowNumber = 0,
        expandId = 0,
        expanded = false,
        infoBarExpanded = false,
        infoExpanded = false,
        lastScrollPosition = 0,
        musicInfoIntervals = [];

    /**
     * Receive error message and report it (console.log for now)
     *
     * @method reportError
     * @param {String} err
     * @private
     */
    var reportError = function (err) {
        console.log("ERROR: " + err.toString());
    };

    /**
     * Information text moving animation
     * new anim interval will be pushed to musicInfoIntervals
     *
     * @method autoMove
     * @param span
     * @private
     */
    var autoMove = function (span) {
        var widthDiff = span[0].scrollWidth - span.width();

        if(widthDiff <= 0)
            return;

        var animFunc = function (span) {
            span.animate({
                scrollLeft: widthDiff + "px"
            }, 3000, 'linear');
            setTimeout(function (span) {
                span.animate({
                    scrollLeft: 0
                }, 3000, 'linear');
            }, 5000, span);
        };
        animFunc(span);

        var inte = setInterval(animFunc, 10000, span);
        musicInfoIntervals.push(inte);
    };


// public

    var retObject = {

        /**
         * Clear ui animation delay
         *
         * @method clearWaitingTime
         * @return {Object} self
         */
        clearWaitingTime: function () {
            waitingTime = 0;

            return this;
        },

        /**
         * Gets the current timer number
         *
         * @method getWaitingTime
         * @return {Number} waitingTime
         */
        getWaitingTime: function () {
            return waitingTime;
        },

        /**
         * Remove all the channels in sidebar
         *
         * @method removeChannels
         * @return {Element} navListEl
         */
        removeChannels: function () {
            var navListEl = $("#nav_list");

            $(navListEl.html("").find("li")[0]).removeClass("channel-active");

            return navListEl;
        },

        /**
         * Load channels to sidebar
         *
         * @method loadChannels
         * @return {Object} self
         */
        loadChannels: function () {
            var channelParentElement = this.removeChannels();

            for (channel in channels) {
                channelParentElement.append($("<li class='hide'><span>" + channels[channel].name + "</span></li>"));
            }

            channelParentElement.append($("<li class='hide list-end'><span>E.N.D</span></li>"));
            $(channelParentElement.find("li")[0]).addClass("channel-active");

            return this;
        },

        /**
         * Add a animation delay
         *
         * @method wait
         * @param  {Number} t millisecond
         * @return {Object} self
         */
        wait: function (t) {
            waitingTime += t;

            return this;
        },

        /**
         * Expand main layer
         *
         * @method loadLayer
         * @return {Object} self
         */
        loadLayer: function () {
            if(authed) {
                $("#email").val(user_email);
                $("#title").html("登出豆瓣<span style='width: .1em'></span>FM");
                $("#password").val("").hide();
                $("#login_btn").html("logout");
            }
            else {
                $("#title").html("登陆豆瓣<span style='width: .1em'></span>FM");
                $("#password").css("display", "initial");
                $("#login_btn").html("login");
            }
            setTimeout(function () {
                $("#logo").addClass("layer");
                setTimeout(function () {
                    $("#login-form").addClass("play");
                    layer_expanded = true; // TODO
                }, 400);
            }, waitingTime);
            return this;
        },

        /**
         * Close main layer
         *
         * @method closeLayer
         * @return {Object} self
         */
        closeLayer: function () {
            setTimeout(function () {
                $("#logo").animate({
                    "opacity": 0
                }, 400);
                setTimeout(function () {
                    $("#login-form").removeClass("play");
                    $("#logo").removeClass("layer").animate({
                        "opacity": 1
                    }, 400);
                    layer_expanded = false;
                }, 400);
            }, waitingTime);

            return this;
        },

        /**
         * Expand the logo layer
         *
         * @method loadLogo
         * @return {Object} self
         */
        loadLogo: function () {
            setTimeout(function () {
                $("#logo").addClass("play");
            }, waitingTime);

            return this;
        },

        /**
         * Close the logo layer
         *
         * @method closeLogo
         * @return {Object} self
         */
        closeLogo: function () {
            setTimeout(function () {
                $("#logo").removeClass("play").addClass("fix");
            }, waitingTime);

            return this;
        },

        /**
         * Load background effect
         *
         * @method loadBackgroundEffect
         * @return {Object} self
         */
        loadBackgroundEffect: function () {
            setTimeout(function () {
                $("#background").addClass("play");
            }, waitingTime);

            return this;
        },

        /**
         * Load left navigation (channels) scroll function
         *
         * @method loadNavigation
         * @return {Object} self
         */
        loadNavigation: function () {
            setTimeout(function () {
                $("#navigation").addClass("play");
                var lis = $("#nav_list").find("li");
                var lastScrollPosition = 0;
                var inner_scroll_top;
                for (var i = 0; i < lis.length; ++i) {
                    setTimeout(function (li) {
                        $(li).removeClass("hide");
                        setTimeout(function () {
                            $(li).addClass("scroll");
                        }, 800);
                    }, 100 * i, lis[i]);
                }
                var scroll_animation = function () {
                    var scroll_dis = $("#scrollbar-container").scrollTop();
                    //$("#nav_list").css("-webkit-transform", "translateY(" + scroll_dis + "px)");
                    var pos = Math.floor((scroll_dis / 500.) * (lis.length - 4));
                    inner_scroll_top = pos * 73;
                    if(pos === lastScrollPosition) {
                        return;
                    }
                    for(var i = 0; i < lis.length; ++i) {
                        var li = lis[i];
                        var delay = 0;
                        if(pos > lastScrollPosition) {
                            if (i >= lastScrollPosition)
                                delay = (i - lastScrollPosition) * 50;
                            else
                                delay = 0;
                        }
                        else {
                            if (i <= lastScrollPosition + 4)
                                delay = (lastScrollPosition + 4 - i) * 50;
                            else
                                delay = 0;
                        }
                        setTimeout(function (li) {
                            $(li).css("-webkit-transform", "translateY(-" + inner_scroll_top + "px)");
                        }, delay, li);
                    }
                    lastScrollPosition = pos;
                };
                $("#scrollbar-container").unbind("scroll").unbind("click").bind("scroll", scroll_animation).bind("click", function (event) {
                    if(moved) {
                        event.preventDefault();
                        return;
                    }
                    var pos = Math.floor((event.pageY - 50) / 73) + lastScrollPosition;
                    $(".channel-active").removeClass("channel-active");
                    $($("#nav_list li")[pos]).addClass("channel-active");
                    retObject.closeInfoBar();
                    content().load_channel(pos);
                });
            }, waitingTime);

            return this;
        },

        /**
         * Load color-thief
         *
         * @method loadColorThief
         * @return {Object} self
         */
        loadColorThief: function () {
            var imgOnload = function () {
                // TODO
                var ct = new ColorThief();
                musics[this.dataset.num].color = ct.getPalette(this, 8);
            };

            var imgOnerror = function () {
                this.onerror = null;
                this.src = this.src + "#reload";
                reportError("cover image 503. reloading...");
            };

            for (music in musics) {
                var img = new Image();
                img.src = musics[music].picture;
                img.style.width = img.style.height = "200px";
                img.dataset.num = music;
                img.onload = imgOnload;
                img.onerror = imgOnerror;
            }

            return this;
        },

        /**
         * Load tableview images & animation
         *
         * @method loadTableview
         * @param  {Array} musics
         * @return {Object} self
         */
        loadTableview: function (musics) {
            expanded = false;
            lastScrollPosition = 0;
            $("#tableview_scrollbar-container").scrollTop(0);

            for(var i = 0; i < musics.length; ++i) {
                $("<li id='song_cover_" + i + "' class='song_cover hide'></li>")
                        .css("background-image", "url(" + musics[i].picture + ")")
                        .appendTo($((i % 2 ? "#right" : "#left") + "-cover-list"));
            }
            coversRowNumber = musics.length >> 1;

            setTimeout(function () {
                $("#tableview").addClass("play");
                var left_covers = $("#left-cover-list .song_cover"),
                    right_covers = $("#right-cover-list .song_cover");
                for(var i = 0; i < left_covers.length; ++i) {
                    setTimeout(function (cover) {
                        cover.removeClass("hide");
                        setTimeout(function () {
                            cover.addClass("scroll");
                        }, 800);
                    }, i * 200, $(left_covers[i]));
                }
                for(var i = 0; i < right_covers.length; ++i) {
                    setTimeout(function (cover) {
                        cover.removeClass("hide");
                        setTimeout(function () {
                            cover.addClass("scroll");
                        }, 800);
                    }, i * 200 + 100, $(right_covers[i]));
                }

                /* scroll effect */
                lastScrollPosition = 0;
                var inner_scroll_top;
                var show_control_btn = false;
                scroll_animation = function () {
                    var scroll_dis = $("#tableview_scrollbar-container").scrollTop();
                    var pos = Math.floor((scroll_dis / 450.) * (coversRowNumber - 2));
                    inner_scroll_top = pos * 200;
                    if(pos == lastScrollPosition)
                        return;
                    var delta = 0;
                    for(var i = 0; i < left_covers.length; ++i) {
                        var li = left_covers[i];
                        var delay = 0;
                        if($(li).attr("data-delay-delta"))
                            delta = (+$(li).attr("data-delay-delta"));
                        if(pos > lastScrollPosition) {
                            if (i + delta >= lastScrollPosition) {
                                delay = (i + delta - lastScrollPosition) * 80;
                            }
                            else
                                delay = 0;
                        }
                        else {
                            if (i + delta <= lastScrollPosition + 4) {
                                delay = (lastScrollPosition + 4 - i - delta) * 80;
                            }
                            else
                                delay = 0;
                        }
                        setTimeout(function (li) {
                            $(li).css("-webkit-transform", "translateY(-" + inner_scroll_top + "px) translateZ(0)");
                        }, delay, li);
                    }
                    delta = 0;
                    for(var i = 0; i < right_covers.length; ++i) {
                        var li = right_covers[i];
                        var delay = 0;
                        if($(li).attr("data-delay-delta"))
                            delta = (+$(li).attr("data-delay-delta"));
                        if(pos > lastScrollPosition) {
                            if (i + delta >= lastScrollPosition)
                                delay = (i + delta - lastScrollPosition) * 80;
                            else
                                delay = 0;
                        }
                        else {
                            if (i + delta <= lastScrollPosition + 4)
                                delay = (lastScrollPosition + 4 - i - delta) * 80;
                            else
                                delay = 0;
                        }
                        setTimeout(function (li) {
                            $(li).css("-webkit-transform", "translateY(-" + inner_scroll_top + "px) translateZ(0)");
                        }, delay + 90, li);
                    }
                    lastScrollPosition = pos;
                    if(expanded &&  pos != Math.floor(expandId / 2))
                        retObject.closeInfoBar();
                    else if(expanded)
                        retObject.expandInfoBar();
                };

                $("#tableview_scrollbar-container").unbind("scroll").unbind("mousedown").unbind("click").bind("scroll", scroll_animation).bind("mousedown", function (event) {
                    var pos = Math.floor(event.pageY / 200) + lastScrollPosition;
                    var pos_x = (event.pageX < 300) ? 0 : 1;
                    var no = pos * 2 + pos_x;
                    if(expanded) {
                        var expand_line =  Math.floor(expandId / 2);
                        if (expand_line <= pos) {
                            if (pos == expand_line) {
                                if (pos_x != (expandId % 2)) {
                                    if(pos_x % 2 == 0)
                                        no += 1;
                                    else
                                        no -= 1;
                                }
                            }
                            else if (pos == expand_line + 1 && pos_x != (expandId % 2)) {
                                if (expandId % 2 == 1)
                                    no -= 1;
                                else
                                    no -= 3;
                            }
                            else if (pos_x == (expandId % 2))
                                no -= 2;
                            else
                                no -= 4;
                        }
                    }
                    $("#song_cover_" + no).addClass("pressdown");
                    setTimeout(function () {
                        $("#song_cover_" + no).removeClass("pressdown");
                    }, 1000);
                }).bind("click", function (event) {
                    if(moved) {
                        event.preventDefault();
                        return;
                    }

                    if(expanded && expandId == lastScrollPosition * 2) {
                        if(event.pageY >= 300) {

                        }
                    }

                    var pos = Math.floor(event.pageY / 200) + lastScrollPosition;
                    var pos_x = (event.pageX < 300) ? 0 : 1;
                    var no = pos * 2 + pos_x;
                    if(expanded) {
                        var expand_line =  Math.floor(expandId / 2);
                        if (expand_line <= pos) {
                            if (pos == expand_line) {
                                if (pos_x != (expandId % 2)) {
                                    if(pos_x % 2 == 0)
                                        no += 1;
                                    else
                                        no -= 1;
                                }
                            }
                            else if (pos == expand_line + 1 && pos_x != (expandId % 2)) {
                                if (expandId % 2 == 1)
                                    no -= 1;
                                else
                                    no -= 3;
                            }
                            else if (pos_x == (expandId % 2))
                                no -= 2;
                            else
                                no -= 4;
                        }
                    }
                    if(content().change_play_no(no)) {
                        if(expanded)
                            retObject.closeExpandedCover();
                        retObject.expandCover(no);
                        retObject.changeContentBackground(musics[no].picture);
                    }
                    else {
                        if(expanded)
                            retObject.closeExpandedCover();
                        else {
                            retObject.expandCover(no);
                        }
                    }
                });
            }, waitingTime);
            return this;
        },

        /**
         * Scroll the song covers' tableview to a specific position
         *
         * @method scrollToPos
         * @param  {Number} pos, the line number of scroll-to position
         * @return {Object} self
         */
        scrollToPos: function (pos) {
            if(pos == lastScrollPosition)
                return this;
            $("#tableview_scrollbar-container").scrollTop(Math.ceil(450 * (pos) / (coversRowNumber - 2)));
            var inner_scroll_top = pos * 200;
            $("#left-cover-list .song_cover, #right-cover-list .song_cover").addClass("ease_scroll")
                .css("-webkit-transform", "translateY(-" + inner_scroll_top + "px) translateZ(0)");
            setTimeout(function () {
                $("#left-cover-list .song_cover, #right-cover-list .song_cover").removeClass("ease_scroll");
            }, 800);
            lastScrollPosition = pos;
            return this;
        },

        /**
         * Remove all song covers animation
         *
         * @method removeMusics
         * @param  {Function} callback
         * @return {Object} self
         */
        removeMusics: function (callback) {
            music_now = {};
            $("#left-cover-list .song_cover").addClass("ease_scroll")
                .css({
                    "-webkit-transform": "translateY(-" + ((coversRowNumber + 3) * 200) + "px) translateZ(0) scale(.8, .8)",
                    "opacity": 0
                });
            $("#right-cover-list .song_cover").addClass("ease_scroll")
                .css({
                    "-webkit-transform": "translateY(-" + ((coversRowNumber + 8) * 200) + "px) translateZ(0) scale(.8, .8)",
                    "opacity": 0
                });
            setTimeout(function (callback) {
                callback();
            }, 800, callback);
            return this;
        },

        trashMusic: function () {
            // TODO
        },

        /**
         * Close the big expanded cover
         *
         * @method closeExpandedCover
         * @param  need_toggle_info_bar
         * @return {Boolean} whether the cover expanded
         */
        closeExpandedCover: function (need_toggle_info_bar) {
            if(need_toggle_info_bar !== false)
                this.closeInfoBar();
            if(!expanded)
                return false;
            expanded = false;
            var left_lis = $("#left-cover-list .song_cover"),
                right_lis = $("#right-cover-list .song_cover");
            $("#cover_control_icons").removeClass("play");
            if(expandId % 2) {
                var left_pos = Math.floor(expandId / 2);
                var right_pos = left_pos + 1;
                $(right_lis[left_pos]).removeClass("expand");
                if(right_pos < right_lis.length)
                    $(right_lis[right_pos]).attr("data-delay-delta", "0");
                if(left_pos < left_lis.length)
                    $(left_lis[left_pos]).css("margin-top", "0").attr("data-delay-delta", "0");
            }
            else {
                var right_pos = Math.floor(expandId / 2);
                var left_pos = right_pos + 1;
                $(left_lis[right_pos]).removeClass("expand");
                if(left_pos < left_lis.length)
                    $(left_lis[left_pos]).attr("data-delay-delta", "0");
                if(right_pos < right_lis.length)
                    $(right_lis[right_pos]).css("margin-top", "0").attr("data-delay-delta", "0");
            }
            coversRowNumber = left_lis.length;
            return true;
        },

        /**
         * Expand the music information bar
         *
         * @method expandInfoBar
         * @return {Object} self
         */
        expandInfoBar: function () {
            infoBarExpanded = true;
            $("#tabbar-info-btn").addClass("expand");
            setTimeout(function () {
                $("#tabbar-info-btn").removeClass("uihover");
            }, 500);
            return this;
        },

        /**
         * Close the information bar
         *
         * @method closeInfoBar
         * @return {Object} self
         */
        closeInfoBar: function () {
            infoBarExpanded = false;
            $("#tabbar-info-btn").removeClass("expand")
            setTimeout(function () {
                $("#tabbar-info-btn").removeClass("uihover");
            }, 500);
            return this;
        },

        /**
         * Toggle the information bar
         *
         * @method toggleInfoBar
         * @return {Object} self
         */
        toggleInfoBar: function () {
            if(infoBarExpanded)
                this.closeInfoBar();
            else
                this.expandInfoBar();
            return this;
        },

        /**
         * Returns if the cover expanded
         *
         * @method isExpanded
         * @return {boolean} expanded or not
         */
        isExpanded: function () {
            return expanded;
        },

        /**
         * Expand the cover
         *
         * @method expandCover
         * @param  {Number} id, from the musics list
         * @return {Object} self
         */
        expandCover: function (id) {
            if(expanded)
                return false;
            var left_lis = $("#left-cover-list .song_cover"),
                right_lis = $("#right-cover-list .song_cover");
            $("#cover_control_icons").addClass("play");
            var left_pos, right_pos;
            if(id % 2) {
                left_pos = Math.floor(id / 2);
                right_pos = left_pos + 1;
                $(right_lis[left_pos]).addClass("expand");
                if(right_pos < right_lis.length)
                    $(right_lis[right_pos]).attr("data-delay-delta", "1");
                if(left_pos < left_lis.length)
                    $(left_lis[left_pos]).css("margin-top", "400px").attr("data-delay-delta", "2");
                coversRowNumber = left_lis.length + 2;
            }
            else {
                right_pos = Math.floor(id / 2);
                left_pos = right_pos + 1;
                $(left_lis[right_pos]).addClass("expand");
                if(left_pos < left_lis.length)
                    $(left_lis[left_pos]).attr("data-delay-delta", "1");
                if(right_pos < right_lis.length)
                    $(right_lis[right_pos]).css("margin-top", "400px").attr("data-delay-delta", "2");
                coversRowNumber = right_lis.length + 2;
            }
            if(Math.floor(id / 2) != lastScrollPosition) {
                setTimeout(function () {
                    retObject.scrollToPos(Math.floor(id / 2));
                }, 400);
            }
            expanded = true;
            expandId = id;
            setTimeout(retObject.expandInfoBar, 300);

            return retObject;
        },

        /**
         * Load right sidebar (tabbar)
         *
         * @method loadTabbar
         * @return {Object} self
         */
        loadTabbar: function () {
            setTimeout(function () {
                $("#tabbar").addClass("play");
                /*
                 $("#play_btn, #prev_next_btn, #play_mode_btn").mouseenter(function () {
                 $(this).addClass("hover");
                 }).mouseleave(function () {
                 $(this).removeClass("hover");
                 });
                 */
                $("#play_btn").mousedown(function (event) {
                    var btn_parent = $($(".tabbar_icon")[0]);
                    btn_parent.addClass("active").attr("data-active", "true");
                    setTimeout(function () {
                        if(btn_parent.attr("data-active") == "delay") {
                            btn_parent.removeClass("active").attr("data-active", "false");
                            return;
                        }
                        btn_parent.attr("data-active", "false");
                    }, 500);
                }).mouseup(function (event) {
                    var btn_parent = $($(".tabbar_icon")[0]);
                    if(btn_parent.attr("data-active") == "true") {
                        btn_parent.attr("data-active", "delay");
                        return;
                    }
                    btn_parent.removeClass("active").attr("data-active", "false");
                }).mouseleave(function (event) {
                    var btn_parent = $($(".tabbar_icon")[0]);
                    btn_parent.removeClass("active").attr("data-active", "false");
                }).click(function (event) {
                    if(moved) {
                        event.preventDefault();
                        return;
                    }
                    content().toggle_play();
                });
                $("#prev_btn, #next_btn").mousedown(function (event) {
                    var btn = $(this), btn_parent = $($("#tabbar .tabbar_icon")[1]);
                    btn_parent.addClass("active active_" + btn.attr("id")).attr("data-active", "true");
                    setTimeout(function () {
                        if(btn_parent.attr("data-active") == "delay") {
                            btn_parent.removeClass("active active_" + btn.attr("id")).attr("data-active", "false");
                            return;
                        }
                        btn_parent.attr("data-active", "false");
                    }, 500);
                }).mouseup(function (event) {
                    var btn = $(this), btn_parent = $($("#tabbar .tabbar_icon")[1]);
                    if(btn_parent.attr("data-active") == "true") {
                        btn_parent.attr("data-active", "delay");
                        return;
                    }
                    btn_parent.removeClass("active active_" + btn.attr("id")).attr("data-active", "false");
                }).mouseleave(function (event) {
                    var btn = $(this), btn_parent = $($("#tabbar .tabbar_icon")[1]);
                    btn_parent.removeClass("active active_" + btn.attr("id")).attr("data-active", "false");
                }).click(function (event) {
                    if(moved) {
                        event.preventDefault();
                        return;
                    }
                    if(expanded)
                        retObject.closeExpandedCover(false);
                    if($(this).attr("id") == "prev_btn")
                        content().prev_song();
                    else
                        content().next_song();
                    retObject.expandCover(music_now_id);
                    retObject.changeContentBackground(musics[music_now_id].picture);
                });
                $("#play_mode_btn").mousedown(function (event) {
                    var btn_parent = $($("#tabbar .tabbar_icon")[2]);
                    btn_parent.addClass("active").attr("data-active", "true");
                    setTimeout(function () {
                        if (btn_parent.attr("data-active") == "delay") {
                            btn_parent.removeClass("active").attr("data-active", "false");
                            return;
                        }
                        btn_parent.attr("data-active", "false");
                    }, 500);
                }).mouseup(function (event) {
                    var btn_parent = $($("#tabbar .tabbar_icon")[2]);
                    if(btn_parent.attr("data-active") == "true") {
                        btn_parent.attr("data-active", "delay");
                        return;
                    }
                    btn_parent.removeClass("active").attr("data-active", "false");
                }).mouseleave(function (event) {
                    var btn_parent = $($("#tabbar .tabbar_icon")[2]);
                    btn_parent.removeClass("active").attr("data-active", "false");
                }).click(function (event) {
                    if(moved) {
                        event.preventDefault();
                        return;
                    }
                    content().change_play_mode();
                });
                $("#song_info").mousedown(function (event) {
                    var btn_parent = $($("#tabbar .tabbar_icon")[3]);
                    btn_parent.addClass("active").attr("data-active", "true");
                    setTimeout(function () {
                        if (btn_parent.attr("data-active") == "delay") {
                            btn_parent.removeClass("active").attr("data-active", "false");
                            return;
                        }
                        btn_parent.attr("data-active", "false");
                    }, 500);
                }).mouseup(function (event) {
                    var btn_parent = $($("#tabbar .tabbar_icon")[3]);
                    if(btn_parent.attr("data-active") == "true") {
                        btn_parent.attr("data-active", "delay");
                        return;
                    }
                    btn_parent.removeClass("active").attr("data-active", "false");
                }).mouseleave(function (event) {
                    var btn_parent = $($("#tabbar .tabbar_icon")[3]);
                    btn_parent.removeClass("active").attr("data-active", "false");
                    if($("#tabbar-info-btn").attr("data-click") !== "true")
                        $("#tabbar-info-btn").removeClass("uihover");
                }).mouseenter(function (event) {
                    $("#tabbar-info-btn").addClass("uihover");
                }).click(function (event) {
                    $("#tabbar-info-btn").attr("data-click", "true");
                    setTimeout(function () {
                        $("#tabbar-info-btn").attr("data-click", "false");
                    }, 500);
                    if(moved) {
                        event.preventDefault();
                        return;
                    }
                    if (!retObject.expandCover(music_now_id)) {
                        if ((music_now_id >> 1) == lastScrollPosition)
                            retObject.toggleInfoBar();
                        else {
                            retObject.expandInfoBar();
                            retObject.scrollToPos(music_now_id >> 1);
                        }
                    }
                });
            }, waitingTime);
            return this;
        },

        /**
         * Load control buttons animation
         *
         * @method loadControlBtns
         * @return {Object} self
         */
        loadControlBtns: function () {
            setTimeout(function () {
                $("#close_btn").addClass("play").click(function (event) {
                    if(moved) {
                        event.preventDefault();
                        return;
                    }
                    if(macgap) {
                        macgap.app.terminate();
                    }
                });
                setTimeout(function () {
                    $("#mute_btn").addClass("play");
                }, 100);
            }, waitingTime);
            return this;
        },

        /**
         * Load content background animation
         *
         * @method loadContentBackground
         * @param  {String} img_src the url of image
         * @param  {Boolean} s switch for changing background blending color
         * @return {Object} self
         */
        loadContentBackground: function (img_src, s) {
            if(!img_src)
                return this;
            setTimeout(function () {
                $("#logo, #control_btns > div").addClass("drop_shadow");
                $("#tableview").css("background", "rgba(0, 0, 0, .1)");
                $("#content").addClass("blur_bg");
                if(s)
                    $("#background").addClass("blur_bg").css({
                        "background-color": img_src
                    });
                else
                    $("#background").addClass("blur_bg").css({
                        "background-image": "url(" + img_src + ")",
                        "background-color": "rgba(255, 255, 255, 0.15)"
                    });
            }, waitingTime);
            return this;
        },

        /**
         * Load content background shadow
         *
         * @method loadContentBackgroundShadow
         * @param  {Array} rgb the rgb color array
         * @return {Object} self
         */
        loadContentBackgroundShadow: function (rgb) {
            $("#background").css("background-color", "rgba(" + rgb.join(",") + ", .2)");
            return this;
        },

        /**
         * Change content background image
         *
         * @method changeContentBackground
         * @param  {String} img_src the image url
         * @return {Object} self
         */
        changeContentBackground: function (img_src) {
            $("#background").css("background-color", "#fff");
            setTimeout(function () {
                $("#background").css({
                    "background-image": "url(" + img_src + ")",
                    "background-color": "rgba(255, 255, 255, 0.15)"
                });
            } ,500);
            return this;
        },

        /**
         * Load music information rolling animation
         *
         * @method loadMusicInfoRollingAnim
         * @return {Object} self
         */
        loadMusicInfoRollingAnim: function () {

            // clear current animation(s)
            if (musicInfoIntervals.length) {
                for (inte in musicInfoIntervals) {
                    clearInterval(musicInfoIntervals[inte]);
                }
                musicInfoIntervals = [];
            }

            autoMove($("#song_info_title"));
            autoMove($("#song_info_artist"));
            autoMove($("#album_title"));
            return this;
        },

        /**
         * Close Music lyrics
         *
         * @method closeLyrics
         * @return {Object} self
         */
        closeLyrics: function () {
            if(infoExpanded)
                $("#album_info").removeClass("show");
            return this;
        },

        /**
         * Toggle Music lyrics
         *
         * @method toggleLyrics
         * @return {Object} self
         */
        toggleLyrics: function () {
            if(infoExpanded) {
                $("#album_info").removeClass("show");
            }
            else {
                $("#album_info").html(musics[music_now_id].info).addClass("show");
            }
            infoExpanded = !infoExpanded;
            return this;
        }
    };

    return retObject;
})();
