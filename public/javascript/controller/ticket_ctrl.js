/**
 * Controller for ticket.
 */
var ticketCtrl = function($scope) {
  $scope.ticket = {
    'ticket_no': 'TIC40421',
    'created_by': 'Thomas Blurson',
    'status': 'new',
    'create_date': '02/05/2015',
    'summary': 'Auto Deactivation of your filer homedir due to no response',
    'customer_info': {
      'name': 'Harry Askham',
      'contact': '9087767865',
      'email_id': 'harry@yahoo.com',
      'address': 'London'},
    'comments': {
      'name': 'Daniel',
      'comment': 'some comment'}
    };
};
ticketCtrl.NG_NAME = 'ticketCtrl';

