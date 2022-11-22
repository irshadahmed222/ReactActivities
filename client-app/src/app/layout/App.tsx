import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/activities/Home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';


function App() {

  const location = useLocation();
  return (
    <Fragment>
      <Route path='/' component={HomePage} exact />
      <Route path={'/(.+)'}
        render={() => (
          <>
            <Navbar />
            <Container style={{ marginTop: '7em' }}>
              <Route path='/activities' component={ActivityDashboard} exact />
              <Route path='/activities/:id' component={ActivityDetails} exact />
              <Route key={location.key} path={['/create-activity', '/manage/:id']} component={ActivityForm} exact />
            </Container>
          </>
        )}
      />

    </Fragment>
  );
}

export default observer(App);
