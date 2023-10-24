function maskPassword(pass) {
    let str = "";
    for(let i= 0; i<pass.length ; i++)
    {
        str += "*";
    }
    return str;
}
// Logic for copy button
function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
            alert("text copied to clipboard"+ txt);
            // document.querySelector(".alert").classList.remove("alert");
        },
        () => {
            alert("Copy failed !");
        },
    ); 
}
// Logic to fill the Table
const deletePassword = (website) => {
    console.log("delete working");
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    arrUpdated = arr.filter((e) => {
        return e.website != website
    });
    localStorage.setItem("passwords",JSON.stringify(arrUpdated));
    alert(`${website}'s password successfully deleted !`);
    showPasswords();
}
const showPasswords = () => {
let tb= document.querySelector("table");
let data = localStorage.getItem("passwords");
if(data == null || JSON.parse(data).length == 0)
{
   tb.innerHTML="No Data To Show";
}
else 
{   
    tb.innerHTML = ` <tr>
    <th>Websites</th>
    <th>Username</th>
    <th>password</th>
    <th>Delete</th>

</tr>`
    let arr = JSON.parse(data);
    let str = "";
    for(let index=0; index < arr.length; index++)
    {
        const element = arr[index]; 
str += `<tr>
<td>${element.website}   <img onclick="copyText('${element.website}'')" src="./copy.svg" alt="Copy" width="10" height="10">
</td>
<td>${element.username}   <img onclick="copyText('${element.username}')" src="./copy.svg" alt="Copy" width="10" height="10">
</td>
<td>${maskPassword(element.password)}   <img onclick="copyText('${element.password}')" src="./copy.svg" alt="Copy" width="10" height="10">
</td>
<td><button class="btn2" onclick="deletePassword('${element.website}')">Delete</button></td>
</tr>`
}
tb.innerHTML = tb.innerHTML+ str;
}
website.value = "";
username.value = "";
password.value = "";
}
//Logic to fill the table ends here.

//Logic to retrieve the data for local storage
console.log("working...");
showPasswords();
document.querySelector(".btn").addEventListener("click",(e) => {
    e.preventDefault();
    console.log("clicked");
    console.log(username.value,password.value);
    let passwords = localStorage.getItem("passwords");
    console.log(passwords);
    if(passwords==null)
    {
        let json = [];
        json.push({website:website.value,username: username.value,password: password.value});
        alert("Password Saved!");
        localStorage.setItem("passwords",JSON.stringify(json));
    }
    else 
    {
        let json = JSON.parse(localStorage.getItem("passwords"))
        json.push({website:website.value ,username: username.value, password: password.value});
        alert("Password Saved!");
        localStorage.setItem("passwords", JSON.stringify(json));
    }
    showPasswords();
    document.querySelector("#website").value = "";
    document.querySelector("#username").value = "";
    document.querySelector("#password").value = "";
});
// Clear local storage when the page loads
//window.addEventListener("load", function() {
  //  localStorage.clear();
    //// Optionally, you can notify the user or perform other actions after clearing.
//});

