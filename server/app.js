const http = require('http');
const handlePages = require('../routes/handlePages');
const {getTestiInfo,getUserInfo ,get_projects, get_features , getTopProjects , getDevInfo} = require('../routes/get_routes');
const {handleStoreTestimonial,handleStoreProject ,handleStoreDeveloper, handleStoreFeature ,handleStoreExperience ,handleStoreSkill, handleMarkProjectAsTop , unmarkTopProject , handleStoreUser} = require('../routes/post_routes');
const {handleDeleteTesti,handleDeleteProjects ,handleDeleteFeature  , handleDeleteDev} = require('../routes/delete_routes');
const {emailSender , sendConfirmationMail} = require('../routes/sendMail');
const { handleLogin, verifyToken } = require('../routes/auth_route');
const cors = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

const server = http.createServer((req, res) => {
    cors(req, res);

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    if (req.method === 'GET' && req.url === '/api/get_projects') {
        get_projects(req, res);
    } else if (req.method === 'GET' && req.url === '/api/get_features') {
        get_features(req, res);
    }else if (req.method === 'GET' && req.url === '/api/get_top_projects') {
        getTopProjects(req, res);
    }else if (req.method === 'GET' && req.url === '/api/get_dev_info') {
        getDevInfo(req,res);
    }else if (req.method === 'GET' && req.url === '/api/get_user_info') {
        getUserInfo(req,res);
    }else if (req.method === 'GET' && req.url === '/api/get_testimonials') {
        getTestiInfo(req,res);
    }else if (req.method === 'GET' && req.url === '/verify' ) {
        verifyToken(req, res);
    }else if(req.method === 'POST' && req.url === '/api/add_project') {
        handleStoreProject(req, res); 
    }else if(req.method === 'POST' && req.url === '/api/add_feature') {
        handleStoreFeature(req,res);
    }else if (req.method === 'POST' && req.url ==='/api/send_testimonial') {
        handleStoreTestimonial(req,res);
    }else if (req.method === 'DELETE' && req.url === '/api/delete_project') {
        handleDeleteProjects(req,res);
    }else if (req.method === 'DELETE' && req.url ==='/api/delete_feature'){
        handleDeleteFeature(req,res);
    }else if (req.method === 'DELETE' && req.url === '/api/delete_dev'){
        handleDeleteDev(req,res);
    }else if (req.method === 'DELETE' && req.url.startsWith('/api/delete_testimonial/')) {
        verifyToken(req, res, () => {
            handleDeleteTesti(req,res);
        });
    }else if (req.method === 'POST' && req.url === '/api/mark_project_top') {
        handleMarkProjectAsTop(req, res);
    }else if (req.method ==='POST' && req.url === '/api/unmark_project_top') {
        unmarkTopProject(req,res);
    }else if(req.method === 'POST' && req.url === '/api/send_mail') {
        emailSender(req,res);
    }else if(req.method === 'POST' && req.url === '/api/send_confirmation_mail') {
        sendConfirmationMail(req,res);
    }else if (req.method === 'POST' && req.url === '/api/add_profile') {
        handleStoreDeveloper(req,res);
    }else if(req.method === 'POST'  && req.url === '/api/add_experience'){
        handleStoreExperience(req,res);
    }else if (req.method === 'POST' && req.url === '/api/add_skill') {
        handleStoreSkill(req,res);
    }else if (req.method === 'POST' && req.url === '/send_user_info') {
        handleStoreUser(req,res);
    }else if (req.url === '/api/login' && req.method === "POST") {
        handleLogin(req, res);
    }else {
        handlePages(req, res);
    }
});

const PORT =process.env.PORT  || 3000;
server.listen(PORT, '0.0.0.0' ,() => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


