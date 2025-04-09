import { Component, computed, effect, inject, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductData } from '../product-data';
import { Product } from '../product';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ReviewListComponent } from '../../reviews/review-list/review-list.component';

@Component({
  selector: 'app-product-selection',
  imports: [ FormsModule, CurrencyPipe, ReviewListComponent],
  templateUrl: './product-selection.component.html',
  styleUrl: './product-selection.component.css'
})
export class ProductSelectionComponent {
  pageTitle = 'Product Selection'
  private productService = inject(ProductService);

  selectedProduct = this.productService.selectedProduct;
  quantity = linkedSignal({
    source: this.selectedProduct,
    computation: p => 1
  });

  products = this.productService.productsResource.value;
  isLoading = this.productService.productsResource.isLoading;
  error = this.productService.productsResource.error;
  errorMessage = computed(() => {
    const err = this.error() as HttpErrorResponse;
    if (err) {
      return `${err.status} - ${err.statusText}: ${err.url}`
    }
    return '';
  });

  // Suppliers for the selected product
  // Join them into a single string
  selectedProductSuppliers = this.productService.suppliersResource.value;
  suppliers = computed(() => this.selectedProductSuppliers()?.map(s => s.name).join(', '));

  total = computed(() => (this.selectedProduct()?.price ?? 0) * this.quantity() );
  color = computed(() => this.total() > 200 ? 'green' : 'blue');

  qtyEffect = effect(() => console.log('quantity:', this.quantity()));
}
