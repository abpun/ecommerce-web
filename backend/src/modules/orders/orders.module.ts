import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './orders.schema';
import { OrderController } from './orders.controller';
import { OrderService } from './orders.service';
import { UserProductService } from '../user_product/user_product.service';
import { UserProductSchema } from '../user_product/user_product.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    MongooseModule.forFeature([
      { name: 'UserProduct', schema: UserProductSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, UserProductService],
})
export class OrderModule {}
