import { Controller, Get } from '@nestjs/common';
import { PurchaseService } from './purchase.service';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Get()
  async getPurchases() {
    return await this.purchaseService.fetchPurchases();
  }
}
