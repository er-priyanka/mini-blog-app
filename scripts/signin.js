let url = "https://json-mock-server-ii.onrender.com";

// let url = "https://wild-pink-clam-ring.cyclic.app";


async function submitForm(event){
    event.preventDefault();

    let form = document.getElementById('form');

    
    let email = form.email.value;
    let password = form.password.value;
   

    try{
        let res = await fetch(`${url}/users?email=${email}&password=${password}`);
    
        let data = await res.json();
        
        console.log("Signup data:", data);

        if(data.length > 0){

            let res1 = await fetch(`${url}/login`, {
                method: 'POST',
                body: JSON.stringify(data[0]),
                headers:{
                    'Content-Type':'application/json'
                }
            });
    
            let data1 = await res1.json();
            console.log("Login Data :", data1);

            alert("login successful");
            window.location.href = "blogs.html";
        
        }
        else {
            alert("login failed");
        }

       

       
       
    }catch(e){
        console.log(e);
        alert("signup failed");
    }

     
   
}