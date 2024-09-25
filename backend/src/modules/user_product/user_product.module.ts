import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProductSchema } from './user_product.model';
import { UserProductService } from './user_product.service';
import { UserProductController } from './user_product.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'UserProduct', schema: UserProductSchema },
    ]),
  ],
  controllers: [UserProductController],
  providers: [UserProductService],
})
export class UserProductModule {}
