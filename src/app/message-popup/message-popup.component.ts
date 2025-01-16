import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-message-popup',
  templateUrl: './message-popup.component.html',
  styleUrls: ['./message-popup.component.scss']
})
export class MessagePopupComponent {
  @Input() title: string = 'Message'; // Default title
  @Input() message: string = ''; // Message to display
  @Input() isVisible: boolean = false; // Controls visibility
  @Output() onClose = new EventEmitter<void>(); // Event when modal closes

  closeModal(): void {
    this.onClose.emit();
  }
}
