import { Database as Connection } from 'sqlite3';
import { databasePath } from '../constants';

export class Database {
    connect(): Connection {
        return new Connection(databasePath);
    }

    run(sql: string, params: string[] = []): void {
        const con = this.connect();
        con.serialize(() => con.run(sql, params));
        con.close();
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    all(sql: string, params: string[] = [], callback: (err: Error | null, rows: any[]) => void): void {
        const con = this.connect();
        con.serialize(() => con.all(sql, params, callback));
        con.close();
    }

    createDefaults(): void {
        this.run(`CREATE TABLE IF NOT EXISTS Users (
               id VARCHAR(18),
               guild VARCHAR(18),
               warnings INT
        )`);

        this.run(`CREATE TABLE IF NOT EXISTS Guilds (
               id VARCHAR(18),
               prefix VARCHAR(1)
        )`);
    }
}
