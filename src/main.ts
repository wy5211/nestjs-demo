import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  app.setGlobalPrefix('api');

  // NestJS 中的 ValidationPipe 是一个预先定义的管道，用于验证传入的请求正文体（request body）、查询参数（query parameter）、路由参数（route parameter）等数据的有效性。它能够自动检查输入数据是否符合指定的验证规则，并在数据无效时返回具体的错误信息，从而大大简化了开发者的工作。
  app.useGlobalPipes(new ValidationPipe());

  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('博客管理后台')
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
