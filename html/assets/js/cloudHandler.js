function storeOnCloud(newJsonContent, username) {
    $.get('http://wbrk.ddns.net/res/notes/php/saveJson2.php?username=' + username + '&json=' + JSON.stringify(newJsonContent), function () { }).fail(() => { window.open('./userCheck/userCheck.html', '_self'); });
};

function createCloudJson(newNotes, existingNotes) {
    existingNotes = existingNotes;
    let newJsonContent = [];

    if (newNotes.action === 0) {
        newJsonContent.push({
            title: newNotes.note.title,
            content: newNotes.note.content
        });
        $.each(existingNotes, function (key1, value1) {
            if (value1.title !== newNotes.note.title) {
                newJsonContent.push({
                    title: value1.title,
                    content: value1.content
                });
            }
        });
    } else if (newNotes.action === 1) {
        $.each(existingNotes, function (key1, value1) {
            if (value1.title !== newNotes.note.title) {
                newJsonContent.push({
                    title: value1.title,
                    content: value1.content
                });
            }
        });
    }

    return newJsonContent;
}