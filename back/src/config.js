import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const config = {
    PORT: 8030,
    SERVER: 'Server',
    DIRNAME: path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:\/)/, '$1')),
    // Esta función tipo getter nos permite configurar dinámicamente
    // la propiedad UPLOAD_DIR en base al valor de otra propiedad (DIRNAME)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/img` }, // Función getter\
    SERVER_UPLOAD_PATH: 'http://localhost:8030/static/img',
    MONGODB_URI: ('mongodb+srv://matisancassani:mati123@cluster0.lcblgku.mongodb.net/ecommerce'),
    // MONGODB_URI: ('mongodb+srv://matisancassani:M5i03s98@cluster0.lcblgku.mongodb.net/(nombre de la base de datos)')
    //

    APP_NAME: 'token',
    SECRET: 'cod3r',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,

    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,

    GMAIL_APP_USER: 'matiassancassani@gmail.com',
    GMAIL_APP_PASS: process.env.GMAIL_APP_PASS,

    // GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    // GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    // GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,

    // GMAIL_APP_USER:'matiassancassani@gmail.com',
    // GMAIL_APP_PASS: process.env.GMAIL_APP_PASS,

}

export default config;