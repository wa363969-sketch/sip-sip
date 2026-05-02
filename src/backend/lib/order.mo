import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import OrderTypes "../types/order";
import CartTypes "../types/cart";

module {
  public type OrderState = {
    orders : Map.Map<Common.OrderId, OrderTypes.Order>;
    userOrders : Map.Map<Principal, List.List<Common.OrderId>>;
    nextId : { var val : Nat };
  };

  public func initState() : OrderState {
    {
      orders = Map.empty<Common.OrderId, OrderTypes.Order>();
      userOrders = Map.empty<Principal, List.List<Common.OrderId>>();
      nextId = { var val = 1 };
    };
  };

  public func createOrder(
    state : OrderState,
    customer : Principal,
    items : [CartTypes.CartItem],
    stripeSessionId : ?Text,
  ) : OrderTypes.Order {
    let id = state.nextId.val;
    state.nextId.val += 1;
    let now = Time.now();
    let total = items.foldLeft(0, func(acc : Nat, ci : CartTypes.CartItem) : Nat {
      acc + ci.priceInCents * ci.quantity
    });
    let orderItems : [OrderTypes.OrderItem] = items.map(func(ci : CartTypes.CartItem) : OrderTypes.OrderItem {
      { productId = ci.productId; productName = ci.productName; priceInCents = ci.priceInCents; quantity = ci.quantity }
    });
    let order : OrderTypes.Order = {
      id;
      customerId = customer;
      items = orderItems;
      totalInCents = total;
      status = #placed;
      createdAt = now;
      updatedAt = now;
      estimatedPickupMinutes = 15;
      stripeSessionId;
    };
    state.orders.add(id, order);
    // Track order ID under user
    let userList = switch (state.userOrders.get(customer)) {
      case (?l) { l };
      case null { List.empty<Common.OrderId>() };
    };
    userList.add(id);
    state.userOrders.add(customer, userList);
    order;
  };

  public func getOrder(state : OrderState, id : Common.OrderId) : ?OrderTypes.Order {
    state.orders.get(id);
  };

  public func getOrdersForUser(state : OrderState, user : Principal) : [OrderTypes.Order] {
    switch (state.userOrders.get(user)) {
      case (?ids) {
        ids.values()
          .filterMap(func(id : Common.OrderId) : ?OrderTypes.Order { state.orders.get(id) })
          .toArray();
      };
      case null { [] };
    };
  };

  public func getAllOrders(state : OrderState) : [OrderTypes.Order] {
    state.orders.entries()
      .map(func((_, o) : (Common.OrderId, OrderTypes.Order)) : OrderTypes.Order { o })
      .toArray();
  };

  public func updateStatus(
    state : OrderState,
    id : Common.OrderId,
    status : OrderTypes.OrderStatus,
  ) {
    switch (state.orders.get(id)) {
      case (?o) {
        state.orders.add(id, { o with status; updatedAt = Time.now() });
      };
      case null { };
    };
  };
};
