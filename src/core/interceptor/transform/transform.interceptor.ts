import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

// 拦截器（Interceptor）是在请求被处理之前和响应被发送之后执行的。拦截器可以用于修改请求或响应，例如添加或删除请求头、记录日志等。
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code: 200,
          success: true,
          msg: '请求成功',
        };
      }),
    );
  }
}
