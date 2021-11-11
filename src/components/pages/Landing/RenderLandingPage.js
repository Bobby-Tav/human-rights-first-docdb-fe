import React from 'react';
import { LoadingComponent, ReduxList, Header } from '../../common';
import { connect } from 'react-redux';
import { getDocs } from '../../../state/actions';
import LandingCardList from './LandingCardList';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';
import { Pagination } from 'antd';

function RenderLandingPage(props) {
  const { getDocs, isFetching } = props;
  const { authState } = useOktaAuth();
  return (
    <div>
      <Header />
      <ReduxList
        getItemsData={() => getDocs(authState)}
        RenderItems={LandingCardList}
        LoadingComponent={() => <LoadingComponent message="...Loading" />}
        isFetching={isFetching}
      />
      <Pagination />
    </div>
  );
}

const mapStateToProps = state => ({
  isFetching: state.isFetching,
});

export default connect(mapStateToProps, { getDocs })(RenderLandingPage);
