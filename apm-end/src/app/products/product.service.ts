import { HttpClient, httpResource } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Product, ProductCategory } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';
  private productCategoriesUrl = 'api/productCategories';
  private http = inject(HttpClient);

  // Shared signals
  selectedProduct = signal<Product | undefined>(undefined);

  // With httpResource
  productsResource = httpResource<Product[]>(() => this.productsUrl);
  productCategoriesResource = httpResource<ProductCategory[]>(() => this.productCategoriesUrl);
  products = computed(() =>
    this.productsResource.value() && this.productCategoriesResource.value()
      ? this.productsResource.value()!.map(
        p => ({
          ...p,
          category: this.productCategoriesResource.value()?.find(c =>
            p.categoryId === c.id)?.name
        } as Product))
      : []
  );

  // With rxResource
  // private products$ = this.http.get<Product[]>(this.productsUrl)
  //   .pipe(
  //     tap(p => console.table(p))
  //   );

  // productCategories$ = this.http.get<ProductCategory[]>(this.productCategoriesUrl)
  //   .pipe(
  //     tap(c => console.table(c))
  //   );

  // // Maps each product's category id to a name
  // private productsWithCategory$ = forkJoin(
  //   [this.products$,
  //   this.productCategories$]
  // ).pipe(
  //   map(([products, categories]: [Product[], ProductCategory[]]) =>
  //     products.map(
  //       p =>
  //       ({
  //         ...p,
  //         category: categories.find(c =>
  //           p.categoryId === c.id)?.name
  //       } as Product)
  //     )
  //   )
  // );

  // // Use a resource to issue the http request and
  // // return the result into a signal
  // productsResource = rxResource({
  //   loader: () => this.productsWithCategory$,
  //   defaultValue: []
  // });

}
