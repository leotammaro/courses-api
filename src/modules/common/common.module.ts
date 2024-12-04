import { Module } from '@nestjs/common';
import { ErrorExceptionsMapper } from './application/exceptions/error.exceptions.mapper';

@Module({
  providers: [ErrorExceptionsMapper],
  exports: [ErrorExceptionsMapper],
})
export class CommonModule {}
