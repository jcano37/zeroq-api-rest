import {Injectable} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Servicio para el registro de errores y depuración en archivos de registro.
 */
@Injectable()
export class LoggerService {
    private logDirectory = './logs';
    private errorLogDirectory = path.join(this.logDirectory, 'error');
    private debugLogDirectory = path.join(this.logDirectory, 'debug');

    /**
     * Constructor del servicio.
     * Verifica la existencia de los directorios de registro y los crea si no existen.
     */
    constructor() {
        this.ensureLogDirectoriesExist();
    }

    private ensureLogDirectoriesExist() {
        if (!fs.existsSync(this.logDirectory)) {
            fs.mkdirSync(this.logDirectory);
        }
        if (!fs.existsSync(this.errorLogDirectory)) {
            fs.mkdirSync(this.errorLogDirectory);
        }
        if (!fs.existsSync(this.debugLogDirectory)) {
            fs.mkdirSync(this.debugLogDirectory);
        }
    }

    /**
     * Registra un mensaje de error en el archivo de registro de errores.
     * @param {string} error - El mensaje de error a registrar.
     */
    logError(error: string) {
        this.logToFile(this.errorLogDirectory, error);
    }

    /**
     * Registra un mensaje de depuración en el archivo de registro de depuración.
     * @param {string} info - El mensaje de depuración a registrar.
     */
    logDebug(info: string) {
        this.logToFile(this.debugLogDirectory, info);
    }

    private logToFile(directory: string, message: string) {
        const currentDate = new Date();
        const logFileName = `${currentDate.toISOString().slice(0, 10)}.log`;
        const logFilePath = path.join(directory, logFileName);

        fs.appendFileSync(logFilePath, `[${currentDate.toISOString()}] ${message}\n`);
    }
}
