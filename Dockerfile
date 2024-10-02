# ใช้ baseimage node version 18
FROM node:18

# กำหนด directory เริ่มต้นใน container
WORKDIR /usr/src/app

# คัดลอก package.json จากเครื่อง ไปบน container
COPY ./package.json ./

RUN npm install

# คัดลอกไฟล์จากโฟลดเดอร์มาบน container
COPY ./app.js ./

EXPOSE 3000

# รัน node
CMD [ "node","app.js" ] 