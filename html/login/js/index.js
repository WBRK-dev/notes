$("main button").click(() => {
    $("#loadingmessage").show();
    $("#errormessage").hide();

    username = $("input#username").val();
    password = $("input#password").val();


    var request = $.get('http://wbrk.ddns.net/res/notes/php/userCheck.php?username='+username+'&password='+password, function (data) {
        $("#loadingmessage").hide();
        if (data === "true") {
            json = {"username": username, "password": password, "offline": false};
            localStorage.setItem('userdata', JSON.stringify(json));
            window.open('../index.html','_self');
        } else {
            $("#errormessage").show();
        };
    });
});





