/*
 * This is the main JavaScript file of Ding.app
 * Create by quietshu@gmail.com at 2014.9.14
 * */
var newUser = true;
var authed = false, token, expire, user_name, user_email, user_id;

$(window).load(function() {


    newUser = true;

    content().init();

    if (!authed) {
        content().require_login();
    }
    else {
        content().load();
        content().bind_drag();
    }
});
