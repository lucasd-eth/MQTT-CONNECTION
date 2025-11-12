# MQTT ESP32 Firmware

Firmware ESP32 cho hệ thống IoT WeatherNest, kết nối MQTT với HiveMQ Cloud.

## ⚡ Tính năng

- WiFi auto-connect + MQTTS secure
- Sensor simulation (DHT22) + LED control
- NTP time sync + JSON communication

## 💻 Code Summary

### Main Functions
- **setup()**: Khởi tạo WiFi, NTP time, MQTT connection và subscribe control topic
- **loop()**: Tạo JSON data từ sensors giả lập → publish → delay 5s
- **callback()**: Xử lý control commands (LED ON/OFF)

### Key Components
```cpp
// WiFi & MQTT setup
WiFiClientSecure espClient;
PubSubClient client(espClient);

// Topics
String topic_data = "WeatherNestIOT/{device_id}/data";
String topic_control = "WeatherNestIOT/{device_id}/control";

// Data simulation
doc["battery_v"] = 3.86;
doc["dht22"]["temperature_c"] = 29.4;
doc["dht22"]["humidity_pct"] = 72.1;
```

### Flow
1. **Connect** WiFi → NTP sync → MQTT connect
2. **Subscribe** control topic cho nhận lệnh
3. **Loop**: Create JSON → Publish data → Wait 5s
4. **Control**: Parse JSON command → Execute (LED control)

## 🔧 Hardware

- ESP32 DevKit v1 (upesy_wroom)
- Built-in LED (GPIO 2)

## 🚀 Setup

### Upload với PlatformIO
```bash
pio run --target upload
pio device monitor
```

### Cấu hình trong `main.cpp`
```cpp
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* mqtt_server = "your-cluster.s1.eu.hivemq.cloud";
const char* mqtt_user = "your-username";
const char* mqtt_pass = "your-password";
```

## 📊 Data Format

**Data Topic**: `WeatherNestIOT/{device_id}/data` (5s/lần)
```json
{
  "device_id": "esp32_devkit_01",
  "timestamp": 1699876543,
  "battery_v": 3.86,
  "wifi": {"wifi_ssid": "P910", "wifi_rssi_dbm": -45},
  "dht22": {"temperature_c": 29.4, "humidity_pct": 72.1},
  "led": {"state": "ON"}
}
```

**Control Topic**: `WeatherNestIOT/{device_id}/control`
```json
{"led": {"state": "ON"}}  // ON/OFF
```

## 📦 Dependencies

```ini
lib_deps = 
    bblanchon/ArduinoJson @ ^7.0.0
    knolleary/PubSubClient @ ^2.8
```

## ⚠️ Known Issues

**Control Delay**: Nhận lệnh control đang delay 5-10s do `delay(5000)` trong loop.

## 🔧 Troubleshooting

- **WiFi**: Check SSID/password, chỉ hỗ trợ 2.4GHz
- **MQTT**: Verify HiveMQ credentials và internet  
- **Serial**: Baud rate 115200, check USB cable

## 📊 Monitor MQTT

Theo dõi real-time data tại [HiveMQ Cloud Console](https://console.hivemq.cloud/):
- **Client Connections**: Kiểm tra ESP32 đã connect
- **Message Traffic**: Xem data/control messages
- **Topic Activity**: Monitor topics WeatherNestIOT/*