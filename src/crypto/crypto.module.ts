import {Module} from '@nestjs/common';
import {CryptoService} from './crypto.service';

/**
 * Módulo para la funcionalidad de cifrado y descifrado de datos.
 */
@Module({
    providers: [CryptoService],
    exports: [CryptoService],
})
export class CryptoModule {
}
