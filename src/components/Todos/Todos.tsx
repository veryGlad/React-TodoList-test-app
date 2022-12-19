import React, {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Box, Button, Typography } from '@mui/material';
import CheckboxList from '../UI/List';
import BasicSelect, { IOption } from '../UI/Select';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
  GET_TASKS,
  ITodoItem,
} from './TodosSlice';
import { v4 as uuid } from 'uuid';
import TextField from '@mui/material/TextField';
import { Add } from '@mui/icons-material';
import { SelectChangeEvent } from '@mui/material/Select';

export enum FilterValuesEnum {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  DONE = 'DONE',
}

const Todos = () => {
  const [addTaskValue, setAddTaskValue] = useState('');
  const [filterValue, setFilterValue] = useState<string>(FilterValuesEnum.ALL);
  const dispatch = useAppDispatch();

  const { todoListItems } = useAppSelector((state) => {
    return {
      todoListItems: state.todosReducers.todoListItems,
    };
  });

  useEffect(() => {
    dispatch && dispatch(GET_TASKS());
  }, [dispatch]);

  const addTask = () => {
    dispatch(
      ADD_TASK({
        id: uuid(),
        isCompleted: false,
        title: addTaskValue,
      })
    );
    setAddTaskValue('');
  };

  const editTask = (item: ITodoItem) => {
    dispatch(EDIT_TASK(item));
  };

  const deleteTask = (id: string, event: SyntheticEvent) => {
    event.stopPropagation(); // не помогло блин
    dispatch(DELETE_TASK(id));
  };

  const onAddTaskInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setAddTaskValue(event.target.value);
  };

  const handleToggleItem = (id: string, event: SyntheticEvent) => {
    event.stopPropagation();
    const item = todoListItems.find((i) => i.id === id);
    if (item) {
      editTask({
        id: item.id,
        title: item.title,
        isCompleted: !item.isCompleted,
      });
    }
  };

  const getSortedItems = useCallback((items: ITodoItem[]) => {
    return items.sort(function (a, b) {
      if (a.isCompleted && !b.isCompleted) {
        return 1;
      }
      if (!a.isCompleted && b.isCompleted) {
        return -1;
      }
      return 0;
    });
  }, []);

  const listItemsToDisplay = useMemo(() => {
    let listItems: ITodoItem[] = [];
    switch (filterValue) {
      case FilterValuesEnum.ACTIVE:
        listItems = todoListItems.filter((i) => !i.isCompleted);
        break;
      case FilterValuesEnum.DONE:
        listItems = todoListItems.filter((i) => i.isCompleted);
        break;
      default:
        listItems = todoListItems;
    }
    return getSortedItems([...listItems]);
  }, [todoListItems, filterValue, getSortedItems]);

  const filterOptions: IOption[] = [
    { value: FilterValuesEnum.ALL, title: 'All' },
    { value: FilterValuesEnum.DONE, title: 'Done' },
    { value: FilterValuesEnum.ACTIVE, title: 'Active' },
  ];

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilterValue(event.target.value);
  };

  return (
    <Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        flexDirection={'column'}
        marginTop={5}
      >
        <Typography color={'white'} variant="h3">
          Todos List
        </Typography>
        <Box
          width={'50%'}
          marginTop={4}
          display={'flex'}
          justifyContent={'space-between'}
        >
          <BasicSelect
            value={filterValue}
            handleChange={handleFilterChange}
            options={filterOptions}
          />
          <Box width={'50%'} display={'flex'}>
            <TextField
              value={addTaskValue}
              onChange={onAddTaskInputChange}
              fullWidth={true}
              id="outlined-basic"
              label="Type new task here"
              variant="outlined"
            />
            <Button
              onClick={addTask}
              variant={'contained'}
              disabled={!addTaskValue}
            >
              <Add />
            </Button>
          </Box>
        </Box>
        <Box
          width={'50%'}
          display={'flex'}
          justifyContent={'center'}
          marginTop={1}
        >
          {listItemsToDisplay.length ? (
            <CheckboxList
              items={listItemsToDisplay}
              handleToggle={handleToggleItem}
              handleDelete={deleteTask}
            />
          ) : (
            <Typography variant={'h4'} color={'#908ca1'} marginTop={8}>
              No items to display
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Todos;
