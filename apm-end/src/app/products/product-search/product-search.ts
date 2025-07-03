import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../product';

@Component({
  selector: 'app-product-search',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './product-search.html',
  styleUrl: './product-search.css'
})
export class ProductSearch {
  pageTitle = 'Product Search'
  private productService = inject(ProductService);

  productSearch = this.productService.productSearch;
  products = this.productService.foundProducts;
  error = this.productService.productsResource.error;
  errorMessage = computed(() => {
    const err = this.error() as HttpErrorResponse;
    if (err) {
      return `${err.status} - ${err.statusText}: ${err.url}`
    }
    return '';
  });

  selectedProduct = this.productService.selectedProduct;
  onSelected(clickedProduct: Product) {
    this.selectedProduct.set(clickedProduct);
  }

}
