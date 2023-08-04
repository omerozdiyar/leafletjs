const app = new Vue({
	el: '#app',
	data: {
	  map: null,
	  markers: [],
	  points: [],
	  lat: 40.8590915,
	  lng: 29.4299045,
	  dist: 10,
	  URL: "http://localhost:3000"
	},
	methods: {
	  initMap() {
		this.map = L.map('map').setView([this.lat, this.lng], this.dist);
  
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

		}).addTo(this.map);
  
		this.map.on('moveend', () => {
		  const center = this.map.getCenter();
		  this.lat = center.lat;
		  this.lng = center.lng;
		});

		axios.get(this.URL + '/api/points') // Açılışta konumları çekiyoruz
		  .then((response) => {
				if (response.data.length > 0) {
					this.points = response.data;
					this.points.forEach((point) => {
						this.addMarker(point); // Her bir nokta için addMarker fonksiyonunu çağırın
					});
				}
			})
			.catch((error) => {
				console.error(error);
		});
	  },
	  savePoint() {
		  const id =  this.points.length > 0 ? this.points[this.points.length - 1].id + 1 : 0;
		  const lng = parseFloat(this.lng).toFixed(5);
		  const lat = parseFloat(this.lat).toFixed(5);
		  const datetime = new Date().toISOString();

		  const newPoint = { id, lat, lng, datetime };
		  this.points.push(newPoint);
		  
		  axios.post(this.URL + '/api/pointSave', newPoint) // Yeni konumu kaydediyoruz
		  .then((response) => {
			  this.addMarker(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	  },
	  deletePoint(id) {
		  const index = { id };
		  console.log(">>id",id);

		  axios.post(this.URL + '/api/pointDelete', index) // Bir konum siliyoruz 
		  .then((response) => {
			if (this.points.length > 0) {
				this.points = response.data;
				const markerIndex = this.markers.findIndex((marker) => marker.options.id === id);
				this.map.removeLayer(this.markers[markerIndex]); // Haritadan da silinmesi için
				this.markers.splice(markerIndex, 1); // Marker dizisinden de silinmesi için
			}
			})
			.catch((error) => {
				console.error(error);
			});
	  },
	  addMarker(point) {
		const marker = L.marker([point.lat, point.lng], { id: point.id }).addTo(this.map);
		this.markers.push(marker);
	  },	  
	  downloadJSON() {
		axios.get(this.URL + '/api/pointDownload') // API endpoint'i düzenleyin
		  .then((response) => {
			const jsonData = JSON.stringify(response.data); // Gelen veriyi JSON verisine dönüştürün
			this.downloadFile(jsonData, 'data.json');
		  })
		  .catch((error) => {
			console.error(error);
		  });
	  },
	  downloadFile(data, filename) {
		const blob = new Blob([data], { type: 'application/json' });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		a.click();
		window.URL.revokeObjectURL(url);
	  },
	  showPointOnMap(point) {
		// Zoom out
		const currentZoom = 10;
		this.map.setView([point.lat, point.lng], currentZoom - 1, { animate: true, duration: 1000 });
  
		// Zoom in
		setTimeout(() => {
		  this.map.setView([point.lat, point.lng], currentZoom + 1, { animate: true, duration: 1000 });
		}, 1000);
	  },
	},
	mounted() {
	  this.initMap();
	},
  });
  