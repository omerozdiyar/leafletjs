# Leafletjs ile GPS Koordinatlarını Kaydeden Harita Uygulaması

Bu proje, frontend'de Vue.js ve backend'de Node.js kullanılarak geliştirilen bir web uygulamasıdır. Uygulama, kullanıcıların harita üzerinde noktaları kaydedebileceği ve daha önce eklenmiş noktaları listeleyebileceği bir arayüz sunar. Ayrıca, kaydedilen noktaların GPS koordinatları, tarih bilgisi ile birlikte bir JSON dosyasına kaydedilir ve indirilebilir.

## Özellikler

- Harita üzerinde Leaflet.js kütüphanesi kullanılarak noktaları kaydetme
- Kaydedilen noktaların listesi
- Listeden seçilen noktanın GPS koordinatlarında marker gösterme
- Kaydedilen noktaların JSON formatında dosyaya kaydedilmesi
- Kaydedilen noktaların JSON dosyasının indirilebilmesi
- Yeniden yüklendiğinde kaydedilen noktaların korunması

## Kurulum

1. İlk olarak, tüm kaynak dosyalarını bilgisayarınıza indiriniz. 
```console
git clone https://github.com/omerozdiyar/leafletjs.git
```
2. Ardından backend klasörüne giderek localhost:3000 potunda backend'i canlıya alıyoruz.
```console
cd backend
npm install
npm start
```

## Kullanım

1. Uygulamayı başlatmak için "frontend cdn" klasörüne giderek herhangi bir tarayıcıda index.html dosyasını çalıştırmanız yeterlidir.</br> [Kuruluma gerek kalmaması frontend için vue.js cdn kullanılarak yazılmıştır.]
   
2. Harita üzerinde istediğiniz yere sürükleyerek yeni noktalar ekleyin. Eklenen noktalar sağ taraftaki listede görüntülenecek ve haritada bir marker oluşacaktır.

3. Listenin üzerindeki noktalara tıkladığınızda, ilgili GPS koordinatlarına marker olarak gösterilecektir.

4. Kaydedilen noktaları `.json` formatında indirmek için "İndir" butonuna basın.

5. Uygulama her sayfa yenilendiğinde json dosyasını çeker ve içerisindeki verilerı sağ tarafa listeler. Ardından harita üzerindeki işaretlenmiş noktalara birer marker bırakır.

## Postman Collection

Bu projenin API'sini test etmek için Postman Collection oluşturdum. Aşağıdaki linki kullanarak Postman Collection'ı görüntüleyebilir ve indirebilirsiniz: [Postman Collection](https://www.postman.com/solar-rocket-890449/workspace/samm-leafletjs/collection/28693450-97264675-3a98-4492-a0a9-d16388c94433?action=share&creator=28693450)
