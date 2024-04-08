import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tên ứng dụng của bạn',
      version: '1.0.0',
      description: 'Mô tả ứng dụng của bạn',
    },
  },
  apis: ['src/routes/*.js'], // Đường dẫn đến các file route của bạn
};

const specs = swaggerJsdoc(options);

// console.log(specs)

export default specs;