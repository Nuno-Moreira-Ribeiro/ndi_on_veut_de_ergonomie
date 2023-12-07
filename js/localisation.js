navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    var mymap = L.map('localisation').setView([latitude,longitude], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
        tileSize: 512,
        zoomOffset: -1
    }).addTo(mymap);

    L.marker([latitude,longitude]).addTo(mymap)
        .bindPopup('Vous êtes ici !')
        .openPopup();
});
