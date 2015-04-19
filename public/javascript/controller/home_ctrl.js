/**
 * Controller for home.
 */
var homeCtrl = function($scope, TicketsApi) {
  this.scope_ = $scope;
  this.ticketsApi_ = TicketsApi;
  
  this.scope_.ticketsObject = {
    'new': {
      'name': 'New',
      'tickets': [],
      'background': 'red'
    },
    'open': {
      'name': 'Open',
      'tickets': [],
      'background': '#0091ea'
    },
    'close': {
    'name': 'Close',
    'tickets': [],
    'background': '#42bd41'
  }};
  this.scope_.isDataLoaded = false;
  this.scope_.$parent.setDeafaultInfo();
  this.loadAllTickets();
};

/** Name used by AngularJS dependency injector. */
homeCtrl.NG_NAME = 'homeCtrl';

/**
 * Loads all the tickets.
 */
homeCtrl.prototype.loadAllTickets = function() {
  this.scope_.isDataLoaded = true;
  this.ticketsApi_.getTickets(angular.bind(this,
      function(tickets) {
    this.filterTickets(tickets);
    this.scope_.isDataLoaded = false;
  }));
};


/**
 * Filters all the tickets on the basis of status.
 */
homeCtrl.prototype.filterTickets = function(tickets) {
  angular.forEach(tickets, angular.bind(this,
      function(ticket) {
      // Append the ticket in the list of the related ticketobject status.
      if ('status' in ticket) {
        this.scope_.ticketsObject[ticket.status]['tickets'].push(ticket);
      }
  }));
}
