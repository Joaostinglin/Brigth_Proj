import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import '../news.css'

class RecipeReviewCard extends React.Component {
  state = {
    news: false
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {

    return (
      <Card className="card">
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className="avatar">
              {this.props.firsName.substring(0,1)}
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={this.props.title}
        />
        <CardContent>
          <CardContent>
            <Typography paragraph>
             {this.props.content}
            </Typography>
          </CardContent>
        </CardContent>
        <CardActions className="actions" disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default RecipeReviewCard;