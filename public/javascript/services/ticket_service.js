/**
 * Service for handling ticket API calls.
 */
var ticketService = function($resource) {
  this.TicketsApi_ = $resource(
      '/api/getTickets/:status',
      {status: '@status'},
      {'getTickets': {method: 'Get', isArray: true}});
  
  this.TicketApi_ = $resource(
      '/api/ticket/:ticketId',
      {ticketId: ''},{
        'create': {method: 'Post'},
        'get': {method: 'Get'},
        'update': {method: 'Put'}});
};

/** 
 * Name used for Dependency injector.
 */
ticketService.NG_NAME = "TicketsApi";


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
