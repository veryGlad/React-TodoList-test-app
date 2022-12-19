import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { SyntheticEvent } from 'react';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';

interface CheckboxListItem {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface ICheckboxList {
  items: CheckboxListItem[];
  handleToggle: (id: string, event: SyntheticEvent) => void;
  handleDelete: (id: string, event: SyntheticEvent) => void;
}

const CheckboxList: React.FC<ICheckboxList> = ({
  items,
  handleToggle,
  handleDelete,
}) => {
  return (
    <List sx={{ width: '100%', bgcolor: '#908ca1' }}>
      {items.map(({ title, id, isCompleted }) => {
        const labelId = `checkbox-list-label-${id}`;

        return (
          <Box>
            <ListItem
              key={id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={(event) => handleDelete(id, event)} // пофиксить тут!!!
                >
                  <DeleteIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton role={undefined} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={isCompleted}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    onClick={(event) => handleToggle(id, event)}
                  />
                </ListItemIcon>{' '}
                <Box
                  component={Link}
                  to={`/todo/${id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <ListItemText
                    id={labelId}
                    style={{
                      textDecoration: isCompleted ? 'line-through' : 'none',
                      color: 'black',
                    }}
                    primary={title}
                  />
                </Box>
              </ListItemButton>
            </ListItem>
            <Divider />
          </Box>
        );
      })}
    </List>
  );
};

export default CheckboxList;
