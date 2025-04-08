import { Component, inject } from '@angular/core';
import { ReviewService } from '../review.service';
import { ProductService } from '../../products/product.service';

@Component({
  selector: 'app-review-list',
  imports: [],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css'
})
export class ReviewListComponent {
  private productService = inject(ProductService);
  private reviewService = inject(ReviewService);

  reviews = this.reviewService.reviewsResource.value;
  isLoading = this.reviewService.reviewsResource.isLoading;
  selectedProduct = this.productService.selectedProduct;
}
