import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ProximitySensorsService } from '../../core/services/proximity-sensors/proximity-sensors.service';
import { iProximitySensor } from '../../core/interfaces/i-ProximitySensor';

@Component({
  selector: 'app-proximity-sensors',
  standalone: true,
  imports: [HeaderComponent, MatCardModule, MatIconModule],
  templateUrl: './proximity-sensors.component.html',
  styleUrl: './proximity-sensors.component.scss'
})
export class ProximitySensorsComponent {
  constructor(
    private priximitySensorsService: ProximitySensorsService
  ) {
    
  }
  public read: iProximitySensor = {
    id: '',
    distance: 0,
    registeredAt: '',
    status: false
  }

  ngOnInit(): void {
    this.getLastRead();
  }

  getLastRead() {
    this.priximitySensorsService.getLastProximitySensor().subscribe(
      (res) => {
        this.read = res;
      }
      )
  }
}
