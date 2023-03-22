var userdata = JSON.parse(localStorage.getItem('userdata'));

function addNote(title, content) {
    existingNotes = JSON.parse(localStorage.getItem('notes'));
    newNotes = [];
    newNotes.push({
        title: title,
        content: content
    });
    $.each(existingNotes, function(key, value) {
        if (value.title !== title) {
            newNotes.push({
                title: value.title,
                content: value.content
            });
        }
    });
    addSyncJob(0, title);
    localStorage.setItem('notes', JSON.stringify(newNotes));
    renderNotes();
}

function removeNote(title) {
    existingNotes = JSON.parse(localStorage.getItem('notes'));
    newNotes = [];
    $.each(existingNotes, function(key, value) {
        if (value.title !== title) {
            newNotes.push({
                title: value.title,
                content: value.content
            });
        }
    });
    addSyncJob(1, title);
    localStorage.setItem('notes', JSON.stringify(newNotes));
    renderNotes();
}

function openNote(title) {
    window.open("editnote/index.html#"+title, "_self");
}

function renderNotes() {
    $("main > notes > *").remove();
    notes = JSON.parse(localStorage.getItem('notes'));
    $.each(notes, function(key,value) {
        $("main > notes").append('<note onclick="openNote(`'+value.title+'`)"><div class="header"><p class="title">'+value.title+'</p><div id="indicator" data-job="done"></div></div><p class="desc">'+ ((value.content === "") ? "Empty note." : value.content) +'</p></note>');
    });
    updateNoteIndicator();
};

function addSyncJob(action, title) {
    existingJobs = JSON.parse(localStorage.getItem('syncjobs'));
    newJobs = [];
    $.each(existingJobs, function (key, value) {
        newJobs.push({
            action: value.action,
            title: value.title
        });
    });
    newJobs.push({
        action: action,
        title: title
    });
    localStorage.setItem('syncjobs', JSON.stringify(newJobs));
    syncHandler();
}

function updateNoteIndicator() {
    $("main > notes note #indicator").attr("data-job", "done");
    storedSyncJobs = JSON.parse(localStorage.getItem('syncjobs'));
    notes = document.querySelectorAll("main > notes note");
    notes.forEach(note => {
        noteTitle = note.querySelector("p.title").innerHTML;
        $.each(storedSyncJobs, function(key,value) {
            if (value.title === noteTitle) {
                note.querySelector("#indicator").setAttribute("data-job", "");
            }
        });
    });
}

async function synchronize() {
    storedSyncJobs = JSON.parse(localStorage.getItem('syncjobs'));
    $("header p#sync-jobs #job-number").text(storedSyncJobs.length);
    if (!(userdata.offline)) {
        $("header #indicator").attr('data-job', 'syncing');
        storedNotes = JSON.parse(localStorage.getItem('notes'));
        console.log(storedNotes, storedSyncJobs);
        await $.get("http://wbrk.ddns.net/res/notes/php/getJson.php?username="+userdata.username, function (data) {
            let existingNotes = JSON.parse(data);
            for (let i = 0; i < storedSyncJobs.length; i++) {
                getRequestJson = {"username": userdata.username, "action": storedSyncJobs[i].action, "note": {"title": storedSyncJobs[i].title, "content": ""}};
                $.each(storedNotes, function(key2,value2) {
                    if (value2.title === storedSyncJobs[i].title) {
                        getRequestJson.note.content = value2.content;
                    }
                });
                existingNotes = createCloudJson(getRequestJson, existingNotes);
            }
            $.get('http://wbrk.ddns.net/res/notes/php/saveJson2.php?username=' + userdata.username + '&json=' + JSON.stringify(existingNotes), function () { }).fail(() => {window.open('./userCheck/userCheck.html', '_self');});
        }).fail(() => {window.open('./userCheck/userCheck.html', '_self');});

        localStorage.setItem('syncjobs', '[]');
        syncHandler();
    } else {
        $("header #indicator").attr('data-job', '');
    };
}

function syncHandler() {
    storedSyncJobs = JSON.parse(localStorage.getItem('syncjobs'));
    updateNoteIndicator();
    if (storedSyncJobs.length === 0) {
        $("header #indicator").attr('data-job', 'done');
        $("header #sync").removeClass('sync-button');
    } else {
        synchronize();
    };
};
syncHandler();

if (userdata.offline) {
    $("header #enablesync").show();
    $("header #sync").hide();
}

if (localStorage.getItem('notes') !== null) {
    renderNotes();
} else {
    localStorage.setItem('notes', '[]');
};

if (localStorage.getItem('syncjobs') !== null) {    
} else {
    localStorage.setItem('syncjobs', '[]');
};