import { Component, Input } from '@angular/core';

import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-copy-clipboard',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
    MatTooltipModule
  ],
  templateUrl: './copy-clipboard.component.html',
  styleUrl: './copy-clipboard.component.scss'
})
export class CopyClipboardComponent {
  @Input('text-to-copy') textToCopy: string = "";
}
