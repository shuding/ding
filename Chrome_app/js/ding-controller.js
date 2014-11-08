/*
 * This is the logic controller JavaScript file of Ding.app
 * Create by quietshu@gmail.com at 2014.9.14
 * */

var channels = [];
var window_pos = [], drag_pos = [], on_drag = false, moved = false;
var music_playing = false, play_mode = 0, music_now = {}, music_now_id = 0, volume = 0.5;
var music_audio_object = null;
var layer_expanded = true;
var content_scope, channel_index = 0;
var update_current_time_interval;
var shuffle_queue = [], shuffle_no = 0;
var audio_preload = null;

var app = angular.module("ding", []);

/**
 * The app main controller
 *
 * @param {Object} $scope angular controller scope
 */
function controller($scope) {
    $scope.music = musicControl;
}

function content($scope) {
    if($scope)
        content_scope = $scope;

    if(content_scope) {
        if (content_scope.playing === undefined)
            content_scope.playing = music_playing;
        if (content_scope.play_mode === undefined)
            content_scope.play_mode = play_mode;
        if (content_scope.music_now === undefined)
            content_scope.music_now = music_now;
        if (content_scope.time_formart === undefined)
            content_scope.time_formart = function (s) {
                if(s === undefined)
                    return "0:00";
                var m = Math.floor((+s) / 60);
                s = (+s) % 60;
                s = s < 10 ? ("0" + s) : s;
                return m + ":" + s;
            };
        if (content_scope.calc_rating === undefined) {
            content_scope.calc_rating = function () {
                var r = Math.floor(music_now.rating_avg * 200) / 100;
                return r;
            }
        }
        if (content_scope.album_info_scroll === undefined) {
            content_scope.album_info_scroll = function () {
                var s = 35 - $("#album").scrollTop();
                $("#album").animate({
                    "scrollTop": s
                }, 800);
            };
        }
        if (content_scope.toggle_star === undefined) {
            content_scope.toggle_star = function () {
                if(!music_now || !authed)
                    return false;
                music_now.like = 1 - music_now.like;
                network.update_music_like_info(music_now.sid, (music_now.like == 1) ? "r" : "u");
            }
        }
        if (content_scope.more_info === undefined) {
            content_scope.more_info = function () {
                if(!musics[music_now_id].info)
                    network.get_music_info(music_now, ui.toggleLyrics);
                else
                    ui.toggleLyrics();
            }
        }
        if (content_scope.trash_song === undefined) {
            content_scope.trash_song = function () {
                $("#song_cover_" + music_now_id).addClass("trash");
            }
        }
        if (content_scope.jump_to_album_website === undefined) {
            content_scope.jump_to_album_website = function () {
                macgap && macgap.app.open("http://music.douban.com" + music_now.album);
            }
        }
        if (content_scope.close_layer === undefined) {
            content_scope.close_layer = function () {
                ui.clearWaitingTime().closeLayer();
            }
        }
        if (content_scope.open_layer === undefined) {
            content_scope.open_layer = function (event) {
                if(moved) {
                    event && event.preventDefault();
                    return;
                }

                if(!layer_expanded)
                    ui.clearWaitingTime().loadLayer();
            }
        }
    }

    var generate_shuffle_sequence = function (callback) {
        setTimeout(function (callback) {
            shuffle_queue = [];
            for (var i = musics.length - 1; i >= 0; --i) {
                var j = Math.floor(Math.random() * (musics.length - i));
                if (i + j == musics.length) {
                    --j;
                }
                shuffle_queue[i] = shuffle_queue[i + j];
                shuffle_queue[i + j] = i;
            }
            shuffle_no = 0;
            if(callback)
                callback();
        }, 0, callback);
    };

    var init_func = function () {

        // media keys in keyboard handler
        document.addEventListener("play", function () {
            toggle_play_func();
        });

        document.addEventListener("next", function () {
            if(ui.isExpanded())
                ui.closeExpandedCover(false);
            next_song_func();
            ui.expandCover(music_now_id);
            ui.changeContentBackground(musics[music_now_id].picture);
        });

        document.addEventListener("prev", function () {
            if(ui.isExpanded())
                ui.closeExpandedCover(false);
            prev_song_func();
            ui.expandCover(music_now_id);
            ui.changeContentBackground(musics[music_now_id].picture);
        });

        $("#login-form").submit(function () {
            console.log(authed);
            if(authed) {

                // logout
                authed = false;
                ui.clearWaitingTime().closeLayer();
                layer_expanded = false;
                network.loadChannels(function () {
                    ui.clearWaitingTime().closeLayer().loadChannels().loadNavigation();
                    load_channel_func(0);
                });
            }
            else
                network.auth($("#email").val(), $("#password").val(), function () {
                    ui.clearWaitingTime().closeLayer().loadChannels().loadNavigation();
                    setTimeout(function () {
                        load_channel_func(0);
                        layer_expanded = false;
                    }, 400);
                });
        });

        music_audio_object = new Audio("");
        music_audio_object.preload = "auto";
        audio_preload = new Audio("");
        audio_preload.preload = "auto";
    };

    var require_login_func = function (callback) {

        // init model
        $(music_audio_object).bind("loadstart", function () {
            console.log("start to load music");
        }).bind("canplay", function () {
            music_audio_object.currentTime = musics[music_now_id].current_time | 0;
            ui.loadMusicInfoRollingAnim();
            play_music();
        }).bind("ended", function () {
            if(play_mode == 0) {
                musics[music_now_id].current_time = 0;
                next_song_func();
                if(ui.isExpanded())
                    ui.closeExpandedCover();
                ui.expandCover(music_now_id);
                ui.changeContentBackground(musics[music_now_id].picture);
            }
            else if(play_mode == 1) {
                this.currentTime = 0;
                this.play();
            }
            else {
                if(shuffle_no == shuffle_queue.length)
                    load_channel_func(channel_index);
                else
                    next_song_func();
            }
        }).bind("canplaythrough", preload_next);

        network.loadMusics(function () {
            // load UI
            generate_shuffle_sequence();

            network.loadChannels(ui.loadChannels);

            ui.loadColorThief().clearWaitingTime().wait(200).loadLogo().wait(2500).loadBackgroundEffect().wait(400).closeLogo()
                .wait(200).loadNavigation().wait(200).loadTableview(musics).wait(400).loadTabbar()
                .wait(200).loadControlBtns().loadContentBackground(musics[0].picture).wait(400).loadLayer();

            // play music automatic
            /*
             setTimeout(function () {
             ui.expandCover(0);
             change_play_no_func(0);
             }, ui.waitingTime + 400);
             */
        });

        drag_func();
    };

    var load_func = function () {
        // init model
        $(music_audio_object).bind("loadstart", function () {
            console.log("start to load music");
        }).bind("canplay", function () {
            music_audio_object.currentTime = musics[music_now_id].current_time | 0;
            ui.loadMusicInfoRollingAnim();
            play_music();
        }).bind("ended", function () {
            network.post_end_of_song(music_now.sid);
            if(play_mode == 0) {
                musics[music_now_id].current_time = 0;
                next_song_func();
                if(ui.isExpanded())
                    ui.closeExpandedCover();
                ui.expandCover(music_now_id);
                ui.changeContentBackground(musics[music_now_id].picture);
            }
            else if(play_mode == 1) {
                this.currentTime = 0;
                this.play();
            }
            else {
                if(shuffle_no == shuffle_queue.length)
                    load_channel_func(channel_index);
                else
                    next_song_func();
            }
        }).bind("canplaythrough", preload_next);

        channel_now = -3;
        network.loadMusics(function () {
            generate_shuffle_sequence();
            // load UI
            network.loadChannels(function() {
                ui.loadChannels();

                ui.loadColorThief().clearWaitingTime().wait(200).loadLogo().wait(2500).loadBackgroundEffect().wait(400).closeLogo()
                    .wait(200).loadNavigation().wait(200).loadTableview(musics).wait(400).loadTabbar()
                    .wait(200).loadControlBtns().loadContentBackground(musics[0].picture);

                // play music automatic
                setTimeout(function () {
                    layer_expanded = false;
                    ui.expandCover(0);
                    change_play_no_func(0);
                }, ui.getWaitingTime() + 800);
            });
        });
    };
    var drag_func = function () {
        return;
        if(macgap === undefined)
            return;
        on_drag = false;
        window_pos = [Math.abs(macgap.window.getX()), Math.abs(macgap.window.getY())];
        $(document).mousedown(function (event) {
            on_drag = true;
            moved = false;
            drag_pos = [event.pageX, event.pageY];
        }).mouseup(function (event) {
            on_drag = false;
        }).mouseleave(function () {
            on_drag = false;
        }).mousemove(function (event) {
            if(on_drag) {
                moved = true;
                var dx = event.pageX - drag_pos[0],
                    dy = event.pageY - drag_pos[1];

                window_pos[0] += dx;
                window_pos[1] -= dy;
				macgap.window.move({
					"x": window_pos[0],
					"y": window_pos[1]
				});
            }
        });
    };
    var update_current_time = function () {
        if(!music_playing) {
            clearInterval(update_current_time_interval);
            return;
        }
        musics[music_now_id].current_time = music_now.current_time = Math.floor(music_audio_object.currentTime);
        $(".song_progress_bar_inner").css("width", music_now.current_time / music_now.length * 100 + "%");
        content_scope.$apply();
    };
    var play_music = function () {
        music_playing = true;
        content_scope.playing = true;
        music_audio_object.volume = volume;
        music_audio_object.play();
        content_scope.$apply();

        update_current_time_interval = setInterval(update_current_time, 1000);
    };
    var pause_music = function () {
        content_scope.$apply();
        clearInterval(update_current_time_interval);
        musics[music_now_id].current_time = music_audio_object.currentTime;
        $(music_audio_object).animate({ volume: 0 }, 300);
        setTimeout(function () {
            music_audio_object.pause();
        }, 300);
    };
    var load_music = function (no) {
        console.log("load music");
        music_audio_object.src = musics[no].url;

        if(musics[no].info == undefined)
            setTimeout(function() {
                network.get_music_info(no);
            }, 0);
    };
    var toggle_play_func = function () {
        music_playing = !music_playing;
        content_scope.playing = music_playing;
        if(music_playing)
            play_music();
        else
            pause_music();
        if(music_playing)
            ui.clearWaitingTime().loadMusicInfoRollingAnim();
    };
    var change_play_mode_func = function () {
        play_mode = (play_mode + 1) % 3;
        content_scope.play_mode = play_mode;
        content_scope.$apply();
    };
    var change_play_no_func = function (no) {
        if(music_now === musics[no])
            return false;
        if(music_playing)
            pause_music();
        music_now_id = no;
        music_now = musics[no];
        content_scope.music_now = music_now;
        music_playing = false;
        content_scope.playing = music_playing;
        if (music_now.color)
            ui.loadContentBackgroundShadow(music_now.color[0]);
        content_scope.$apply();
        load_music(no);
        ui.clearWaitingTime().loadMusicInfoRollingAnim();
        return true;
    };
    var prev_song_func = function () {
        ui.closeLyrics();
        change_play_no_func((music_now_id + musics.length - 1) % musics.length);
    };
    var next_song_func = function () {
        ui.closeLyrics();
        if(play_mode == 2) {
            console.log(shuffle_queue);
            change_play_no_func(shuffle_queue[shuffle_no++]);
        }
        else if(music_now_id + 1 < musics.length)
            change_play_no_func(music_now_id + 1);
        else {
            load_channel_func(channel_index);
        }
    };
    var preload_next = function () {
        var next_index = -1;
        if(play_mode == 2)
            next_index = shuffle_queue[shuffle_no];
        else if(music_now_id + 1 < musics.length)
            next_index = music_now_id + 1;
        if (next_index !== -1) {
            audio_preload.src = musics[next_index].url;
        }
    };
    var load_channel_func = function (id) {
        pause_music();
        channel_index = id;
        ui.clearWaitingTime().wait(500).loadContentBackground("#fff", true);
        setTimeout(function () {
            ui.removeMusics(function () {
                $("#left-cover-list, #right-cover-list").html("");
                musics = [];
                channel_now = channels[id]["channel_id"];
                network.loadMusics(function () {
                    generate_shuffle_sequence();

                    ui.clearWaitingTime().loadColorThief().loadTableview(musics).wait(500);
                    setTimeout(function () {
                        ui.clearWaitingTime().expandCover(0).wait(500).loadContentBackground(musics[0].picture);
                        change_play_no_func(0);
                    }, ui.getWaitingTime + 700);
                });
            });
        }, 800);
    };

    var ret_obj = {
        load: load_func,
        bind_drag: drag_func,
        toggle_play: toggle_play_func,
        change_play_mode: change_play_mode_func,
        change_play_no: change_play_no_func,
        prev_song: prev_song_func,
        next_song: next_song_func,
        require_login: require_login_func,
        load_channel: load_channel_func,
        init: init_func
    };
    return ret_obj;
}

app.controller("content", content);
