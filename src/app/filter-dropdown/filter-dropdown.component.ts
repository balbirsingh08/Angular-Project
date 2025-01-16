import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.scss'],
})
export class FilterDropdownComponent {
  countries: string[] = ['India', 'USA', 'UK'];
  locationsByCountry: { [key: string]: string[] } = {
    India: ['Hyderabad', 'Delhi', 'Mumbai', 'Chennai'],
    USA: ['New York', 'Los Angeles', 'Chicago', 'Houston'],
    UK: ['London', 'Manchester', 'Birmingham', 'Liverpool'],
  };

  selectedCountry: string = ''; // Initially empty
  filteredLocations: string[] = []; // Initially empty

  onCountryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCountry = selectElement.value; // Update selected country
    this.filteredLocations = this.locationsByCountry[this.selectedCountry] || [];
  }
}
