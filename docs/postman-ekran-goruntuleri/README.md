# TaskFlow REST API — Postman Test Kanıtları

Bu klasörde Node.js Backend Programlama bitirme projesinde gerçekleştirilen testlerin orijinal ekran görüntüleri bulunur. Görsellerde herhangi bir değişiklik yapılmamış, yalnızca adları düzenlenmiştir.

| No  | Görsel                                                         | Test edilen işlem                   | Gözlenen sonuç   |
| --- | -------------------------------------------------------------- | ----------------------------------- | ---------------- |
| 01  | [01-gorev-olusturma.png](./01-gorev-olusturma.png)             | `POST /tasks`                       | 201 Created      |
| 02  | [02-gorev-listeleme.png](./02-gorev-listeleme.png)             | `GET /tasks`                        | 200 OK           |
| 03  | [03-gorev-detayi.png](./03-gorev-detayi.png)                   | `GET /tasks/:id`                    | 200 OK           |
| 04  | [04-gorev-guncelleme.png](./04-gorev-guncelleme.png)           | `PUT /tasks/:id`                    | 200 OK           |
| 05  | [05-gorev-silme.png](./05-gorev-silme.png)                     | `DELETE /tasks/:id`                 | 204 No Content   |
| 06  | [06-logger-middleware.png](./06-logger-middleware.png)         | `VS Code terminal`                  | Logger kayıtları |
| 07  | [07-oncelik-filtreleme.png](./07-oncelik-filtreleme.png)       | `GET /tasks?priority=high`          | 200 OK           |
| 08  | [08-gorev-arama.png](./08-gorev-arama.png)                     | `GET /tasks/search?keyword=Backend` | 200 OK           |
| 09  | [09-raporlama.png](./09-raporlama.png)                         | `GET /reports/summary`              | 200 OK           |
| 10  | [10-validation-bos-baslik.png](./10-validation-bos-baslik.png) | `POST /tasks (boş title)`           | 400 Bad Request  |
| 11  | [11-validation-oncelik.png](./11-validation-oncelik.png)       | `POST /tasks (urgent priority)`     | 400 Bad Request  |

## Test kapsamı

- **Zorunlu:** İlk 5 görsel CRUD işlemlerini, 6. görsel Logger Middleware kayıtlarını gösterir.
- **İsteğe bağlı:** 7-9 numaralı görseller filtreleme, arama ve raporlama; 10-11 numaralı görseller validation hata senaryolarını gösterir.
- `400 Bad Request`, kasıtlı hatalı veri gönderildiği için beklenen başarılı test sonucudur.
- `204 No Content` yanıtının boş olması normaldir.

Ekran görüntüleri görsel test kanıtlarıdır; otomatik test çalıştırma raporu değildir.
