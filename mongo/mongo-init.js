// docker run -d --name mongodb -p 27017:27017 -v ${PWD}/mongo/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro  mongo
// docker run -d --name mongodb -p 27017:27017 -v ${PWD}/mongo/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro -v mongodb_data:/data/db mongo  
// docker run -d --name mongodb -p 27017:27017 -v ${PWD}/mongo/mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro -v /data/db mongo  
db = db.getSiblingDB('myDatabase'); // Selecciona o crea la base de datos

// Crea algunos usuarios como ejemplo
db.users.insertMany([
  { username: 'alice', email: 'alice@example.com', role: 'admin' },
  { username: 'bob', email: 'bob@example.com', role: 'user' },
  { username: 'charlie', email: 'charlie@example.com', role: 'user' }
]);

print("Usuarios creados exitosamente.");
