import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-search',
  imports: [FormsModule],
  templateUrl: './product-search.html',
  styleUrl: './product-search.css'
})
export class ProductSearch {
  pageTitle = 'Product Search'
  private productService = inject(ProductService);

  productSearch = this.productService.productSearch;
  products = this.productService.foundProducts;
  error = this.productService.productsResource.error;
  errorMessage = computed(() => this.error() ? this.error()?.message : '');

  selectedProduct = this.productService.selectedProduct;

  onSelected(clickedProduct: Product) {
    this.selectedProduct.set(clickedProduct);
  }

}
