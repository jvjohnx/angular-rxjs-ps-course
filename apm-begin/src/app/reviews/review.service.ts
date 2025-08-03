import { inject, Injectable, signal } from '@angular/core';
import { ProductService } from '../products/product.service';
import {HttpClient, httpResource} from '@angular/common/http';
import { Review } from './review';
import {rxResource} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewsUrl = 'api/reviews';
  private productService = inject(ProductService);

  http = inject(HttpClient);
  //use rxResource to retrieve data
  reviewsResource = rxResource({
    params: this.productService.selectedProduct,
    stream: param => this.http.get<Review[]>( `${this.reviewsUrl}?productId=${param?.params.id}`),
    // defaultValue: [] as Review[] //gives an error, may be false alarm
  });


  //use httpResource to retrieve data
  // reviewsResource = httpResource<Review[]>(() =>
  //   this.productService.selectedProduct() ?
  //     `${this.reviewsUrl}?productId=^${this.productService.selectedProduct()?.id}$` : undefined,
  //   { defaultValue: [] }
  // );

  // *** To support search ***

  enteredSearch = signal('');

  reviewSearchResource = httpResource<Review[]>(() =>
    `${this.reviewsUrl}?text=${this.enteredSearch()}`,
    { defaultValue: [] }
  );
}
