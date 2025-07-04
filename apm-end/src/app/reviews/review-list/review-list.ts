import { Component, inject } from '@angular/core';
import { ReviewService } from '../review.service';
import { ProductService } from '../../products/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-list',
  imports: [FormsModule],
  templateUrl: './review-list.html',
  styleUrl: './review-list.css'
})
export class ReviewList {
  pageTitle = "Product Reviews";
  private reviewService = inject(ReviewService);
  private productService = inject(ProductService);

  // Review data
  reviews = this.reviewService.reviewsResource.value;
  isLoading = this.reviewService.reviewsResource.isLoading;
  selectedProduct = this.productService.selectedProduct;
}
