const mysqlConfig = {
  host: "localhost",
  port: 포트번호,
  user: "본인 아이디(root)",
  password: "본인 비밀번호", // 본인 비밀번호
  database: "스키마 이름", // 스키마 이름
  connectionLimit: 10,
};

module.exports = mysqlConfig;
