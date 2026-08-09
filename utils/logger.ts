export class Logger {
    constructor(private readonly testName: string){}
    
    private timestamp(): string {
        return new Date().toISOString();
    }

    info(message: string): void {
        console.log(`[INFO] [${this.timestamp()}] [${this.testName} ${message}]`);
    }
    success(message: string): void {
        console.log(`[SUCCESS] [${this.timestamp()}] [${this.testName} ${message}]`);
    }
    warn(message: string): void {
        console.warn(`[WARN] [${this.timestamp()}] [${this.testName} ${message}]`);
    }                
    error(message: string): void {
        console.error(`[ERROR] [${this.timestamp()}] [${this.testName} ${message}]`);
    }    
}