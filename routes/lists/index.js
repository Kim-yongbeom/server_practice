var express = require("express");
var router = express.Router();

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
  const { id, todoContent } = req.body;
  const todoIdx = todolistArr.findIndex((item, index) => {
    return item.id === Number(id);
  });
  if (todoIdx === -1) {
    todolistArr.push({
      id,
      todoContent,
    });
    res.status(200).json({
      message: "생성 완료",
      data: todolistArr,
    });
  } else {
    res.status(400).json({
      message: "이미 존재합니다",
    });
  }
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
  const todoIdx = todolistArr.findIndex((item, index) => {
    return item.id === Number(id);
  });
  if (todoIdx === -1) {
    res.status(400).json({
      message: "존재하지 않습니다",
    });
  } else {
    todolistArr.splice(todoIdx, 1);
    res.status(200).json({
      message: "삭제가 완료되었습니다",
      data: todolistArr,
    });
  }
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
  todolistArr = []; // 리액트 폴더에 있는 값을 새로고침 할 때 초기화 시켜주기 위해 넣음
  res.status(200).json({
    message: "전체 초기화 완료.",
    data: todolistArr,
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
  const { todoContent } = req.body;
  const todoIdx = todolistArr.findIndex((item, index) => {
    return item.id === Number(id);
  });
  if (todoIdx === -1) {
    res.status(400).json({
      message: "존재하지 않습니다",
    });
  } else {
    todolistArr[todoIdx] = { id: Number(id), todoContent };
    res.status(200).json({
      message: "수정완료",
      data: todolistArr,
    });
  }
});

module.exports = router;
