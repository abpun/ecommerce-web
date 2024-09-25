import { Module } from '@nestjs/common';
import { ProductsController } from './product.controller';
import { ProductService } from './product.service';
import { HttpModule } from '@nestjs/axios';
import { ProductSchema } from './product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProductSchema } from '../user_product/user_product.model';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: 'UserProduct', schema: UserProductSchema },
    ]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductService],
})
export class ProductsModule {}
