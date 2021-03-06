Meteor.users.helpers({
  hasVotedFor: function(resourceType, resourceId) {
    var resourceKey = (resourceType === "analysis") ? "analyses_ids" : "comments_ids";
    if (this.voted_for) {
      return _.contains(this.voted_for[resourceKey], resourceId);
    }
    return false;
  },
  toggleVoteFor: function(resourceType, resourceId) {
    var modelClass = (resourceType === "analysis") ? Rise.Analyses : Rise.Comments;
    var resourceKey = (resourceType === "analysis") ? "analyses_ids" : "comments_ids";
    var hasVotedFor = this.hasVotedFor(resourceType, resourceId);
    var updateQuery = {};
    var userVotedUpon = modelClass.findOne({_id: resourceId }).user_id;

    if (hasVotedFor) {
      updateQuery = { $pull: {} }
      updateQuery.$pull['voted_for.' + resourceKey] = resourceId;
      modelClass.update({ _id: resourceId }, { $inc: { votes: -1 } });

      if (Meteor.isServer) {
        Rise.Scoring.addPoints({ to: Meteor.userId(), for: "vote:down" });
        Rise.Scoring.addPoints({ to: userVotedUpon, for: "voted:down" });
      }

    } else {
      updateQuery = { $push: {} }
      updateQuery.$push['voted_for.' + resourceKey] = resourceId;
      modelClass.update({ _id: resourceId }, { $inc: { votes: 1 } });

      if (Meteor.isServer) {
        Rise.Scoring.addPoints({ to: Meteor.userId(), for: "vote:up" });
        Rise.Scoring.addPoints({ to: userVotedUpon, for: "voted:upon" });
      }

    }

    Meteor.users.update({ _id: Meteor.userId() }, updateQuery);
  },
  replays: function() {
    return Rise.Replays.find({ _id: { $in: this.replays_ids } });
  },
  analyses: function() {
    return Rise.Analyses.find({ _id: { $in: this.analyses_ids } });
  }
});

Meteor.users.attachSchema(Rise.Schemas.Users);
Meteor.users.attachBehaviour('timestampable', Rise.Base.TimestampableOptions);

if (Meteor.isServer) {
  // After Analysis insert update the user's replay list and the analysis' replays list
  Meteor.users.after.insert(function(userId, user) {
    Rise.Scoring.addPoints({ to: user._id, for: "user:registration" });
  })
}
