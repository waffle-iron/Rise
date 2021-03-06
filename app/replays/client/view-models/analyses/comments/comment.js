Template.Comment.hooks({
  created: function() {
    this.isEditing = new ReactiveVar(false);
  }
});

Template.Comment.helpers({
  isEditing: function() {
    // https://github.com/meteor/meteor/issues/2923
    if (Template.instance().isEditing) {
      return Template.instance().isEditing.get();
    } else {
      return Template.instance().parent().isEditing.get();
    }
  }
});

// Toggle edit mode
Template.Comment.events({
  'click .toggle-comment-vote': function() {
    Meteor.call('rise:toggleVoteFor', 'comment', Rise.UI.get('_id'));
  },
  'click .toggle-comment-edit': function(event, template) {
    event.preventDefault();

    template.isEditing.set(!template.isEditing.get());
    $(template.find('.comments-content')).removeClass('has-error');
  },
  'click .save-comment-edit': function(event, template) {
    event.preventDefault();
    var field = $(template.find('.edit-comment-content'));
    var value = field.val();

    if (_.isEmpty(value) ) {
      $(template.find('.comments-content')).addClass('has-error');
    } else {
      Meteor.call("rise:edit-comment", this._id, value, function(error) {
        if (error) {
          console.error(error);
        }
      });

      template.isEditing.set(false);
      $(template.find('.comments-content')).removeClass('has-error');
    }
  }
});
