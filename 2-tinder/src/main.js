// Waiting for jQuery to initialize
$(document).ready(function() {

    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
    // https://randomuser.me/

    fetch("https://randomuser.me/api/?results=200")
    .then((responce) => {
        return responce.json();
    })
    .then((data) => {
        console.log("Actual data", data);
    })
});
