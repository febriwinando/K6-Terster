import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';

// Konfigurasi pengujian
export let options = {
    stages: [
        { duration: '1m', target: 100 },   // Naik ke 100 pengguna dalam 1 menit
        { duration: '3m', target: 500 },   // Tetap di 500 pengguna selama 3 menit
        { duration: '2m', target: 1000 },  // Naik ke 1000 pengguna dalam 2 menit
        { duration: '2m', target: 1500 },  // Naik ke 1500 pengguna dalam 2 menit
        { duration: '2m', target: 2000 },  // Naik ke 2000 pengguna dalam 2 menit
        { duration: '1m', target: 0 },     // Turun kembali ke 0 pengguna
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% permintaan harus selesai dalam 500ms
        'http_req_failed{status:500}': ['rate<0.01'], // Kesalahan server harus kurang dari 1%
    },
};

let BASE_URL = 'https://absensi.tebingtinggikota.go.id';

// Metik Kustom
let responseTimeTrend = new Trend('response_time_trend');
let successRate = new Rate('success_rate');

let routes = [
    '/',
    '/muser',
    '/mdashboard',
    '/mpegawai',
    '/prodmuser/change/passworducts',
    '/mrlabsensi/pengolahanabsensipegawai',

];

export default function () {
    group('Testing Server Performance', function () {
        for (let i = 0; i < routes.length; i++) {
            let res = http.get(`${BASE_URL}${routes[i]}`);
            check(res, {
                'status is 200': (r) => r.status === 200,
                'transaction time OK': (r) => r.timings.duration < 500,
            });

            // Rekam metrik kustom
            responseTimeTrend.add(res.timings.duration);
            successRate.add(res.status === 200);

            sleep(1);  // jeda 1 detik antara request
        }
    });
}



// import http from 'k6/http';
// import { check } from 'k6';
// import { sleep } from 'k6';

// // 1. Konfigurasi pengujian
// export let options = {
//     stages: [
//         { duration: '10s', target: 100 },  // tahap 1: naik ke 100 virtual users
//         { duration: '10s', target: 500 },  // tahap 2: naik ke 500 virtual users
//         { duration: '40s', target: 600 },  // tahap 3: naik ke 600 virtual users
//         { duration: '30s', target: 1000 }, // tahap 4: naik ke 1000 virtual users
//         { duration: '30s', target: 0 },    // tahap 5: turun ke 0 virtual users
//     ],
//     thresholds: {
//         http_req_duration: ['p(95)<500'],  // 95% dari request harus selesai dalam 500ms
//     },
//     rps: 1000,  // Membatasi requests per second jika diperlukan
//     retries: 3, // Mengatur ulang jika terjadi error
//     httpDebug: 'full', // Menambah logging untuk melihat lebih detail
// };

// // 2. Fungsi utama untuk pengujian
// export default function () {
//     // 3. Melakukan request HTTP
//     let res = http.get('https://absensi.tebingtinggikota.go.id/');

//     // 4. Mengecek status response
//     check(res, {
//         'status was 200': (r) => r.status === 200,
//         'transaction time OK': (r) => r.timings.duration < 500,
//     });

//     // 5. Menambahkan jeda antara permintaan
//     sleep(1);  // Jeda 1 detik antara setiap permintaan
// }


// import http from 'k6/http';
// import { sleep } from 'k6';

// export let options = {
//   stages: [
//     { duration: '10m', target: 10000 },
//   ],
// };

// export default function () {
//   http.get('https://absensi.tebingtinggikota.go.id/');
//   sleep(1);
// }


// import http from 'k6/http';
// import { check } from 'k6';
// import { sleep } from 'k6';

// export let options = {
//     stages: [
//         { duration: '10s', target: 100 },  // ramp up to 100 users
//         { duration: '10s', target: 500 },  // ramp up to 500 users
//         { duration: '40s', target: 600 },  // ramp up to 600 users
//         { duration: '30s', target: 1000 }, // ramp up to 1000 users
//         { duration: '30s', target: 0 },    // ramp down to 0 users
//     ],
//     thresholds: {
//         http_req_duration: ['p(95)<500'], // 95% of requests should complete below 500ms
//     },
// };

// export default function () {
//     let res = http.get('https://absensi.tebingtinggikota.go.id/');
//     check(res, {
//         'status was 200': (r) => r.status == 200,
//         'transaction time OK': (r) => r.timings.duration < 500,
//     });
//     sleep(1);
// }
