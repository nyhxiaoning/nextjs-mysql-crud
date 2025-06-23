### Nextjs MySQL CRUD

Nextjs CRUD using MySQL and TailwindCSS

## 项目说明
部署使用npm

- 项目使用 Nextjs 14 开发，使用 MySQL 作为数据库，使用 TailwindCSS 作为样式框架。

### 项目默认库使用说明

#### serverless-mysql默认使用：连接池管理
可以管理当前的多个mysql链接管理。允许并发管理。

#### 增加环境变量env支持

#### 增加当前的数据库的内容mysql字段和创建
创建数据库表：
-- 创建 product 表
CREATE TABLE product (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT
);

-- 插入 3 条示例数据
INSERT INTO product (name, price, description) VALUES
('智能手机', 4999.99, '6.5英寸全面屏，128GB存储，高清摄像头'),
('笔记本电脑', 7999.99, '16GB内存，512GB SSD，轻薄便携'),
('无线耳机', 899.00, '主动降噪，蓝牙5.2，续航24小时');

#### 增加

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
