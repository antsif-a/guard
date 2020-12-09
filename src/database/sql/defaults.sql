CREATE TABLE IF NOT EXISTS Users (
    id VARCHAR(18),
    guild VARCHAR(18),
    warnings INT
);

CREATE TABLE IF NOT EXISTS Guilds (
    id VARCHAR(18),
    prefix VARCHAR(1)
);
