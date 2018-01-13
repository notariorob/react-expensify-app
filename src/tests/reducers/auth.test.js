import authReducer from '../../reducers/auth';

test('should setup uid', () => {
  const uid = '34984234j3k2432';
  const state = authReducer(undefined, {
    type: 'LOGIN',
    uid
  });

  expect(state.uid).toBe(uid);
});

test('should clear uid', () => {
  const state = authReducer({uid: '432647823hjfds'}, {
    type: 'LOGOUT'
  });

  expect(state.uid).toBeFalsy();
})