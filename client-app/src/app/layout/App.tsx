import React, { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from './Navbar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import { useStore } from '../store/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import HomePage from '../../features/home/HomePage';


function App() {

  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => { commonStore.setAppLoaded() })
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app' />

  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position='bottom-right' hideProgressBar />
      {location.pathname === '/' ? <HomePage /> : (
        <>
      <Navbar />
      <Container style={{ marginTop: '7em' }}>
        <Outlet />
      </Container>
      </>
      )}

      {/* <Route path='/' component={HomePage} exact />
      <Route path={'/(.+)'}
        render={() => (
          <>
            <Navbar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route path='/activities' component={ActivityDashboard} exact />
                <Route path='/activities/:id' component={ActivityDetails} exact />
                <Route key={location.key} path={['/create-activity', '/manage/:id']} component={ActivityForm} exact />
                <Route path='/errors' component={TestErrors} />
                <Route path='/server-error' component={ServerError} />
                <Route path='/login' component={LoginForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      /> */}


    </Fragment>
  );
}

export default observer(App);
