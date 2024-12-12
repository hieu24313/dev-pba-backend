# Sử dụng Node.js phiên bản 20.15.1
FROM node:20.15.1-alpine

# Thiết lập thư mục làm việc bên trong container
WORKDIR /usr/src/app

# Sao chép file package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng
RUN npm run build

# Expose cổng mà ứng dụng sử dụng (thường là 3000)
EXPOSE 3000

# Lệnh để khởi động ứng dụng
CMD ["npm", "run", "start:prod"]
