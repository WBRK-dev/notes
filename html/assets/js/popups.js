function popups(action, id) {
    if (action === 0) {
        $("popups > popup").hide();
        $("popups > popup#"+id).show();
        $("popups").show();
    } else {
        $("popups > popup").hide();
        $("popups").hide(); 
    }
}

$("popups > popup button#hidePopup").click(() => {popups()});

$("popups > popup#addNote #submit").click(() => {
    popups();
    
    noteTitle = $("popups > popup#addNote input#title").val();
    
    addNote(noteTitle, '');
});