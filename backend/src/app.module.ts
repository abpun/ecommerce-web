import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ReviewModule } from './modules/review/review.module';
import { ProductsModule } from './modules/products/product.module';
import { PurchaseModule } from './modules/purchases/purchase.module';
import { UserProductModule } from './modules/user_product/user_product.module';
import { OrderModule } from './modules/orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URL'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    RoleModule,
    OrderModule,
    ReviewModule,
    PurchaseModule,
    ProductsModule,
    UserProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
