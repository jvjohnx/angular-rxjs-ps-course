import { inject, Injectable } from '@angular/core';
import { ProductService } from '../products/product.service';
import { httpResource } from '@angular/common/http';
import { Review } from './review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviewsUrl = 'api/reviews';
  private productService = inject(ProductService);

  // Retrieve data into a signal
  // Use appropriate regular expression syntax to get an exact match on the id
  // Otherwise an id = 1 will match 10, 11, ... 100, 101, etc.
  reviewsResource = httpResource<Review[]>(() => 
    this.productService.selectedProduct() ? 
      `${this.reviewsUrl}?productId=^${this.productService.selectedProduct()?.id}$` : undefined,
    { defaultValue: [] }
  );

}
