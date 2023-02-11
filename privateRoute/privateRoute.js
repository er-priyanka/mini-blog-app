
export let loginData = null;

export default async function getLoginData(){
    let res = await fetch(`${url}/login`);
    let data = await res.json();

    if(data.length > 0){
        loginData = data[data.length-1];

        if(loginData == null){
            return  window.location.href = "signin.html";
        }
    }
}