import { HttpClient, httpResource } from '@angular/common/http';
import { effect, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { Product } from './product';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, distinctUntilChanged, map, of, startWith, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';
  private http = inject(HttpClient);

  // Shared signals
  productSearch = signal<String | undefined>(undefined);
  // selectedProduct = signal<Product | undefined>(undefined);
  // When the search changes, reset the selected product
  selectedProduct = linkedSignal<String | undefined, Product | undefined>({
    source: this.productSearch,
    computation: () => undefined
  });

  // With rxResource
  // No subscription required
  productsResource = rxResource({
    stream: () => this.http.get<Product[]>(this.productsUrl).pipe(
      map(items => items.sort((a, b) => a.productName < b.productName ? -1 : 0))
    ),
    defaultValue: []
  });

  // Support for the search feature
  searchText$ = toObservable(this.productSearch).pipe(
    tap(x => console.log('Entered char', x)),
    debounceTime(400),
    distinctUntilChanged(),
    tap(x => console.log('For HTTP request', x))
  );
  productSearchResource = rxResource({
    params: toSignal(this.searchText$),
    stream: (p) =>
      this.http.get<Product[]>(`${this.productsUrl}?productName=${p.params}`).pipe(
        map(items => items.sort((a, b) => a.productName < b.productName ? -1 : 0))
      ),
    defaultValue: []
  });
  foundProducts = linkedSignal<Product[], Product[]>({
    source: this.productSearchResource.value,
    computation: (products, previous) => (products.length || !previous) ? products : previous?.value
  });
  eff = effect(() => console.log('found products', this.foundProducts().map(x => x.productName)));

  // *** Additional examples ***

  // With httpClient (Not used)
  // The component must then subscribe to this observable
  products$ = this.http.get<Product[]>(this.productsUrl).pipe(
    startWith([]),    // Provide an initial empty array
    catchError(error => {
      console.error('Error loading products', error);
      return of([]);  // On error return an empty array
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
