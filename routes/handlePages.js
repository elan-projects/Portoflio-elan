const path = require('path');
const fs = require('fs');
const {handleProjectInfoById} = require('./get_routes');
const upload = require('./upload');




const handlePages = (req, res) => {
    let filePath;
    let contentType;

    const extension = path.extname(req.url);
    switch (extension) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.html':
            contentType = 'text/html';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
        default:
            contentType = 'text/html'; 
    }
    


    if (req.url.startsWith('/project/')) {
        filePath = path.join(__dirname, '..', 'public', 'project_info.html');
    }else if(req.url.startsWith('/uploads/')){
        // console.log("test dsslaah");
        filePath = path.join(__dirname , '..' , req.url);
        // console.log("Uplaod FIle path : " , filePath);

    } else if(req.url.startsWith('/dasboardStyle')) {
        filePath = path.join(__dirname , '..' , 'admin','css', 'style.css');
    } else if(req.url.startsWith('/dasboardScript')) {
        filePath = path.join(__dirname , '..' , 'admin','js' , 'script.js');
    }else if(req.url.startsWith('/developer')){
        filePath = path.join(__dirname,  '..' , 'public' , 'about_us.html');

    }else {  
    switch (req.url) {
        case '/':
            filePath = path.join(__dirname, '..', 'public', 'main.html');
            break;
        case '/projects':
            filePath = path.join(__dirname, '..', 'public', 'projects.html');
            break;
        case '/project':
            filePath = path.join(__dirname , '..' , 'public' , 'project_info.html');
            break;
        case '/contact':
            filePath = path.join(__dirname, '..', 'public', 'contact.html');
            break;
        case '/dashboard':
            filePath = path.join(__dirname,  '..' , 'admin' , 'admin.html');
            break;
        default:
            filePath = path.join(__dirname, '..', 'public', req.url);

    }}


    if(req.url.startsWith('/project_info')) {
        let segments = req.url.split('/');
        let id = segments[segments.length - 1];
        handleProjectInfoById(req,id)
        .then((project) => {
            res.writeHead(200, {'Content-Type' : 'application/json'});
            res.end(JSON.stringify(project));
        })
        .catch((error)=>{
            res.writeHead(500 , {'Content-Type' : 'application/json'});
            res.end(JSON.stringify({error : 'Failed to Fetch Project Info'}));
        })
        return;
    }
    const isBinary = ['.jpg', '.jpeg', '.png', '.gif' , '.webp'].includes(path.extname(filePath));
    fs.readFile(filePath, isBinary ? null : 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                // console.error('Error reading file:', err);
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 Internal Server Error</h1>');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
            return;
        }
    });
};

module.exports = handlePages;