require('module-alias/register');
require('dotenv').config();

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const cors = require('cors');
const helmet = require('helmet').default;
const logger = require('./utils/logger')(module)

const cityRoutesAdmin = require('./routes/admin/city.route');
const wardRoutesAdmin = require('./routes/admin/ward.route');


const cityRoutes = require('./routes/share/city.route');
const wardRoutes = require('./routes/share/ward.route')
const bedTypeRoutes = require('./routes/bedtype.route');
const authRoutes = require('./routes/auth.route')
const userRoutes = require('./routes/user.route')
const partnerRoutes = require('./routes/partner.route')


const { dateForFilename } = require('./utils/dateFormatter');


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
	origin: process.env.CLIENT_URL || 'http://localhost:5000',
	credentials: true,
}));

app.use(helmet());

// routes admin
app.use('/api/admin/cities', cityRoutesAdmin);
app.use('/api/admin/ward', wardRoutesAdmin);

//route share
app.use('/api/cities', cityRoutes);
app.use('/api/wards', wardRoutes);
app.use('/api/bedtypes', bedTypeRoutes)
app.use('/api/users', userRoutes)
app.use('/api/amenities', require('./routes/amenity.route'))
//route auth
app.use('/api/auth', authRoutes)

app.use('/api/hotel', require('./routes/hotel.route'))
app.use('/api/partner-request', partnerRoutes)

//route partner
app.use('/api/partner', require('./routes/partner'))








app.get('/healthy', (req, res) =>
	res.json({ status: 'ok', timestamp: dateForFilename() })
);

// 404 handler
app.use((req, res) => {
	res.status(404).json({
		message: `Route ${req.method} ${req.path} không tồn tại`
	});
});

// error handler
app.use((err, req, res, next) => {
	res.status(err.statusCode || 500).json({
		message: err.message || 'Lỗi server không mong đợi'
	});
});

// start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
	logger.info(`App Listening on port ${port}`);
});

module.exports = app;
