"use strict";

const USER_URL = "https://api.github.com/users/";
const REPO_URL = "https://api.github.com/repos/HackYourFuture/";
const CONTRIBUTORS = "/contributors";



const root = document.getElementById("root");



const imgGithub = createAndAppend("img", root);
const imgHYF = createAndAppend("img", root);
const div2 = createAndAppend("div", root);
const header = createAndAppend("h1", div2, "Search for info");
const input = createAndAppend("input", div2);
const button = createAndAppend("button", div2, "Get user info");
const button2 = createAndAppend("button", div2, "Get Repo info");
const uList = createAndAppend("ul", root);


header.style = "text-shadow:0px 2px 4px black; font-size:3rem";
input.type = "text";
input.placeholder = "type search string here";
button.style = "margin-left:3px";
button2.style = "margin-left:3px";
div2.id = "div2";
imgGithub.src = "https://www.seeklogo.net/wp-content/uploads/2015/09/github-logo-400x400.png";
imgGithub.style = "width:100px;height:100px;float:left";
imgGithub.id = "img1";
imgHYF.src = "https://deroosadvocaten.nl/wp-content/uploads/2017/12/Geschaald-hack-your-future.png";
imgHYF.style = "width:100px;margin-top:2%;margin-left:2%";
imgHYF.id = "img2";



button.addEventListener("click", () => getInfoUser(input.value));
button2.addEventListener("click", () => getInfoRepo(input.value));
button.addEventListener("click", () => console.log("I've been happily clicked"));


function getInfoUser(value) {
    fetchJSON(USER_URL + value)
        .then(data => {
            createAndAppend("li", uList, `✘ Name is: ${data.name}`);
            createAndAppend("li", uList, `✘ ID is: ${data.id}`);
            createAndAppend("li", uList, `✘ Following: ${data.following}`);
            createAndAppend("li", uList, `✘ Followers: ${data.followers}`);
            const img = createAndAppend("img", uList);
            img.setAttribute("src", data.avatar_url);
            img.setAttribute("alt", "Photo of the user");
            img.setAttribute("style", "width:150px;height:150px; box-shadow:5px 10px 10px black");
            createAndAppend("hr", uList);
        }
        )
}

function getInfoRepo(value) {
    let extraURL = REPO_URL + value;
    fetchJSON(REPO_URL + value)    
        .then(data => {
            createAndAppend("li", uList, `✘ Name is: ${data.name}`);
            createAndAppend("li", uList, `✘ Forks: ${data.forks}, Watchers: ${data.watchers_count}, Stars: ${data.stargazers_count}`);
            fetchJSON(extraURL + CONTRIBUTORS)
                .then(data => {
                    createAndAppend("h2", uList, "✘ Names of Contributors:")
                    for (let i = 0; i < data.length; i++){
                        createAndAppend("li", uList, `» ${data[i].login}`);
                    }
                    createAndAppend("hr", uList);
                })
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