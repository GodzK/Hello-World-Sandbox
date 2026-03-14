const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // สำคัญมาก! ทำให้ Backend อ่าน JSON จาก Frontend ได้

// จำลอง Database
let todos = [
    { id: 1, text: "เรียน HTML", completed: true },
    { id: 2, text: "เรียน Fetch API", completed: false }
];
let currentId = 2;

// GET: ดึงข้อมูลทั้งหมด
app.get('/todos', (req, res) => res.json(todos));

// POST: สร้างใหม่
app.post('/todos', (req, res) => {
    if (!req.body.text) return res.status(400).json({ error: "ต้องมี text" });
    const newTodo = { id: ++currentId, text: req.body.text, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT: แทนที่ทั้งก้อน
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ error: "ไม่พบ Todo" });
    
    // PUT บังคับทับข้อมูลเดิมทั้งหมด
    todos[index] = { id, text: req.body.text, completed: req.body.completed || false };
    res.json(todos[index]);
});

// PATCH: แก้ไขบางส่วน
app.patch('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ error: "ไม่พบ Todo" });
    
    // PATCH อัปเดตเฉพาะฟิลด์ที่ส่งมา
    todos[index] = { ...todos[index], ...req.body };
    res.json(todos[index]);
});

// DELETE: ลบทิ้ง
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(t => t.id !== id);
    res.json({ message: "ลบสำเร็จ" });
});

app.listen(3000, () => console.log('🚀 Backend รันแล้วที่ http://localhost:3000'));