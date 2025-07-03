import { computed, effect, inject, Injectable } from '@angular/core';
import { ProductService } from '../products/product.service';
import { HttpClient } from '@angular/common/http';
import { forkJoin} from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { Supplier } from './supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private suppliersUrl = 'api/suppliers';
  private productService = inject(ProductService);
  private http = inject(HttpClient);

  // Retrieve each supplier for the selected product
  supplierIds = computed(() => 
    this.productService.selectedProduct()?.supplierIds ?? []);

  suppliersResource = rxResource({
    params: () => this.supplierIds().length ? this.supplierIds() : undefined,
    stream: p => forkJoin(p.params.map(
      supplierId => this.http.get<Supplier>(`${this.suppliersUrl}/${supplierId}`)
    )),
    defaultValue: []
  });

  eff = effect(() => console.log('loading suppliers', this.suppliersResource.isLoading()));
}
