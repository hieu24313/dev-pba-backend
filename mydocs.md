I. Base

- Các lệnh install nest, tạo project
  $ npm i -g @nestjs/cli
  $ nest new project-name
  $ npm install @nestjs/jwt @nestjs/passport passport passport-jwt
  $ npm install --save @nestjs/jwt
  $ npm i bcrypt
  $ npm i -D @types/bcrypt

- cấu trúc gồm các package quản lý
  mỗi phần của project:
- cấu trúc 1 package:

  - dto : quản lý class obj tương ứng với model, quy định validator cho field trong model
  - controller : validation, điều hướng, nhận/trả dữ liệu request
  - module : quản lý các module controller, provider,...
  - service : hàm tương tác database
  - repository : tương tác trực tiếp với database

  * cấu trúc mẫu:
    user
    -> user.controller.spec.ts
    -> user.controller.ts
    -> user.module.ts
    -> user.service.ts
    main.ts
    app.module.ts

- Hoạt động: main.ts nơi chạy đầu tiên khi run -> tạo app
- Luồng chạy của request khi tạo 1 obj:

  - Nhận request ở controller -> validation bằng DTO -> gọi và xử lý ở service -> tương tác với database bằng repository -> return obj đã tạo

    II. Chi tiết hơn

- validator dùng class validator
- transform dữ liệu từ json như body dùng class-transform

III. Injection

- các class được thêm vào module(provider) của package

- Quản lý các class obj service, repository, khi cần chỉ cần get từ đó không cần tạo mới => dễ quản lý hơn

  - Khi dùng thì get ở contructor của class như controller

  - Cách thức hạot động theo kiểu key-value biến thành biến toàn cục trong package:
    useFactory: Truyền hàm
    useValue: Truyền giá trị
    useClass: Truyền class
  - Về inject trong provide: có thể thêm vào đây những provide đã được khai báo, có thể gọi và dùng như sau:

  function createStore(baseUser: UserDTO){}
  baseUser là tên biến
  UserDTO là class của instance được khai báo trong provide có key là BaseUser

  {
  provide: 'STORE_SERVICE',
  useFactory: createStore,
  inject: [
  //Truyền những biến đã đc khai báo và lấy ở nơi khác
  {
  token: 'BaseUser',
  optional: true,
  },
  ],
  }
