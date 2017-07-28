import React from 'react';
import List from '../common/List';
import CompactBill from './CompactBill';
import { connect } from 'react-redux';
import * as Actions from '../../actions';
import { bindActionCreators } from 'redux'

const mapStateToProps = state =>{
  return {
    billList: state.billList,
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

class LatestBills extends React.Component {
    static loadAction(params) {
        const { actions} = this.props;
        return actions.loadDetaileBillData(params);
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { actions} = this.props;
        actions.getLatestBillsData(this.props.params);
    }

    shouldComponentUpdate(nextProps, nextState) {
        let result = true;

        if (this.state.items && nextState.items) {
            const oldItems = this.state.items;
            const newItems = nextState.items;

            if (oldItems.length === newItems.length) {
                const validList = newItems.filter((item, index) => {
                    return oldItems[index].id !== item.id;
                });

                if (validList.length === 0) {
                    result = false;
                }
            }
        }

        return result;
    }

    render() {
        const {billList} = this.props;
        return (
            <section className="latest-bills">
                <header className="section-header">
                    <h3 className="title">Latest Bills</h3>
                </header>
                <section className="section-content">
                    <List items={billList} itemType={CompactBill}/>
                </section>
            </section>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LatestBills)