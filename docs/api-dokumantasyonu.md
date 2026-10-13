# TaskFlow — API Tasarım Dokümanı

## Temel bilgi
Base URL: `http://localhost:3000`
İstek gövdesi: `Content-Type: application/json`
Başarılı gövdeli yanıtlarda: `{"success":true,"data":...}`
Hata yanıtlarında: `{"success":false,"error":"..."}` veya `errors` dizisi.
Silme başarılı: HTTP 204, boş yanıt.

## Zorunlu uçlar
| HTTP | Yol | Görev | Başarılı HTTP |
|---|---|---|---|
| POST | /tasks | Yeni görev oluşturur | 201 |
| GET | /tasks | Görevleri listeler | 200 |
| GET | /tasks/:id | ID ile görev bulur | 200 |
| PUT | /tasks/:id | Görev alanlarını değiştirir | 200 |
| DELETE | /tasks/:id | Görevi siler | 204 |

### POST /tasks örneği
```json
{"title":"API geliştir","description":"Temel REST endpointleri","assignee":"Musa","priority":"high"}
```
Başarılı istek 201 ve `data` içerisinde oluşturulan görev nesnesini döner.

### PUT /tasks/:id örneği
```json
{"status":"completed","priority":"medium"}
```
Belirtilen alanlar güncellenir; sistem tarafından üretilen id ve tarihler istemci tarafından değiştirilemez.

### GET /tasks yanıt örneği
```json
{"success":true,"data":[],"pagination":{"page":1,"limit":10,"total":0,"totalPages":0}}
```

## İsteğe bağlı uçlar ve parametreler
| HTTP | Yol | İşlev |
|---|---|---|
| GET | /tasks?status=completed | Duruma göre filtre |
| GET | /tasks?priority=high | Önceliğe göre filtre |
| GET | /tasks/search?keyword=backend | Başlık ve açıklamada arama |
| GET | /tasks/assignee/musa | Atanana göre arama |
| GET | /tasks?page=1&limit=10 | Sayfalama (limit 1–100) |
| GET | /tasks?sort=createdAt | Artan tarih sıralaması |
| GET | /tasks?sort=-createdAt | Azalan tarih sıralaması |
| GET | /reports/completed | Tamamlanan sayısı |
| GET | /reports/pending | Bekleyen sayısı |
| GET | /reports/summary | Toplam ve durum özeti |

### Validation kararları
- `title` ve `assignee` POST isteklerinde zorunludur.
- `status`: pending, in_progress, completed.
- `priority`: low, medium, high.
- PUT en az bir tanımlı alan içermelidir.
- Eksik / geçersiz veri: 400; olmayan görev: 404; sunucu hatası: 500.

## Logger
Logger her isteğin zaman damgasını, HTTP metodunu, endpointini, yanıt durum kodunu ve süresini konsola yazar.

## Routing önceliği
`/tasks/search` ve `/tasks/assignee/:name`, `/tasks/:id` rotasından önce eşleştirilir.

## Önemli ayrım
Bu dokümanda alan adları, yanıt şeması, durum kodları ve parametre sınırları uygulama tasarım tercihidir. Hocanın verdiği PDF zorunlu CRUD ve isteğe bağlı gelişmiş yetenekleri tanımlar; bu ayrıntıların tümünü dikte etmez.
