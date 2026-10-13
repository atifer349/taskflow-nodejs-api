# TASKFLOW — PROJE TANITIM DOKÜMANI
**Node.js Backend Programlama Eğitimi — Bitirme Projesi**

## 1. Projenin amacı
TaskFlow, bir yazılım ekibinin görevleri oluşturmasını, personele atamasını, durumlarını ve önceliklerini yönetmesini sağlayan REST API projesidir. Eğitimin Node.js, Express.js, routing, CRUD, middleware ve JSON kazanımlarının uygulamalı olarak gösterilmesi amaçlanır.

## 2. Senaryo
Bir yazılım firmasında ekip üyeleri aynı anda birden fazla görevi yürütmektedir. Görevlerin kimin sorumluluğunda olduğu, önceliği ve tamamlanma durumu merkezi bir API üzerinden takip edilecektir. Postman üzerinden API'ye HTTP istekleri gönderilir; uygulama istekleri doğrular, görev verilerini işler ve JSON yanıtı döndürür.

## 3. Zorunlu sistem gereksinimleri
- POST /tasks: görev ekleme
- GET /tasks: görev listeleme
- GET /tasks/:id: görev detayı
- PUT /tasks/:id: görev güncelleme
- DELETE /tasks/:id: görev silme
- Logger middleware: HTTP metodu, endpoint, zaman damgası kaydı
- Postman ile CRUD testleri, README ve test kanıtları

## 4. İsteğe bağlı geliştirmeler
- Görev arama, durum/öncelik filtreleme, çalışan bazlı listeleme
- Sayfalama ve sıralama
- Girdi doğrulama middleware'i
- Tamamlanan/bekleyen görev ve genel raporlama servisleri
- Genişletilmiş API ve test dokümantasyonu

## 5. Teknoloji ve sınırlar
Node.js, Express.js, JavaScript, JSON dosyası (fs), Postman ve GitHub kullanılacaktır. Arayüz, giriş/rol yönetimi ve SQL veritabanı bu sürüme dahil değildir. JSON depolama bu proje için seçilen basitleştirilmiş mimaridir, yönergede zorunlu değildir.

## 6. Beklenen teslim
Public GitHub deposunda kaynak kodu, package.json, README, 1–2 sayfalık tanıtım belgesi ve CRUD Postman ekran görüntüleri. Ek olarak API dokümantasyonu ve Postman Collection sağlanır.

## 7. Başarı ölçütleri
CRUD %30; routing %15; logger %15; kod kalitesi %15; temel dokümantasyon %15; Postman testleri %10. Zorunlu bölümün sorunsuz çalışması isteğe bağlı geliştirmelerin önündedir.

**Not:** Proje adı, Task veri şeması ve JSON dosyası kararı geliştirme tercihidir; hocanın yönergesi bu ayrıntıları birebir sabitlemez.
