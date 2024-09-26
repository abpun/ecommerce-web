import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Payment } from './payment.schema';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('')
  async createPayment(@Body() payment: Payment) {
    const data = await this.paymentService.create(payment);
    if (!data) throw new BadRequestException('Payment not created');
    return { status: 201, payment: data };
  }

  @Patch(':id')
  async updatePayment(@Body() payment: Payment, @Param('id') id: string) {
    if (!payment.pidx || !payment.tidx) {
      throw new BadRequestException('pidx and tidx are required');
    }
    const updated = await this.paymentService.update(id, payment);
    return { status: 200, payment: updated };
  }
}
