import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.scss']
})
export class ModalPopupComponent {
  @Input() title: string = 'Error'; // Title of the modal
  @Input() message: string = ''; // Message to display
  @Input() isVisible: boolean = false; // Visibility of the modal
  @Output() onClose: EventEmitter<void> = new EventEmitter(); // Event when the modal is closed

  closeModal(): void {
    this.onClose.emit();
  }
}
