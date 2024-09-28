import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './orders.schema';
import { OrderController } from './orders.controller';
import { OrderService } from './orders.service';
import { UserSchema } from '../users/users.shcema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    // MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
