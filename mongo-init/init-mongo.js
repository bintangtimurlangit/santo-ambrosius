// Simple MongoDB initialization for Santo Ambrosius
// This script runs when MongoDB starts for the first time

print('Starting MongoDB initialization...')

// Switch to the application database
db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE)

// Create a user for the application with read/write access
db.createUser({
  user: process.env.MONGO_APP_USERNAME,
  pwd: process.env.MONGO_APP_PASSWORD,
  roles: [
    {
      role: 'readWrite',
      db: process.env.MONGO_INITDB_DATABASE,
    },
  ],
})

print('Application user created successfully')
print('Database initialization completed')
