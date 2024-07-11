import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import nextId from "react-id-generator";
import { addTodo } from "../../../redux/modules/todos.js";

const Form = () => {
  const id = nextId();
  const dispatch = useDispatch() // dispatch 추가
  
  const [todo, setTodo] = useState({
    id: id, // 초기화
    title: "",
    body: "",
    isDone: false,
  });
  
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  // 취소 버튼 추가
  const onCancelHandler = () => {
    setTodo({
      id: nextId(), // ID 할당
      title: "",
      body: "",
      isDone: false,
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (todo.title.trim() === "" || todo.body.trim() === "") return;
    
    // dispatch 사용 => addTodo 액션 불러오기
    dispatch(addTodo({
      ...todo,
      id: nextId(),
    }))

    setTodo({
      id: nextId, // 마찬가지로 ID 할당
      title: "",
      body: "",
      isDone: false,
    });
  };

  return (
    <StAddForm onSubmit={onSubmitHandler}>
      <StInputGroup>
        <StFormLabel>제목</StFormLabel>
        <StAddInput
          type="text"
          name="title"
          value={todo.title}
          onChange={onChangeHandler}
        />
        <StFormLabel>내용</StFormLabel>
        <StAddInput
          type="text"
          name="body"
          value={todo.body}
          onChange={onChangeHandler}
        />
        {/* 취소버튼 추가 */}
      </StInputGroup>
      <StAddButton>추가하기</StAddButton>
      <StCancelButton type="button" onClick={onCancelHandler}>취소</StCancelButton>
    </StAddForm>
  );
};

export default Form;

const StInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const StFormLabel = styled.label`
  font-size: 16px;
  font-weight: 700;
`;

const StAddForm = styled.form`
  background-color: #eee;
  border-radius: 12px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  gap: 20px;
`;

const StAddInput = styled.input`
  height: 40px;
  width: 240px;
  border: none;
  border-radius: 12px;
  padding: 0 12px;
`;

const StAddButton = styled.button`
  border: none;
  height: 40px;
  cursor: pointer;
  border-radius: 10px;
  background-color: teal;
  width: 140px;
  color: #fff;
  font-weight: 700;
`;

// 취소버튼 css
const StCancelButton = styled.button`
  border: none;
  height: 40px;
  cursor: pointer;
  border-radius: 10px;
  background-color: #FF0000;
  width: 140px;
  color: #fff;
  font-weight: 700;
`;