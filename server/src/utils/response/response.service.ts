import { Injectable } from '@nestjs/common';
import { IResponse } from './response.type';

@Injectable()
export class ResponseService {
  response(
    success: boolean,
    message: string,
    payload: Record<string, unknown>,
  ): IResponse {
    return {
      success,
      message,
      payload,
    };
  }
}
