import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { DataSourceConfig } from './config/data.source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ReservaModule } from './reserva/reserva.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true
    }),
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    BookModule,
    UsersModule,
    AuthModule,
    ReservaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
