/**
 * Controller for ticket.
 */
var ticketCtrl = function($scope, $location, TicketsApi) {
  this.scope_ = $scope;
  this.location_ = $location;

  this.ticketsApi_ = TicketsApi;
  var regexUrl = /\/ticket\/(.*)/;
  var ticketId = this.location_.url().match(regexUrl)[1];
  this.scope_.ticket = null;
  this.scope_.isDataLoaded = false;

  this.scope_.submitComment = angular.bind(this,
      this.submitComment);
  this.scope_.submit = angular.bind(this, this.submit_);
  this.scope_.isClose = angular.bind(this, this.isClose_);
  this.loadTicket(ticketId);
};


/** name used by angularjs dependency injector. */
ticketCtrl.NG_NAME = 'ticketCtrl';


/**
 * Loads the ticket with the given id.
 */
ticketCtrl.prototype.loadTicket = function(ticketId) {
  this.scope_.isDataLoaded = true;
  this.ticketsApi_.getTicket(ticketId,
      angular.bind(this, function(ticket) {
        this.scope_.ticket = ticket;
        this.scope_.isDataLoaded = false;
        this.setBorderColor();
      }));
};


/**
 * Handler for enter press to submit comment.
 */
ticketCtrl.prototype.submitComment = function(event) {
 
  if (event.keyCode == "13") {
    // New comment model.
    this.newComment = {};
    var newCommentText = event.target.value;
    if (newCommentText == "") {
      return;
    }
    this.newComment["text"] = newCommentText;
    this.newComment["name"] = "Anonymous";
    this.scope_.ticket.comments.push(angular.copy(this.newComment));
    this.ticketsApi_.updateTicket(
        this.scope_.ticket.ticket_no, {'comment': this.newComment},
        function() {
          console.log("New comment added");
        }, function() {
          console.log("New comment addition failed");
        });
    event.target.value = "";
  }
};

/**
 * Handler for Edit the ticket form.
 */
ticketCtrl.prototype.submit_ = function() {
  var request = {};
  if (this.scope_.ticket.assigned_to != "") {
    request["status"] = "open";
    request["assigned_to"] = this.scope_.ticket.assigned_to;
  }
  this.ticketsApi_.updateTicket(this.scope_.ticket.ticket_no,
      request, function() {
    console.log("Ticket successfully updated");
  }, function() {
    console.log("Ticket updation failed");
  });
};


/**
 * Sets the border color according to the status.
 */
ticketCtrl.prototype.setBorderColor = function() {
  var borderColor = {
    "new": "red",
    "open": "#0091ea",
    "close": "#42bd41"
  };
  this.scope_.borderColor = borderColor[this.scope_.ticket.status];
}


/**
 * Return true if ticket is closed.
 */
ticketCtrl.prototype.isClose_ = function() {
  return (this.scope_.ticket.status == "close");
};
