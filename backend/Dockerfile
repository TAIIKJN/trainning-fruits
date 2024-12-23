FROM node:20
ENV TZ=Asia/Bangkok
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# สร้างและกำหนดโฟลเดอร์ทำงาน
RUN mkdir /app
WORKDIR /app

# คัดลอกไฟล์ Static และ Config
COPY static ./static
COPY package.json .
COPY package-lock.json .
COPY prisma ./prisma

# ติดตั้ง dependencies
ENV NODE_ENV=production
RUN npm ci

# คอมไพล์ TypeScript เป็น JavaScript
COPY . .
RUN npm run build

# คัดลอกไฟล์ที่คอมไพล์แล้วไปยังตำแหน่งที่ถูกต้อง
COPY dist ./dist

# สร้าง Prisma Client
RUN npx prisma generate

# เปิดพอร์ตและตั้งคำสั่งเริ่มต้น
EXPOSE 80
CMD ["node", "dist/app.js"]
