import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product, ProductCategory, Supplier } from './product';
import { forkJoin, map, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';
  private productCategoriesUrl = 'api/productCategories';
  private suppliersUrl = 'api/suppliers';
  private http = inject(HttpClient);

  // Shared signals
  selectedProduct = signal<Product | undefined>(undefined);

  // Define the pipelines
  private products$ = this.http.get<Product[]>(this.productsUrl)
    .pipe(
      tap(p => console.table(p))
    );

  productCategories$ = this.http.get<ProductCategory[]>(this.productCategoriesUrl)
    .pipe(
      tap(c => console.table(c))
    );

  // Maps each product's category id to a name
  private productsWithCategory$ = forkJoin(
    [this.products$,
    this.productCategories$]
  ).pipe(
    map(([products, categories]: [Product[], ProductCategory[]]) =>
      products.map(
        p =>
        ({
          ...p,
          category: categories.find(c =>
            p.categoryId === c.id)?.name
        } as Product)
      )
    )
  );

  // Use a resource to issue the http request and
  // return the result into a signal
  productsResource = rxResource({
    loader: () => this.productsWithCategory$,
    defaultValue: []
  });

  // Retrieve each supplier for the selected product
  suppliersResource = rxResource({
    request: this.selectedProduct,
    loader: ((param) => {
      if (param.request?.supplierIds) {
        return forkJoin(param.request?.supplierIds.map(supplierId =>
          this.http.get<Supplier>(`${this.suppliersUrl}/${supplierId}`).pipe(
            tap(s => console.log('supplier:', s))
          )))
      } else {
        return of([]);
      }
    })
  });

}
