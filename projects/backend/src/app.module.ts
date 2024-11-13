import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import "dotenv/config";
import { LoggerMiddleware } from './middleware/logger.middleware';
import { NoteModule } from './notes/notes.module';

@Module({
  imports: [
    ...(process.env.USE_MEMORY_DB === 'true' ? [] : [MongooseModule.forRoot(process.env.DATABASE_URI)]), // Condición para importar MongooseModule
    NoteModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
 }