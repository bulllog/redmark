/**
 *  Controller for dialog to create new ticket.
 */
var createTicketDialogCtrl = function($scope, $mdDialog,
    ticket, TicketsApi) {
  
  this.scope_ = $scope;
  
  // Form will be in edit mode by default.
  this.scope_.isNew = false;
  
  this.ticketsApi_ = TicketsApi;
  
  this.scope_.ticket = angular.isUndefined(ticket)?
      this.createEmptyTicket() : ticket;
  
  this.scope_.cancel = function() {
    $mdDialog.cancel();
  };
  
  // Handler for form submit.
  this.scope_.submit = function(answer) {
    // As function callback here this is having scope.
    if(this.isNew) {
      TicketsApi.createTicket(this.ticket, function(response) {
        console.log("Ticket successfully created");
      }, function(response) {
        console.log("Ticket creation failed");
      })
    }
    $mdDialog.hide(answer);
  };

};


/** Name used by AngularJS dependency injector. */
createTicketDialogCtrl.NG_NAME = 'createTicketDialogCtrl';


/**
 * Creates an empty tickets with null fields value.
 */
createTicketDialogCtrl.prototype.createEmptyTicket = function() {
  // Pankaj Kumar: Find a better way of doing this.
  var newTicket = {};
  newTicket['created_by'] = null;
  newTicket['assigned_to'] = null;
  newTicket['status'] = 'new';
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


