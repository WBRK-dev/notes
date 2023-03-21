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
    
}

function renderNotes() {
    $("main > notes > *").remove();
    notes = JSON.parse(localStorage.getItem('notes'));
    $.each(notes, function(key,value) {
        $("main > notes").append('<note><div class="header"><p class="title">'+value.title+'</p><div id="indicator" data-job=""></div></div><p class="desc">'+value.content+'</p></note>');
    });
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

async function synchronize() {
    storedSyncJobs = JSON.parse(localStorage.getItem('syncjobs'));
    $("header p#sync-jobs #job-number").text(storedSyncJobs.length);
    if (!(userdata.offline)) {
        $("header #indicator").attr('data-job', 'syncing');
        storedNotes = JSON.parse(localStorage.getItem('notes'));
        await $.each(storedSyncJobs, async function(key, value) {
            getRequestJson = {"username": userdata.username, "action": value.action, "note": {"title": value.title, "content": ""}};
            $.each(storedNotes, function(key2,value2) {
                if (value2.title === value.title) {
                    getRequestJson.note.content = value2.content;
                }
            });
            console.log(getRequestJson);
            await storeOnCloud(getRequestJson);
            sleepFor(500);
        });
        setTimeout(() => {
            localStorage.setItem('syncjobs', '[]');
            syncHandler();
        }, 200);
    } else {
        $("header #indicator").attr('data-job', '');
    };
}

function syncHandler() {
    storedSyncJobs = JSON.parse(localStorage.getItem('syncjobs'));
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