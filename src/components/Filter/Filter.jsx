import { Content, Title, Input, LabelTitle } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';

import { changeFilter } from 'redux/filter/slice';
import { selectFilter } from 'redux/filter/selectors';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  return (
    <div>
      <Title>Find contact</Title>
      <Content>
        <LabelTitle>Find contact:</LabelTitle>
        <Input
          type="text"
          value={filter}
          onChange={evt => {
            const action = changeFilter(evt.target.value);
            dispatch(action);
          }}
        />
      </Content>
    </div>
  );
};
