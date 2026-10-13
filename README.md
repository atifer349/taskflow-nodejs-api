# TaskFlow — Node.js REST API

Node.js Backend Programlama eğitimi için görev yönetimi bitirme projesi. Temel Express CRUD + Logger; ayrıca filtreleme, arama, sayfalama, doğrulama ve raporlama örnekleri içerir.

## Gereksinimler
- Node.js 18 veya üzeri (öneri: güncel LTS)
- npm, VS Code, Postman

## Windows / PowerShell kurulumu
```powershell
cd taskflow-api
node -v
npm -v
npm install
Copy-Item .env.example .env
npm run dev
```
Tarayıcıda `http://localhost:3000` açılır. Durdurmak için terminalde `Ctrl+C`.

## Komutlar
- `npm run dev`: nodemon ile geliştirme
- `npm start`: normal başlatma
- `npm test`: yerel API testleri

## Temel CRUD uçları
- `POST /tasks`
- `GET /tasks`
- `GET /tasks/:id`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

## Örnek Postman isteği
`POST http://localhost:3000/tasks`
Header: `Content-Type: application/json`
Body / raw / JSON:
```json
{
  "title": "Node.js API geliştir",
  "description": "Görev servisini oluştur",
  "status": "pending",
  "priority": "high",
  "assignee": "Musa"
}
```
Yanıt içindeki `data.id` değeriyle GET/PUT/DELETE isteklerini test edebilirsiniz.

## İsteğe bağlı geliştirmeler
- `GET /tasks?status=pending&priority=high&page=1&limit=10`
- `GET /tasks/search?keyword=node`
- `GET /tasks/assignee/Musa`
- `GET /reports/completed`
- `GET /reports/pending`
- `GET /reports/summary`
- POST/PUT isteği için validation middleware

## Belgeler
- `docs/proje-tanitim.md`
- `docs/veri-modeli.md`
- `docs/api-dokumantasyonu.md`
- `postman/TaskFlow.postman_collection.json`
- `docs/postman-screenshots/` klasörüne kendi Postman ekran görüntülerinizi ekleyin.

## Bilinen sınırlar
`tasks.json` basit eğitim deposudur; çoklu Node.js instance'ları ve production için DB önerilir. API kimlik doğrulaması içermez. Bu haliyle kamuya açık sunucuda çalıştırmayın.

## Teslim
Kaynak kodlar, README, 1–2 sayfalık tanıtım belgesi ve gerçek Postman ekran görüntülerini public GitHub reposuna yükleyin. Projede `.env` ve `node_modules` commit edilmeyecek.
