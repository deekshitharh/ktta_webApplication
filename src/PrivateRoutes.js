import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import newsStyles from "./styles/newsStyle";
import { withStyles } from '@material-ui/core/styles';

import { checkToken } from './AUTHSevice';
function renderComponent(Component, defaultProps, customProps) {
    let props = { ...defaultProps, ...customProps };
    let StyledComponent = withStyles(newsStyles)(Component);
    return <StyledComponent {...props} />;
}

class PrivateRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isAuthenticated: false
        };
    }

    async componentDidMount() {
        let res = checkToken();
        if (res.status) {
            this.setState(() => ({ isAuthenticated: true, isLoading: true }));
        }
        else {
           
            this.setState(() => ({ isAuthenticated: false, isLoading: true }));
        }

    }

    async componentDidUpdate(prevProps) {
        if (prevProps.path !== this.props.path) {


            let res = checkToken();
            if (res.status) {
                this.setState(() => ({ isAuthenticated: true, isLoading: true }));
            }
            else {
               
                this.setState(() => ({ isAuthenticated: false, isLoading: true }));
            }
        }
    }

    render() {




        let { isAuthenticated, isLoading } = this.state;

        let customProps = { ...this.props.data }


        return  isLoading ? (isAuthenticated ? (<Route path={this.props.path}
            exact={this.props.exact}
            data={this.props.data}
            render={(props) => renderComponent(this.props.component, props, customProps)}

        />) :
            <Redirect to={{ pathname: '/' }} />



        ) : false;

    }

}

export default PrivateRoute;