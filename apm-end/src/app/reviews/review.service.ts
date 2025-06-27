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

  // Using httpResource
  // reviewsResource = httpResource<Review[]>(() => {
  //   const p = this.productService.selectedProduct();
  //   if (p) {
  //     return `${this.reviewsUrl}?productId=^${p.id}$`;
  //   } else {
  //     return undefined;
  //   }
  // },
  //   { defaultValue: [] }
  // );
  // Sort the reviews
  // reviews = computed(() => this.reviewsResource.value().sort((a, b) => 
  //   a.title < b.title ? -1 : 0));

  eff = effect(() => console.log('loading reviews', this.reviewsResource.isLoading()));
}
