import { Component, OnInit } from '@angular/core';

import { HeaderComponent } from '../../components/header/header.component';
import { HumiditySensorsService } from '../../core/services/humidity-sensors/humidity-sensors.service';
import { iApiResponse } from '../../core/interfaces/i-ApiResponse';
import { iHumiditySensor } from '../../core/interfaces/i-HumiditySensor';
import { iProximitySensor } from '../../core/interfaces/i-ProximitySensor';

@Component({
  selector: 'app-humidity-sensors',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './humidity-sensors.component.html',
  styleUrl: './humidity-sensors.component.scss'
})
export class HumiditySensorsComponent implements OnInit{
  constructor(
    private humiditySensorsService: HumiditySensorsService
  ) {
    
  }
  public read: iHumiditySensor = {
    id: '',
    temperature: 0,
    humidity: 0,
    registeredAt: '',
    status: false
  }

  ngOnInit(): void {
    this.getLastRead();
  }

  getLastRead() {
    this.humiditySensorsService.getLastHumiditySensor().subscribe(
      (res) => {
        this.read = res;
      }
      )
  }

}
