import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() data: any; // Data to edit
  @Output() close = new EventEmitter<void>(); // Event to close the modal
  @Output() save = new EventEmitter<any>(); // Event to save the updated data

  updatedRow: any = {}; // Holds the updated row data

  ngOnInit(): void {
    this.updatedRow = { ...this.data }; // Clone the input data to avoid direct modification
  }

  onSave(): void {
    this.save.emit(this.updatedRow); // Emit updated data
    this.close.emit(); // Close the modal
  }

  onCancel(): void {
    this.close.emit(); // Emit the close event
  }
}
