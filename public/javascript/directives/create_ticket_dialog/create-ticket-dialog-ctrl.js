/**
 *  Controller for dialog to create new ticket.
 */
var createTicketDialogCtrl = function($scope, $mdDialog,
    ticket, TicketsApi) {
 
  this.scope_ = $scope;

  // Form will be in edit mode by default.
  this.scope_.isNew = false;

  this.ticketsApi_ = TicketsApi;
  
  this.mdDialog_ = $mdDialog;
  
  this.scope_.ticket = angular.isUndefined(ticket)?
      this.createEmptyTicket() : ticket;
  
  this.scope_.cancel = function() {
    $mdDialog.cancel();
  };
  
  // Handler for form submit.
  this.scope_.submit = angular.bind(this, this.submit_);

};


/** Name used by AngularJS dependency injector. */
createTicketDialogCtrl.NG_NAME = 'createTicketDialogCtrl';


/**
 * Handler for submit the ticket form.
 */
createTicketDialogCtrl.prototype.submit_ = function() {
  if(this.scope_.isNew) {
    
    this.scope_.ticket.status =
        (this.scope_.ticket.assigned_to == null) ? "new" : "open";

    this.ticketsApi_.createTicket(this.scope_.ticket, function(response) {
      console.log("Ticket successfully created");
    }, function(response) {
      console.log("Ticket creation failed");
    })
  } else {
    var request = {};
    if (this.scope_.ticket.assigned_to != "") {
      request["status"] = "open";
      request["assigned_to"] = this.scope_.ticket.assigned_to;
    } else {
      request["status"] = "new";
    }
    request["comments"] = this.scope_.ticket.comments;
    this.ticketsApi_.updateTicket(this.scope_.ticket.ticket_no,
        request, function() {
      console.log("Ticket successfully updated");
    }, function() {
      console.log("Ticket updation failed");
    });
  }
  this.mdDialog_.hide();
};


/**
 * Creates an empty tickets with null fields value.
 */
createTicketDialogCtrl.prototype.createEmptyTicket = function() {
  // TODO:: Find a better way of doing this.
  var newTicket = {};
  newTicket['created_by'] = null;
  newTicket['assigned_to'] = null;
  newTicket['status'] = null;
  newTicket['summary'] = null;
  newTicket['customer_info'] = {};
  newTicket['customer_info']['name'] = null;
  newTicket['customer_info']['contact'] = null;
  newTicket['customer_info']['email_id'] = null;
  newTicket['customer_info']['address'] = null;
  newTicket['comments'] = [];
  this.scope_.isNew = true;
  return newTicket;
};


