import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
// 在 NestJS 中，ExceptionFilter 是一个用于处理应用程序异常的过滤器，它可以截获应用程序中抛出的所有异常，并对这些异常进行处理。
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取请求上下文中的 response对象
    const status = exception.getStatus(); // 获取异常状态码

    console.log('status', status);

    // 设置错误信息
    const message = exception.message
      ? exception.message
      : `${status >= 500 ? 'Service Error' : 'Client Error'}`;
    const errorResponse = {
      data: {},
      message,
      code: -1,
    };

    // 设置返回的状态码， 请求头，发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
