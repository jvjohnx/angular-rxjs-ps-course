import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from './product';
import { combineLatest, forkJoin, map, tap } from 'rxjs';
import { ProductCategoryService } from '../product-categories/product-category.service';
import { ProductCategory } from '../product-categories/product-category';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';
  private http = inject(HttpClient);
  private productCategoryService = inject(ProductCategoryService);

  // Shared signals
  selectedProduct = signal<Product | undefined>(undefined);

  // Define the pipelines
  private products$ = this.http.get<Product[]>(this.productsUrl)
  .pipe(
    tap(p => console.table(p))
  );

  // Maps each product's category id to a name
  private productsWithCategory$ = forkJoin(
    [this.products$,
    this.productCategoryService.productCategories$]
  ).pipe(
    map(([products, categories]: [Product[], ProductCategory[]]) =>
      products.map(
        p =>
          ({
            ...p,
            category: categories.find(c =>
              p.categoryId === c.id)?.name
          } as Product)
      )
    )
  );

  // Use a resource to issue the http request and
  // return the result into a signal
  productsResource = rxResource({
    loader: () => this.productsWithCategory$,
    defaultValue: []
  });
}
