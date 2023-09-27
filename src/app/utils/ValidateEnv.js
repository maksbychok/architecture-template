const { cleanEnv, str, port, url, num } = require('envalid');

function validateEnv() {
  cleanEnv(process.env, {
    SESSION_SK: str(),
    JWT_SK: str(),
    JWT_REFRESH_SK: str(),
    JWT_REFRESH_SK_EXPIRESIN: str(),
    JWT_EXPIRESIN: str(),
    JWT_EXPIRESIN_RESET_PASSWORD: str(),
    JWT_EXPIRESIN_ACCOUNT_SETUP: str(),
    APP_FRONT_URL: str(),
    PORT: port(),
    DEFAULT_BATCH_SIZE: num(),
    EXPIRED_EXPORT_DAYS: num(),

    ADMIN_EMAIL: str(),
    ADMIN_PASSWORD: str(),
    UPLOADS_FOLDER_PATH: str(),
    UPLOADS_FOLDER_URI: url(),

    POSTGRES_HOST: str(),
    POSTGRES_USER: str(),
    POSTGRES_PASSWORD: str(),
    POSTGRES_DB: str(),
    POSTGRES_PORT: port(),

    STRIPE_SECRET_KEY: str(),
    STRIPE_CLIENT_ID: str(),
    STRIPE_CURRENCY: str(),
    STRIPE_WEBHOOK_SECRET: str(),
    STRIPE_CONNECT_WEBHOOK_SECRET: str(),
    STRIPE_PLAN_INTERVAL: str(),

    TWILIO_ACCOUNT_SID: str(),
    TWILIO_API_KEY: str(),
    TWILIO_API_SECRET: str(),
    ANDROID_APP_HASH: str(),
    ANDROID_CLIENT_SECRET: str(),
    VERIFICATION_SERVICE_SID: str(),
    COUNTRY_CODE: str(),
    STRIPE_MAX_NETWORK_RETRIES: num(),

    SENDGRID_API_KEY: str(),

    EMAIL_MERCHANT_FROM: str(),
    EMAIL_FROM_NAME: str(),
  });
}

module.exports = validateEnv;
