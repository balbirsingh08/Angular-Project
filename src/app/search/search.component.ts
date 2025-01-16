import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchValue: string = '';

  @Output() searchChanged = new EventEmitter<string>();

  onSearchChange(event: any): void {
    this.searchValue = event.target.value;
    this.searchChanged.emit(this.searchValue);
  }
}
