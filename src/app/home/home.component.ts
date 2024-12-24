import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Define table columns and data
  showModal: boolean = false; // Controls modal visibility
  editingRow: any = null; // Holds the row being edited
  newRow = { id: null, name: '', email: '', role: '' };
  displayedColumns: string[] = ['Id', 'Name', 'E-Mail', 'Role','Action'];
  tableData = [
    { id: 1, name: 'Scarlett Martin', email: 'scarlett.martin@example.com', role: 'Admin' },
    { id: 2, name: 'Elijah Thomas', email: 'elijah.thomas@example.com', role: 'Editor' },
    { id: 3, name: 'Lily Wilson', email: 'lily.wilson@example.com', role: 'Viewer' },
    { id: 4, name: 'Emily Davis', email: 'emily.davis@example.com', role: 'Admin' },
    { id: 5, name: 'Chris Johnson', email: 'chris.johnson@example.com', role: 'Editor' },
    { id: 6, name: 'Sarah Lee', email: 'sarah.lee@example.com', role: 'Viewer' },
    { id: 7, name: 'Michael Harris', email: 'michael.harris@example.com', role: 'Admin' },
    { id: 8, name: 'David Clark', email: 'david.clark@example.com', role: 'Editor' },
    { id: 9, name: 'Jessica Walker', email: 'jessica.walker@example.com', role: 'Viewer' },
    { id: 10, name: 'Daniel King', email: 'daniel.king@example.com', role: 'Admin' },
    { id: 11, name: 'Laura Lopez', email: 'laura.lopez@example.com', role: 'Editor' },
    { id: 12, name: 'James Taylor', email: 'james.taylor@example.com', role: 'Viewer' },
    { id: 13, name: 'Sophia Allen', email: 'sophia.allen@example.com', role: 'Admin' },
    { id: 14, name: 'Benjamin Scott', email: 'benjamin.scott@example.com', role: 'Editor' },
    { id: 15, name: 'Mia Nelson', email: 'mia.nelson@example.com', role: 'Viewer' },
    { id: 16, name: 'William Adams', email: 'william.adams@example.com', role: 'Admin' },
    { id: 17, name: 'Olivia Martinez', email: 'olivia.martinez@example.com', role: 'Editor' },
    { id: 18, name: 'Jack White', email: 'jack.white@example.com', role: 'Viewer' },
    { id: 19, name: 'Liam Young', email: 'liam.young@example.com', role: 'Admin' },
    { id: 20, name: 'Charlotte Harris', email: 'charlotte.harris@example.com', role: 'Editor' },
    { id: 21, name: 'Lucas Garcia', email: 'lucas.garcia@example.com', role: 'Viewer' },
    { id: 22, name: 'Amelia Robinson', email: 'amelia.robinson@example.com', role: 'Admin' },
    { id: 23, name: 'Ethan Perez', email: 'ethan.perez@example.com', role: 'Editor' },
    { id: 24, name: 'Isabella Carter', email: 'isabella.carter@example.com', role: 'Viewer' },
    { id: 25, name: 'Alexander Mitchell', email: 'alexander.mitchell@example.com', role: 'Admin' },
    { id: 26, name: 'Ava Evans', email: 'ava.evans@example.com', role: 'Editor' },
    { id: 27, name: 'Henry Turner', email: 'henry.turner@example.com', role: 'Viewer' },
    { id: 28, name: 'Scarlett Martin', email: 'scarlett.martin@example.com', role: 'Admin' },
    { id: 29, name: 'Elijah Thomas', email: 'elijah.thomas@example.com', role: 'Editor' },
    { id: 30, name: 'Lily Wilson', email: 'lily.wilson@example.com', role: 'Viewer' }
];
itemsPerPage: number = 5; // Default items per page
  currentPage: number = 1; // Current page
  searchTerm: string = ''; // Search term
  roleFilter: string = ''; // Role filter
  paginatedData: any[] = []; // Data to display for the current page
  filteredData: any[] = []; // Data after filtering

  roles = ['Admin', 'Editor', 'Viewer']; // List of available roles for the dropdown

  constructor() {}

  ngOnInit(): void {
    this.updateFilteredData();
    this.updatePaginatedData();
  }

  updateFilteredData(): void {
    this.filteredData = this.tableData.filter(item =>
      (item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (this.roleFilter ? item.role === this.roleFilter : true)
    );
    this.updatePaginatedData(); // Update pagination after filtering
  }

  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.filteredData.slice(startIndex, endIndex);
    this.updatePageButtons();
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedData();
    }
  }

  onItemsPerPageChange(): void {
    this.currentPage = 1; // Reset to first page
    this.updatePaginatedData();
  }

  onSearchChange(event: any): void {
    this.searchTerm = event.target.value;
    this.currentPage = 1; // Reset to first page
    this.updateFilteredData();
  }

  onRoleChange(event: any): void {
    this.roleFilter = event.target.value;
    this.currentPage = 1; // Reset to first page
    this.updateFilteredData();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  pagesToShow: number[] = []; // Stores the page numbers to show
  showEllipsis: boolean = false; // Whether to show ellipsis
  showLastPageButton: boolean = false; // Whether to show the last page button

  private updatePageButtons(): void {
    const pageNumbers = [];
    const totalPages = this.totalPages;

    let startPage = Math.max(this.currentPage - 2, 1);
    let endPage = Math.min(this.currentPage + 2, totalPages);

    if (endPage - startPage < 4) {
      if (startPage > 1) {
        startPage = Math.max(endPage - 4, 1);
      } else {
        endPage = Math.min(startPage + 4, totalPages);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    this.pagesToShow = pageNumbers;
    this.showEllipsis = this.currentPage < totalPages - 2;
    this.showLastPageButton = this.totalPages > 5 && this.currentPage < totalPages - 2;
  }

  // CRUD Operations
  onEdit(row: any): void {
    this.editingRow = { ...row }; // Clone row to avoid direct modification
    this.showModal = true; // Open the modal
  }

  onDelete(row: any): void {
    this.tableData = this.tableData.filter(item => item.id !== row.id); // Remove the row
    this.updateFilteredData(); // Refresh the data
  }

  onCloseModal(): void {
    this.showModal = false; // Close the modal
  }

  onSaveModal(updatedRow: any): void {
    const index = this.tableData.findIndex(item => item.id === updatedRow.id);
    if (index > -1) {
      this.tableData[index] = { ...updatedRow }; // Update the row in tableData
      this.updateFilteredData(); // Refresh the displayed data
    }
    this.onCloseModal(); // Close the modal
  }

  onAddNewRow(): void {
    // Generate a new row with an id higher than the current max
    const newId = this.tableData.length ? Math.max(...this.tableData.map(item => item.id)) + 1 : 1;
    const newRow = { ...this.newRow, id: newId };
    this.tableData.push(newRow); // Add the new row to the tableData
    this.updateFilteredData(); // Refresh the displayed data
    this.newRow = { id: null, name: '', email: '', role: '' }; // Reset the form
  }
}