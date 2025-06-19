import PropTypes from 'prop-types';
import PropTypesPresenter from 'utils/PropTypesPresenter';

export default new PropTypesPresenter(
  {
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
  },
  {
    id(task) {
      return `${this.id(task)}`;
    },
    name(task) {
      return `${this.name(task)}`;
    },
    description(task) {
      return `${this.description(task)}`;
    },
  },
);
