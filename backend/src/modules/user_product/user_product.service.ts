import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserProduct } from './user_product.model';

@Injectable()
export class UserProductService {
  constructor(
    @InjectModel('UserProduct')
    private readonly interactionModel: Model<UserProduct>,
  ) {}

  async addInteraction(
    userId: string,
    productId: string,
    interactionType: string,
  ): Promise<UserProduct> {
    let score = 0;
    switch (interactionType) {
      case 'view':
        score = 1;
        break;
      case 'like':
        score = 5;
        break;
      case 'purchase':
        score = 10;
        break;
      default:
        throw new Error('Unknown interaction type');
    }

    const existingInteraction = await this.interactionModel.findOne({
      userId,
      productId,
    });

    if (existingInteraction) {
      if (interactionType === 'view' && !existingInteraction.isViewed) {
        existingInteraction.score += score;
        existingInteraction.isViewed = true;
      }

      if (interactionType === 'like' && !existingInteraction.isLiked) {
        existingInteraction.score += score;
        existingInteraction.isLiked = true;
      }

      if (interactionType === 'purchase' && !existingInteraction.isPurchased) {
        existingInteraction.score += score;
        existingInteraction.isPurchased = true;
      }

      return existingInteraction.save();
    } else {
      const newInteraction = new this.interactionModel({
        userId,
        productId,
        score,
        isViewed: interactionType === 'view',
        isLiked: interactionType === 'like',
        isPurchased: interactionType === 'purchase',
      });
      return newInteraction.save();
    }
  }

  async getInteractionsByUser(userId: string): Promise<UserProduct[]> {
    return this.interactionModel.find({ userId }).populate('productId').exec();
  }

  async getTopProductsByUser(userId: string): Promise<UserProduct[]> {
    return this.interactionModel
      .find({ userId })
      .sort({ score: -1 })
      .limit(10)
      .populate('productId')
      .exec();
  }
}
