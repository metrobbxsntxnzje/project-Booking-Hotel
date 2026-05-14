'use strict';
const db = require('../../../models');
const AppError = require('../../../utils/appError');



// ── Lấy danh sách requests (Admin xem) ────────────────────────────────────────
const getAllRequests = async ({ reqUser, status }) => {
    if (reqUser.role !== 'Admin') {
        throw new AppError('Chỉ Admin mới có quyền xem danh sách yêu cầu', 403);
    }

    const where = {};

    if (status) {
        where.status = status.trim().toUpperCase();
    }

    return await db.PartnerRequest.findAll({
        where,
        order: [['createdAt', 'DESC']],
        include: [
            {
                model: db.User,
                as: 'requester',
                required: false,
                attributes: ['id', 'fullName', 'email', 'phone'],
            },
            {
                model: db.User,
                as: 'reviewer',
                required: false,
                attributes: ['id', 'fullName', 'email'],
            },
        ],
    });
};


// ── Admin duyệt / từ chối ─────────────────────────────────────────────────────
const reviewRequest = async ({ id, reqUser, status, adminNote }) => {
    if (reqUser.role !== 'Admin') {
        throw new AppError('Chỉ Admin mới có thể duyệt yêu cầu', 403);
    }

    if (!['APPROVED', 'REJECTED'].includes(status)) {
        throw new AppError('Trạng thái không hợp lệ. Chỉ chấp nhận APPROVED hoặc REJECTED', 400);
    }

    const request = await db.PartnerRequest.findOne({
        where: { id, status: 'PENDING' },
    });
    if (!request) throw new AppError('Không tìm thấy yêu cầu hoặc yêu cầu không ở trạng thái PENDING', 404);

    // Cập nhật request
    await request.update({
        status,
        adminNote: adminNote || null,
        reviewedBy: reqUser.id,
        reviewedAt: new Date(),
    });

    if (status === 'APPROVED') {
        // Insert vào bảng partners
        await db.Partner.create({
            userId: request.userId,
            companyName: request.companyName,
            taxCode: request.taxCode,
            businessLicense: request.businessLicense,
        });

        // Nâng role user lên Partner
        await db.User.update(
            { role: 'Partner' },
            { where: { id: request.userId } }
        );

        return { message: 'Đã duyệt yêu cầu. User được nâng lên Partner thành công', request };
    }

    return { message: 'Đã từ chối yêu cầu', request };
};

module.exports = { getAllRequests, reviewRequest };