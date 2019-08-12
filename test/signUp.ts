import { should } from 'chai';
import 'mocha';
import { clearCollection, DEFAULT_TIMEOUT, getSignUp, NewUserDataWrapper } from './helper';
import omit from 'lodash/omit';
should();

describe('Sign up', async () => {
  beforeEach(() => clearCollection());

  it('Creating a new user', async function() {
    this.timeout(DEFAULT_TIMEOUT);
    const newUserData = new NewUserDataWrapper().build();
    const signUp = await getSignUp();
    const result = await signUp(newUserData);

    result.should.have
      .property('data')
      .with.property('signUp')
      .deep.equal(omit(newUserData, ['password']));
  });

  it('Creating user with wrong email', async function() {
    this.timeout(DEFAULT_TIMEOUT);

    const newUserData = new NewUserDataWrapper().set('email', 'asdasda').build();
    const signUp = await getSignUp();
    const result = await signUp(newUserData);

    result.should.have
      .property('errors')
      .with.lengthOf(1)
      .with.property('0')
      .with.property('message')
      .equals('Argument Validation Error');

    result.should.have
      .property('errors')
      .with.lengthOf(1)
      .with.property('0')
      .with.property('statusCode')
      .equals(400);
  });

  it('Creating duplicated users', async function() {
    this.timeout(DEFAULT_TIMEOUT);
    const newUserData = new NewUserDataWrapper().build();
    const signUp = await getSignUp();
    const result1 = await signUp(newUserData);
    const result2 = await signUp(newUserData);

    result1.should.have
      .property('data')
      .with.property('signUp')
      .deep.equal(omit(newUserData, ['password']));

    result2.should.have
      .property('errors')
      .with.lengthOf(1)
      .with.property('0')
      .with.property('statusCode')
      .equals(409);

    result2.should.have
      .property('errors')
      .with.lengthOf(1)
      .with.property('0')
      .with.property('message')
      .equals('User already exists.');
  });
});
