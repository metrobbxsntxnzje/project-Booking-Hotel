# Usage Guide

Huong dan su dung base backend cho project booking hotel.

## Luong lam viec de bat dau

1. Chinh `index.js` de dang ky cac route thuc te.
2. Tao file route trong `routes/`.
3. Viet controller trong `controllers/`.
4. Tao model trong `models/` neu can lam viec voi database.
5. Them validator trong `validators/` de kiem tra request.

## Vi du mo rong

- Tao `routes/booking.js` de xu ly API dat phong.
- Tao `controllers/bookingController.js` cho cac thao tac CRUD.
- Tao `models/Booking.js`, `models/Hotel.js`, `models/Room.js`.
- Them middleware xac thuc neu API can dang nhap.

## Goi y hoc tu base

- Doc cac README trong tung thu muc de hieu vai tro cua tung phan.
- Doc comment trong code de nam luong xu ly.
- Bat dau tu route don gian truoc khi gan database va auth.
