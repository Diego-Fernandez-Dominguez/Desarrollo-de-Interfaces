import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class SignalRConnection {
    private connection: HubConnection | null = null;
    private readonly url = 'https://localhost:7088/gameHub';

    async connect(): Promise<void> {
        this.connection = new HubConnectionBuilder()
            .withUrl(this.url)
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build();

        await this.connection.start();
    }

    async disconnect(): Promise<void> {
        if (this.connection) {
            await this.connection.stop();
        }
    }

    on(methodName: string, callback: (...args: any[]) => void): void {
        if (this.connection) {
            this.connection.on(methodName, callback);
        }
    }

    async invoke(methodName: string, ...args: any[]): Promise<void> {
        if (this.connection) {
            await this.connection.invoke(methodName, ...args);
        }
    }
}