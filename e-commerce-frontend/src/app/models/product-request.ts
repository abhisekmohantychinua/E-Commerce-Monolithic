export interface ProductRequest {
  name: string,
  category: 'FASHION' | 'GROCERY' | 'ELECTRONICS' | 'BEAUTY' | 'ACCESSORIES',
  price: number,
  quantity: number,
  image: File
}
