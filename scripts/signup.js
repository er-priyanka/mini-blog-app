let url = "https://json-mock-server-ii.onrender.com";

// let url = "https://wild-pink-clam-ring.cyclic.app";


async function submitForm(event){
    event.preventDefault();

    let form = document.getElementById('form');

    let obj = {
        username:form.username.value,
        avatar:form.avatar.value,
        email:form.email.value,
        password:form.password.value
    }

    try{
        let res = await fetch(`${url}/users`, {
            method:'POST',
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json'
            }
        });
    
        let data = await res.json();
        
        console.log(data);
        alert("signup successful");
        window.location.href = "signin.html"
       
    }catch(e){
        console.log(e);
    }

     
   
}