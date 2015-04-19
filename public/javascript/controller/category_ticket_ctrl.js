/**
 * Controller for specific type of tickets.
 */
var categoryTicketCtrl = function($scope, $location, TicketsApi) {

  this.scope_ = $scope;
  this.location_ = $location;

  // url='/status' remove '/' to make this category.
  this.scope_.category = this.location_.url().substr(1);

  this.scope_.isDataLoaded = false;

  this.ticketsApi_ = TicketsApi;
  this.scope_.tickets = [];
  this.loadTickets(this.scope_.category);
  this.scope_.$parent.updateToolbarInfo($scope.category);
};

/** name used by angularjs dependency injector. */
categoryTicketCtrl.NG_NAME = 'categoryTicketCtrl';


/**
 * Loads all the tickets of the given status.
 */
categoryTicketCtrl.prototype.loadTickets = function(status) {
  this.scope_.isDataLoaded = true;
  this.ticketsApi_.getTickets(angular.bind(this,
      function(tickets) {
        angular.forEach(tickets, angular.bind(this,
            function(ticket) {
              if ('status' in ticket) {
                this.scope_.tickets.push(ticket);
            }
        }));
        this.scope_.isDataLoaded = false;
  }), status);
};

