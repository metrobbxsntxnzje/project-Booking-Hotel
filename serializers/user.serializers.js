'use strict';

const USER_FIELDS = {
  Admin: [
    'id', 'fullName', 'email', 'phone', 'status', 'role',
    'gender', 'birthDate', 'avatarUrl', 'address',
    'cityId', 'wardId', 'hotel_id', 'created_by', 'createdAt', 'deletedAt'
  ],
  Staff: [
    'id', 'fullName', 'email', 'phone', 'status', 'role',
    'gender', 'avatarUrl', 'hotel_id'
  ],
  Partner: [
    'id', 'fullName', 'email', 'phone', 'avatarUrl',
    'gender', 'birthDate', 'address', 'cityId', 'wardId'
  ],
  Customer: [
    'id', 'fullName', 'email', 'phone', 'avatarUrl',
    'gender', 'birthDate', 'address'
  ],
};

// Generic picker — dùng cho mọi model
const pick = (obj, fields) => {
  return fields.reduce((acc, key) => {
    if (key in obj) acc[key] = obj[key];
    return acc;
  }, {});
};

const serialize = (modelName, role) => (data) => {
  const fields = FIELDS_MAP[modelName]?.[role];
  if (!fields) return data; // fallback: trả hết nếu chưa config

  if (Array.isArray(data)) {
    return data.map(item => pick(
      item?.dataValues ?? item,
      fields
    ));
  }
  return pick(data?.dataValues ?? data, fields);
};

// Map field config theo model
const FIELDS_MAP = {
  User: USER_FIELDS,
  // Hotel: HOTEL_FIELDS,   ← thêm sau
  // Booking: BOOKING_FIELDS,
};

module.exports = { serialize };