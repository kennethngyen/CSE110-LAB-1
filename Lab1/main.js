window.onload = ()=> {
    document.getElementById("subscribe-form").addEventListener("submit", e=>{
        const emailValue = document.getElementById("form-email-input").value;
        alert(emailValue); 
    });
    }
    