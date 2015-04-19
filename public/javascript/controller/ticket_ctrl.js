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
      }));
};
