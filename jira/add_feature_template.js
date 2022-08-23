/**
 * Bookmarklet code to automatically add a standard Jira feature template
 * to new and existing tickets with the click of a button
 *
 * Check `README.html` for installation instructions
 */

function httpGet(urlPath) {
    let xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.open("GET", urlPath, false);
    xmlHttpReq.send(null);
    return xmlHttpReq.responseText;
}

templateText = httpGet('https://raw.githubusercontent.com/juanjgarcia/tickets/main/jira/feature_ticket_template.html')

function buildNewText(existingText) {
    if (existingText) {
        return `${existingText}\n\n${templateText}`
    }
    return templateText
}

if (document.getElementsByClassName('ProseMirror').length) {
    // Modifying existing ticket
    existingText = document.getElementsByClassName('ProseMirror')[0].innerHTML
    document.getElementsByClassName('ProseMirror')[0].innerHTML = buildNewText(existingText)
} else if (document.getElementById('description')) {
    // Creating a new ticket
    existingText = document.getElementById('description').innerHTML
    document.getElementById('description').innerHTML = buildNewText(existingText)
} else {
    alert("Could not find actively selected Jira description text box, did you select it?")
}
