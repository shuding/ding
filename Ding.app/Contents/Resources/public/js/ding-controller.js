/*
 * This is the logic controller JavaScript file of Ding.app
 * Create by quietshu@gmail.com at 2014.9.14
 * */

var musics = [
    {
        album : "\/subject\/4732961\/",
        picture: "./img/cover/0.jpg",
        ssid: "8074",
        artist: "James Blunt",
        url: "http:\/\/mr4.douban.com\/201309301009\/58419e1d4dfc45d9ff800b559839ff56\/view\/song\/small\/p1639693.mp3",
        company: "Erased Tapes Records",
        title: "Kiss This Love Goodbye",
        rating_avg: 4.46059,
        length: 348,
        subtype: "",
        public_time: "2010",
        sid: "1639693",
        aid: "4732961",
        sha256: "834329357c6ab0f591d84d14bef8c3e6c9333fdac0661308629785a6101df2ea",
        kbps: "64",
        albumtitle: "Moon Landing",
        like: 0
    },
    {
        album : "\/subject\/4732961\/",
        picture: "./img/cover/1.jpg",
        ssid: "8074",
        artist: "Taylor Swift",
        url: "http:\/\/mr4.douban.com\/201309301009\/58419e1d4dfc45d9ff800b559839ff56\/view\/song\/small\/p1639693.mp3",
        company: "Erased Tapes Records",
        title: "Red",
        rating_avg: 4.46059,
        length: 348,
        subtype: "",
        public_time: "2010",
        sid: "1639693",
        aid: "4732961",
        sha256: "834329357c6ab0f591d84d14bef8c3e6c9333fdac0661308629785a6101df2ea",
        kbps: "64",
        albumtitle: "Moon Landing",
        like: 0
    },
    {
        album : "\/subject\/4732961\/",
        picture: "./img/cover/2.jpg",
        ssid: "8074",
        artist: "Westlift",
        url: "http:\/\/mr4.douban.com\/201309301009\/58419e1d4dfc45d9ff800b559839ff56\/view\/song\/small\/p1639693.mp3",
        company: "Erased Tapes Records",
        title: "Greatest Hits",
        rating_avg: 4.46059,
        length: 348,
        subtype: "",
        public_time: "2010",
        sid: "1639693",
        aid: "4732961",
        sha256: "834329357c6ab0f591d84d14bef8c3e6c9333fdac0661308629785a6101df2ea",
        kbps: "64",
        albumtitle: "Moon Landing",
        like: 0
    },
    {
        album : "\/subject\/4732961\/",
        picture: "./img/cover/3.jpg",
        ssid: "8074",
        artist: "Coldplay",
        url: "http:\/\/mr4.douban.com\/201309301009\/58419e1d4dfc45d9ff800b559839ff56\/view\/song\/small\/p1639693.mp3",
        company: "Erased Tapes Records",
        title: "Ghost Stories",
        rating_avg: 4.46059,
        length: 348,
        subtype: "",
        public_time: "2010",
        sid: "1639693",
        aid: "4732961",
        sha256: "834329357c6ab0f591d84d14bef8c3e6c9333fdac0661308629785a6101df2ea",
        kbps: "64",
        albumtitle: "Moon Landing",
        like: 0
    },
    {
        album : "\/subject\/4732961\/",
        picture: "./img/cover/4.jpg",
        ssid: "8074",
        artist: "James Blunt",
        url: "http:\/\/mr4.douban.com\/201309301009\/58419e1d4dfc45d9ff800b559839ff56\/view\/song\/small\/p1639693.mp3",
        company: "Erased Tapes Records",
        title: "The Only One",
        rating_avg: 4.46059,
        length: 348,
        subtype: "",
        public_time: "2010",
        sid: "1639693",
        aid: "4732961",
        sha256: "834329357c6ab0f591d84d14bef8c3e6c9333fdac0661308629785a6101df2ea",
        kbps: "64",
        albumtitle: "Moon Landing",
        like: 0
    },
    {
        album : "\/subject\/4732961\/",
        picture: "./img/cover/5.jpg",
        ssid: "8074",
        artist: "James Blunt",
        url: "http:\/\/mr4.douban.com\/201309301009\/58419e1d4dfc45d9ff800b559839ff56\/view\/song\/small\/p1639693.mp3",
        company: "Erased Tapes Records",
        title: "The Only One",
        rating_avg: 4.46059,
        length: 348,
        subtype: "",
        public_time: "2010",
        sid: "1639693",
        aid: "4732961",
        sha256: "834329357c6ab0f591d84d14bef8c3e6c9333fdac0661308629785a6101df2ea",
        kbps: "64",
        albumtitle: "Moon Landing",
        like: 0
    },
    {
        album : "\/subject\/4732961\/",
        picture: "./img/cover/6.jpg",
        ssid: "8074",
        artist: "James Blunt",
        url: "http:\/\/mr4.douban.com\/201309301009\/58419e1d4dfc45d9ff800b559839ff56\/view\/song\/small\/p1639693.mp3",
        company: "Erased Tapes Records",
        title: "The Only One",
        rating_avg: 4.46059,
        length: 348,
        subtype: "",
        public_time: "2010",
        sid: "1639693",
        aid: "4732961",
        sha256: "834329357c6ab0f591d84d14bef8c3e6c9333fdac0661308629785a6101df2ea",
        kbps: "64",
        albumtitle: "Moon Landing",
        like: 0
    },
    {
        album : "\/subject\/4732961\/",
        picture: "./img/cover/7.jpg",
        ssid: "8074",
        artist: "James Blunt",
        url: "http:\/\/mr4.douban.com\/201309301009\/58419e1d4dfc45d9ff800b559839ff56\/view\/song\/small\/p1639693.mp3",
        company: "Erased Tapes Records",
        title: "The Only One",
        rating_avg: 4.46059,
        length: 348,
        subtype: "",
        public_time: "2010",
        sid: "1639693",
        aid: "4732961",
        sha256: "834329357c6ab0f591d84d14bef8c3e6c9333fdac0661308629785a6101df2ea",
        kbps: "64",
        albumtitle: "Moon Landing",
        like: 0
    },
    {
        album : "\/subject\/4732961\/",
        picture: "./img/cover/8.jpg",
        ssid: "8074",
        artist: "James Blunt",
        url: "http:\/\/mr4.douban.com\/201309301009\/58419e1d4dfc45d9ff800b559839ff56\/view\/song\/small\/p1639693.mp3",
        company: "Erased Tapes Records",
        title: "The Only One",
        rating_avg: 4.46059,
        length: 348,
        subtype: "",
        public_time: "2010",
        sid: "1639693",
        aid: "4732961",
        sha256: "834329357c6ab0f591d84d14bef8c3e6c9333fdac0661308629785a6101df2ea",
        kbps: "64",
        albumtitle: "Moon Landing",
        like: 0
    },
    {
        album : "\/subject\/4732961\/",
        picture: "./img/cover/9.jpg",
        ssid: "8074",
        artist: "James Blunt",
        url: "http:\/\/mr4.douban.com\/201309301009\/58419e1d4dfc45d9ff800b559839ff56\/view\/song\/small\/p1639693.mp3",
        company: "Erased Tapes Records",
        title: "The Only One",
        rating_avg: 4.46059,
        length: 348,
        subtype: "",
        public_time: "2010",
        sid: "1639693",
        aid: "4732961",
        sha256: "834329357c6ab0f591d84d14bef8c3e6c9333fdac0661308629785a6101df2ea",
        kbps: "64",
        albumtitle: "Moon Landing",
        like: 0
    },
    {
        album : "\/subject\/4732961\/",
        picture: "./img/cover/10.jpg",
        ssid: "8074",
        artist: "James Blunt",
        url: "http:\/\/mr4.douban.com\/201309301009\/58419e1d4dfc45d9ff800b559839ff56\/view\/song\/small\/p1639693.mp3",
        company: "Erased Tapes Records",
        title: "The Only One",
        rating_avg: 4.46059,
        length: 348,
        subtype: "",
        public_time: "2010",
        sid: "1639693",
        aid: "4732961",
        sha256: "834329357c6ab0f591d84d14bef8c3e6c9333fdac0661308629785a6101df2ea",
        kbps: "64",
        albumtitle: "Moon Landing",
        like: 0
    },
    {
        album : "\/subject\/4732961\/",
        picture: "./img/cover/0.jpg",
        ssid: "8074",
        artist: "James Blunt",
        url: "http:\/\/mr4.douban.com\/201309301009\/58419e1d4dfc45d9ff800b559839ff56\/view\/song\/small\/p1639693.mp3",
        company: "Erased Tapes Records",
        title: "The Only One",
        rating_avg: 4.46059,
        length: 348,
        subtype: "",
        public_time: "2010",
        sid: "1639693",
        aid: "4732961",
        sha256: "834329357c6ab0f591d84d14bef8c3e6c9333fdac0661308629785a6101df2ea",
        kbps: "64",
        albumtitle: "Moon Landing",
        like: 0
    },
    {
        album : "\/subject\/4732961\/",
        picture: "./img/cover/1.jpg",
        ssid: "8074",
        artist: "James Blunt",
        url: "http:\/\/mr4.douban.com\/201309301009\/58419e1d4dfc45d9ff800b559839ff56\/view\/song\/small\/p1639693.mp3",
        company: "Erased Tapes Records",
        title: "The Only One",
        rating_avg: 4.46059,
        length: 348,
        subtype: "",
        public_time: "2010",
        sid: "1639693",
        aid: "4732961",
        sha256: "834329357c6ab0f591d84d14bef8c3e6c9333fdac0661308629785a6101df2ea",
        kbps: "64",
        albumtitle: "Moon Landing",
        like: 0
    },
    {
        album : "\/subject\/4732961\/",
        picture: "./img/cover/2.jpg",
        ssid: "8074",
        artist: "James Blunt",
        url: "http:\/\/mr4.douban.com\/201309301009\/58419e1d4dfc45d9ff800b559839ff56\/view\/song\/small\/p1639693.mp3",
        company: "Erased Tapes Records",
        title: "The Only One",
        rating_avg: 4.46059,
        length: 348,
        subtype: "",
        public_time: "2010",
        sid: "1639693",
        aid: "4732961",
        sha256: "834329357c6ab0f591d84d14bef8c3e6c9333fdac0661308629785a6101df2ea",
        kbps: "64",
        albumtitle: "Moon Landing",
        like: 0
    },
    {
        album : "\/subject\/4732961\/",
        picture: "./img/cover/3.jpg",
        ssid: "8074",
        artist: "James Blunt",
        url: "http:\/\/mr4.douban.com\/201309301009\/58419e1d4dfc45d9ff800b559839ff56\/view\/song\/small\/p1639693.mp3",
        company: "Erased Tapes Records",
        title: "The Only One",
        rating_avg: 4.46059,
        length: 348,
        subtype: "",
        public_time: "2010",
        sid: "1639693",
        aid: "4732961",
        sha256: "834329357c6ab0f591d84d14bef8c3e6c9333fdac0661308629785a6101df2ea",
        kbps: "64",
        albumtitle: "Moon Landing",
        like: 0
    },
    {
        album : "\/subject\/4732961\/",
        picture: "./img/cover/4.jpg",
        ssid: "8074",
        artist: "James Blunt",
        url: "http:\/\/mr4.douban.com\/201309301009\/58419e1d4dfc45d9ff800b559839ff56\/view\/song\/small\/p1639693.mp3",
        company: "Erased Tapes Records",
        title: "The Only One",
        rating_avg: 4.46059,
        length: 348,
        subtype: "",
        public_time: "2010",
        sid: "1639693",
        aid: "4732961",
        sha256: "834329357c6ab0f591d84d14bef8c3e6c9333fdac0661308629785a6101df2ea",
        kbps: "64",
        albumtitle: "Moon Landing",
        like: 0
    },
    {
        album : "\/subject\/4732961\/",
        picture: "./img/cover/5.jpg",
        ssid: "8074",
        artist: "James Blunt",
        url: "http:\/\/mr4.douban.com\/201309301009\/58419e1d4dfc45d9ff800b559839ff56\/view\/song\/small\/p1639693.mp3",
        company: "Erased Tapes Records",
        title: "The Only One",
        rating_avg: 4.46059,
        length: 348,
        subtype: "",
        public_time: "2010",
        sid: "1639693",
        aid: "4732961",
        sha256: "834329357c6ab0f591d84d14bef8c3e6c9333fdac0661308629785a6101df2ea",
        kbps: "64",
        albumtitle: "Moon Landing",
        like: 0
    },
    {
        album : "\/subject\/4732961\/",
        picture: "./img/cover/6.jpg",
        ssid: "8074",
        artist: "James Blunt",
        url: "http:\/\/mr4.douban.com\/201309301009\/58419e1d4dfc45d9ff800b559839ff56\/view\/song\/small\/p1639693.mp3",
        company: "Erased Tapes Records",
        title: "The Only One",
        rating_avg: 4.46059,
        length: 348,
        subtype: "",
        public_time: "2010",
        sid: "1639693",
        aid: "4732961",
        sha256: "834329357c6ab0f591d84d14bef8c3e6c9333fdac0661308629785a6101df2ea",
        kbps: "64",
        albumtitle: "Moon Landing",
        like: 0
    },
    {
        album : "\/subject\/4732961\/",
        picture: "./img/cover/7.jpg",
        ssid: "8074",
        artist: "James Blunt",
        url: "http:\/\/mr4.douban.com\/201309301009\/58419e1d4dfc45d9ff800b559839ff56\/view\/song\/small\/p1639693.mp3",
        company: "Erased Tapes Records",
        title: "The Only One",
        rating_avg: 4.46059,
        length: 348,
        subtype: "",
        public_time: "2010",
        sid: "1639693",
        aid: "4732961",
        sha256: "834329357c6ab0f591d84d14bef8c3e6c9333fdac0661308629785a6101df2ea",
        kbps: "64",
        albumtitle: "Moon Landing",
        like: 0
    },
    {
        album : "\/subject\/4732961\/",
        picture: "./img/cover/8.jpg",
        ssid: "8074",
        artist: "James Blunt",
        url: "http:\/\/mr4.douban.com\/201309301009\/58419e1d4dfc45d9ff800b559839ff56\/view\/song\/small\/p1639693.mp3",
        company: "Erased Tapes Records",
        title: "The Only One",
        rating_avg: 4.46059,
        length: 348,
        subtype: "",
        public_time: "2010",
        sid: "1639693",
        aid: "4732961",
        sha256: "834329357c6ab0f591d84d14bef8c3e6c9333fdac0661308629785a6101df2ea",
        kbps: "64",
        albumtitle: "Moon Landing",
        like: 0
    },
    {
        album : "\/subject\/4732961\/",
        picture: "./img/cover/9.jpg",
        ssid: "8074",
        artist: "James Blunt",
        url: "http:\/\/mr4.douban.com\/201309301009\/58419e1d4dfc45d9ff800b559839ff56\/view\/song\/small\/p1639693.mp3",
        company: "Erased Tapes Records",
        title: "The Only One",
        rating_avg: 4.46059,
        length: 348,
        subtype: "",
        public_time: "2010",
        sid: "1639693",
        aid: "4732961",
        sha256: "834329357c6ab0f591d84d14bef8c3e6c9333fdac0661308629785a6101df2ea",
        kbps: "64",
        albumtitle: "Moon Landing",
        like: 0
    },
    {
        album : "\/subject\/4732961\/",
        picture: "./img/cover/10.jpg",
        ssid: "8074",
        artist: "James Blunt",
        url: "http:\/\/mr4.douban.com\/201309301009\/58419e1d4dfc45d9ff800b559839ff56\/view\/song\/small\/p1639693.mp3",
        company: "Erased Tapes Records",
        title: "The Only One",
        rating_avg: 4.46059,
        length: 348,
        subtype: "",
        public_time: "2010",
        sid: "1639693",
        aid: "4732961",
        sha256: "834329357c6ab0f591d84d14bef8c3e6c9333fdac0661308629785a6101df2ea",
        kbps: "64",
        albumtitle: "Moon Landing",
        like: 0
    }
];
var window_pos = [], drag_pos = [], on_drag = false, moved = false;
var music_playing = false, play_mode = 0, music_now = {};
var content_scope;

