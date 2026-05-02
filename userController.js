const users = require('../data/users');
const logs = require('../data/logs');
const os = require('os');



exports.getUsers = (req,res) => {
    addLog(req);
    res.json(users);
}

exports.addUser = (req, res) => {
    addLog(req);
    const user = req.body;
    users.push(user);
    res.send("User added");
};

const addLog = (req,res) => {
    const message = `${req.method}| ${req.url}| ${Date()}`
    logs.push(message)
};

exports.getLogs = (req,res) => {
    addLog(req);
    res.json(logs);
}

exports.clearLogs = (req,res) => {
    addLog(req);
    logs.length = 0;
    res.send("Log cleared");
}


exports.serverInfo = (req,res) => {
    addLog(req);
    res.json({
        totalusers: users.length,
        memoryUsage: os.memoryUsage(),
        platform: os.platform()
    })
}