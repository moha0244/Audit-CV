// Import de la configuration de production
import { environment as productionEnv } from './environment.production';

// Configuration par défaut (développement)
const developmentEnv = {
  production: false,
  apiUrl: 'http://localhost:8000/analyze'
};


const isProduction = process.env.NODE_ENV === 'production';


export const environment = isProduction ? productionEnv : developmentEnv;
