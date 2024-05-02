import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { PredictionDisplayComponent } from './prediction-display/prediction-display.component';
import { MqttModule, IMqttServiceOptions } from 'ngx-mqtt';
// Define your MQTT service options
export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'test.mosquitto.org',
  port: 1883,
  protocol: 'ws',  // Ensure this protocol is supported by your MQTT broker
  path: '/mqtt'
};

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    PredictionDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
