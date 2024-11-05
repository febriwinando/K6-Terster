import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 100000 / 1800, // 100000 requests in 30 minutes (1800 seconds)
      timeUnit: '1s',
      duration: '30m',
      preAllocatedVUs: 1000, // to ensure we have enough VUs to sustain the defined RPS
      maxVUs: 2000,
    },
  },
};

export default function () {
  let res = http.get('https://absensi.tebingtinggikota.go.id'); // Ganti dengan URL website yang akan diuji
  check(res, {
    'status was 200': (r) => r.status == 200,
  });
  sleep(1);
}
