import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../product';

@Component({
  selector: 'app-product-search',
  imports: [FormsModule],
  templateUrl: './product-search.html',
  styleUrl: './product-search.css'
})
export class ProductSearch {
  pageTitle = 'Product Search'

  onSelected(clickedProduct: Product) {
  }

}
