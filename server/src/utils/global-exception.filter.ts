import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

// Function to get error response details
export const getErrorResponseDetails = (exception): any => {
  let message: string;
  let status: number;

  if (exception instanceof HttpException) {
    message = exception.message;
    status = exception.getStatus();
  } else {
    status = HttpStatus.INTERNAL_SERVER_ERROR;
    message = 'Something went wrong. Please try again later.';
  }

  return { status, message };
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger('GlobalExceptionFilter');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { status, message } = getErrorResponseDetails(exception);

    this.logger.error(message, {
      url: request.url,
      method: request.method,
      stack: { ...exception },
    });

    console.error({ exception });
    console.error({ message });
    console.error({ status });

    if (process.env.NODE_ENV !== 'production') {
      console.error({ exception });
      console.error({ message });
      console.error({ status });
    }

    response.status(status).json({
      success: false,
      message,
      payload: '',
    });
  }
}
