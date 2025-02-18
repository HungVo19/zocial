import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

const loadUserRole = () => {
  try {
    const userRole = localStorage.getItem('userRole');
    return userRole ? userRole : 'ROLE_ANONIMOUS';
  } catch (err) {
    return 'ROLE_ANONIMOUS';
  }
};

const saveUserRole = (userRole: string) => {
  try {
    localStorage.setItem('userRole', userRole);
  } catch (err) {}
};

const userSlice = createSlice({
  name: 'user',
  initialState: { userRole: loadUserRole() },
  reducers: {
    setUserRole: (state, action: PayloadAction<string>) => {
      state.userRole = action.payload;
    },
  },
});

export const { setUserRole } = userSlice.actions;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

store.subscribe(() => {
  saveUserRole(store.getState().user.userRole);
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
