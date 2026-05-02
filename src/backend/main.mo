import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Runtime "mo:core/Runtime";
import MenuLib "lib/menu";
import CartLib "lib/cart";
import OrderLib "lib/order";
import MenuMixin "mixins/menu-api";
import CartMixin "mixins/cart-api";
import OrderMixin "mixins/order-api";
import MenuTypes "types/menu";
import CartTypes "types/cart";

actor {
  // --- Authorization ---
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // --- Menu state (ProductId -> Product) ---
  let menuState : MenuLib.MenuState = Map.empty<Text, MenuTypes.Product>();

  // --- Cart state (Principal -> [CartItem]) ---
  let cartState : CartLib.CartState = Map.empty<Principal, [CartTypes.CartItem]>();

  // --- Order state ---
  let orderState = OrderLib.initState();

  // --- Stripe configuration (managed directly in actor as required by extension) ---
  var stripeConfiguration : ?Stripe.StripeConfiguration = null;

  public query func isStripeConfigured() : async Bool {
    stripeConfiguration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    stripeConfiguration := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (stripeConfiguration) {
      case (null) { Runtime.trap("Stripe needs to be first configured") };
      case (?value) { value };
    };
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // --- Mixins ---
  include MenuMixin(accessControlState, menuState);
  include CartMixin(accessControlState, cartState);
  include OrderMixin(accessControlState, orderState, cartState, getStripeConfiguration);
};
