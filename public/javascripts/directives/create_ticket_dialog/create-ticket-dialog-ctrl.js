/**
 *  Controller for dialog to create new ticket.
 */
var createTicketDialogCtrl = function($scope, $mdDialog, ticket) {
  $scope.ticket = angular.isUndefined(ticket)?
      createTicketDialogCtrl.createEmptyTicket() : ticket;
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.submit = function(answer) {
    $mdDialog.hide(answer);
  };
};


/** Name used by AngularJS dependency injector. */
createTicketDialogCtrl.NG_NAME = 'createTicketDialogCtrl';


/**
 * Creates an empty tickets with null fields value.
 */
createTicketDialogCtrl.createEmptyTicket = function() {
  // Pankaj Kumar: Find a better way of doing this.
  var newTicket = {};
  newTicket['ticket_no'] = null;
  newTicket['created_by'] = null;
  newTicket['assign_to'] = null;
  newTicket['create_date'] = null;
  newTicket['status'] = null;
  newTicket['create_date'] = null;
  newTicket['summary'] = null;
  newTicket['customer_info'] = {};
  newTicket['customer_info']['name'] = null;
  newTicket['customer_info']['contact'] = null;
  newTicket['customer_info']['email_id'] = null;
  newTicket['customer_info']['address'] = null;
  newTicket['comments'] = [];
  return newTicket;
};


