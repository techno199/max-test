import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = { }

interface Props {
  classes: any;
}

class SharedViewErrorBoundary extends React.Component<Props> {
  state = {
    hasError: false
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }
  
  render() {
    if (this.state.hasError) {
      return <div>Что-то пошло не так</div>
    } else {
      return this.props.children;
    }
  }
}

const SharedViewErrorBoundaryStyled = withStyles(styles)(SharedViewErrorBoundary);

export { SharedViewErrorBoundaryStyled as SharedViewErrorBoundary }