// This method adds event listners to elements that have a corresponding class name.
// When corresponding elements are clicked the database will be notified by post.

export default function startTrack(dest, /*sessionKey,*/ classnom) {
    var pageElements = document.getElementsByClassName(classnom);
    for (var i = 0; i < pageElements.length; i++)
        pageElements[i].addEventListener("click", function(event) {
            sendData(
                event.target.getAttribute('belongs'), dest, window.location.hostname + window.location.pathname /* , sessionKey*/
            )
        });
}

function sendData(comp, dest, pageName) {
    let data = { elmnId: comp, pagename: pageName },
        urlEncodedData = "",
        urlEncodedDataPairs = [],
        name;
    for (name in data) {
        urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    }
    urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {}
    }
    xhr.open("GET", (dest + '?' + urlEncodedData), true);
    xhr.send();
    xhr.onload = function() { return null };
}