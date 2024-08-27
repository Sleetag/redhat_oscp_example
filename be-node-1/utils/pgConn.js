const { PGUSER, PGPASSWORD, PGSERVER } = process.env;
const PGDB = "sampledb";

function getPGConnectionString() {
  return {
    user: PGUSER,
    password: PGPASSWORD,
    host: PGSERVER,
    port: 5432,
    database: PGDB,
  }
}

function getMongoDB() {
  return MONGO_DB;
}

function getMongoCollection() {
  return MONGO_COLLECTION;
}