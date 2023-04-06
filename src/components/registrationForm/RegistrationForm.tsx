import React from 'react';
import { UserRegistration } from '../userRegistration/userRegistration';
import { useState } from 'react';

export interface IRegistrationForm {}

export function RegistrationForm() {
  const [whatWasChosen, setWhatWasChosen] = useState<'registration' | 'login'>(
    'registration'
  );

  return (
    <div className="container-registartion-form">
      <div className="change-form">
        <div
          onClick={() => setWhatWasChosen('registration')}
          className={
            whatWasChosen === 'registration' ? 'change-form__active' : ''
          }
        >
          registration
        </div>
        <div
          className={whatWasChosen === 'login' ? 'change-form__active' : ''}
          onClick={() => setWhatWasChosen('login')}
        >
          login
        </div>
      </div>
      <UserRegistration buttonText={whatWasChosen} />
    </div>
  );
}
