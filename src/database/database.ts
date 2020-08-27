import { Database as Connection } from 'sqlite3';
import { databasePath } from '../constants';

export class Database {
    connect(): Connection {
        return new Connection(databasePath);
    }

    runSql(sql: string, params: string[] = []): void {
        const con = this.connect();
        con.serialize(() => con.run(sql, params));
    }

    createDefaults(): void {
        this.runSql(`CREATE TABLE IF NOT EXISTS Users (
               id VARCHAR(18),
               guild VARCHAR(18),
               warnings INT
        )`);

        this.runSql(`CREATE TABLE IF NOT EXISTS Guilds (
               id VARCHAR(18),
               prefix VARCHAR(1) 
        )`);
    }
}
