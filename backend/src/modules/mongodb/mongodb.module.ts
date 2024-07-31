// src/mongodb/mongodb.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongodbService } from './mongodb.service';
import { MongodbController } from './mongodb.controller';
// import { UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    // MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [MongodbService],
  controllers: [MongodbController],
})
export class MongodbModule {}
