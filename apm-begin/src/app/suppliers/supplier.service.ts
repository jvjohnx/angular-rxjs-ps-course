import {computed, Inject, inject, Injectable} from '@angular/core';
import {ProductService} from '../products/product.service';
import {HttpClient} from '@angular/common/http';
import {rxResource} from '@angular/core/rxjs-interop';
import {forkJoin} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private suppliersUrl = 'api/suppliers';

  productService = inject(ProductService);
  http = Inject(HttpClient);

  supplierIds = computed(() => this.productService.selectedProduct()?.supplierIds);

  /*
  Input for forkJoin
      [
        this.http.get<Supplier>(url1),
        this.http.get<Supplier>(url2),
        ...
      ]

  input calls the http.get and returns an Observable

  Output of the forkJoin
      Observable<Supplier[]>  i.e. Array of Observables
   */

    supplierResource = rxResource({
      params: () => this.supplierIds()?.length ? this.supplierIds() : undefined,
      stream: p => forkJoin( p.params.map(
        supplierId => this.http.get(`${this.suppliersUrl}/${supplierId}`),
      )
      ),
      // defaultValue: [] //when added, seem to be some kind of error on the IDE>  but app is running
    });


}
