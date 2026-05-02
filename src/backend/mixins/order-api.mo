import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import OrderLib "../lib/order";
import CartLib "../lib/cart";
import OrderTypes "../types/order";
import CartTypes "../types/cart";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orderState : OrderLib.OrderState,
  cartState : CartLib.CartState,
  getStripeConfig : () -> Stripe.StripeConfiguration,
) {
  public query func _orderTransform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public shared ({ caller }) func checkout(successUrl : Text, cancelUrl : Text) : async Text {
    let cart = CartLib.getCart(cartState, caller);
    if (cart.items.size() == 0) {
      Runtime.trap("Cart is empty");
    };
    let shoppingItems : [Stripe.ShoppingItem] = cart.items.map(func(ci : CartTypes.CartItem) : Stripe.ShoppingItem {
      { currency = "usd"; productName = ci.productName; productDescription = ci.productName; priceInCents = ci.priceInCents; quantity = ci.quantity }
    });
    await Stripe.createCheckoutSession(getStripeConfig(), caller, shoppingItems, successUrl, cancelUrl, _orderTransform);
  };

  public shared ({ caller }) func confirmOrder(stripeSessionId : Text) : async OrderTypes.Order {
    let cart = CartLib.getCart(cartState, caller);
    let order = OrderLib.createOrder(orderState, caller, cart.items, ?stripeSessionId);
    CartLib.clearCart(cartState, caller);
    order;
  };

  public query ({ caller }) func getMyOrders() : async [OrderTypes.Order] {
    OrderLib.getOrdersForUser(orderState, caller);
  };

  public query ({ caller }) func getMyOrder(id : Common.OrderId) : async ?OrderTypes.Order {
    switch (OrderLib.getOrder(orderState, id)) {
      case (?o) {
        if (o.customerId == caller) { ?o } else { null };
      };
      case null { null };
    };
  };

  public query ({ caller }) func adminGetAllOrders() : async [OrderTypes.Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: admin only");
    };
    OrderLib.getAllOrders(orderState);
  };

  public shared ({ caller }) func adminUpdateOrderStatus(
    id : Common.OrderId,
    status : OrderTypes.OrderStatus,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: admin only");
    };
    OrderLib.updateStatus(orderState, id, status);
  };
};
