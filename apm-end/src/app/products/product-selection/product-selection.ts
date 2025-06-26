import { Component, computed, effect, inject, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '../product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ReviewListComponent } from '../../reviews/review-list/review-list.component';
import { fromEvent } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SupplierService } from '../../suppliers/supplier.service';

@Component({
  selector: 'app-product-selection',
  imports: [FormsModule, CurrencyPipe, ReviewListComponent],
  templateUrl: './product-selection.component.html',
  styleUrl: './product-selection.component.css'
})
export class ProductSelectionComponent {
  pageTitle = 'Product Selection'
  private productService = inject(ProductService);
  private supplierService = inject(SupplierService);

  showHelp = signal(false);
  questionMark$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
    map(event => event.key),
    tap(key => console.log(key)),
    filter(key => key === '?' || key === 'Escape'),
    tap(key => this.showHelp.set(key === '?')),
    takeUntilDestroyed()
  );
  sub = this.questionMark$.subscribe();

  selectedProduct = this.productService.selectedProduct;
  quantity = linkedSignal({
    source: this.selectedProduct,
    computation: p => 1
  });

  products = this.productService.products;
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
  // Could instead make these links to supplier details, 
  // but this is fine for our purposes
  selectedProductSuppliers = this.supplierService.suppliersResource.value;
  suppliers = computed(() => this.selectedProductSuppliers()?.map(s => s.name).join(', '));

  total = computed(() => (this.selectedProduct()?.price ?? 0) * this.quantity());
  color = computed(() => this.total() > 200 ? 'green' : 'blue');

  qtyEffect = effect(() => console.log('quantity:', this.quantity()));
}
