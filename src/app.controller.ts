import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('首页')
@Controller({ host: 'localhost' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HttpCode(201)
  @Header('Cache-Control', 'none')
  @Get(':id')
  getHello(@Param() params): string {
    console.log('params.id', params.id);
    return this.appService.getHello();
  }

  @Post()
  post(@Body() body) {
    console.log('body', body);
    return this.appService.getHello();
  }
}
