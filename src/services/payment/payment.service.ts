import { Injectable } from '@nestjs/common';
import { AxiosService } from '../axios/axios.service';

@Injectable()
export class PaymentService {
    constructor(private readonly axiosService:AxiosService){}
    async initializePayment(){
        
    }
}
