import { model } from 'mongoose';
import { ProductSchema } from './product.schema';
import { Product as ProductInterface } from './product.interface';

export const ProductModel = model<ProductInterface>('Product', ProductSchema);

export type Product = ProductInterface;
