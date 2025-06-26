import { effect, inject, Injectable } from '@angular/core';
import { ProductService } from '../products/product.service';
import { HttpClient } from '@angular/common/http';
import { tap, forkJoin, of} from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { Supplier } from '../products/product';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private suppliersUrl = 'api/suppliers';
  private productService = inject(ProductService);
  private http = inject(HttpClient);

  // Retrieve each supplier for the selected product
  suppliersResource = rxResource({
    params: this.productService.selectedProduct,
    stream: ((p) => {
      if (p.params?.supplierIds) {
        return forkJoin(p.params?.supplierIds.map(supplierId =>
          this.http.get<Supplier>(`${this.suppliersUrl}/${supplierId}`)))
      } else {
        return of([]);
      }
    })
  });

  eff = effect(() => console.log('loading suppliers', this.suppliersResource.isLoading()));
}
