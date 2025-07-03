import { computed, effect, inject, Injectable } from '@angular/core';
import { ProductService } from '../products/product.service';
import { HttpClient, httpResource } from '@angular/common/http';
import { Review } from './review';
import { tap, map } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewsUrl = 'api/reviews';
  private productService = inject(ProductService);
  private http = inject(HttpClient);

  // Get data based on a signal
  // Sort the reviews
  reviewsResource = rxResource({
    params: this.productService.selectedProduct,
    stream: (p) =>
      this.http.get<Review[]>(`${this.reviewsUrl}?productId=^${p.params?.id}$`).pipe(
        map(items => items.sort((a, b) => a.title < b.title ? -1 : 0)
        )),
    defaultValue: []
  });

  // Retrieve data into a signal
  // Use appropriate regular expression syntax to get an exact match on the id
  // Otherwise an id = 1 will match 10, 11, ... 100, 101, etc.
  // reviewsResource = httpResource<Review[]>(() => 
  //   this.productService.selectedProduct() ? 
  //     `${this.reviewsUrl}?productId=^${this.productService.selectedProduct()?.id}$` : undefined,
  //   { defaultValue: [] }
  // );

}
