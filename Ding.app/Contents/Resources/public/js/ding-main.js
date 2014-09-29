/*
 * This is the main JavaScript file of Ding.app
 * Create by quietshu@gmail.com at 2014.9.14
 * */
var new_user = true;
var authed = false, token, expire, user_name, user_email, user_id;

$(window).load(function() {

    if(window.localStorage) {
        if(window.localStorage["new_user"])
            new_user = false;
        else
            window.localStorage["new_user"] = true;

        if(window.localStorage["authed"] === "true") {
            authed = true;
            token = window.localStorage.token;
            expire = window.localStorage.expire;
            user_name = window.localStorage.user_name;
            user_email = window.localStorage.user_email;
            user_id = window.localStorage.user_id;
        }
        else
            authed = false;
    }

    new_user = true;

    content().init();
    if(!authed) { //new_user) {
        content().require_login();
    }
    else {
        content().load();
        content().bind_drag();
    }
});