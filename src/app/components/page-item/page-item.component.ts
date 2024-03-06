import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { CopyClipboardComponent } from '../copy-clipboard/copy-clipboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-page-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CopyClipboardComponent,
    RouterLink,
  ],
  templateUrl: './page-item.component.html',
  styleUrl: './page-item.component.scss',
})
export class PageItemComponent {
  constructor(private router: Router) {}
  @Input({
    alias: 'id-card',
    required: true,
  })
  idCard: string = '';
  @Input('type-card') typeCard: string = 'Default';
  @Input('title-card') titleCard: string = 'Default';
  @Input('content-card') contentCard: any[] = [
    {
      name: 'Default',
      value: 'Default',
    },
  ];

  @Output() editClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteClicked: EventEmitter<string> = new EventEmitter<string>();

  editItem() {
    this.router.navigateByUrl(`/update/${this.typeCard}/${this.idCard}`);
  }

  deleteItem() {
    this.deleteClicked.emit(this.idCard);
  }
}
