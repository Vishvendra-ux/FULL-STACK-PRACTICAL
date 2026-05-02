const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const PORT = 3000;
const logFile = path.join(__dirname, 'visitors.log');
const backupFile = path.join(__dirname, 'backup.log');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/updateUser') {
        const time = new Date().toISOString() + '\n';

        fs.appendFile(logFile, time, (err) => {
            if (err) {
                res.writeHead(500);
                res.end('Error saving data');
            } else {
                res.writeHead(200);
                res.end('Visit saved');
            }
        });
    }

    else if (req.method === 'GET' && req.url === '/saveLog') {
        fs.readFile(logFile, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error reading file');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(data);
            }
        });
    }
    else if (req.method === 'GET' && req.url === '/backup') {
        fs.copyFile(logFile, backupFile, (err) => {
            if (err) {
                res.writeHead(500);
                res.end('Backup failed');
            } else {
                res.writeHead(200);
                res.end('Backup created');
            }
        });
    }
    else if (req.method === 'GET' && req.url === '/clearLog') {
        fs.writeFile(logFile, '', (err) => {
            if (err) {
                res.writeHead(500);
                res.end('Error clearing file');
            } else {
                res.writeHead(200);
                res.end('Log cleared');
            }
        });
    }
    else if (req.method === 'GET' && req.url === '/serverInfo') {
        const info = {
            hostname: os.hostname(),
            platform: os.platform(),
            uptime: os.uptime(),
            totalMemory: os.totalmem(),
            freeMemory: os.freemem(),
            cpuCores: os.cpus().length
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(info, null, 2));
    }

    // Default route
    else {
        res.writeHead(404);
        res.end('Route not found');
    }
});
server.listen(PORT, () => {
    console.log('Server running at http://localhost:3000');
});