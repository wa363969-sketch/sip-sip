import Map "mo:core/Map";
import Array "mo:core/Array";
import CartTypes "../types/cart";

module {
  public type CartState = Map.Map<Principal, [CartTypes.CartItem]>;

  public func getCart(state : CartState, user : Principal) : CartTypes.Cart {
    let items = switch (state.get(user)) {
      case (?i) { i };
      case null { [] };
    };
    { items; totalInCents = computeTotal(items) };
  };

  public func addItem(state : CartState, user : Principal, item : CartTypes.CartItem) {
    let current = switch (state.get(user)) {
      case (?i) { i };
      case null { [] };
    };
    // If product already in cart, increment quantity
    let existing = current.find(func(ci : CartTypes.CartItem) : Bool {
      ci.productId == item.productId
    });
    let updated = switch (existing) {
      case (?_ci) {
        current.map(func(ci2 : CartTypes.CartItem) : CartTypes.CartItem {
          if (ci2.productId == item.productId) {
            { ci2 with quantity = ci2.quantity + item.quantity }
          } else { ci2 }
        });
      };
      case null {
        current.concat([item]);
      };
    };
    state.add(user, updated);
  };

  public func updateItem(state : CartState, user : Principal, productId : Text, quantity : Nat) {
    let current = switch (state.get(user)) {
      case (?i) { i };
      case null { [] };
    };
    if (quantity == 0) {
      let filtered = current.filter(func(ci : CartTypes.CartItem) : Bool {
        ci.productId != productId
      });
      state.add(user, filtered);
    } else {
      let updated = current.map(func(ci : CartTypes.CartItem) : CartTypes.CartItem {
        if (ci.productId == productId) { { ci with quantity } } else { ci }
      });
      state.add(user, updated);
    };
  };

  public func removeItem(state : CartState, user : Principal, productId : Text) {
    let current = switch (state.get(user)) {
      case (?i) { i };
      case null { [] };
    };
    let filtered = current.filter(func(ci : CartTypes.CartItem) : Bool {
      ci.productId != productId
    });
    state.add(user, filtered);
  };

  public func clearCart(state : CartState, user : Principal) {
    state.add(user, []);
  };

  public func computeTotal(items : [CartTypes.CartItem]) : Nat {
    items.foldLeft(0, func(acc : Nat, ci : CartTypes.CartItem) : Nat {
      acc + ci.priceInCents * ci.quantity
    });
  };
};
