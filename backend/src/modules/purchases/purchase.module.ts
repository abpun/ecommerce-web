import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseSchema } from 'src/schemas/purchase.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Purchase',
        schema: PurchaseSchema,
      },
    ]),
  ],
  controllers: [],
})
export class PurchaseModule {}
