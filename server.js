const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ฐานข้อมูลจำลอง (ใช้ Array)
let posts = [
  { id: 1, title: "Hello World", content: "บทความแรกของฉัน" }
];

// เก็บ id ล่าสุด สำหรับ auto-increment
let currentId = posts.length ? posts[posts.length - 1].id : 0;

// 1. GET: ดึงข้อมูลทั้งหมด
app.get('/posts', (req, res) => {
  res.json(posts);
});

// 2. POST: สร้างข้อมูลใหม่
app.post('/posts', (req, res) => {
  const newPost = { id: ++currentId, ...req.body }; // id ++
  posts.push(newPost);
  res.status(201).json({ message: "สร้างสำเร็จ!", data: newPost });
});

// 3. PUT: อัปเดตข้อมูลแบบแทนที่ทั้งก้อน
app.put('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);
  if (index !== -1) {
    posts[index] = { id, ...req.body }; // แทนที่ทั้งหมด
    res.json({ message: "อัปเดตแบบ PUT สำเร็จ!", data: posts[index] });
  } else {
    res.status(404).json({ error: "ไม่พบบทความ" });
  }
});

// 4. PATCH: อัปเดตข้อมูลบางส่วน
app.patch('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);
  if (index !== -1) {
    posts[index] = { ...posts[index], ...req.body }; // แค่ update field ที่ส่งมา
    res.json({ message: "อัปเดตแบบ PATCH สำเร็จ!", data: posts[index] });
  } else {
    res.status(404).json({ error: "ไม่พบบทความ" });
  }
});

// 5. DELETE: ลบข้อมูล
app.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(p => p.id === id);
  if (index !== -1) {
    posts.splice(index, 1);
    res.json({ message: "ลบข้อมูลสำเร็จ!" });
  } else {
    res.status(404).json({ error: "ไม่พบบทความ" });
  }
});

app.listen(3000, () => console.log('🚀 Backend รันแล้วที่ http://localhost:3000'));