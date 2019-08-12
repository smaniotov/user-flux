import { should } from 'chai';
import 'mocha';
import {
  clearCollection,
  DEFAULT_TIMEOUT,
  getSignUp,
  getUserFetch,
  NewUserDataWrapper
} from './helper';
import omit from 'lodash/omit';

should();

describe('Get user', async () => {
  const newUserData1 = new NewUserDataWrapper().build();
  const newUserData2 = new NewUserDataWrapper().set('email', 'email2@example.com').build();

  before(() => {
    return clearCollection().then(() =>
      getSignUp().then(signUp => Promise.all([signUp(newUserData1), signUp(newUserData2)]))
    );
  });

  it('Getting an user logged', async function() {
    this.timeout(DEFAULT_TIMEOUT);
    const getUser = await getUserFetch(newUserData1.email);
    const result = await getUser(newUserData1.email);

    result.should.have
      .property('data')
      .with.property('getUser')
      .deep.equal(omit(newUserData1, ['password']));
  });

  it('Getting an user not logged', async function() {
    this.timeout(DEFAULT_TIMEOUT);
    const getUser = await getUserFetch();
    const result = await getUser(newUserData1.email);

    result.should.have
      .property('errors')
      .with.property('0')
      .with.property('statusCode')
      .equals(401);
  });

  it('Getting an user different from token', async function() {
    this.timeout(DEFAULT_TIMEOUT);
    const getUser = await getUserFetch(newUserData1.email);
    const result = await getUser(newUserData2.email);

    result.should.have
      .property('errors')
      .with.property('0')
      .with.property('statusCode')
      .equals(403);
  });

  it('Getting an user that does not exist', async function() {
    this.timeout(DEFAULT_TIMEOUT);
    const getUser = await getUserFetch(newUserData1.email);
    const result = await getUser('inexistent_user@email.com');

    result.should.have
      .property('errors')
      .with.property('0')
      .with.property('statusCode')
      .equals(404);
  });
});
