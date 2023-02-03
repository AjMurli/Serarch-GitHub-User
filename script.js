const APIURL = "https://api.github.com/users/";
const main = document.querySelector("#main");
const userSearch = document.querySelector("#search");
const errorMessage = document.querySelector("#error-message");

// fetching data using apiurl

const getUser = async (username) => {
    const response = await fetch(APIURL + username);
    const data = await response.json();
    // console.log(data)

    const card = `
    <div class="card">
        <img src="${data.avatar_url}" alt="" class="avatar">
    <div class="user-info">
        <h2>${data.name}</h2>
        <p>${data.bio}</p>
        <ul class="infor">
            <li>${data.followers}<strong>Followers</strong></li>
            <li>${data.following}<strong>Following</strong></li>
            <li>${data.public_repos}<strong>Repos</strong></li>
        </ul>
        <div id="repos">
        
        </div>
    </div>
</div>`;

    main.innerHTML = card;
    getRepos(username)
}
// fetching repositories
const getRepos = async (username) => {
    //line22
    const repos = document.querySelector("#repos");
    const response = fetch(APIURL + username + "/repos");
    const data = await (await response).json();

    data.forEach(
        (item) => {
            // console.log(item);
            const ele = document.createElement("a");
            ele.classList.add("repo");
            ele.href = item.html_url;
            ele.innerText = item.name;
            ele.target = "_blank";
            repos.appendChild(ele);
        }
    )
}

const formSubmit = () => {
    if (userSearch.value != "") {
        getUser(userSearch.value);
        userSearch.value = "";
    }
    else {
        errorMessage.style.display="block";
        errorMessage.innerHTML = "Please Type Name or Repo";
    }
    return false;// not refresh
}
// after unfocus on search bar
userSearch.addEventListener("focusout", function () {
    formSubmit();
})

// getUser("bhagirath-wscubetech")
// getUser("taylorotwell")
/*   <a href="" class="repo" target="_blank">Repo 1</a>
<a href="" class="repo" target="_blank">Repo 2</a>
<a href="" class="repo" target="_blank">Repo 3</a> */