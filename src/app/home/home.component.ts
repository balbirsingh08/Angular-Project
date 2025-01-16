import { Component, OnInit } from '@angular/core';
import { DeleteConfirmationPopupComponent } from '../delete-confirmation-popup/delete-confirmation-popup.component'; // Import the delete confirmation popup component

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  successMessage: string = '';
  showSuccessPopup: boolean = false;
  isModalVisible: boolean = false;
  errorMessage: string = '';
  isAddMode: boolean = false; 
  showModal: boolean = false; 
  editingRow: any = null; 
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
    { id: 30, name: 'Lily Wilson', email: 'lily.wilson@example.com', role: 'Viewer' },
    { id: 31, name: 'Emily Davis', email: 'emily.davis@example.com', role: 'Admin' }
  ];
  itemsPerPage: number = 5; 
  currentPage: number = 1;
  searchTerm: string = '';
  roleFilter: string = '';
  paginatedData: any[] = []; 
  filteredData: any[] = [];

  roles = ['Admin', 'Editor', 'Viewer']; 

  // New properties for delete confirmation
  isDeleteConfirmationVisible: boolean = false;
  deleteMessage: string = '';
  rowToDelete: any = null;

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
    this.updatePaginatedData(); 
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
    this.currentPage = 1; 
    this.updatePaginatedData();
  }

  onSearchChange(event: any): void {
    this.searchTerm = event.target.value;
    this.currentPage = 1; 
    this.updateFilteredData();
  }

  onRoleChange(event: any): void {
    this.roleFilter = event.target.value;
    this.currentPage = 1; 
    this.updateFilteredData();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  pagesToShow: number[] = []; 
  showEllipsis: boolean = false; 
  showLastPageButton: boolean = false;

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

  onEdit(row: any): void {
    this.editingRow = { ...row }; 
    this.showModal = true; 
  }

  // New method to show delete confirmation popup
  onDelete(row: any): void {
    this.rowToDelete = row;
    this.deleteMessage = `Are you sure you want to delete the record for ${row.name}?`;
    this.isDeleteConfirmationVisible = true; // Show delete confirmation popup
  }

  // Handle the delete confirmation
  onConfirmDelete(): void {
    if (this.rowToDelete) {
      this.tableData = this.tableData.filter(item => item.id !== this.rowToDelete.id);
      this.updateFilteredData(); 
      this.successMessage = `Successfully deleted the record for ${this.rowToDelete.name}`;
      this.showSuccessPopup = true; // Show success popup
    }
    this.isDeleteConfirmationVisible = false; // Close the confirmation popup
  }


  // Handle the cancellation of delete
  onCancelDelete(): void {
    this.isDeleteConfirmationVisible = false; // Close the confirmation popup
  }

  onCloseModal(): void {
    this.showModal = false;
    this.isAddMode = false;
    this.editingRow = null;
  }

  onSaveModal(updatedRow: any): void {
    if (this.isAddMode) {
      const maxId = this.tableData.length > 0
        ? Math.max(...this.tableData.map(item => item.id))
        : 0;
      updatedRow['id'] = maxId + 1;
      this.tableData.unshift(updatedRow);
      this.updateFilteredData(); 
      this.successMessage = `Successfully added the record for ${updatedRow.name}`;
      this.showSuccessPopup = true; // Show success popup
    } else {
      const index = this.tableData.findIndex(item => item.id === updatedRow.id);
      if (index > -1) {
        this.tableData[index] = { ...updatedRow };
        this.updateFilteredData();
      }
    }
    this.onCloseModal();
  }

  onAddNewRow(): void {
    this.isAddMode = true; 
    this.editingRow = { ...this.newRow }; 
    this.showModal = true;
  }
  showErrorModal(): void {
    this.errorMessage = 'An unexpected error occurred. Please try again.';
    this.isModalVisible = true;
  }

  handleModalClose(): void {
    this.isModalVisible = false;
  }
}
