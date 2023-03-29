const updateFormHandler = async function(event) {
    event.preventDefault();

    
    const heading = document.getElementById('post-heading');
    const text = document.getElementById('post-text');
    const pId = document.getElementById('post-id')

    fetch("/api/post/" + pId.value, {
        method: "put", 
        body: JSON.stringify({
            title: heading.value,
            body: text.value
        }),
        headers: { "Content-Type": "application/json"}
    })
        .then(function() {
            document.location.replace("/dashboard");
        })
        .catch(err => console.log(err))
}

document.querySelector("#update-post-form").addEventListener("submit", updateFormHandler);

