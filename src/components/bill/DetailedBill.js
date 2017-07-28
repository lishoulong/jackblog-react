import React from 'react';

import {Link} from 'react-router';

import { connect } from 'react-redux';

import * as Actions from '../../actions';

const mapStateToProps = state =>{
  return {
    billDetail: state.billDetail,
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

class DetailedBill extends React.Component {
    static loadAction(params) {
        const { actions} = this.props;
        return actions.loadDetailedBillData(params);
    }

    static get contextTypes() {
        return {
            root: React.PropTypes.string            
        };
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { actions} = this.props
        actions.getDetailedBillData(this.props.params);
    }

    render() {        
        const { billDetail } = this.props
        const amount = `$${billDetail.amount}`;

        return (
            <section className="latest-bills">
                <header className="section-header">
                    <h3 className="title">Bill Details</h3>
                    <Link className="link" to={this.context.root}>&#171; Home</Link>
                </header>
                <section className="section-content">
                    <div className="bill detailed-bill">
                        <img className="icon" src={billDetail.icon}/>
                        <div className="info-container">
                            <h4 className="title">{billDetail.vendor}</h4>
                            <span className="period">{billDetail.period}</span>
                            <hr/>
                            <span>
                                <span className="period">Paid using: </span> 
                                <span>{billDetail.paymeans}</span>
                            </span>
                        </div>
                        <span className="amount">{amount}</span>
                    </div>
                </section>
            </section>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DetailedBill)