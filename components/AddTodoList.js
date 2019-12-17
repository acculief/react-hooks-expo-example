import React, { memo } from "react";
import { Input, Item, Icon } from "native-base";

const AddTodoList = memo(props => {
  const { inputValue, changeInput, onIconPress, onInputKeyPress } = props;

  return (
    <Item success>
      <Input
        placeholder="Input todo..."
        value={inputValue}
        onChange={changeInput}
        onChangeText={onInputKeyPress}
      />
      <Icon type="Feather" name="plus" onPress={onIconPress} />
    </Item>
  );
});

export default AddTodoList;
