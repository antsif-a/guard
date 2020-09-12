export class Queries {
    static getWarnings = `
        SELECT warnings
        FROM Users
        WHERE id = ? AND guild = ?;
    `;
}