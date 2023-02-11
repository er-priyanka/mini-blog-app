let loginData = null;
let url = "https://json-mock-server-ii.onrender.com";

let page = Number(document.getElementById('page').innerText - 1) || 0;
let prev = document.getElementById('prev');
let next = document.getElementById('next');

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
        else{
            console.log(loginData);
            getBlogs();
        }
       

       
    }
}

getLoginData();



async function getBlogs(){
    try{
        let res = await fetch(`${url}/blogs?_page=${page}&_limit=${4}`);
        let data = await res.json();

        console.log(data);
        appendBlogs(data);
    } catch (e){
        console.log(e);
    }
    
}


function appendBlogs(data){
    let blogContainer = document.getElementById('blogContainer');
    blogContainer.innerHTML = null;

    data.map((item, i) =>{
        let blog = document.createElement('div');

        let box1 = document.createElement('div');
        box1.setAttribute('class', "userBox");

        let user = document.createElement('div');

        let avatar = document.createElement('img');
        avatar.setAttribute('src', loginData.avatar);

        let box2 = document.createElement('div');

        let username = document.createElement('p');
        username.innerText = loginData.username;

        let category= document.createElement('p');
        category.innerText = item.category;

        let date = document.createElement('p');
        date.innerText = item.date;

        box2.append(username, category, date);

        user.append(avatar, box2);

        let div = document.createElement('div');

        let editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        editBtn.setAttribute('class', 'edit');

        let deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.setAttribute('class', 'delete');
        deleteBtn.addEventListener('click', ()=>{
            deletePost(item.id);
        })

        div.append(editBtn, deleteBtn);

        box1.append(user, div);

        let box3 = document.createElement('div');
        box3.setAttribute('class', 'content');

        let title = document.createElement('h1');
        title.innerText = item.title;

        let content = document.createElement('p');
        content.innerText = item.content;

        box3.append(title, content);


        let box4 = document.createElement('div');
        box4.setAttribute('class', 'likeNComment')

        let box41 = document.createElement('div');

        let likes = document.createElement('p');
        likes.innerText = 'Likes:';
        let span1 = document.createElement('span');
        span1.innerText = (item.likes)?item.likes:0;
        likes.append(span1);

        let comments = document.createElement('p');
        comments.innerText = 'Comments:';
        let span2 = document.createElement('span');
        span2.innerText = (item.comments)?item.comments.length:0;
        comments.append(span2);


        box41.append(likes, comments);

        let box42 = document.createElement('div');

        let button = document.createElement('button');
        button.innerText = 'Add Comment';
        box42.append(button);

        box4.append(box41, box42);

        let box5 = document.createElement('div');
        box5.setAttribute('class', 'commentBox');

        if(item.comments&&item.comments.length>0){
            appendComments(item.comments);
        }

        blog.append(box1, box3, box4, box5);
        blogContainer.append(blog);
    });
}



function appendComments(data){
    let commentBox = document.getElementsByClassName('commentBox');
    commentBox.innerHTML = null;

    data.map((el, i) =>{
        let div = document.createElement('div');

        let div1 = document.createElement('div');
        let img = document.createElement('img');
        img.setAttribute('src', el.avatar);

        let user = document.createElement('p');
        user.innerText = el.uername;

        let content = document.createElement('p');
        content.innerText = el.content;

        div1.append(img, user);
        div.append(div1, content);

        commentBox.append(div);
    });
}



// delete blog

async function deletePost(id){
    try{
        let res = await fetch(`${url}/blogs/${id}`,{
            method:"DELETE",
            headers:{
                'Content-Type':'application/json'
            }
        });

        let data = await res.json();
        
        getBlogs();
        alert('Deleted successful');
    } catch(e){
        alert(e.message);
    }

}


// edit data 
async function EditPost(id){

    try{
        let res = await fetch(`${url}/blogs/${id}`,{
            method:"PATCH",
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json'
            }
        });

        let data = await res.json();
        

        alert('Deleted successful');
    } catch(e){
        alert(e.message);
    }

}



// filter functionality

// Search by title 

let searchButton = document.getElementById('searchBtn');
searchButton.addEventListener('click', searchByTitle);

async function searchByTitle(){
    let searchInput = document.getElementById('searchInput');
    if(searchInput.value !== ""){
        try{
            let res = await fetch(`${url}/blogs?title=${searchInput.value}&_page=${page}&_limit=${4}`);
            let data = await res.json();
            appendBlogs(data)

        } catch(e){
            console.log(e);
        }
    }
    else{
        getBlogs();
    }
    
}


// filter by category 

let category = document.getElementById('category');
category.addEventListener('change', async() =>{
   
    if(category.value !== ""){
        try{
            let res = await fetch(`${url}/blogs?category=${category.value}&_page=${page}&_limit=${4}`);
            let data = await res.json();
            appendBlogs(data)

        } catch(e){
            console.log(e);
        }
    }
    else{
        getBlogs();
    }
});


let sortDate = document.getElementById('sortDate');

sortDate.addEventListener('change', async() =>{
    if(sortDate.value !== ""){
        try{
            let res = await fetch(`${url}/blogs?_sort=date&_order=${category.value}&_page=${page}&_limit=${4}`);
            let data = await res.json();
            appendBlogs(data)

        } catch(e){
            console.log(e);
        }
    }
    else{
        getBlogs();
    }
});


// Pagination 

// Pagination Previous button 
prev.addEventListener('click', () =>{
    if(page <= 0){
        return;
    }else{
        page = page - 1;
        document.getElementById('page').innerText = page+1;

        getBlogs();
    }
});

// Pagination next button 

next.addEventListener('click', () =>{
  
        page = page + 1;
        document.getElementById('page').innerText = page+1;
        getBlogs();
    
});

