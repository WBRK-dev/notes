if (localStorage.getItem('userdata') !== null && JSON.parse(localStorage.getItem('userdata')).username !== "") {
    userdata = JSON.parse(localStorage.getItem('userdata'));
    $.get('http://wbrk.ddns.net/res/notes/php/userCheck.php?username='+userdata.username+'&password='+userdata.password, function (data) {
        if (data === "true") {
            userdata.offline = false; localStorage.setItem('userdata',JSON.stringify(userdata));
            window.open('../index.html','_self');
        } else {
            $("main p").text('Incorrect username/password.');
            setTimeout(() => {window.open('../login/index.html', '_self')}, 2000);
        };
    }).fail(function() {
        $("main p").text("Can't connect to server. Entering offline mode.");
        userdata.offline = true; localStorage.setItem('userdata',JSON.stringify(userdata));
        setTimeout(() => {window.open('../index.html', '_self')}, 2000);
    });
} else {
    window.open('../login/index.html','_self');
}