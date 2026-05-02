import Common "common";

module {
  public type OrderStatus = {
    #placed;
    #preparing;
    #ready;
    #pickedUp;
  };

  public type OrderItem = {
    productId : Text;
    productName : Text;
    priceInCents : Nat;
    quantity : Nat;
  };

  public type Order = {
    id : Common.OrderId;
    customerId : Principal;
    items : [OrderItem];
    totalInCents : Nat;
    status : OrderStatus;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
    estimatedPickupMinutes : Nat;
    stripeSessionId : ?Text;
  };
};
