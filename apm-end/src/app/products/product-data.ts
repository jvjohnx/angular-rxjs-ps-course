import { Product, ProductCategory } from './product';

export class ProductData {

  static products: Product[] = [
    {
      id: 1,
      productName: 'Leaf Rake',
      description: 'Leaf rake with 48-inch wooden handle',
      price: 19.95,
      categoryId: 1,
      supplierIds: [1, 2]
    },
    {
      id: 2,
      productName: 'Garden Cart',
      description: '15 gallon capacity rolling garden cart',
      price: 32.99,
      categoryId: 1,
      supplierIds: [3, 4]
    },
    {
      id: 5,
      productName: 'Hammer',
      description: 'Curved claw steel hammer',
      price: 8.9,
      categoryId: 3,
      supplierIds: [5, 6]
    },
    {
      id: 8,
      productName: 'Saw',
      description: '15-inch steel blade hand saw',
      price: 11.55,
      categoryId: 3,
      supplierIds: [7, 8]
    },
    {
      id: 10,
      productName: 'Video Game Controller',
      description: 'Standard two-button video game controller',
      price: 35.95,
      categoryId: 5,
      supplierIds: [9, 10]
    }
  ];

  static categories: ProductCategory[] = [
    {
      id: 1,
      name: 'Garden'
    },
    {
      id: 3,
      name: 'Toolbox'
    },
    {
      id: 5,
      name: 'Gaming'
    }
  ];

}
