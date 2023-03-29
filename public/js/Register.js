const RegisterFormHandler = async function(event) {
    event.preventDefault();
  
  const user = document.querySelector("#username-input-Register");
  const pww = document.querySelector("#password-input-Register");
    fetch("/api/user", {
      method: "post",
      body: JSON.stringify({
        username: user.value,
        password: pww.value
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(function() {
        document.location.replace("/dashboard");
      })
      .catch(err => console.log(err));
  };
  
  document
    .querySelector("#Register-form")
    .addEventListener("submit", RegisterFormHandler);