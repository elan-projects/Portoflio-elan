const db = require('./db');
const path = require('path');
const { handleLogin, verifyToken } = require('./auth_route');
const handleDeleteProjects = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        try {
            let formData = JSON.parse(body);
            let projectId = formData.id;
            if (!projectId) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Missing project ID' }));
                return;
            }
            let deleteFeaturesQuery = `DELETE FROM Features WHERE project_id = ?`;
            db.run(deleteFeaturesQuery, [projectId], function (err) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Database Error (Features): ' + err.message }));
                    return;
                }
                let deleteProjectQuery = `DELETE FROM Projects WHERE id = ?`;
                db.run(deleteProjectQuery, [projectId], function (err) {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Database Error (Project): ' + err.message }));
                        return;
                    }
                    if (this.changes === 0) { 
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Project not found' }));
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Project and associated features deleted successfully' }));
                });
            });
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON format' }));
        }
    });
};
const handleDeleteFeature = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        try {
            let formData = JSON.parse(body);
            let featureID = formData.featureID; 
            if (!featureID) { 
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Missing feature ID' }));
                return;
            }
            let deleteFeatureQuery = `DELETE FROM Features WHERE id = ?`;
            db.run(deleteFeatureQuery, [featureID], function (err) {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Database Error: ' + err.message }));
                    return;
                }
                if (this.changes === 0) { 
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Feature not found' }));
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Feature Deleted Successfully' }));
            });
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON format' }));
        }
    });
};
const handleDeleteDev = (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        try {
            const data = JSON.parse(body);
            const { type, id } = data;
            if (!type || !id) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Type and id are required' }));
            }
            let tableName;
            if (type === 'experience') {
                tableName = 'Experience';
            } else if (type === 'skills') {
                tableName = 'Skills';
            }else if(type ==='profile'){
                tableName = 'Profile';
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Invalid type' }));
            }
            const query = `DELETE FROM ${tableName} WHERE id = ?`;
            db.run(query, [id], function (err) {
                if (err) {
                    console.error('Error deleting item:', err);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Failed to delete item' }));
                }
                if (this.changes === 0) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ error: 'Item not found' }));
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: `${type} item deleted successfully` }));
            });
        } catch (err) {
            console.error('Error parsing request body:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
        }
    });
};
const url = require('url');
function handleDeleteTesti(req, res) {
        const id = req.url.split("/").pop();
        const sql = "DELETE FROM testimonials WHERE id = ?";
        db.run(sql, [id], function (err) {
            if (err) {
                res.writeHead(500, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ error: "Database error", details: err }));
            }
            if (this.changes === 0) { 
                res.writeHead(404, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ error: "Testimonial not found" }));
            }
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "Testimonial deleted successfully" }));
        });
}
module.exports = {handleDeleteProjects ,handleDeleteFeature , handleDeleteDev , handleDeleteTesti} ;