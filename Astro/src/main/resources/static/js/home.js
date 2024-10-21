document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem('authToken'); // Obtém o token do localStorage
    console.log(token);

    if (token) {
        fetch(`/api/users?token=${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
                console.log(data[0].username);
                document.getElementById("userNameAcess").innerHTML = data[0].username;
        })
        .catch(error => console.error("Error fetching user data:", error));
    } else {
        console.error("Token not found in localStorage");
    }
});