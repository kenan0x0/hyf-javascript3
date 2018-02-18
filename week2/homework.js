'use strict';

const USER_URL = "https://api.github.com/users/kenan";
const REPO_URL = "https://api.github.com/repos/HackYourFuture/";


const root = document.getElementById("root");
const header = createAndAppend("h1", root, "Search engine");
const input = createAndAppend("input", root);
const button = createAndAppend("button", root, "Search Users");
const button2 = createAndAppend("button", root, "Search Repos");
const uList = createAndAppend("ul", root);


input.setAttribute("type", "text");
input.setAttribute("placeholder", "Search here");
button.setAttribute("style", "margin-left:5px");
button2.setAttribute("style", "margin-left:5px");



function fetchJSON(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";
    xhr.send();
}



function createAndAppend(name, parent, innerHTML) {
    const child = document.createElement(name);
    parent.appendChild(child);
    if (innerHTML !== undefined) {
        child.innerHTML = innerHTML;
    }
    return child;
}