import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { Box, Typography } from '@mui/material';

const TodoPage = () => {
  let { id } = useParams();

  const { todo } = useAppSelector((state) => {
    return {
      todo: state.todosReducers.todoListItems.find((i) => i.id === id),
    };
  });

  console.log(todo);

  return todo ? (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      marginTop={5}
    >
      <Typography variant={'h2'} color={'white'} marginBottom={3}>
        {todo.title}
      </Typography>
      <Typography variant={'h6'}>
        Состояние: {todo.isCompleted ? 'выполнено' : 'не выполнено'}
      </Typography>
    </Box>
  ) : null;
};

export default TodoPage;
