import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.TOKEN_SECRET)
import app from './app';

function main() {
  app.listen(app.get('port'));
  console.log('Server on port', app.get('port'));
};

main();