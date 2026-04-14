import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';

dotenv.config();
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(helmet());
    app.use(
        session({
            secret: process.env.MY_SECRET,
            resave: Boolean(process.env.SESSION_RESAVE),
            saveUninitialized: Boolean(process.env.SAVEUNINITIALIZED),
            cookie: {
                maxAge: +process.env.SESSION_COOKIE_MAX_AGE,
            },
        }),
    );
    const config = new DocumentBuilder()
        .setTitle('Shiksha API')
        .setDescription('Shiksha Study portal APIs')
        .setVersion('0.1')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    app.useGlobalPipes(new ValidationPipe());
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(8083);
}
bootstrap();
