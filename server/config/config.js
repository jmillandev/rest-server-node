// ==================================
//              P O R T
// ==================================
process.env.PORT = process.env.PORT || 3000;

// ==================================
//        D A T A   B A S E S
// ==================================
process.env.mongoUrl = process.env.mongoUrl || 'mongodb://127.0.0.1:27017/coffee'

// ==================================
//            T O K E N
// ==================================
const five_days = "7d"
process.env.tokenExpiration = five_days

process.env.tokenSeed = process.env.tokenSeed || "supersecret-see"