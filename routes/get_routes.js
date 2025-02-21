const db = require('./db');

const handleQuery = (res, query, errorMessage) => {
    db.all(query, (err, rows) => {
        if (err) {
            console.error('Database error:', err.message); 
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: errorMessage || 'An error occurred while fetching data.' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: rows }));
            return; 
        }
    });
};

const get_projects = (req, res) => {
    const query = `SELECT * FROM Projects`;
    handleQuery(res, query, 'Failed to fetch projects.');
};

const get_features = (req, res) => {
    const query = `SELECT * FROM Features`;
    handleQuery(res, query, 'Failed to fetch features.');
};



const handleProjectInfoById = (req,id) => {
    const query = `SELECT * FROM Projects WHERE id = ?`;
    return new Promise((resolve , reject) => {
        db.get(query , [id] , (err,row) => {
            if(err) {
                console.error(`Error Fetching Project info : ${err}`);
                reject(err);
            }else {
                resolve(row);
            }
        })
    })    
}


const getTopProjects = (req, res) => {
    let query = `SELECT * FROM Projects WHERE is_top = 1`;
    db.all(query, [], (err, rows) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Database Error: ' + err.message }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(rows));
    });
};


const  getDevInfo = (req,res) => {
    let profileQuery = `SELECT * FROM Profile`;
    let experienceQuery = `SELECT * FROM Experience`;
    let skillsQuery = `select * from Skills`;

    try {
        db.all(profileQuery , [] , (err,rowProfile) =>{ 
            if(err) {
                res.writeHead(500 , {'Content-Type' : 'application/json'});
                res.end(JSON.stringify({error : 'Database Error' + err.message}));
                return;
            }
            db.all(experienceQuery , [] , (err, rowExperience)=> {
                if(err) {
                    res.writeHead(500, {'Content-Type' : 'application/json'});
                    res.end(JSON.stringify({error : 'Database Error' + err.message}));
                    return;
                }
                db.all(skillsQuery , [] , (err,rowSkills) => {
                    if(err) {
                        res.writeHead(500,  {'Content-Type' : 'application/json'});
                        res.end(JSON.stringify({error : 'Database Error ' + err.message}));
                        return;
                    }
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({profile : rowProfile, experience : rowExperience , skills : rowSkills }));
                })
            })
        })
    }catch(err){
        console.error("Error Gathering profile Info" ,err);
    }
}


const getUserInfo  = (req,res) => {
    let query = `SELECT * FROM user_info`;
    try {
        db.all(query, [] , (err , row) => {
            if(err) {
                res.writeHead(500 , {'Content-Type' : 'application/json'});
                res.end();
                return;
            }
            res.writeHead(200 , {'Content-Type' : 'application/json'});
            res.end(JSON.stringify({message : row}));
        })
    }catch(err) {
        console.error("Error Occur :" , err );
    }
}


const getTestiInfo = (req,res) => {
    db.all("SELECT * FROM testimonials", [], (err, rows) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Database error" }));
            return;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(rows));
    });
}


module.exports = {  get_projects,
                    get_features ,
                    handleProjectInfoById ,
                    getTopProjects ,
                    getDevInfo,
                    getUserInfo,
                    getUserInfo,
                    getTestiInfo
                };