var app = angular.module("ding", [], function($httpProvider) {
    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    /*
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     * */
    var param = function(obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for(name in obj) {
            value = obj[name];

            if(value instanceof Array) {
                for(i=0; i<value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value instanceof Object) {
                for(subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
});

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
    }

    var load_func = function () {
        // load musics and init model
        change_play_no_func(0);

        // load UI
        ui.clear_wait().logo_animation().wait(2300).background_animation().wait(400).logo_fix_animation()
            .wait(200).navigation_load().wait(200).tableview_load(musics).wait(400).tabbar_load()
            .wait(200).control_btn_load().set_app_background(musics[0].picture);

        // start play music automatic
        content().toggle_play();
    };
    var drag_func = function () {
        if(!MacGap)
            return;
        window_pos = [MacGap.Window.x, MacGap.Window.y];
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
                MacGap.Window.move(window_pos[0], window_pos[1]);
            }
        });
    };
    var toggle_play_func = function () {
        music_playing = !music_playing;
        content_scope.playing = music_playing;
        content_scope.$apply();
        if(music_playing)
            ui.clear_wait().music_info_animation();
    };
    var change_play_mode_func = function () {
        play_mode = (play_mode + 1) % 3;
        content_scope.play_mode = play_mode;
        content_scope.$apply();
    };
    var change_play_no_func = function (no) {
        music_now = musics[no];
        content_scope.music_now = music_now;
        content_scope.$apply();
        ui.clear_wait().music_info_animation();
    };

    var ret_obj = {
        load: load_func,
        bind_drag: drag_func,
        toggle_play: toggle_play_func,
        change_play_mode: change_play_mode_func,
        change_play_no: change_play_no_func
    };
    return ret_obj;
};

app.controller("content", content);