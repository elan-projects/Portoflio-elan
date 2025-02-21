const jwt = require("jsonwebtoken");
const SECRET_KEY = "f3c7a9e4b7a14b3f9c0c7e2a5d83e2b08f7d0b2d7c3a1e5f4b6c9d2e0a3b5f1c"; 
const users = [
    { id: 1, username: "attarsalah", password: "20032003" },
    { id: 2, username: "mehdimoussaoui", password: "20042004" },
    { id: 2, username: "messaisalah", password: "20042004" }
];
function generateToken(user) {
    return jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: "20m" });
}
function authenticateUser(username, password) {
    return users.find(user => user.username === username && user.password === password) || null;
}
function handleLogin(req, res) {
    let body = "";
    req.on("data", chunk => {
        body += chunk;
    });
    req.on("end", () => {
        try {
            const { username, password } = JSON.parse(body);
            console.log({username , password})
            const user = authenticateUser(username, password);
            if (!user) {
                res.writeHead(401, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ error: "Invalid username or password" }));
            }
            const token = generateToken(user);
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "Login successful", token }));
        } catch (error) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Invalid JSON format" }));
        }
    });
}
function verifyToken(req, res, callback) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        res.writeHead(401, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "No token provided" }));
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            res.writeHead(401, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ error: "Invalid token" }));
        }
        req.user = decoded; 
        callback(); 
    });
}
module.exports = { handleLogin, verifyToken };
