import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { PhotoresistorsService } from '../../core/services/photoresistors/photoresistors.service';
import { iPhotoresistor } from '../../core/interfaces/i-Photoresistor';

@Component({
  selector: 'app-photoresistors',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './photoresistors.component.html',
  styleUrl: './photoresistors.component.scss'
})
export class PhotoresistorsComponent {
  constructor(
    private photoresistorsService: PhotoresistorsService
  ) {
    
  }
  public read: iPhotoresistor = {
    id: '',
    status: '',
    createdAt: '',
  }

  ngOnInit(): void {
    this.getLastRead();
  }

  getLastRead() {
    this.photoresistorsService.getLastPhotoresistor().subscribe(
      (res) => {
        this.read = res;
      }
      )
  }
}
