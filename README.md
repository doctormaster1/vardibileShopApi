# vardibileShopApi

## Tech Stack 
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## API
- [Cloudinary API](https://cloudinary.com/)

## Installation
**1. Clone this repo command :**
```
git clone https://github.com/doctormaster1/vardibileShopApi.git
cd vardibileShopApi
```

**2. Now install all the required packages :**
```
npm install
```

**3. Create a .env file in config folder :**
```
MONGO_URI = //your mongoDB URI
REDIS_URI = //your redis URI
PORT = 4000

JWT_SECRET_KEY = // token secret key
JWT_EXPIRATION = // token expiration in seconds
JWT_REFRESH_EXPIRATION = // refresh token expiration in seconds

FILE_UPLOAD_SIZE = 1000000

SERVICE_GMAIL = gmail
GMAIL_USER = //gmail address
GMAIL_PASS = //gmail password
GMAIL_TEST = //test mail

CLOUD_NAME = //cloudinary cloud name
API_KEY = //cloudinary api key
API_SECRET = //cloudinary secret key
```

**4. Now start :**
```
npm run start
```

**5. Open your browser and go to `https://localhost:4000`**
