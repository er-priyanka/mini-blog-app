let loginData = {};
let url = "https://json-mock-server-ii.onrender.com";
let username = document.getElementById('username');

// let url = "https://wild-pink-clam-ring.cyclic.app";

async function getLoginData(){
    let res = await fetch(`${url}/login`);
    let data = await res.json();
    console.log(data);

    if(data.length > 0){
        loginData = data[data.length-1];

        if(loginData == null){
            return  window.location.href = "signin.html";
        } 
        console.log(loginData);

        username.innerText = loginData.username;
       
    }
}

getLoginData();



async function addBlog(event){
    event.preventDefault();

    let form = document.getElementById('form');

    
    let obj = {
        username:username.innerText,
        title:form.title.value,
        content:form.content.value,
        category:form.category.value,
        date:form.date.value,
        likes:0,
        comments:[]
    } 

    try {
        let res = await fetch(`${url}/blogs`, {
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json'
            }
        });

        let data = await res.json();
        console.log(data);

    } catch (e){
        console.log(e);
    }
}
