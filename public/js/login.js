console.log("login");
document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); 
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
            showNotification("Login successful!", "success");
            localStorage.setItem("token", data.token); 
            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 1500);
        } else {
            showNotification(data.error, "error");
        }
    } catch (error) {
        showNotification("Network error", "error");
    }
});
function showNotification(message, type) {
    let notification = document.createElement("div");
    notification.className = `toast-notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}