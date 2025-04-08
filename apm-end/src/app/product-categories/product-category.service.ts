import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductCategory } from './product-category';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private productCategoriesUrl = 'api/productCategories';
  private http = inject(HttpClient);

  productCategories$ = this.http.get<ProductCategory[]>(this.productCategoriesUrl)
  .pipe(
    tap(c => console.table(c))
  );
}
