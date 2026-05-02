import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CartLib "../lib/cart";
import CartTypes "../types/cart";

mixin (
  accessControlState : AccessControl.AccessControlState,
  cartState : CartLib.CartState,
) {
  public query ({ caller }) func getMyCart() : async CartTypes.Cart {
    CartLib.getCart(cartState, caller);
  };

  public shared ({ caller }) func addToCart(item : CartTypes.CartItem) : async () {
    CartLib.addItem(cartState, caller, item);
  };

  public shared ({ caller }) func updateCartItem(productId : Text, quantity : Nat) : async () {
    CartLib.updateItem(cartState, caller, productId, quantity);
  };

  public shared ({ caller }) func removeFromCart(productId : Text) : async () {
    CartLib.removeItem(cartState, caller, productId);
  };

  public shared ({ caller }) func clearMyCart() : async () {
    CartLib.clearCart(cartState, caller);
  };
};
