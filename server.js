const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ฐานข้อมูลจำลอง
let posts = [
    { id: 1, title: "Hello World", content: "บทความแรกของฉัน" },
    { id: 2, title: "เรียน Fetch API", content: "สนุกมากๆ เลยครับ" }
];

// ตัวแปรเก็บเลข ID ล่าสุด
let lastId = posts.length; // 2 ในที่นี้

// 1. GET
app.get('/posts', (req, res) => res.json(posts));

// 2. POST (auto-increment ID)
app.post('/posts', (req, res) => {
    lastId++; // เพิ่ม ID
    const newPost = { id: lastId, ...req.body };
    posts.push(newPost);
    res.status(201).json({ message: "สร้างสำเร็จ!", data: newPost });
});

// 3. PUT
app.put('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = posts.findIndex(p => p.id === id);
    if (index !== -1) {
        posts[index] = { id, ...req.body }; // เก็บ id ไว้เหมือนเดิม
        res.json({ message: "อัปเดตแบบ PUT สำเร็จ!", data: posts[index] });
    } else {
        res.status(404).json({ error: "ไม่พบบทความ" });
    }
});

// 4. PATCH
app.patch('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = posts.findIndex(p => p.id === id);
    if (index !== -1) {
        posts[index] = { ...posts[index], ...req.body };
        res.json({ message: "อัปเดตแบบ PATCH สำเร็จ!", data: posts[index] });
    } else {
        res.status(404).json({ error: "ไม่พบบทความ" });
    }
});

// 5. DELETE
app.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  // 1. ลองหาดูก่อนว่ามี ID นี้อยู่ในเครื่องไหม?
  const postIndex = posts.findIndex(p => p.id === id);

  if (postIndex !== -1) {
    // 2. ถ้าเจอ (Index ไม่ใช่ -1) ถึงจะลบ
    posts.splice(postIndex, 1);
    res.json({ message: "ลบข้อมูลสำเร็จ!" });
  } else {
    // 3. ถ้าไม่เจอ ส่ง 404 (Not Found) กลับไปหา Frontend ทันที!
    res.status(404).json({ error: "ลบไม่สำเร็จ! ไม่พบบทความ ID นี้" });
  }
});

app.listen(3000, () => console.log('🚀 Backend รันแล้วที่ http://localhost:3000'));