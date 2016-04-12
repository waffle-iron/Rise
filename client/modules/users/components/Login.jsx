import React from 'react';

const Login = React.createClass({
    componentWillReceiveProps: function(props) {
        // On new/different errors
        if (props.error && (props.error !== this.props.error)) {
            this.props.onError(props.error);
        }

        if (props.didSubmit) {
            this.login();
            this.props.submitFinished();
        }
    },

	  login(e) {
        if (e) { e.preventDefault(); }

		    const {loginUser} = this.props;
		    const {username, password} = this.refs;

		    loginUser(username.value, password.value, function(error) {
            if (!error) {
		            username.value = '';
		            password.value = '';
            }
        });
	  },

	  render() {
		    const {error} = this.props;
		    return (
			      <div>
				        {error ? <div className="alert alert-warning">{error}</div> : null}
				        <form id="user-auth-form" className="login-form" ref="forminside" >
                    <fieldset>
                        <div className="form-group">
                            <label className="control-label" htmlFor="username">Username Or Email</label>
					                  <input ref="username" type="text" id="username" className="form-control" required="required" />
                            <span className="help-block"></span>
                        </div>
                        <div className="form-group">
                            <label className="control-label" htmlFor="password">Password</label>
					                  <input ref="password" type="password" id="password" placeholder="***********" className="form-control" required="required" />
                            <span className="help-block"></span>
                        </div>
                    </fieldset>
				        </form>
			      </div>
		    );
	  }
});

export default Login;