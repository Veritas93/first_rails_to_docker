import { STATES } from 'presenters/TaskPresenter';
import { useSelector } from 'react-redux';
import { useTasksActions } from '../../../slices/TasksSlice';

const useTasks = () => {
  const board = useSelector((state) => state.TasksSlice.board);
  const { loadColumn, dragEndCard, createTask, updateTask, destroyTask, loadTask, loadColumnMore } = useTasksActions();
  const loadBoard = () => Promise.all(STATES.map(({ key }) => loadColumn(key)));

  return {
    board,
    loadBoard,
    loadColumn,
    dragEndCard,
    createTask,
    updateTask,
    destroyTask,
    loadTask,
    loadColumnMore,
  };
};

export default useTasks;
