# MQTT Backend

Ứng dụng backend Node.js quản lý kết nối MQTT cho hệ thống IoT WeatherNest với ESP32.

## ✨ Tính năng

- Kết nối MQTTS với HiveMQ Cloud
- Quản lý nhiều thiết bị ESP32
- Xử lý dữ liệu JSON real-time
- Điều khiển thiết bị từ xa

## 🚀 Cài đặt

### Cài đặt MQTT library

```bash
npm install mqtt
```

Hoặc cài đặt tất cả dependencies:

```bash
npm install

```

## 🛠️ Sử dụng

### Khởi tạo

```javascript
const MqttManager = require('./mqttManager');

const mqttManager = new MqttManager({
  host: 'mqtts://your-cluster.s1.eu.hivemq.cloud:8883',
  username: 'your-username',
  password: 'your-password'
});
```

### Nhận dữ liệu thiết bị

```javascript
mqttManager.onMessage((topic, payload) => {
  console.log('Data:', payload);
});

mqttManager.subscribeDeviceData('esp32_devkit_01');
```

### Điều khiển thiết bị

```javascript
mqttManager.publishControl('esp32_devkit_01', {
  led: { state: 'ON' }
});
```

## 📚 API Reference

### MqttManager(options)
- `options.host`: MQTT broker URL
- `options.username`: Username
- `options.password`: Password

### Methods
- `onMessage(callback)`: Xử lý tin nhắn
- `subscribeDeviceData(deviceId)`: Subscribe thiết bị
- `publishControl(deviceId, payload)`: Gửi lệnh điều khiển
- `subscribeDevices(deviceIds)`: Subscribe nhiều thiết bị

## 🌐 Topic Structure

**Data**: `WeatherNestIOT/{deviceId}/data`
**Control**: `WeatherNestIOT/{deviceId}/control`

```json
// Data payload
{
  "temperature": 25.6,
  "humidity": 65.2,
  "battery": 85
}

// Control payload  
{
  "led": { "state": "ON" }
}
```

## ▶️ Chạy test

```bash
node testMqttManager.js
```

## 🔌 ESP32 Firmware

Dự án bao gồm firmware ESP32 (`mqtt-esp32/`) với các tính năng:

### ⚡ Tính năng ESP32
- **WiFi**: Kết nối tự động với retry
- **MQTTS**: Kết nối bảo mật đến HiveMQ Cloud  
- **Cảm biến giả lập**: DHT22 (nhiệt độ, độ ẩm)
- **Điều khiển LED**: ON/OFF qua MQTT
- **NTP Time**: Đồng bộ thời gian real-time

### 📊 Dữ liệu gửi (5s/lần)
```json
{
  "device_id": "esp32_devkit_01",
  "timestamp": 1699876543,
  "battery_v": 3.86,
  "wifi": {
    "wifi_ssid": "P910", 
    "wifi_rssi_dbm": -45
  },
  "dht22": {
    "temperature_c": 29.4,
    "humidity_pct": 72.1
  },
  "led": {
    "state": "ON"
  }
}
```

### 🎛️ Lệnh điều khiển
```json
{
  "led": { "state": "ON" }  // ON/OFF
}
```

### 📦 Dependencies
- ArduinoJson ^7.0.0
- PubSubClient ^2.8