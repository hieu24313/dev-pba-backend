I. Base

- Các lệnh install nest, tạo project
  $ npm i -g @nestjs/cli
  $ nest new project-name

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

II. Chi tiết hơn

- validator dùng class validator
- transform dữ liệu từ json như body dùng class-transform

III. Injection

- các class được thêm vào module(provider) của package

- Quản lý các class obj service, repository, khi cần chỉ cần get từ đó không cần tạo mới => dễ quản lý hơn
  - Khi dùng thì get ở contructor của class như controller