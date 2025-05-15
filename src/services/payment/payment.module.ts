import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { AxiosModule } from '../axios/axios.module';

@Module({
  imports:[AxiosModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
