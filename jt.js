// import http from 'k6/http';
// import { sleep } from 'k6';

// export const options = {
//     vus: 1000, // Jumlah virtual users
//     duration: '10m', // Durasi pengujian
// };

// export default function () {
//     // URL endpoint API
//     const url = 'https://absensi.tebingtinggikota.go.id/api/kirimdatapulang';

//     // Melakukan request GET ke API
//     http.get(url);

//     // Tidur selama 10 menit
//     sleep(600); // 600 detik = 10 menit
// }


// import http from 'k6/http';
// import { check } from 'k6';

// export let options = {
//   vus: 10, // Jumlah virtual users
//   duration: '30s', // Durasi pengujian
// };

// export default function () {
//   // URL generik untuk memeriksa API key (tidak perlu endpoint spesifik)
//   const url = `https://www.googleapis.com/?key=AIzaSyD1pBNHflyaZs2Y6nCOIeCl4ee4ghJ2Mrs`;

//   // Mensimulasikan request dari domain tertentu
//   const params = {
//     headers: {
//       'Referer': 'https://absensi.tebingtinggikota.go.id',  // Mensimulasikan request dari domain yang diizinkan
//     },
//   };

//   // Mengirim permintaan HTTP GET dengan API key dan Referer
//   const response = http.get(url, params);

//   // Verifikasi apakah status code 200 (sukses)
//   check(response, {
//     'status is 200': (r) => r.status === 200,
//   });

//   // Tambahan pengecekan untuk melihat apakah ada masalah lain
//   check(response, {
//     'response is not 403 (Forbidden)': (r) => r.status !== 403,
//   });
// }



import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10m', target: 1000 },
    ],
    ext: {
        loadimpact: {
            distribution: {
                "amazon:de:frankfurt": { loadZone: "amazon:de:frankfurt", percent: 50 }, 
                "amazon:us:ashburn": { loadZone: "amazon:us:ashburn", percent: 25 },  
                "amazon:jp:tokyo": { loadZone: "amazon:jp:tokyo", percent: 25 },     
            }
        }
    }
};

const API_KEY = 'AIzaSyD1pBNHflyaZs2Y6nCOIeCl4ee4ghJ2Mrs'; 

// URL untuk Geocoding API
const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${API_KEY}`;

// URL untuk Places API dengan radius 1000 meter dan fields lengkap
const placesURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.4224764,-122.0842499&radius=500&fields=formatted_address,name,geometry,types,opening_hours,rating,price_level,formatted_phone_number&key=${API_KEY}`;

// URL untuk Maps JavaScript API (simulasi)
const mapsURL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;

export default function () {
    // Pemanggilan Geocoding API
    let geocodeResponse = http.get(geocodeURL);
    console.log(`Geocoding API Response time: ${geocodeResponse.timings.duration} ms, Status: ${geocodeResponse.status}`);

    // Pemanggilan Places API dengan radius 1000 meter
    let placesResponse = http.get(placesURL);
    console.log(`Places API Response time: ${placesResponse.timings.duration} ms, Status: ${placesResponse.status}`);
    console.log(`Places API Response: ${placesResponse.body}`);

    // Pemanggilan Maps JavaScript API (meskipun biasanya digunakan di browser, kita simulasikan pemanggilan)
    let mapsResponse = http.get(mapsURL);
    console.log(`Maps JavaScript API Response time: ${mapsResponse.timings.duration} ms, Status: ${mapsResponse.status}`);

    // Lakukan sleep selama 30 detik sebelum request berikutnya
    sleep(5);
}


// import http from 'k6/http';
// import { sleep } from 'k6';

// export let options = {
//     stages: [
//         { duration: '30m', target: 5000 }, // Pemanggilan selama 30 menit dengan 1 user
//     ],
//     ext: {
//         loadimpact: {
//             distribution: {
//                 // Simulasi dari negara-negara selain Indonesia dan Malaysia
//                 "amazon:de:frankfurt": { loadZone: "amazon:de:frankfurt", percent: 50 }, // 50% dari Jerman
//                 "amazon:us:ashburn": { loadZone: "amazon:us:ashburn", percent: 25 },   // 25% dari AS
//                 "amazon:jp:tokyo": { loadZone: "amazon:jp:tokyo", percent: 25 },      // 25% dari Jepang
//             }
//         }
//     }
// };

// const API_KEY = 'AIzaSyCgQVmhR3WWJiKnP8oFezD1fpSdqn59FLQ';  // Ganti dengan API key kamu

// const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${API_KEY}`;
// const placesURL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Eiffel+Tower&inputtype=textquery&fields=formatted_address,name,geometry&key=${API_KEY}`;
// const mapsURL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;

