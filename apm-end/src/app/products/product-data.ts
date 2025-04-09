import { Product, ProductCategory, Supplier } from './product';

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

  static suppliers: Supplier[] = [
    {
      id: 1,
      name: 'Acme Gardening Supply',
      cost: 16.95,
      minQuantity: 12
    },
    {
      id: 2,
      name: 'Standard Gardening',
      cost: 15.95,
      minQuantity: 24
    },

    {
      id: 3,
      name: 'Acme Gardening Supply',
      cost: 12,
      minQuantity: 6
    },
    {
      id: 4,
      name: 'Acme General Supply',
      cost: 25,
      minQuantity: 2
    },
    {
      id: 5,
      name: 'Acme General Supply',
      cost: 2,
      minQuantity: 24
    },
    {
      id: 6,
      name: 'Acme Tool Supply',
      cost: 4,
      minQuantity: 12
    },
    {
      id: 7,
      name: 'Tools Are Us',
      cost: 8,
      minQuantity: 8
    },
    {
      id: 8,
      name: 'Acme Tool Supply',
      cost: 4,
      minQuantity: 12
    },
    {
      id: 9,
      name: 'Acme Game Supply',
      cost: 20,
      minQuantity: 6
    },
    {
      id: 10,
      name: 'Acme General Supply',
      cost: 12,
      minQuantity: 12
    }
  ];

}
