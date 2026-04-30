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

const authorize = (...roles) => {
    return (req, res, next) => {
        if(req.user != user){
            return res.status(401).json({message: 'Người dùng không xác thực'})
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
            message: `Bạn không có quyền thực hiện hành động này. Yêu cầu role: ${roles.join(', ')}`,
            });
    }
    next();
};
}
const authorizeStaff = (req, res, next) =>{
    if(req.user.role === 'Admin'|| req.user.role === 'Partner')
        return next();
    if(req.user.role === 'Staff'){
        const hotelId = parseInt(req.params.hotelId || req.body.hotelId);
        if(req.user.hotel_id !== hotelId ){
            return res.status(403).json({ message: 'Staff không có quyền thao tác hotel này' });
        }
        return next();
    }
    return res.status(403).json({ message: 'Không có quyền' });

};
const authorizeHotelOwner = (req, res, next) => {
    if (req.user.role === 'Admin') return next(); // Admin bypass

    if (!req.hotel) {
    return res.status(404).json({ message: 'Không tìm thấy hotel' });
    }

    if (req.hotel.partnerId !== req.user.id) {
        return res.status(403).json({ message: 'Bạn không có quyền thao tác với hotel này' });
    }

    next();
    };
module.export={authorize, authenticate, authorizeHotelOwner, authorizeStaff};
