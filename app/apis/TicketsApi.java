package apis;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import play.*;
import play.mvc.*;
import play.libs.Json;
import play.Logger;

import java.util.List;

import dbmodules.MongoCollectionTicketsInfo;

/**
  * Api handler for handling the ticket related requests.
  */

public class TicketsApi extends Controller {

  /**
   * Get the all the tickets if 'all' parameter is passed specific to status otherwise.
   */
  public static Result getTickets(String status) {
    MongoCollectionTicketsInfo ticketsInfoObject = new MongoCollectionTicketsInfo();

    List result = (status == "all") ? ticketsInfoObject.getTickets() :
        ticketsInfoObject.getTickets(status);
    return ok(Json.toJson(result));
  }

  /**
   * Get the specific ticket with the given ticket ID.
   */
  public static Result getTicket(String ticketId) {
    MongoCollectionTicketsInfo ticketsInfoObject = new MongoCollectionTicketsInfo();
    return ok(Json.toJson(ticketsInfoObject.getTicket(ticketId)));
  }

  /**
   * Creates new ticket.
   */
  public static Result createTicket() {
      ObjectNode response = Json.newObject();
      ObjectNode request = (ObjectNode) request().body().asJson();

      // TODO: Create common function to create a response message.
      String responseStatus;
      String responseMessage;
      
      if(request == null) {
        return badRequest("No request found");
      }
      String status = request.findPath("status").textValue();
      String summary = request.findPath("summary").textValue();
      String created_by = request.findPath("created_by").textValue();
      String assigned_to = request.findPath("assigned_to").textValue();
      JsonNode customer_info = request.findPath("customer_info");
      JsonNode comments = request.findPath("comments");

      if (summary == null || status == null || created_by == null) {
        return badRequest("Missing required parameter.");
      }

      MongoCollectionTicketsInfo ticketsInfoObject = new MongoCollectionTicketsInfo();
      responseMessage = ticketsInfoObject.createTicket(status, summary, created_by, assigned_to, customer_info, comments);
      responseStatus = responseMessage.equals("success") ? "200" : "500";
      return ok(response
          .put("status", responseStatus)
          .put("message", responseMessage));
  }

  /**
   * Updates the tickets info.
   * If any ticket will assign to someone it will get automatically open or ticket status will be changed directly.
   */
  public static Result updateTicket(String ticketId) {
      ObjectNode response = Json.newObject();
      ObjectNode request = (ObjectNode) request().body().asJson();
      String responseStatus;
      String responseMessage;
      if(request == null) {
        return badRequest("No request found");
      }
      String status = request.findPath("status").textValue();
      String assigned_to = request.findPath("assigned_to").textValue();
      JsonNode comment = request.findPath("comment");
      Logger.info("****************");
      Logger.info(comment.toString());
      MongoCollectionTicketsInfo ticketsInfoObject = new MongoCollectionTicketsInfo();
      
      responseMessage = ticketsInfoObject.updateTicket(ticketId, status,
          assigned_to, comment);
      responseStatus = responseMessage.equals("success") ? "200" : "500";
      return ok(response
          .put("status", responseStatus)
          .put("message", responseMessage));
  }
}
