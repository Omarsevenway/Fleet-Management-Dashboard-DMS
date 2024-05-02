// prediction-display.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MqttService } from 'ngx-mqtt'; // Assuming you're using ngx-mqtt library

@Component({
  selector: 'app-prediction-display',
  templateUrl: './prediction-display.component.html',
  styleUrls: ['./prediction-display.component.scss']
})
export class PredictionDisplayComponent implements OnInit, OnDestroy {
  predictionData: any = null;
  private websocket: WebSocket | null = null;
  private mqttSubscription: Subscription | null = null;

  constructor(private mqttService: MqttService) { }

  ngOnInit() {
    this.connectWebSocket();
    this.subscribeToMqtt();
  }

  connectWebSocket() {
    this.websocket = new WebSocket('ws://localhost:8000/ws/predictions/');
    this.websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.predictionData = { label: data.label, probability: data.probability };
    };
    this.websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  subscribeToMqtt() {
    this.mqttSubscription = this.mqttService.observe('Factory/Machine1/Predictions').subscribe({
      next: (message: any) => {
        try {
          const prediction = JSON.parse(message.payload.toString());
          this.predictionData = { label: prediction.label, probability: prediction.probability };
        } catch (error) {
          console.error('Error parsing MQTT message:', error);
        }
      },
      error: (error) => console.error('Error with MQTT subscription:', error)
    });
  }

  ngOnDestroy() {
    if (this.websocket) {
      this.websocket.close();
    }
    if (this.mqttSubscription) {
      this.mqttSubscription.unsubscribe();
    }
  }
}
