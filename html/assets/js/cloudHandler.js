// $.ajaxSetup({ cache: false });
// async function storeOnCloud(newNotes) {
//     $.getJSON("http://wbrk.ddns.net/res/drive/storage/"+newNotes.username+"/WBRK Apps/notes/notes.json", function (data) {
//         var existingNotes = data;
//         let newJsonContent = [];

//         if (newNotes.action === 0) {
//             newJsonContent.push({
//                 title: newNotes.note.title,
//                 content: newNotes.note.content
//             });
//             $.each(existingNotes, function (key1, value1) {
//                 if (value1.title !== newNotes.note.title) {
//                     newJsonContent.push({
//                         title: value1.title,
//                         content: value1.content
//                     });
//                 }
//             });
//         } else if (newNotes.action === 1) {
//             $.each(existingNotes, function (key1, value1) {
//                 if (value1.title !== newNotes.note.title) {
//                     newJsonContent.push({
//                         title: value1.title,
//                         content: value1.content
//                     });
//                 }
//             });
//         }

//         $.get('http://wbrk.ddns.net/res/notes/php/saveJson2.php?username=' + newNotes.username + '&json=' + JSON.stringify(newJsonContent), function () { }).fail(function() {
//             window.open('./userCheck/userCheck.html', '_self');
//         });
//     }).fail(function() {
//         window.open('./userCheck/userCheck.html', '_self');
//     });
// }

// function sleepFor(sleepDuration){
//     var now = new Date().getTime();
//     while(new Date().getTime() < now + sleepDuration){ /* Do nothing */ }
// }
