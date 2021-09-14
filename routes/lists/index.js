var express = require("express");
var router = express.Router();

const con = require("../../modules/mysql");

let todolistArr = [];

// 투두 리스트 생성
// method : POST
// url : /lists
// body : { id : 0, todoContent : '내일 할일'}
//
// response
// 이미 id 존재 한다면 400번 오류
// {message : "이미 존재합니다"}
// 존재하지 않는다면 200번
// {message : "생성 완료"}

router.post("/", (req, res) => {
  const { todoContent } = req.body;
  const sql = `insert into ssac_todolist (todoContent, checked) values(?,?)`;
  const params = [todoContent, 0]; // ? 에 들어갈 값 기입

  con.query(sql, params, (err, result, feilds) => {
    if (err) throw err;
    console.log(result);
    res.status(200).json({
      message: "생성 완료",
    });
    // {
    //   fieldCount: 0,
    //   affectedRows: 1,
    //   insertId: 3,
    //   info: '',
    //   serverStatus: 2,
    //   warningStatus: 0
    // }
  });
});

// 투두 리스트 삭제
// method : DELETE
// url : /lists/:id
// id(0 과 같은 number값 받아오기) <- params
//
// response
// 동일한 값 입력시 200번
// {message : "삭제가 완료되었습니다", data : todolistArr} // [{ id : 0, todoContent : '내일 할일'},{ id : 1, todoContent : '내일 할일'}]
// 존재하지 않는다면 400번
// {message : "존재하지 않습니다"}

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = `delete from ssac_todolist where id = ?`;
  const params = [Number(id)];

  con.query(sql, params, (err, result, feilds) => {
    if (err) {
      return res.status(400).json({
        message: "삭제 실패",
      });
    }

    res.status(200).json({
      message: "삭제 완료",
    });
    console.log(result);
  });
});

// 투두 리스트 전체 조회
// method : GET
// url : /lists
//
// response
// 하나도 없으면 400번
// {message : "존재하지 않습니다"}
// 한개라도 존재한다면
// {message : "조회 완료", data : todolistArr} // [{ id : 0, todoContent : '내일 할일'},{ id : 1, todoContent : '내일 할일'}]

router.get("/", (req, res) => {
  // 전체 데이터를 조회
  con.query("select * from ssac_todolist", (err, result, fields) => {
    if (err) {
      return res.status(400).json({
        message: "조회 실패",
      });
    }
    res.status(200).json({
      message: "조회 성공",
      data: result,
    });
  });
});

// 투두 리스트 수정
// method : PUT
// url : /lists/:id
// id(0 과 같은 number값 받아오기) <- params
// body : {todoContent : '모레 할 일'}
//
// response
// params 값이 없으면 400번 오류
// {message : "존재하지 않습니다"}
// 존재 한다면 200번
// {message : "수정 완료", data : todolist[id]} // [{ id : 0, todoContent : '내일 할일'}]

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { todoContent, checked } = req.body;

  const sql = `update ssac_todolist set todoContent = ?, checked= ? where id = ? `;
  const params = [todoContent, checked, Number(id)]; // ? 에 들어갈 값 기입

  con.query(sql, params, (err, result, feilds) => {
    if (err) {
      return res.status(400).json({
        message: "수정 실패",
      });
    }

    res.status(200).json({
      message: "수정 성공",
    });
  });
  // const todoIdx = todolistArr.findIndex((item, index) => {
  //   return item.id === Number(id);
  // });
  // if (todoIdx === -1) {
  //   res.status(400).json({
  //     message: "존재하지 않습니다",
  //   });
  // } else {
  //   todolistArr[todoIdx] = { id: Number(id), todoContent };
  //   res.status(200).json({
  //     message: "수정완료",
  //     data: todolistArr,
  //   });
  // }
});

module.exports = router;
