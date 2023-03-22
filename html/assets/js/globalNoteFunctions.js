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
}

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
}