import MenuTypes "menu";

module {
  public type CartItem = {
    productId : Text;
    productName : Text;
    priceInCents : Nat;
    quantity : Nat;
  };

  public type Cart = {
    items : [CartItem];
    totalInCents : Nat;
  };
};
