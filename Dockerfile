# Sử dụng Node.js phiên bản 20.15.1
FROM node:20.15.1-alpine

# Thiết lập thư mục làm việc bên trong container
WORKDIR /usr/src/app

# Sao chép file package.json và yarn.lock vào container
COPY package.json yarn.lock ./

# Cài đặt các dependencies
RUN yarn install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng
RUN yarn build

# Expose cổng mà ứng dụng sử dụng (thường là 3000)
EXPOSE 3000

# Lệnh để khởi động ứng dụng
CMD ["yarn", "start:prod"]
