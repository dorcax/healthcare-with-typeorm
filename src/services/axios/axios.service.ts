import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse} from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AxiosService {
    constructor(private readonly httpService:HttpService){}
    async postReq(url:string,
        data:any,
        config:AxiosRequestConfig<any>):Promise<AxiosResponse<any>>{
            try {
                const res =await this.httpService.post(url,data,config)
                return await lastValueFrom(res)
            } catch (error) {
                throw new HttpException(error,HttpStatus.NOT_FOUND)
            }

    }
    async getReg(url:string,config:AxiosResponse):Promise<AxiosResponse<any>>{
        try {
           const res =await this.httpService.get(url,config)
           return await lastValueFrom(res) 
        } catch (error) {
            throw new HttpException(error,HttpStatus.BAD_REQUEST)
        }

    }
}
