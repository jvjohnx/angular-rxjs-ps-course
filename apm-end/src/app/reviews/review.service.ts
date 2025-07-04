import { effect, inject, Injectable, signal } from '@angular/core';
import { ProductService } from '../products/product.service';
import { HttpClient } from '@angular/common/http';
import { Review } from './review';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewsUrl = 'api/reviews';
  private productService = inject(ProductService);
  private http = inject(HttpClient);

  // Get data based on a signal
  reviewsResource = rxResource({
    params: this.productService.selectedProduct,
    stream: (p) =>
      this.http.get<Review[]>(`${this.reviewsUrl}?productId=^${p.params?.id}$`),
    defaultValue: []
  });

  // With httpResource (Not used)
  // Use appropriate regular expression syntax to get an exact match on the id
  // Otherwise an id = 1 will match 10, 11, ... 100, 101, etc.
  // reviewsResource = httpResource<Review[]>(() => 
  //   this.productService.selectedProduct() ? 
  //     `${this.reviewsUrl}?productId=^${this.productService.selectedProduct()?.id}$` : undefined,
  //   { defaultValue: [] }
  // );

  // *** To support search ***

  // Use a linked signals to reset the search text
  // when the selected product changes
  searchText = signal('');

  searchText$ = toObservable(this.searchText).pipe(
    // tap(x => console.log('Entered char', x)),
    debounceTime(400),
    distinctUntilChanged(),
    // tap(x => console.log('For HTTP request', x))
  );

  reviewSearchResource = rxResource({
    params: toSignal(this.searchText$),
    stream: (p) =>
      this.http.get<Review[]>(`${this.reviewsUrl}?text=${p.params}`),
    defaultValue: []
  });
  eff = effect(() => console.log('HTTP request loading',
    `${this.reviewSearchResource.isLoading()} for: ${this.searchText()}`));


}
