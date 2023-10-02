import {Module} from '@nestjs/common';
import {LoggerService} from './logs.service';

/**
 * Módulo para el manejo de registros y logs.
 */
@Module({
    providers: [LoggerService],
    exports: [LoggerService],
})
export class LogsModule {
}
