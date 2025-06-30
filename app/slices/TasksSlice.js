import { createSlice } from '@reduxjs/toolkit';
import { STATES } from 'presenters/TaskPresenter';
import { useDispatch } from 'react-redux';
import { changeColumn } from '@asseinfo/react-kanban';
import TasksRepository from '../javascript/repositories/TasksRepository';
import TaskPresenter from '../javascript/presenters/TaskPresenter';
import TaskForm from '../javascript/forms/TaskForm';

const initialState = {
  board: {
    columns: STATES.map((column) => ({
      id: column.key,
      title: column.value,
      cards: [],
      meta: {},
    })),
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    loadColumnSuccess(state, { payload }) {
      const { items, meta, columnId } = payload;

      const column = state.board.columns.find((col) => col.id === columnId);

      state.board = changeColumn(state.board, column, { cards: items, meta });

      return state;
    },
    appendColumnSuccess(state, { payload }) {
      const { items, meta, columnId } = payload;

      const column = state.board.columns.find((col) => col.id === columnId);

      if (column) {
        const exitingCards = column.cards || [];
        const newCards = items.filter((item) => !exitingCards.some((card) => card.id === item.id));

        state.board = changeColumn(state.board, column, {
          cards: [...exitingCards, ...newCards],
          meta,
        });
      }
    },
  },
});

const { loadColumnSuccess, appendColumnSuccess } = tasksSlice.actions;

export default tasksSlice.reducer;

export const useTasksActions = () => {
  const dispatch = useDispatch();
  const loadColumn = (state, page = 1, perPage = 10) => {
    TasksRepository.index({
      q: { stateEq: state },
      page,
      perPage,
    }).then(({ data }) => {
      dispatch(loadColumnSuccess({ ...data, columnId: state }));
    });
  };

  const loadBoard = () => STATES.map(({ key }) => loadColumn(key));

  const dragEndCard = (task, source, destination) => {
    const transition = task.transitions.find(({ to }) => destination.toColumnId === to);
    if (!transition) return loadColumn(task.state);

    return TasksRepository.update(TaskPresenter.id(task), { stateEvent: transition.event })
      .then(() => {
        loadColumn(destination.toColumnId);
        loadColumn(source.fromColumnId);
      })
      .catch((error) => {
        alert(`Move failed! ${error.message}`);
      });
  };

  const createTask = (params) => {
    const attributes = TaskForm.attributesToSubmit(params);
    return TasksRepository.create(attributes).then(({ data: { task } }) => {
      loadColumn(task.state);
    });
  };

  const updateTask = (task) => {
    const attributes = TaskForm.attributesToSubmit(task);

    return TasksRepository.update(TaskPresenter.id(task), attributes).then(() => {
      loadColumn(task.state);
    });
  };

  const destroyTask = (task) =>
    TasksRepository.destroy(TaskPresenter.id(task)).then(() => {
      loadColumn(task.state);
    });
  const loadTask = (id) => TasksRepository.show(id).then(({ data: { task } }) => task);

  const loadColumnMore = (state, page = 1, perPage = 10) =>
    TasksRepository.index({ q: { stateEq: state }, page, perPage }).then(({ data }) => {
      dispatch(appendColumnSuccess({ ...data, columnId: state }));
    });

  return {
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
