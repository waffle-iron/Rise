AutoForm.hooks({
  'analysis-edit-form': {
    onSubmit: function(insertDoc, updateDoc, currentDoc) {
      var self = this;
      Meteor.call("rise:submit-analysis-edit", currentDoc, insertDoc, function(e, result) {
        if (result) {
          self.done();
        } else {
          self.done(new Meteor.Error(e));
        }
      });

      return false;
    },

    formToDoc: function(doc) {
      doc.user_id = Meteor.userId();
      doc.replay_id = Session.get('replay:current-instance')._id;

      return doc;
    },

    onSuccess: function(operation, id) {
      Session.set('replay:edit-current-analysis', false);
      // TODO: Do something ? Animate maybe ?
    },

    onError: function(operation, error) {
      console.error('Trying to create a new analysis but there was an error on ' + operation + ':', error);
    },
  }
});
