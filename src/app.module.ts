import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './app/user/user.module';
import { GuardiansModule } from './app/guardians/guardians.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.TYPEORM_CONNECTION,
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASS,
      database: process.env.TYPEORM_DATABASE,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      synchronize: true,
    } as TypeOrmModuleOptions),
    UserModule,
    GuardiansModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
