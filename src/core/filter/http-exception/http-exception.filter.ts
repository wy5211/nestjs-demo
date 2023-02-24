import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

// 在 NestJS 中，ExceptionFilter 是一个用于处理应用程序异常的过滤器，它可以截获应用程序中抛出的所有异常，并对这些异常进行处理。
// 异常过滤器（Exception Filter）是在异常抛出之后，但在响应被发送之前执行的。当应用程序中出现异常时，NestJS 会捕获异常并将其传递给异常过滤器，异常过滤器可以根据异常的类型、内容等信息来处理异常并返回响应。
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // 获取请求上下文
    const ctx = host.switchToHttp();
    // 获取请求上下文中的 response对象
    const response = ctx.getResponse();
    // 获取异常状态码
    const status = exception.getStatus();

    // 设置错误信息
    const errMsg = (exception.getResponse() as any)?.message?.[0];

    const message = errMsg ?? '发生了一点错误，请稍后再试';

    const errorResponse = {
      data: null,
      message,
      code: status,
      success: false,
    };

    // 设置返回的状态码， 请求头，发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
