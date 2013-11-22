Unions = new Meteor.Collection("unions");

if (Meteor.isClient) {

  Template.add_union.events({
    'click input.insert': function () {
      var new_u = document.getElementById('new_u').value;
      var u_time = document.getElementById('u_time').value;
      Unions.insert({name: new_u, time: u_time, attendees: []});
    }
  });

  Template.union_list.unions = function () {
    return Unions.find({}, {sort: {name: 1, attendees: 1}});
  };

  Template.union_list.selected_union = function () {
    var union = Unions.findOne(Session.get("selected_union"));
    return union && union.name;
  };

  Template.union.selected = function () {
    return Session.equals("selected_union", this._id) ? "selected" : '';
  };

  Template.union_list.events({
    'click input.push': function () {
      var user = document.getElementById('user').value;
      Unions.update(Session.get("selected_union"), {$push: {attendees: user}});
    }
  });

  Template.union.events({
    'click': function () {
      Session.set("selected_union", this._id);
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Unions.remove({});
    if (Unions.find().count() === 0) {
      var names = ["Dinners",
                   "Basketball",
                   "Ultimate"];
      for (var i = 0; i < names.length; i++)
        Unions.insert({name: names[i], time: attendees: []});
    }
  });
}
