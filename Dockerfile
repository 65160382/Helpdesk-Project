# ใช้ baseimage node version 18
FROM node:18

# กำหนด directory เริ่มต้นใน container
WORKDIR /usr/src/app

# คัดลอก package.json จากเครื่อง ไปบน container
COPY ./package.json ./ 

# ติดตั้ง dependencies
RUN npm install

# ติดตั้ง nodemon สำหรับ hot-reloading (สำหรับการพัฒนา)
RUN npm install -g nodemon

# คัดลอกไฟล์ทั้งหมดจากโฟลเดอร์ปัจจุบันไปยังโฟลเดอร์ /usr/src/app ใน Docker container 
COPY . .

EXPOSE 3000

# รันแอปด้วย nodemon เพื่อ hot-reloading
CMD [ "nodemon", "app.js" ]
