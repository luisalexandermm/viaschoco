const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const DATA_FILE = path.join(__dirname, 'data.json');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});
app.use(express.static(path.join(__dirname)));

function readData(){
  try{ return JSON.parse(fs.readFileSync(DATA_FILE,'utf8')); }catch(e){ return { reports: [], users: [] }; }
}
function writeData(data){ fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8'); }

// GET reports
app.get('/api/reports', (req,res) => {
  const data = readData();
  res.json(data.reports || []);
});

// POST report
app.post('/api/reports', (req,res) => {
  const data = readData();
  const reports = data.reports || [];
  const newReport = { id: (reports.reduce((m,r)=>Math.max(m,r.id||0),0))+1, ...req.body };
  reports.unshift(newReport);
  data.reports = reports;
  writeData(data);
  res.status(201).json(newReport);
});

// PUT report (update)
app.put('/api/reports/:id', (req,res) => {
  const id = parseInt(req.params.id);
  const data = readData();
  data.reports = (data.reports||[]).map(r => r.id===id?{...r,...req.body}:r);
  writeData(data);
  res.json({ok:true});
});

// DELETE report
app.delete('/api/reports/:id', (req,res) => {
  const id = parseInt(req.params.id);
  const data = readData();
  data.reports = (data.reports||[]).filter(r => r.id!==id);
  writeData(data);
  res.json({ok:true});
});

// GET users
app.get('/api/users', (req,res) => {
  const data = readData();
  res.json(data.users || []);
});

// PUT user
app.put('/api/users/:name', (req,res) => {
  const name = req.params.name;
  const data = readData();
  data.users = (data.users||[]).map(u => u.name===name?{...u,...req.body}:u);
  writeData(data);
  res.json({ok:true});
});

// Simple health
app.get('/api/health', (req,res)=> res.json({ok:true}));

app.listen(PORT, ()=> console.log('API listening on', PORT));
