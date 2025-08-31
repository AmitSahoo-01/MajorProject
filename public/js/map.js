
    let map_token = mapToken;
    mapboxgl.accessToken = map_token;
    const map = new mapboxgl.Map({
    container: 'map',
    center: coordinates, 
    zoom: 9 
    });

    const marker = new mapboxgl.Marker({color:"red"})
    .setLngLat(coordinates)
    .setPopup(new mapboxgl.Popup({offset:25})
    .setHTML("<p>This is your desire location</p>"))
    .addTo(map);