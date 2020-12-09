import { Database as Connection } from 'sqlite3';
import { databasePath } from '../bot/constants';
import { Sql } from 'database/queries';

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
        this.run(Sql.get('defaults'));
    }
}
