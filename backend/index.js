const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000; // İstediğiniz bir port numarası seçin
const cors = require('cors'); // cors paketini import edin

// JSON dosyasının yolu ve adı
const jsonFilePath = path.join(__dirname, 'data.json');

// CORS middleware'i
app.use(cors());

// Middleware
app.use(express.json());

// Kaydedilen verileri okumak için API endpoint'i
app.get('/api/points', (req, res) => {
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {

	if (data) {
		if (err) {
		  console.error("ERROR",err);
		  return res.status(500).json({ error: 'Veriler okunamadı.' });
		}
		const points = JSON.parse(data);
		return res.json(points);
	}
	else {
		return res.status(500).json({ error: 'Veriler okunamadı.' });
	}
  });
});

// Yeni veri eklemek için API endpoint'i
app.post('/api/pointSave', (req, res) => {
  const { lat, lng, datetime } = req.body;
  if (!lat || !lng || !datetime) {
    return res.status(400).json({ error: 'Geçersiz veri.' });
  }

  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    let points = [];
    if (!err) {
      points = JSON.parse(data);
    }
	let id = points.length > 0 ? points[points.length - 1].id + 1 : 0;
	const newPoint = {
      id: id,
      lat: parseFloat(lat).toFixed(5),
      lng: parseFloat(lng).toFixed(5),
      datetime,
    };
    points.push(newPoint);

    fs.writeFile(jsonFilePath, JSON.stringify(points), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Veri kaydedilemedi.' });
      }
      return res.json(newPoint);
    });
  });
});

// Yeni veri eklemek için API endpoint'i
app.post('/api/pointDelete', (req, res) => {
  const { id } = req.body;
  if (id === undefined) {
    return res.status(400).json({ error: 'Geçersiz veri.' });
  }

  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    let points = [];
    if (!err) {
      points = JSON.parse(data);
    }

	// ID'ye sahip veriyi buluyoruz
	const index = points.findIndex(item => item.id == id);
	if (index === -1) {
		return res.status(404).json({ error: 'Veri bulunamadı.' });
	}

	// Veriyi silme
	points.splice(index, 1);

    fs.writeFile(jsonFilePath, JSON.stringify(points), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Veri kaydedilemedi.' });
      }
      return res.json(points);
    });
  });
});

// JSON dosyasını indirmek için API endpoint'i
app.get('/api/pointDownload', (req, res) => {
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Veriler okunamadı.' });
    }
    res.setHeader('Content-disposition', 'attachment; filename=data.json');
    res.setHeader('Content-type', 'application/json');
    return res.send(data);
  });
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor. Port: ${PORT}`);
});
