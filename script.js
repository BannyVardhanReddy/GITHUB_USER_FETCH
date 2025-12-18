async function fetchUser(user_name) {
    const response = await fetch(`https://api.github.com/users/${user_name}`);
    if(!response.ok){
        throw new Error("Error fetching User");
    }

    const data = await response.json();

    return data;
}

async function fetchRepo(user_name) {
    const response = await fetch(`https://api.github.com/users/${user_name}/repos`);
    if(!response.ok){
        throw new Error("Error fetching repos");
    }

    const repo_data = await response.json();

    return repo_data;
}
const img = document.createElement('img');
async function getDetails(){
    let user_name = document.getElementById("name").value.trim();
    if(!user_name){
        return;
    }
    img.src = "";
    let loading_msg = document.getElementById("loading-msg");
    let input_msg = document.getElementById("output-msg");
    loading_msg.innerHTML = "Loading.....";
    try{
        const [data, repos] = await Promise.all([fetchUser(user_name),fetchRepo(user_name)]);
        console.log(repos);
        loading_msg.innerHTML = "";
        input_msg.innerHTML = data.name;
        console.log(data.name);
        img.src = data.avatar_url;
        document.getElementById("output").appendChild(img);
        if(repos.length === 0){
            document.getElementById('repo').innerHTML = "Zero Repos";
        }
        else{
            document.getElementById('repo').innerHTML = "<h1>Repositories</h1>";
            repos.forEach(repo => {
                const repo_data = document.createElement('p');
                repo_data.innerHTML = repo.name;
                document.getElementById('repo').appendChild(repo_data)
            });
        }
        user_name = "";
    }catch (error){
        console.log(error);
    }
}

document.getElementById("submit").addEventListener("click",getDetails);