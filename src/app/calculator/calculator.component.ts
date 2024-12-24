import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  num1: number = 0;
  num2: number = 0;
  operation: string = ''; // To store the selected operation
  result: number | string = ''; // To store the calculated result

  // Perform calculation based on the operation
  calculate(op: string): void {
    this.operation = op;
    this.updateResult(); // Update result whenever an operation is selected
  }

  // Update the result based on the current operation and input values
  updateResult(): void {
    switch (this.operation) {
      case '+':
        this.result = this.num1 + this.num2;
        break;
      case '-':
        this.result = this.num1 - this.num2;
        break;
      case '*':
        this.result = this.num1 * this.num2;
        break;
      case '/':
        this.result =
          this.num2 !== 0 ? this.num1 / this.num2 : 'Error: Division by zero';
        break;
      default:
        this.result = 'Invalid Operation';
    }
  }

  // Watch for changes in num1 and num2 to update the result
  onInputChange(): void {
    this.updateResult();
  }
}