const path = require('path');
const upload = require('./upload'); 
const db = require('./db');
const fs = require("fs");
const multer = require("multer");

const handleStoreProject = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to upload file' }));
            return;
        }
        if (!req.file) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'No File Uploaded' }));
            return;
        }
        const { name, description, live_preview } = req.body;
        const imagePath = `/uploads/${req.file.filename}`;
        if (!name || !description) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing required fields' }));
            return;
        }
        const sql = `INSERT INTO Projects (name, description, live_preview, image) VALUES (?, ?, ?, ?)`;
        db.run(sql, [name, description, live_preview, imagePath], function (err) {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Database error: ' + err.message }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Project added successfully!', id: this.lastID }));
        });
    });
};




const handleStoreFeature = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        try {
            let formData = JSON.parse(body);
            console.log("Form Data: ", formData);
            if (!formData.projectId || !formData.featureName) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Missing required fields' }));
                return;
            }
            let query = `INSERT INTO Features (project_id, feature) VALUES (?, ?)`;
            db.run(query, [formData.projectId, formData.featureName], function (err) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Database Error: ' + err.message }));
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Feature Added Successfully', id: this.lastID }));
            });
        } catch (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON format' }));
        }
    });
};




const handleMarkProjectAsTop = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        try {
            let formData = JSON.parse(body);
            let projectID = formData.projectID;
            if (!projectID) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Missing project ID' }));
                return;
            }
            let query = `UPDATE Projects SET is_top = 1 WHERE id = ?`;
            db.run(query, [projectID], function (err) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Database Error: ' + err.message }));
                    return;
                }
                if (this.changes === 0) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Project not found' }));
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Project marked as top' }));
            });
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON format' }));
        }
    });
};




const unmarkTopProject = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        try {
            let formData = JSON.parse(body);
            let query = `UPDATE Projects SET is_top = 0 WHERE id = ?`;
            db.run(query, [formData.projectID], function (err) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Database Error: ' + err.message }));
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "Project unmarked as Top!" }));
            });
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON format' }));
        }
    });
};



const handleStoreDeveloper = (req,res) => {
    upload(req, res, (err) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to upload file' }));
            return;
        }
        if (!req.file) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'No File Uploaded' }));
            return;
        }
        const { name, job_title, description } = req.body;
        const imagePath = `/uploads/${req.file.filename}`;
        if (!name || !job_title || !description) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing required fields' }));
            return;
        }
        const sql = `INSERT INTO Profile (name, job_title, description, image) VALUES (?, ?, ?, ?)`;
        db.run(sql, [name, job_title, description, imagePath], function (err) {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Database error: ' + err.message }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Project added successfully!', id: this.lastID }));
        });
    });
}



const handleStoreExperience = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        const formData = JSON.parse(body);
        console.log("test:", formData); 
        let { profile_id, type, value } = formData;
        if (!profile_id || !type || !value) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ error: 'All Data Must be Filled' }));
            return;
        }
        let query = `INSERT INTO Experience (profile_id, experience_type, experience_value) VALUES (?, ?, ?)`;
        db.run(query, [profile_id, type, value], (err) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ error: 'Error While Inserting Experience in Database' }));
                return;
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: 'Experience Added Successfully' }));
        });
    });
};



const handleStoreSkill = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        try {
            let formData = JSON.parse(body);
            console.log("Received Data:", formData);
            const {id , skillName, skillIcon } = formData;
            console.log("formData" , formData);
            if (!skillName || !skillIcon || !id) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'All Data Must be Filled' }));
                return;
            }
            let query = `INSERT INTO Skills (profile_id, skill_name , skill_icon) VALUES (?, ?, ?)`;
            db.run(query, [id, skillName , skillIcon], (err) => {
                if (err) {
                    console.error('Database Error:', err);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Error While Inserting Skill in Database' }));
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Skill Added Successfully' }));
            });
        } catch (error) {
            console.error("Error parsing JSON:", error);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON Format' }));
        }
    });
};


const handleStoreUser = (req, res) => {
    let body = '';

req.on('data', (chunk) => {
    body += chunk;
});

req.on('end', () => {
    try {
    
    let formData = JSON.parse(body);
    console.log("Received Data:", formData);

    const { device, net } = formData;
    const { ip, city, region, country_name, org } = net;

    
    if (!ip || !city || !region || !country_name || !org || !device) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'All required data must be provided' }));
        return;
    }

    let query = `INSERT INTO user_info (
        ip_address, city, region, country, isp, browser, platform, screen_resolution, color_depth
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const browser = device;  
    const platform = 'unknown';  
    const screen_resolution = 'unknown';  
    const color_depth = 'unknown';  

    db.run(query, [
        ip, city, region, country_name, org, browser, platform, screen_resolution, color_depth
    ], (err) => {
        if (err) {
        console.error('Database Error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error while inserting user info into the database' }));
        return;
        }

        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User info added successfully' }));
    });
    } catch (error) {
    console.error("Error parsing JSON:", error);
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Invalid JSON format' }));
    }
});
};


const handleStoreTestimonial = (req,res) => {
   
    
    // Custom storage for testimonial images
    const testiStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadDir = path.join(__dirname, "..", "uploads", "testi_img");
    
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true }); // Ensure directory exists
            }
    
            cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname.replace(/ /g, "_"));
        },
    });
    
    const uploadTestiImage = multer({ storage: testiStorage }).single("image");
    
        uploadTestiImage(req, res, (err) => {
            if (err) {
                return res.status(500).json({ message: "Image upload failed!", error: err.message });
            }
    
            const { name, job, message } = req.body;
            const imagePath = req.file ? `/uploads/testi_img/${req.file.filename}` : null;
    
            if (!name || !job || !message) {
                return res.status(400).json({ message: "All fields are required!" });
            }
    
            db.run(`INSERT INTO testimonials (name, job, message, image) VALUES (?, ?, ?, ?)`,[name, job, message, imagePath],(err) => {
                    if (err) {
                        return res.status(500).json({ message: "Database error", error: err.message });
                    }
                    res.end(JSON.stringify({ message: "Testimonial stored successfully!"}));
                }
            );
        });
    
  

}




module.exports ={ handleStoreProject ,
                handleStoreFeature,
                handleMarkProjectAsTop ,
                unmarkTopProject ,
                handleStoreExperience,
                handleStoreDeveloper,
                handleStoreSkill,
                handleStoreUser,
                handleStoreTestimonial

            };
