import React from 'react';
import { SignupOrLogin } from '../userRegistration/SignupOrLogin';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { signupSlice } from '../../store/reducers/SignupSlice';

export function RegistrationSelect() {
  const dispatch = useAppDispatch();
  const { setAction } = signupSlice.actions;
  const { action } = useAppSelector((state) => state.signupReducer);

  return (
    <div className="container-registartion-form">
      <div className="change-form">
        <div
          onClick={() => dispatch(setAction('signup'))}
          className={action === 'signup' ? 'change-form__active' : ''}
        >
          registration
        </div>
        <div
          className={action === 'login' ? 'change-form__active' : ''}
          onClick={() => dispatch(setAction('login'))}
        >
          login
        </div>
      </div>
      <SignupOrLogin />
    </div>
  );
}
