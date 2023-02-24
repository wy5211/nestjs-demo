import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('首页')
@Controller({ host: 'localhost' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ description: '首页-get' })
  getHome() {
    return this.appService.getHello();
  }

  @HttpCode(201)
  @Header('Cache-Control', 'none')
  @Get(':id')
  getHello(@Param() params): string {
    console.log('params.id', params.id);
    return this.appService.getHello();
  }

  @Post()
  @ApiOperation({ description: '首页-post' })
  post(@Body() body) {
    console.log('body', body);
    return this.appService.getHello();
  }
}
