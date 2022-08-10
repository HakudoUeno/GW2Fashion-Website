import React from 'react';

const Register = (props) => {
  return (
    <div className='main-container'>
      <header class="user__header">
        <img src="" alt="" />
        <h1 class="user__title">Register</h1>
      </header>
    
      <form class="form">
          <div class="form__group">
              <input type="text" placeholder="Username" class="form__input" />
          </div>
          
          <div class="form__group">
              <input type="email" placeholder="Email" class="form__input" />
          </div>

          <div class="form__group">
              <input type="password" placeholder="IGN ( ____.#### )" class="form__input" />
          </div>

          <div class="form__group">
              <input type="password" placeholder="Password" class="form__input" />
          </div>

          <div class="form__group">
              <input type="password" placeholder="Confirm Password" class="form__input" />
          </div>
          
          <button class="btn" type="button">Register</button>
      </form>
    </div>
  );
};

export default Register;