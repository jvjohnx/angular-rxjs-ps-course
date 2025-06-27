import { Component, inject } from '@angular/core';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-review-list',
  imports: [],
  templateUrl: './review-list.html',
  styleUrl: './review-list.css'
})
export class ReviewList {
  private reviewService = inject(ReviewService);

  reviews = this.reviewService.reviewsResource.value;
  // reviews = this.reviewService.reviews;
  isLoading = this.reviewService.reviewsResource.isLoading;
}
