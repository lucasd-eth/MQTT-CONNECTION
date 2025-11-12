## 🌦️ Về WeatherNest IoT

WeatherNest là hệ thống IoT theo dõi thời tiết và môi trường, cho phép:
- **Real-time monitoring**: Theo dõi nhiệt độ, độ ẩm, áp suất
- **Remote control**: Điều khiển thiết bị từ xa qua MQTT
- **Multi-device**: Quản lý nhiều sensor nodes đồng thời
- **Cloud connectivity**: Kết nối bảo mật với HiveMQ Cloud

# MQTT Connection Tutorial

Hướng dẫn kết nối MQTT cơ bản giữa ESP32 và Node.js backend thông qua HiveMQ Cloud.


## 📁 Cấu trúc Tutorial

```
MQTT-CONNECTION/
├── mqtt-backend/           # Node.js MQTT Tutorial
│   ├── mqttManager.js      # MQTT client class mẫu
│   ├── testMqttManager.js  # Code test kết nối
│   ├── package.json        # npm dependencies
│   └── README.md          # Hướng dẫn backend
└── mqtt-esp32/            # ESP32 Tutorial
    ├── src/main.cpp       # Code mẫu ESP32
    ├── platformio.ini     # PlatformIO config
    └── README.md          # Hướng dẫn ESP32
```

## 🎯 Mục tiêu Tutorial

Học cách:
- Kết nối ESP32 với MQTT broker
- Gửi/nhận dữ liệu JSON qua MQTT
- Xây dựng backend Node.js đơn giản
- Điều khiển thiết bị từ xa

## 🔄 Demo Architecture

```
ESP32 ← WiFi → HiveMQ Cloud ← MQTTS → Node.js
     ↓                      ↓              ↓
- Sensor giả lập        - MQTT broker   - Data logging
- LED control           - Topic routing - Send commands
```

## ⚡ Quick Demo

### 1. Setup HiveMQ Cloud (Free)
- Tạo account tại [HiveMQ Cloud](https://console.hivemq.cloud/)
- Tạo cluster miễn phí
- Lấy connection credentials

### 2. Test Backend
```bash
cd mqtt-backend
npm install
# Sửa credentials trong testMqttManager.js
node testMqttManager.js
```

### 3. Upload ESP32
```bash
cd mqtt-esp32
# Sửa WiFi/MQTT config trong src/main.cpp
pio run --target upload
pio device monitor
```

## 📊 Demo Protocol

### Topics sử dụng
- **Data**: `WeatherNestIOT/{device_id}/data`
- **Control**: `WeatherNestIOT/{device_id}/control`

### Sample Data
```json
// ESP32 gửi (demo data)
{
  "device_id": "esp32_devkit_01",
  "dht22": {"temperature_c": 29.4, "humidity_pct": 72.1},
  "led": {"state": "ON"}
}

// Backend gửi (control command)
{"led": {"state": "OFF"}}
```

## 🛠️ Code Features

### ESP32 Demo (`mqtt-esp32/`)
- ✅ WiFi connection example
- ✅ MQTTS connection sample  
- ✅ Fake sensor data generation
- ✅ LED control demo
- ✅ JSON serialization

### Backend Demo (`mqtt-backend/`)
- ✅ MQTT client wrapper class
- ✅ Device subscription example
- ✅ Message handling demo
- ✅ Control command sending
- ✅ Multiple device support

## 🔧 Configuration

### ESP32 Setup
Chỉnh sửa `mqtt-esp32/src/main.cpp`:
```cpp
// Thay thông tin của bạn
const char* ssid = "YOUR_WIFI";
const char* password = "YOUR_PASSWORD";
const char* mqtt_server = "your-cluster.hivemq.cloud";
const char* mqtt_user = "your-username";
const char* mqtt_pass = "your-password";
```

### Backend Setup
Chỉnh sửa `mqtt-backend/testMqttManager.js`:
```javascript
// Thay thông tin HiveMQ của bạn
const mqttManager = new MqttManager({
  host: 'mqtts://your-cluster.hivemq.cloud:8883',
  username: 'your-username',
  password: 'your-password'
});
```

## ⚠️ Tutorial Limitations

- **Fake sensors**: Dữ liệu cảm biến được hard-code
- **Basic security**: Sử dụng setInsecure() cho demo
- **Simple logic**: Chỉ điều khiển LED builtin
- **No persistence**: Không lưu database
- **Fixed delay**: Control response delay 5-10s

## 🔧 Common Issues

- **WiFi**: ESP32 chỉ hỗ trợ 2.4GHz
- **MQTT**: Check credentials và internet
- **Topics**: Device ID phải khớp nhau
- **JSON**: Kiểm tra format đúng

## 📈 Monitor Demo

- **Serial Monitor**: Xem ESP32 output
- **HiveMQ Console**: [https://console.hivemq.cloud/](https://console.hivemq.cloud/)
- **Node.js Console**: Backend logs

## 🚀 Next Steps

Sau tutorial này, bạn có thể:
1. **Thêm real sensors**: DHT22, BME280, etc.
2. **Implement database**: MongoDB, InfluxDB
3. **Build web interface**: Dashboard, charts
4. **Add security**: Certificates, encryption
5. **Scale system**: Multiple devices, load balancing

---

**Note**: Đây là code tutorial/demo để học MQTT connectivity, không phải production system.