/* Defines the product */
export interface Product {
  id: number;
  productName: string;
  description: string;
  price: number;
  categoryId: number;
  category?: string;
  supplierIds?: number[];
}

export interface ProductCategory {
  id: number;
  name: string;
}

export interface Supplier {
  id: number;
  name: string;
  cost: number;
  minQuantity: number;
}
