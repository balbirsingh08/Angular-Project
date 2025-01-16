import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation-popup',
  templateUrl: './delete-confirmation-popup.component.html',
  styleUrls: ['./delete-confirmation-popup.component.scss']
})
export class DeleteConfirmationPopupComponent {
  @Input() isVisible: boolean = false;  // To control the visibility of the modal
  @Input() message: string = '';         // The message to display in the modal
  @Output() confirmDelete = new EventEmitter<void>();  // To emit confirmation
  @Output() cancelDelete = new EventEmitter<void>();   // To emit cancellation

  // Emit the confirmation to delete the record
  onConfirm(): void {
    this.confirmDelete.emit();
  }

  // Emit the cancellation of deletion
  onCancel(): void {
    this.cancelDelete.emit();
  }
}
