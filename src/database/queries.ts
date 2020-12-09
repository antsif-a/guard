import { readdirSync, readFileSync } from 'fs';
import { sqlPath } from '../bot/constants';
import * as path from 'path';

export class Sql {
    private static queries: Record<string, string>;

    static init(): void {
        this.queries = {};
    }

    static load(): void {
        readdirSync(sqlPath).forEach((file) => {
            const sql = readFileSync(path.join(sqlPath, file)).toString('utf-8');
            this.add(path.basename(file, '.sql'), sql);
        });
    }

    static add(key: string, sql: string): void {
        this.queries[key] = sql;
    }

    static get(key: string): string {
        return this.queries[key] ? this.queries[key] : null;
    }
}
