"use strict";

const BASE_URL = "https://api.github.com/users/";



const root = document.getElementById("root");



const imgGithub = createAndAppend("img", root);
const imgHYF = createAndAppend("img", root);
const div2 = createAndAppend("div", root);
const header = createAndAppend("h1", div2, "Search user info");
const input = createAndAppend("input", div2);
const button = createAndAppend("button", div2, "Get user info");
const uList = createAndAppend("ul", root);


header.style = "text-shadow:0px 2px 4px black";
input.type = "text";
input.placeholder = "type username here";
button.style = "margin-left:3px";
div2.id = "div2";
imgGithub.src = "https://www.seeklogo.net/wp-content/uploads/2015/09/github-logo-400x400.png";
imgGithub.style = "width:100px;height:100px;float:left";
imgGithub.id = "img1";
imgHYF.src = "https://deroosadvocaten.nl/wp-content/uploads/2017/12/Geschaald-hack-your-future.png";
imgHYF.style = "width:100px;margin-top:2%;margin-left:2%";
imgHYF.id = "img2";



button.addEventListener("click", () => getInfo(input.value));
button.addEventListener("click", () => console.log("I've been happily clicked"));


function getInfo(value) {
    fetchJSON(BASE_URL + value)
        .then(data => {
            createAndAppend("li", uList, `Name is: ${data.name}`);
            createAndAppend("li", uList, `ID is: ${data.id}`);
            createAndAppend("li", uList, `Following: ${data.following}`);
            createAndAppend("li", uList, `Followers: ${data.followers}`);
        }
        )
}


function fetchJSON(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.send();
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = () => reject(new Error(xhr.statusText));
    }
    )
}

function createAndAppend(name, parent, innerHTML) {
    const child = document.createElement(name);
    parent.appendChild(child);
    if (innerHTML !== undefined) {
        child.innerHTML = innerHTML;
    }
    return child;
}