# TaskFlow — Veri Modeli Tasarımı

## Task (Görev)

| Alan | Tür | Kural |
|---|---|---|
| id | string (UUID) | Sunucu üretir, eşsiz |
| title | string | Zorunlu, boş değil |
| description | string | İsteğe bağlı, varsayılan boş |
| status | enum/string | pending, in_progress, completed; varsayılan pending |
| priority | enum/string | low, medium, high; varsayılan medium |
| assignee | string | Zorunlu, çalışan adı |
| createdAt | ISO 8601 string | Sunucu üretir |
| updatedAt | ISO 8601 string | Sunucu üretir, güncellemede yeniler |

## Örnek kayıt
```json
{
  "id": "d11b3fd1-a8f3-43e0-a2b6-54ad8e7e42a1",
  "title": "REST API testlerini tamamla",
  "description": "Postman ile CRUD isteklerini test et",
  "status": "pending",
  "priority": "high",
  "assignee": "Ayşe",
  "createdAt": "2026-10-10T12:00:00.000Z",
  "updatedAt": "2026-10-10T12:00:00.000Z"
}
```

## Veri depolama kararı
`src/data/tasks.json` dosyasında görev nesneleri bir JSON dizisi olarak tutulur. Uygulama kayıtları okur, bellekte işler ve dosyaya geri yazar. Tek Node.js sürecinde yazma sıralaması uygulanır; çoklu sunucu veya yüksek trafikli gerçek üretim sistemleri için veritabanına geçilmelidir.

## Model kapsamı
Çalışanlar ve projeler için ayrı tablo/nesne bu sürümde bulunmaz. `assignee` göreve atanmış kişinin adını taşır. Bu şema hocanın belirlediği zorunlu format değil, proje tasarım kararıdır.
