import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import MoviesScreen from '../../src/screens/MoviesScreen';

describe('Movies', () => {
  const initialState = { users: [] };
  const mockStore = configureStore();
  let store: any;

  describe('rendering', () => {
    store = mockStore(initialState);
    let wrapper: ShallowWrapper;
    beforeEach(() => {
      wrapper = shallow(
        <Provider store={store}>
          <MoviesScreen />
        </Provider>,
      );
    });

    it('should render a Movies component', () => {
      expect(wrapper.find(MoviesScreen)).toHaveLength(1);
    });
  });
});
