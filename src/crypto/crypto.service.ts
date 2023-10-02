import {Injectable} from '@nestjs/common';
import {AES, enc} from 'crypto-js';

/**
 * Servicio para cifrar y descifrar datos utilizando la biblioteca 'crypto-js'.
 */
@Injectable()
export class CryptoService {
    private readonly encryptionKey: string = 'ZEROQ';

    /**
     * Cifra una cadena de texto utilizando AES.
     * @param data - La cadena de texto que se va a cifrar.
     * @returns La cadena cifrada.
     */
    encrypt(data: string): string {
        return AES.encrypt(data, this.encryptionKey).toString();
    }

    /**
     * Descifra una cadena cifrada utilizando AES.
     * @param encryptedData - La cadena cifrada que se va a descifrar.
     * @returns La cadena de texto descifrada.
     */
    decrypt(encryptedData: string): string {
        const bytes = AES.decrypt(encryptedData, this.encryptionKey);
        return bytes.toString(enc.Utf8);
    }
}
