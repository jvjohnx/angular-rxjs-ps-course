import {HttpClient, httpResource} from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import { Product } from './product';
import {rxResource} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';

  http = inject(HttpClient);

  // Signals to support the template
  selectedProduct = signal<Product | undefined>(undefined);

  // Retrieve data into a signal
  // productsResource = httpResource<Product[]>(() => this.productsUrl, { defaultValue: [] }); //using httpResource

  //update  productsResource to use rxResource instead of httpResource
  productsResource = rxResource({
    stream:  () => this.http.get(this.productsUrl)
  });

}
