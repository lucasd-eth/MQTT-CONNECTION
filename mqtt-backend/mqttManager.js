const mqtt = require('mqtt');

class MqttManager {
  /**
   * @param {Object} options 
   * options: {
   *   host: 'mqtts://xxxx',
   *   username: 'user',
   *   password: 'pass'
   * }
   */
  constructor(options) {
    this.client = mqtt.connect(options.host, {
      username: options.username,
      password: options.password,
    });

    this.client.on('connect', () => {
      console.log('MQTT connected');
    });

    this.client.on('error', (err) => {
      console.error('MQTT error:', err);
    });

    this.client.on('message', (topic, message) => {
      if (this.onMessageCallback) {
        try {
          const payload = JSON.parse(message.toString());
          this.onMessageCallback(topic, payload);
        } catch (err) {
          console.error('Invalid JSON payload:', err);
        }
      }
    });
  }

  /**
   * Đăng ký callback khi có dữ liệu từ thiết bị
   * @param {function} callback (topic, payload)
   */
  onMessage(callback) {
    this.onMessageCallback = callback;
  }

  /**
   * Subscribe dữ liệu từ thiết bị
   * @param {string} deviceId 
   */
  subscribeDeviceData(deviceId) {
    const topic = `WeatherNestIOT/${deviceId}/data`;
    this.client.subscribe(topic, { qos: 1 }, (err) => {
      if (err) console.error(`Failed to subscribe ${topic}:`, err);
      else console.log(`Subscribed to ${topic}`);
    });
  }

  /**
   * Gửi lệnh điều khiển tới thiết bị
   * @param {string} deviceId 
   * @param {Object} payload 
   */
  publishControl(deviceId, payload) {
    const topic = `WeatherNestIOT/${deviceId}/control`;
    this.client.publish(topic, JSON.stringify(payload), { qos: 1 }, (err) => {
      if (err) console.error(`Failed to publish to ${topic}:`, err);
      else console.log(`Published to ${topic}:`, payload);
    });
  }

  /**
   * Đăng ký nhiều thiết bị cùng lúc
   * @param {string[]} deviceIds 
   */
  subscribeDevices(deviceIds) {
    deviceIds.forEach((id) => this.subscribeDeviceData(id));
  }
}

module.exports = MqttManager;
