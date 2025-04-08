import { effect, inject, Injectable } from '@angular/core';
import { ProductService } from '../products/product.service';
import { HttpClient } from '@angular/common/http';
import { Review } from './review';
import { tap, map} from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewsUrl = 'api/reviews';
  private productService = inject(ProductService);
  private http = inject(HttpClient);

  // Get data based on a signal
  // If the request signal is undefined, no http request is issued
  reviewsResource = rxResource({
    request: this.productService.selectedProduct,
    loader: ( param ) => 
      this.http.get<Review[]>(`${this.reviewsUrl}?productId=^${param.request?.id}$`).pipe(
        map(items => items.sort((a,b) => a.title < b.title ? -1 : 0)
      )),
    defaultValue: []
  });

  eff = effect(() => console.log('loading reviews', this.reviewsResource.isLoading()));
}
