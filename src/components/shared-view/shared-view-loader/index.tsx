import React from 'react';
import { CircularProgress } from '@material-ui/core';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = { 
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90px',
    height: '90px',
    background: 'rgba(0, 0, 0, .4)'
  }
}

interface Props {
  classes: any;
  className: any;
}

const SharedViewLoader = (props: Props) => {
  return (
    <div className={classNames(props.classes.root, props.className)}>
      <CircularProgress size={60} />
    </div>
  )
}

const SharedViewLoaderStyled = withStyles(styles)(SharedViewLoader);

export { SharedViewLoaderStyled as SharedViewLoader }