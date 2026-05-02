import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import MenuLib "../lib/menu";
import MenuTypes "../types/menu";

mixin (
  accessControlState : AccessControl.AccessControlState,
  menuState : MenuLib.MenuState,
) {
  // Ensure default products are loaded on first use (idempotent guard via size check)
  if (menuState.size() == 0) {
    MenuLib.initWithDefaults(menuState);
  };

  public query func getMenuItems() : async [MenuTypes.Product] {
    MenuLib.listAll(menuState);
  };

  public query func getMenuItemsByCategory(category : MenuTypes.Category) : async [MenuTypes.Product] {
    MenuLib.listByCategory(menuState, category);
  };

  public query func searchMenuItems(term : Text) : async [MenuTypes.Product] {
    MenuLib.search(menuState, term);
  };

  public query func getMenuItem(id : Text) : async ?MenuTypes.Product {
    MenuLib.getProduct(menuState, id);
  };

  public shared ({ caller }) func adminAddProduct(product : MenuTypes.Product) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: admin only");
    };
    MenuLib.addProduct(menuState, product);
  };

  public shared ({ caller }) func adminUpdateProduct(product : MenuTypes.Product) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: admin only");
    };
    MenuLib.updateProduct(menuState, product);
  };

  public shared ({ caller }) func adminDeleteProduct(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: admin only");
    };
    MenuLib.deleteProduct(menuState, id);
  };

  public shared ({ caller }) func adminSetProductAvailability(id : Text, available : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: admin only");
    };
    MenuLib.setAvailability(menuState, id, available);
  };
};
