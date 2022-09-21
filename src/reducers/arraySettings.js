const initial = {
  array: [],
  arrayLength: 30
};

export default (state = initial, { type, value }) => {
  switch (type) {
    case 'ARRAY/SET_ARRAY':
      return { ...state, array: value };
    case 'ARRAY/SET_LENGTH':
      return { ...state, arrayLength: value };
    default:
      return state;
  }
};