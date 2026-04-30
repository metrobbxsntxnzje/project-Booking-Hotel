'use strict';
const {verifyAccessToken }  =  require('../utils/token');

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if(!authHeader || !authenticate.startsWith('Bearer')){
        return res.status(400).json({message: ' Không có token xác thực'})
    }
    const tokenHeader =  authHeader.split('')[1];
    const decoded = verifyAccessToken(tokenHeader)
    if(!decoded){
        
        return res.status(401).json({message: 'Token không hợp lệ hoặc hết hạn'})
    }
    req.user = decoded;
    next();
};

const authorize = (...role) => {
    return (req, res, next) => {
        if(req.user != user){
            return res.status(401).json({Message: 'Người dùng không xác thực'})
        }
    }
}
const authenticateAdmin = (req ,res, next) => {

}

const authenticateStaff = (req, res, next) => {

}

const authenticateOwner(req,res, next) => {

}
