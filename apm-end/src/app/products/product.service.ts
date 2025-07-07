import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from './product';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, map, of, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';
  private http = inject(HttpClient);

  // Shared signals
  selectedProduct = signal<Product | undefined>(undefined);

  // With rxResource
  // No subscription required
  productsResource = rxResource({
    stream: () => this.http.get<Product[]>(this.productsUrl).pipe(
      map(items => items.sort((a, b) => a.productName < b.productName ? -1 : 0))
    ),
    defaultValue: []
  });

  // *** Additional examples ***

  // With HttpClient (Not used)
  // The component must then subscribe to this observable
  products$ = this.http.get<Product[]>(this.productsUrl).pipe(
    startWith([]),
    catchError(error => {
      console.error('Error loading products', error);
      return of([]);
    })
  );

  // With httpResource (Not used)
  // No subscription or observable required
  productsResourceHTTP = httpResource<Product[]>(() => this.productsUrl, { defaultValue: [] });

  // Retrieve a single product and map name (Not used)
  productResource = rxResource({
    params: this.selectedProduct,
    stream: (p) =>
      this.http.get<Product>(`${this.productsUrl}/${p.params?.id}`).pipe(
        map(p => ({
          ...p,
          productName: p.productName.toUpperCase()
        }))
      )
  });

}
