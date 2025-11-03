import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      definations: {
        path: join(process.cwd(), 'src/graphql.ts'),
      }
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      password: "123123",
      username: "postgres",
      database: 'book_DB',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule { }
