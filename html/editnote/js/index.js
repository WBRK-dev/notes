var title = decodeURI(location.href).split("#")[1];
$("head title").text("Edit Note - "+title);
var userdata = JSON.parse(localStorage.getItem('userdata'));

function loadNote(title) {
    storedNotes = JSON.parse(localStorage.getItem('notes'));
    $.each(storedNotes, function(key, value) {
        if (value.title === title) {
            $("textarea").text(value.content);
        }
    });
}
loadNote(title);

function saveNote(title) {
    noteNoteContent = $("textarea").val();
    storedNotes = JSON.parse(localStorage.getItem('notes'));
    newNotes = [{"title": title, "content": noteNoteContent}];
    $.each(storedNotes, function(key, value) {
        if (value.title !== title) {
            newNotes.push({
                title: value.title,
                content: value.content
            });
        };
    });
    localStorage.setItem('notes', JSON.stringify(newNotes));
    syncJobs = JSON.parse(localStorage.getItem('syncjobs'));
    syncJobs.push({
        action: 0,
        title: title
    });
    localStorage.setItem('syncjobs', JSON.stringify(syncJobs));
}









// Click events

$("toolbar #saveNote").click(() => {saveNote(title)});

$("header #home").click(() => {
    noteNoteContent = $("textarea").val();
    storedNotes = JSON.parse(localStorage.getItem('notes'));
    noChanges = false;
    $.each(storedNotes, function (key, value) {
        if (value.title === title && value.content === noteNoteContent) {
            noChanges = true;
        }
    });
    if (noChanges) {
        window.open('../index.html','_self');
    } else {
        popups(0, 'saveChanges');
    }
});

$("popups popup#saveChanges #submit").click(function () {
    saveNote(title);
    window.open("../index.html","_self");
});