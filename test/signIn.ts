import { should } from 'chai';
import 'mocha';
import {
  clearCollection,
  DEFAULT_TIMEOUT,
  getSignIn,
  getSignUp,
  NewUserDataWrapper
} from './helper';

should();

describe('Sign in', async () => {
  const newUserData1 = new NewUserDataWrapper().set('email', 'email3@example.com').build();

  before(() => {
    return clearCollection().then(() =>
      getSignUp().then(signUp => Promise.all([signUp(newUserData1)]))
    );
  });

  it('Logging in an valid user', async function() {
    this.timeout(DEFAULT_TIMEOUT);
    const signIn = await getSignIn();
    const result = await signIn(newUserData1.email, newUserData1.password);

    result.should.have
      .property('data')
      .with.property('signIn')
      .with.property('token')
      .with.length(89);
  });

  it('Logging in an user with invalid password', async function() {
    this.timeout(DEFAULT_TIMEOUT);
    const signIn = await getSignIn();
    const result = await signIn(newUserData1.email, '12345');

    result.should.have
      .property('errors')
      .with.property('0')
      .with.property('statusCode')
      .equals(401);
  });

  it('Logging in an inexistent user', async function() {
    this.timeout(DEFAULT_TIMEOUT);
    const signIn = await getSignIn();
    const result = await signIn('inexistent_email@email.com', '12345');

    result.should.have
      .property('errors')
      .with.property('0')
      .with.property('statusCode')
      .equals(404);
  });
});
