package controllers;

import play.*;
import play.mvc.*;

import views.html.*;


public class Application extends Controller {

  public static Result index(String optionArg) {
    return ok(index.render());
  }
}
