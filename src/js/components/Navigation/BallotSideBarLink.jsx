import { ListItem } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { renderLog } from '../../common/utils/logging';
import toTitleCase from '../../common/utils/toTitleCase';
import { sentenceCaseString } from '../../utils/textFormat';

class BallotSideBarLink extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  render () {
    renderLog('BallotSideBarLink');  // Set LOG_RENDER_EVENTS to log all renders
    const { classes } = this.props;
    const labelInSentenceCase = toTitleCase(this.props.label);
    const subtitleInSentenceCase = sentenceCaseString(this.props.subtitle);

    return (
      <span key={this.props.key}>
        {this.props.plainTextLink ? (
          <Link id={this.props.id} to={this.props.url}>
            <button
              className={classes.button}
              type="button"
              onClick={() => {
                this.props.onClick.bind(this);
                if (this.props.ballotItemLinkHasBeenClicked && this.props.url) {
                  const selectedBallotItemId = this.props.url.split('#')[1];
                  if (selectedBallotItemId) {
                    this.props.ballotItemLinkHasBeenClicked(selectedBallotItemId);
                  }
                }
              }}
            >
              <span>{labelInSentenceCase}</span>
              { this.props.displaySubtitles ? (
                <span>
                  {' '}
                  {subtitleInSentenceCase}
                </span>
              ) : null }
            </button>
          </Link>
        ) : (
          <Link id={this.props.id} to={this.props.url} className="BallotItem__summary__item__display-name">
            <ListItem
              button
              onClick={() => {
                this.props.onClick.bind(this);
                if (this.props.ballotItemLinkHasBeenClicked && this.props.url) {
                  const selectedBallotItemId = this.props.url.split('#')[1];
                  if (selectedBallotItemId) {
                    this.props.ballotItemLinkHasBeenClicked(selectedBallotItemId);
                  }
                }
              }}
            >
              <div>
                <span className="BallotItem__summary__display-name">{labelInSentenceCase}</span>
                { this.props.displaySubtitles ? (
                  <span className="BallotItem__summary__item__subtitle">
                    {' '}
                    {subtitleInSentenceCase}
                  </span>
                ) : null }
              </div>
            </ListItem>
          </Link>
        )}
      </span>
    );
  }
}
BallotSideBarLink.propTypes = {
  ballotItemLinkHasBeenClicked: PropTypes.func,
  url: PropTypes.string,
  id: PropTypes.string,
  key: PropTypes.string,
  label: PropTypes.string,
  subtitle: PropTypes.string,
  displaySubtitles: PropTypes.bool,
  onClick: PropTypes.func,
  plainTextLink: PropTypes.bool,
  classes: PropTypes.object,
};

const styles = () => ({
  button: {
    background: 'transparent !important',
    textAlign: 'left',
    paddingLeft: 0,
    paddingRight: 0,
    textTransform: 'capitalize',
    border: 'none',
    textDecoration: 'underline',
    // '* span': {
    maxWidth: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    padding: '8px 0 !important',
    width: '100%',
    // },
  },
});

export default withStyles(styles)(BallotSideBarLink);
