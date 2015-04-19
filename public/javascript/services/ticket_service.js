/**
 * Service for handling ticket API calls.
 */
var ticketService = function($resource) {
  this.TicketsApi_ = $resource(
      '/api/getTickets/:status',
      {status: '@status'},
      {'getTickets': {method: 'Get', isArray: true}});

  this.TicketApi_ = $resource(
      '/api/ticket/:ticket_id', {
          ticket_id: '@ticket_id'
        }, {
          'create': {method: 'Post'},
          'get': {method: 'Get'},
          'update': {method: 'Put'}});
};

/**
 * Name used for Dependency injector.
 */
ticketService.NG_NAME = "TicketsApi";


/**
 * Module used by AngularJS dependency injector.
 *
 */
ticketService.NG_MODULE = angular.module(ticketService.NG_NAME,
    [ticketService.NG_NAME]).
    directive(ticketService.NG_NAME, ticketService);

    
/**
 * Gets tickets of the given status if status is given,
 * all tickets otherwise.
 */
ticketService.prototype.getTickets = function(successCallback,
    opt_ticketStatus) {
  var ticketStatus = angular.isDefined(opt_ticketStatus) ?
      opt_ticketStatus : '';
  this.TicketsApi_.getTickets({status: ticketStatus}, successCallback);
};


/**
 * Creates new ticket.
 */
ticketService.prototype.createTicket = function(request,
    successCallback, errorCallback) {
  this.TicketApi_.create(request, successCallback,
      errorCallback);
};


/**
 * Updatess existing ticket.
 */
ticketService.prototype.updateTicket = function(ticketId,
    request, successCallback, errorCallback) {
  this.TicketApi_.update({ticket_id: ticketId}, request, successCallback,
      errorCallback);
};


/**
 * Gets the ticket with the given id..
 */
ticketService.prototype.getTicket = function(ticketId,
    successCallback, errorCallback) {
  this.TicketApi_.get({ticket_id: ticketId}, successCallback,
      errorCallback);
};

