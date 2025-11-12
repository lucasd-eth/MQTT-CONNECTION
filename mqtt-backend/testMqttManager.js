const MqttManager = require('./mqttManager');

// --- Cấu hình kết nối MQTT ---
const mqttManager = new MqttManager({
  host: 'mqtts://e64848825c094594f396b2.s1.eu.hivemq.cloud:8883',
  username: '20251', // Thay bằng username HiveMQ của bạn
  password: 'i0251'  // Thay bằng password HiveMQ của bạn
});

// --- Callback khi nhận dữ liệu ---
mqttManager.onMessage((topic, payload) => {
  console.log('----------');
  console.log('Received from topic:', topic);
  console.log('Payload:', payload);
  console.log('----------');
});

// --- Subscribe thiết bị đơn ---
mqttManager.subscribeDeviceData('esp32_devkit_01');

// --- Subscribe nhiều thiết bị ---
mqttManager.subscribeDevices(['esp32_devkit_01', 'esp32_devkit_02']);

// --- Gửi lệnh điều khiển sau 5s ---
setTimeout(() => {
  mqttManager.publishControl('esp32_devkit_01', {
      led: { state: 'OFF' }
    });
}, 5000);

// --- Giữ chương trình chạy để nhận dữ liệu ---
console.log('MQTT test manager running... press Ctrl+C to exit');
