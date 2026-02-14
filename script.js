const search = document.getElementById("search");
search.addEventListener("click", getDetails);

async function getDetails() {
    document.querySelector(".output").style.visibility = "hidden";
    document.getElementById("repos").innerHTML = "";
    let username = document.getElementById("username");
    console.log(username);
    if (!username.value.trim()) {
        return;
    }

    //Add a loading msg 
    const loading_msg = document.getElementById("loading");
    loading_msg.innerHTML = "Loading.....";


    // try {
    //     const [user_details, user_repos] = await Promise.all([fetchUserDetails(username.value.trim()), fetchUserRepos(username.value.trim())]);

    //     //Remove loading message and username from input field
    //     loading_msg.innerHTML = "";
    //     username.value = "";  

    //     const user_name = document.getElementById("user-name");
    //     const user_avatar = document.getElementById("user-avatar")

    //     user_name.innerHTML = user_details.name;
    //     user_avatar.src = `${user_details.avatar_url}`;
    //     console.log(user_repos);
    //     // console.log(user_details.avatar_url);

    // } catch(message) {
    //     loading_msg.innerHTML = message;
    // }

    try{
        const [user_details, user_repos] = await Promise.all([fetchUserDetails(username.value.trim()), fetchUserRepos(username.value.trim())]);

        document.querySelector(".output").style.visibility = "visible";
        loading_msg.innerHTML = "";
        // username.value = "";
        console.log(user_details);
        const name = document.getElementById("name");
        name.innerHTML = `
            <p><strong>Name: </strong>${user_details.name}</p>
            <p><strong>Bio: </strong>${user_details.bio}</p>
            <p><strong>GitHub URL: </strong>${user_details.html_url}</p>
            <p><strong>Location: </strong>${user_details.location}</p>
        `;
        
        const avatar = document.getElementById("avatar");
        // avatar.src = `${user_details.avatar_url}`;
        avatar.style.backgroundImage = `url("${user_details.avatar_url}")`;
        // console.log(user_repos);
        const repos = document.getElementById("repos");
        user_repos.forEach(repo => {
            // console.log(repo);

            const div = document.createElement("div");
            div.classList.add("repo")
            div.innerHTML  = `${repo.name}`
            repos.appendChild(div);
        });
    }catch(err){
        loading_msg.innerHTML = err.message;
    }
}

async function fetchUserDetails(username) {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
        throw new Error("Error fetching user details");
    }

    const data = await response.json();

    return data;
}

async function fetchUserRepos(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);

    if(!response.ok){
        throw new Error("Error fetching user repos");
    }

    const data = await response.json();
    console.log(data);
    return data;
}