import { Component } from '@angular/core';
import { ProductSelectionComponent } from './products/product-selection/product-selection.component';

@Component({
  selector: 'app-root',
  imports: [ProductSelectionComponent],
  template: `
    <app-product-selection/>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Acme Product Management';
}
