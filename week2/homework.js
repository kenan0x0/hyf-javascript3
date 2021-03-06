    "use strict";
{
    const REPO_URL = "https://api.github.com/repos/HackYourFuture/";
    const USER_URL = "https://api.github.com/users/";
    const CONTRIBUTERS_URL = "/contributors";




    const root = document.getElementById("root");
    const div2 = createAndAppend("div", root)
    const header = createAndAppend("h1", div2, "Search engine");
    const input = createAndAppend("input", div2);
    const firstButton = createAndAppend("button", div2, "Search users");
    const secondButton = createAndAppend("button", div2, "Search repos");
    const uList = createAndAppend("ul", root);




    header.style = "color:blue;text-shadow:0px 2px 5px black";
    input.type = "text";
    input.placeholder = "Search users or repos here";
    firstButton.style = "margin-left:5px";
    secondButton.style = "margin-left:5px";
    div2.id = "div2";


    firstButton.addEventListener("click", () => { console.log(`You clicked me`) });
    secondButton.addEventListener("click", () => { console.log(`You clicked me`) });
    firstButton.addEventListener("click", () => getUser(input.value));
    secondButton.addEventListener("click", () => getRepo(input.value));


    function getUser(value) {
        fetchJSON(USER_URL + value, (error, response) => {
            if (error) {
                console.log(error);
            } else {
                createAndAppend("li", uList, `Name :${response.name}, ID is :${response.id}`);
                createAndAppend("li", uList, `Number of public repos :${response.public_repos}`);
                const img = createAndAppend("img", uList);
                img.setAttribute("src", response.avatar_url);
                img.setAttribute("alt", "Photo of the user");
                img.setAttribute("style", "width:150px;height:150px");
                createAndAppend("hr", uList);
            }
        });
    }
    function getRepo(value) {
        let extraUrl = REPO_URL + value;
        fetchJSON(REPO_URL + value, (error, response) => {
            if (error) {
                console.log(error);
            } else {
                createAndAppend("li", uList, `Name of Repo :${response.name}`);
                createAndAppend("li", uList, `Forks :${response.forks}, Watchers :${response.watchers_count}, Stars :${response.stargazers_count}`);
                fetchJSON(extraUrl + CONTRIBUTERS_URL, (error, response) => {
                    if (error) {
                        console.log(error);
                    } else {
                        const h2Header = createAndAppend("h2", uList, `The names of Contributers are:`);
                        h2Header.style = "font-style:italic";
                        for (let i = 0; i < response.length; i++) {
                            createAndAppend("li", uList, response[i].login);
                        }
                    }
                })
            }
        });
    }





    function createAndAppend(name, parent, innerHTML) {
        const child = document.createElement(name);
        parent.appendChild(child);
        if (innerHTML !== undefined) {
            child.innerHTML = innerHTML;
        }
        return child;
    }



    function fetchJSON(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.send();
        xhr.onload = () => callback(null, xhr.response);
        xhr.onerror = () => callback(new Error(xhr.statusText));
    }
}