// export default function () {
//     // Pemanggilan Geocoding API
//     let geocodeResponse = http.get(geocodeURL);
//     console.log(`Geocoding API Response time: ${geocodeResponse.timings.duration} ms, Status: ${geocodeResponse.status}`);

//     // Pemanggilan Places API
//     let placesResponse = http.get(placesURL);
//     console.log(`Places API Response time: ${placesResponse.timings.duration} ms, Status: ${placesResponse.status}`);

//     // Pemanggilan Maps JavaScript API (meskipun biasanya digunakan di browser, kita simulasikan pemanggilan)
//     let mapsResponse = http.get(mapsURL);
//     console.log(`Maps JavaScript API Response time: ${mapsResponse.timings.duration} ms, Status: ${mapsResponse.status}`);

//     // Lakukan sleep selama 30 detik sebelum request berikutnya
//     sleep(30);
// }


// import http from 'k6/http';
// import { check, sleep } from 'k6';
// import { randomItem } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js'; // library untuk random item

// export let options = {
//   vus: 2, // Jumlah virtual users
//   duration: '5m', // Durasi pengujian
//   thresholds: {
//     http_req_duration: ['p(95)<2000'], // 95% permintaan harus di bawah 2 detik
//   },
// };

// // Daftar alamat atau tempat acak di Amerika Serikat
// const randomLocations = [
//   'New York, NY, USA',
//   'Los Angeles, CA, USA',
//   'Chicago, IL, USA',
//   'Houston, TX, USA',
//   'Miami, FL, USA',
//   'San Francisco, CA, USA',
//   'Seattle, WA, USA',
// ];

// // Fungsi untuk mengonversi alamat ke koordinat menggunakan Geocoding API
// function geocodeLocation(location) {
//   const apiKey = 'AIzaSyD1pBNHflyaZs2Y6nCOIeCl4ee4ghJ2Mrs'; // API Key kamu
//   const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`;

//   const params = {
//     headers: {
//       'Referer': 'https://absensi.tebingtinggikota.go.id', // Domain pengakses yang diizinkan
//     },
//   };

//   const response = http.get(geocodeUrl, params);

//   // Verifikasi respons Geocoding
//   check(response, {
//     'Geocoding response status is 200': (r) => r.status === 200,
//     'Geocoding results found': (r) => JSON.parse(r.body).results.length > 0,
//   });

//   // Ambil koordinat dari hasil geocoding
//   const data = JSON.parse(response.body);
//   if (data.results.length > 0) {
//     const location = data.results[0].geometry.location;
//     return { lat: location.lat, lng: location.lng };
//   }

//   return null;
// }

// // Fungsi untuk mencari tempat menggunakan Places API
// function findNearbyPlaces(lat, lng) {
//   const apiKey = 'AIzaSyD1pBNHflyaZs2Y6nCOIeCl4ee4ghJ2Mrs'; // API Key kamu
//   const radius = 1000; // Radius dalam meter (1 km)
//   const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&key=${apiKey}`;

//   const params = {
//     headers: {
//       'Referer': 'https://absensi.tebingtinggikota.go.id', // Domain pengakses yang diizinkan
//     },
//   };

//   const response = http.get(placesUrl, params);

//   // Verifikasi respons Places API
//   check(response, {
//     'Places API response status is 200': (r) => r.status === 200,
//     'Places found within radius': (r) => JSON.parse(r.body).results.length > 0,
//   });

//   return JSON.parse(response.body).results;
// }

// export default function () {
//   // Pilih lokasi acak dari daftar
//   const randomLocation = randomItem(randomLocations);

//   // Dapatkan koordinat dari lokasi acak menggunakan Geocoding API
//   const coordinates = geocodeLocation(randomLocation);

//   if (coordinates) {
//     console.log(`Coordinates for ${randomLocation}: Latitude=${coordinates.lat}, Longitude=${coordinates.lng}`);

//     // Cari tempat di sekitar koordinat yang dihasilkan menggunakan Places API
//     const places = findNearbyPlaces(coordinates.lat, coordinates.lng);

//     // Output hasil Places API
//     if (places.length > 0) {
//       console.log(`Found ${places.length} places near ${randomLocation}:`);
//       places.forEach((place) => {
//         console.log(`- Place Name: ${place.name}`);
//         console.log(`  Address: ${place.vicinity}`);
//         console.log(`  Place ID: ${place.place_id}`);
//         console.log(`  Types: ${place.types.join(', ')}`);
//       });
//     } else {
//       console.log(`No places found near ${randomLocation}`);
//     }
//   } else {
//     console.log(`Failed to get coordinates for ${randomLocation}`);
//   }

//   // Tunggu 5 menit sebelum mengacak lokasi lagi
//   sleep(300); // 300 detik = 5 menit
// }
